from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
)

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests (React frontend)

app.config["JWT_SECRET_KEY"] = "your_secret_key"
jwt = JWTManager(app)

# Dummy user database
users = {"user@example.com": {"password": "password123", "name": "John Doe"}}


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users.get(email)

    if user and user["password"] == password:
        access_token = create_access_token(identity=email)
        refresh_token = create_refresh_token(identity=email)
        return jsonify(access_token=access_token, refresh_token=refresh_token, user={"email": email, "name": user["name"]})

    return jsonify({"message": "Invalid credentials"}), 401


@app.route("/api/me", methods=["GET"])
@jwt_required()
def get_me():
    email = get_jwt_identity()
    user = users.get(email)
    if user:
        return jsonify({"email": email, "name": user["name"]})

    return jsonify({"message": "User not found"}), 404


@app.route("/api/refreshToken", methods=["GET"])
@jwt_required(refresh=True)
def refresh_token():
    email = get_jwt_identity()
    new_access_token = create_access_token(identity=email)
    return jsonify(accessToken=new_access_token)


if __name__ == "__main__":
    app.run(debug=True)
