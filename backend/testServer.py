from flask import Flask, request, jsonify, make_response
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash, generate_password_hash
from flask_cors import CORS
import jwt
import datetime
import bcrypt
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:5174"], supports_credentials=True)
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET', 'your_secret_key')
app.config['JWT_SECRET_KEY'] = os.getenv('ACCESS_TOKEN_SECRET')
jwt = JWTManager(app)

dummy_db = {}

@app.route('/login', methods=['POST'])
def handle_login():
    cookies = request.cookies
    data = request.get_json()
    user = data.get('email')
    pwd = data.get('password')
    
    if not user or not pwd:
        return jsonify({'message': 'Username and password are required.'}), 400
    
    found_user = dummy_db.get(user)
    if not found_user:
        return jsonify({'message': 'Unauthorized'}), 401
    
    if not check_password_hash(found_user['password'], pwd):
        return jsonify({'message': 'Unauthorized'}), 401
    
    roles = found_user.get('roles', [])
    access_token = create_access_token(identity={'email': found_user['email'], 'roles': roles}, expires_delta=False)
    new_refresh_token = create_refresh_token(identity={'email': found_user['email']}, expires_delta=False)
    
    new_refresh_token_array = found_user.get('refreshToken', [])
    if 'jwt' in cookies:
        refresh_token = cookies['jwt']
        found_token = next((user for user in dummy_db.values() if refresh_token in user.get('refreshToken', [])), None)
        if not found_token:
            new_refresh_token_array = []
        
        response = make_response()
        response.delete_cookie('jwt')
    
    found_user['refreshToken'] = new_refresh_token_array + [new_refresh_token]
    
    response = jsonify({'accessToken': access_token, 'roles': roles})
    response.set_cookie('jwt', new_refresh_token, httponly=True, secure=True, samesite='None', max_age=24 * 60 * 60 * 1000)
    return response

@app.route('/register', methods=['POST'])
def handle_new_user():
    data = request.get_json()
    user = data.get('email')
    pwd = data.get('password')
    is_admin = data.get('isAdmin')

    roles = ['admin'] if is_admin else []
    
    if not user or not pwd:
        return jsonify({'message': 'Username and password are required.'}), 400
    
    # check for duplicate usernames in the db
    if user in dummy_db:
        return jsonify({'message': 'Username already exists.'}), 409
    
    try:
        # encrypt the password
        hashed_pwd = generate_password_hash(pwd)
        
        # create and store the new user
        dummy_db[user] = {
            'email': user,
            'password': hashed_pwd,
            'roles': roles
        }
        
        return jsonify({'success': f'New user {user} created!'}), 201
    except Exception as err:
        return jsonify({'message': str(err)}), 500

@app.route('/users', methods=['GET'])
def get_users():
    # return jsonify({"users": list(dummy_db.keys())})
    return jsonify(dummy_db)

@app.route('/refresh', methods=['GET'])
def refresh_token():
    cookies = request.cookies
    if 'jwt' not in cookies:
        return jsonify({'message': 'Unauthorized'}), 401
    
    refresh_token = cookies['jwt']
    response = make_response()
    response.delete_cookie('jwt')
    
    found_user = next((user for user in dummy_db.values() if refresh_token in user.get('refreshToken', [])), None)

    if not found_user:
        try:
            decoded = get_jwt_identity()
            hacked_user = dummy_db.get(decoded['email'])
            if hacked_user:
                hacked_user['refreshToken'] = []
        except:
            print('1')
            return jsonify({'message': 'Forbidden'}), 403
        print('2')
        return jsonify({'message': 'Forbidden'}), 403

    new_refresh_token_array = [rt for rt in found_user['refreshToken'] if rt != refresh_token]
    
    try:
        decoded = get_jwt_identity()
    except:
        found_user['refreshToken'] = new_refresh_token_array
        print('3')
        return jsonify({'message': 'Forbidden'}), 403

    if found_user['email'] != decoded['email']:
        print('4')
        return jsonify({'message': 'Forbidden'}), 403
    
    roles = found_user.get('roles', [])
    access_token = create_access_token(identity={'email': decoded['email'], 'roles': roles}, expires_delta=datetime.timedelta(seconds=20))
    new_refresh_token = create_refresh_token(identity={'email': found_user['email']}, expires_delta=datetime.timedelta(seconds=25))
    
    found_user['refreshToken'] = new_refresh_token_array + [new_refresh_token]
    
    response.set_cookie('jwt', new_refresh_token, httponly=True, secure=True, samesite='None', max_age=24 * 60 * 60 * 1000)
    return jsonify({'accessToken': access_token, 'roles': roles})


if __name__ == '__main__':
    app.run(debug=True)