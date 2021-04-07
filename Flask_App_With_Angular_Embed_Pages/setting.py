from flask import Flask
from flask_jwt import JWT
from werkzeug.security import safe_str_cmp
from extras import getLimiter
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from os import path
#storage setting
UPLOAD_FOLDER = './storage'
if not path.exists(UPLOAD_FOLDER) :
    os.mkdir(UPLOAD_FOLDER)

BASE_URL = "http://127.0.0.1:5000"
#app setting
app = Flask(__name__)
CORS(app)
app.secret_key = "hds634r734fhb4rt84i83fs786f7f7yf7sfk3"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///my.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

#limiter setting
limiter = getLimiter(app)

#database setting
db = SQLAlchemy(app)
db.create_all()
class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

#jwt setting
def authenticate(username, password):
    user = UserModel.query.filter(UserModel.username==username).first()
    if user and safe_str_cmp(user.password, password):
        return user

def identity(payload):
    user_id = payload['identity']
    return UserModel.query.get(user_id)
jwt = JWT(app, authenticate, identity)