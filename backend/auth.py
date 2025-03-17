from flask import Blueprint, jsonify, request, make_response
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt,
    current_user,
    get_jwt_identity, unset_jwt_cookies, set_access_cookies, set_refresh_cookies
)
# from models import User, TokenBlocklist

auth_bp = Blueprint("auth", __name__)

dummy_db = {
    "users": {"testUser": {"username": "testUser", "email": "test@gmail.com", "password": "test123", "roles": ['admin']}},
    "token_blocklist": set()
}

@auth_bp.post("/register")
def register_user():
    data = request.get_json()

    # user = User.get_user_by_username(username=data.get("username"))
    if data.get("username") in dummy_db["users"]:
        return jsonify({"error": "User already exists"}), 409

    # if user is not None:
    #     return jsonify({"error": "User already exists"}), 409

    roles = ['admin'] if data.get("isAdmin") else []

    dummy_db["users"][data.get("username")] = {
        "username": data.get("username"),
        "email": data.get("email"),
        "password": data.get("password"),  # Store as plain text for simplicity (not recommended in production)
        "roles": roles,
    }

    # new_user = User(username=data.get("username"), email=data.get("email"))

    # new_user.set_password(password=data.get("password"))

    # new_user.save()

    return jsonify({"message": "User created"}), 201


@auth_bp.post("/login")
def login_user():
    data = request.get_json()
    user = dummy_db["users"].get(data.get("username"))
    # user = User.get_user_by_username(username=data.get("username"))   
    print(user)    

    if user and (user["password"] == data.get("password")):
    # if user and (user.check_password(password=data.get("password"))):
        # access_token = create_access_token(identity=user.username)
        # refresh_token = create_refresh_token(identity=user.username)
        roles = user['roles']

        access_token = create_access_token(identity=user["username"])
        refresh_token = create_refresh_token(identity=user["username"])

        response = make_response(jsonify({"username": data.get("username"), "tokens": {"access": access_token, "refresh": refresh_token}, "roles": roles}), 200)
        # response.set_cookie("access_token", access_token, httponly=True, secure=False, samesite="Strict")
        # response.set_cookie("refresh_token", refresh_token, httponly=True, secure=False, samesite="Strict")
        # set_access_cookies(response, access_token) 
        # set_refresh_cookies(response, refresh_token) 
        
        return response

    return jsonify({"error": "Invalid username or password"}), 400

@auth_bp.get("/whoami")
@jwt_required(locations=["headers", "cookies"])
def whoami():
    print(get_jwt())
    return jsonify(
        {
            "message": "message",
            "user_details": {
                # "username": current_user.username,
                # "email": current_user.email,
                "username": current_user["username"],
                "email": current_user["email"],
                "roles": current_user["roles"]
            },
        }
    )


@auth_bp.get("/refresh")
@jwt_required(refresh=True, locations=["headers", "cookies"])
def refresh_access():
    identity = get_jwt_identity()
    new_access_token = create_access_token(identity=identity)
    response = jsonify({"access_token": new_access_token})
    # set_access_cookies(response, new_access_token)

    return response


@auth_bp.get('/logout')
@jwt_required(verify_type=False) 
def logout_user():
    jwt = get_jwt()

    jti = jwt['jti']
    token_type = jwt['type']

    # token_b = TokenBlocklist(jti=jti)
    dummy_db["token_blocklist"].add(jti)

    # token_b.save()
    response = make_response(jsonify({"message": f"{token_type} token revoked successfully"}), 200)
    # unset_jwt_cookies(response)  # Clears JWT cookies

    return response , 200