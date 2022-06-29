from flask import Blueprint, Response, jsonify, request
from flask_login import login_required


bp = Blueprint('settings', __name__, url_prefix='/api/settings')


@bp.route('/', methods=['GET'])
@login_required
def settings():
    return jsonify(message='settings')
