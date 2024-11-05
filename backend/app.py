from flask import Flask, jsonify, request, session
from flask_pymongo import PyMongo
from flask_cors import CORS
import bcrypt

app = Flask(__name__)

# Configure CORS to allow cookies for session management
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# Configure session secret key for Flask sessions
app.config['SECRET_KEY'] = 'Information*06'
app.config['MONGO_URI'] = "mongodb://localhost:27017/mydatabase"
app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # Allow cross-origin cookies
app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production with HTTPS

# MongoDB setup
mongo = PyMongo(app)

# Helper function to check if user is logged in
def is_logged_in():
    return 'user' in session



@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Home"}), 200

# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    existing_user = mongo.db.users.find_one({"email": data["email"]})
    if existing_user:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt())
    mongo.db.users.insert_one({
        "firstName": data["firstName"],
        "lastName": data["lastName"],
        "email": data["email"],
        "password": hashed_password.decode('utf-8')
    })
    session['user'] = data["email"]
    return jsonify({"message": "User registered successfully!"}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    user = mongo.db.users.find_one({"email": data["email"]})
    if user and bcrypt.checkpw(data["password"].encode('utf-8'), user["password"].encode('utf-8')):
        session['user'] = user["email"]  # Store user email in session 
        print(f"Session after login: {session}")  # Debug print
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# Protected dummy route
@app.route('/dummy', methods=['GET'])
def dummy():
    # print(f"Session contents: {session}")  # Debug print for session contents
    if True:
        return jsonify({"message": f"Welcome to the protected page,"}), 200
    else:
        return jsonify({"error": "Unauthorized access"}), 401

# Logout route
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({"message": "Logged out successfully!"}), 200 



if __name__ == '__main__':
    app.run(debug=True)
