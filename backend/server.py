from flask import Flask, request, jsonify, make_response
# from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash
from flask_cors import CORS
import jwt
import datetime
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:5174"], supports_credentials=True)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Change as needed
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET', 'your_secret_key')

# db = SQLAlchemy(app)

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password_hash = db.Column(db.String(256), nullable=False)

dummy_db = {}

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    is_admin = data.get('isAdmin')

    roles = ['admin'] if is_admin else []
    
    if email in dummy_db:
        return jsonify({"message": "User already exists!"}), 400
    
    hashed_password = generate_password_hash(password)
    dummy_db[email] = {'email': email, 'password_hash': hashed_password, 'roles': roles}
    
    return jsonify({"message": "User registered successfully!"})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # user = User.query.filter_by(email=email).first()
    cookies = request.cookies
    user = dummy_db.get(email)

    roles = user.get('roles', [])

    if not user or not check_password_hash(user['password_hash'], password):
        return jsonify({"message": "Email or password does not match!"}), 400

    access_token = jwt.encode(
        {
            "UserInfo": {
                "email": user['email'],
                "roles": roles
            },
            "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=10)
        },
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )

    new_refresh_token = jwt.encode(
        {
            "email": user['email'],
            "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=15)
        },
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )

    new_refresh_token_array = (
        [] if not cookies.get('jwt') else [rt for rt in user.get('refresh_tokens', []) if rt != cookies['jwt']]
    )

    if cookies.get('jwt'):
        found_token = next((rt for rt in user.get('refresh_tokens', []) if rt == cookies['jwt']), None)

        if not found_token:
            # Detected refresh token reuse, clear all previous refresh tokens
            new_refresh_token_array = []

        # Clear old refresh token cookie
        response = make_response(jsonify({"accessToken": access_token, "roles": roles}))
        response.set_cookie('jwt', '', expires=0, httponly=True, samesite='None', secure=True)
    else:
        response = make_response(jsonify({"accessToken": access_token, "roles": roles}))

    user['refresh_tokens'] = new_refresh_token_array + [new_refresh_token]

    # Set secure cookie with new refresh token
    response.set_cookie('jwt', new_refresh_token, httponly=True, samesite='None', secure=True, max_age=24 * 60 * 60)

    return response

@app.route('/users', methods=['GET'])
def get_users():
    # return jsonify({"users": list(dummy_db.keys())})
    return jsonify(dummy_db)

@app.route('/refresh', methods=['GET'])
def refresh_token():
    cookies = request.cookies
    if not cookies.get('jwt'):
        return jsonify({"message": "Unauthorized"}), 401
    
    refresh_token = cookies['jwt']
    response = make_response()
    response.set_cookie('jwt', '', expires=0, httponly=True, samesite='None', secure=True)
    
    # Find user by refresh token
    found_user = None
    for user in dummy_db.values():
        if refresh_token in user.get('refresh_tokens', []):
            found_user = user
            break
    
    if not found_user:
        try:
            decoded = jwt.decode(refresh_token, app.config['SECRET_KEY'], algorithms=['HS256'])
            hacked_user = dummy_db.get(decoded['email'])
            if hacked_user:
                hacked_user['refresh_tokens'] = []
            return jsonify({"message": "Forbidden"}), 403
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Forbidden"}), 403
    
    # Remove the used refresh token
    new_refresh_token_array = [rt for rt in found_user['refresh_tokens'] if rt != refresh_token]
    
    try:
        decoded = jwt.decode(refresh_token, app.config['SECRET_KEY'], algorithms=['HS256'])
        if found_user['email'] != decoded['email']:
            return jsonify({"message": "Forbidden"}), 403
        
        roles = found_user.get('roles', [])
        access_token = jwt.encode(
            {
                "UserInfo": {
                    "email": decoded['email'],
                    "roles": roles
                },
                "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=10)
            },
            app.config['SECRET_KEY'],
            algorithm='HS256'
        )
        
        new_refresh_token = jwt.encode(
            {
                "email": found_user['email'],
                "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=15)
            },
            app.config['SECRET_KEY'],
            algorithm='HS256'
        )
        
        found_user['refresh_tokens'] = new_refresh_token_array + [new_refresh_token]
        
        response.set_cookie('jwt', new_refresh_token, httponly=True, samesite='None', secure=True, max_age=24 * 60 * 60)
        response.set_data(jsonify({"accessToken": access_token}).get_data())
        return response
        
    except jwt.ExpiredSignatureError:
        found_user['refresh_tokens'] = new_refresh_token_array
        return jsonify({"message": "Forbidden"}), 403
    except jwt.InvalidTokenError:
        return jsonify({"message": "Forbidden"}), 403


if __name__ == '__main__':
    # db.create_all()
    app.run(debug=True)
