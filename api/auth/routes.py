from flask import Blueprint


bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/login', methods=['GET', 'POST'])
def login():
    return 'login'


@bp.route('/register', methods=['GET', 'POST'])
def register():
    return 'register'
