
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

# Initialize Flask app
app = Flask(__name__)

# MongoDB configuration (replace 'test' with your database name if needed)
app.config['MONGO_URI'] = "mongodb://localhost:27017/mydatabase"

mongo = PyMongo(app)

# Access the MongoDB collection

# Route to insert a new document into the collection
@app.route('/add', methods=['POST'])
def add_document():
    # Get data from request (e.g., JSON format)
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Insert data into MongoDB collection
    mongo.db.users.insert_one(data)
    return jsonify({"message": "Document inserted successfully!"}), 201



if __name__ == '__main__':
    app.run(debug=True)
