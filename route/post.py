from flask import Blueprint, request, Response
from database.post import *
from database.category import *
from database.tag import *
import jsonpickle
from models.error import Error

posts = Blueprint('posts', __name__)


@posts.route('/api/v1/posts')
def get_posts():
    limit = int(request.args.get('limit'))
    offset = int(request.args.get('offset'))
    sort_order = request.args.get('sortOrder')
    sort_direction = request.args.get('sortDirection')

    if limit <= 0:
        error = Error('Limit must be greater than 0')
        return Response(jsonpickle.encode(error, unpicklable=False), 400, content_type='application/json')

    if offset < 0:
        error = Error('Offset must be greater or equal than 0')
        return Response(jsonpickle.encode(error, unpicklable=False), 400, content_type='application/json')

    if sort_direction == 'asc':
        sort_order = '+' + sort_order
    else:
        sort_order = '-' + sort_order

    post_list = get_post_list(limit, offset, sort_order)
    return Response(jsonpickle.encode(post_list, unpicklable=False), 200, content_type='application/json')


@posts.route('/api/v1/posts/<category>')
def get_posts_by_category(category):
    category_doc = find_category_by_slug(category)
    if category_doc is None:
        error = Error('Category with slug {} not found!'.format(category))
        return Response(jsonpickle.encode(error, unpicklable=False), 404, content_type='application/json')

    limit = int(request.args.get('limit'))
    offset = int(request.args.get('offset'))
    sort_order = request.args.get('sortOrder')
    sort_direction = request.args.get('sortDirection')

    if limit <= 0:
        error = Error('Limit must be greater than 0')
        return Response(jsonpickle.encode(error, unpicklable=False), 400, content_type='application/json')

    if offset < 0:
        error = Error('Offset must be greater or equal than 0')
        return Response(jsonpickle.encode(error, unpicklable=False), 400, content_type='application/json')

    if sort_direction == 'asc':
        sort_order = '+' + sort_order
    elif sort_direction == 'desc':
        sort_order = '-' + sort_order
    else:
        error = Error('Sort direction must be equal "asc" or "desc"')
        return Response(jsonpickle.encode(error, unpicklable=False), 400, content_type='application/json')

    post_list = get_post_list_by_category(category_doc, limit, offset, sort_order)
    return Response(jsonpickle.encode(post_list, unpicklable=False), 200, content_type='application/json')


@posts.route('/api/v1/posts/tags/<tag>')
def get_posts_by_tag(tag):
    tag_doc = find_tag_by_slug(tag)
    if tag_doc is None:
        error = Error('Tag with slug {} not found!'.format(tag))
        return Response(jsonpickle.encode(error, unpicklable=False), 404, content_type='application/json')

    limit = int(request.args.get('limit'))
    offset = int(request.args.get('offset'))
    sort_order = request.args.get('sortOrder')
    sort_direction = request.args.get('sortDirection')

    if limit <= 0:
        error = Error('Limit must be greater than 0')
        return Response(jsonpickle.encode(error, unpicklable=False), 400, content_type='application/json')

    if offset < 0:
        error = Error('Offset must be greater or equal than 0')
        return Response(jsonpickle.encode(error, unpicklable=False), 400, content_type='application/json')

    if sort_direction == 'asc':
        sort_order = '+' + sort_order
    else:
        sort_order = '-' + sort_order

    post_list = get_post_list_by_tag(tag_doc, limit, offset, sort_order)
    return Response(jsonpickle.encode(post_list, unpicklable=False), 200, content_type='application/json')


@posts.route('/api/v1/posts/<category>/<post>')
def get_detail_post(category, post):
    category_doc = find_category_by_slug(category)
    if category_doc is None:
        error = Error('Category with slug {} not found!'.format(category))
        return Response(jsonpickle.encode(error, unpicklable=False), 404, content_type='application/json')

    post_detail = get_post_detail(category_doc, post)
    if post_detail is None:
        error = Error('Post with slug {} not found!'.format(post))
        return Response(jsonpickle.encode(error, unpicklable=False), 404, content_type='application/json')
    else:
        return Response(jsonpickle.encode(post_detail, unpicklable=False), 200, content_type='application/json')


@posts.route('/api/v1/posts/new', methods=['POST'])
def new_post():
    request_data = request.get_json(force=True)
    post_id = create_post(request_data)
    return Response(str(post_id), 200, content_type='application/json')
