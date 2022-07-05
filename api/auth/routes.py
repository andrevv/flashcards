import email
from flask import Blueprint, Response, jsonify, make_response, redirect, request
from flask_login import current_user, login_required, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from .. import db
from api.models import User


bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/login', methods=['POST'])
def login():
    if 'email' not in request.json:
        return jsonify(error='Email is required.')
    if 'password' not in request.json:
        return jsonify(error='Password is required.')

    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify(error='Authentication problem.')

    if not check_password_hash(user.password, password):
        return jsonify(error='Authentication problem.')

    login_user(user, remember=True)

    return jsonify(user=current_user.email)


@bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return redirect('/')


@bp.route('/register', methods=['POST'])
def register():
    if 'email' not in request.json:
        return jsonify(error='Email is required.')
    if 'password' not in request.json:
        return jsonify(error='Password is required.')

    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify(error='Email already exists.')

    new_user = User(email=email, password=generate_password_hash(password))
    db.session.add(new_user)
    db.session.commit()
    login_user(user=new_user, remember=True)

    return Response(status=200)


@bp.route('/user', methods=['GET'])
@login_required
def user():
    return jsonify(email=current_user.email)
