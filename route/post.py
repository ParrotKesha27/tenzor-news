from flask import Blueprint, request, Response
from database.post import *
from database.category import *
from database.tag import *
import jsonpickle

posts = Blueprint('posts', __name__)


@posts.route('/api/v1/posts')
def get_posts():
    limit = int(request.args.get('limit'))
    offset = int(request.args.get('offset'))
    sort_order = request.args.get('sortOrder')
    sort_direction = request.args.get('sortDirection')

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
        return Response('Category with slug ' + category + ' not found!', 404, content_type='application/json')

    limit = int(request.args.get('limit'))
    offset = int(request.args.get('offset'))
    sort_order = request.args.get('sortOrder')
    sort_direction = request.args.get('sortDirection')

    if sort_direction == 'asc':
        sort_order = '+' + sort_order
    else:
        sort_order = '-' + sort_order

    post_list = get_post_list_by_category(category_doc, limit, offset, sort_order)
    return Response(jsonpickle.encode(post_list, unpicklable=False), 200, content_type='application/json')


@posts.route('/api/v1/posts/tags/<tag>')
def get_posts_by_tag(tag):
    tag_doc = find_tag_by_slug(tag)
    if tag_doc is None:
        return Response('Category with slug ' + tag + ' not found!', 404, content_type='application/json')

    limit = int(request.args.get('limit'))
    offset = int(request.args.get('offset'))
    sort_order = request.args.get('sortOrder')
    sort_direction = request.args.get('sortDirection')

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
        return Response('Category with slug ' + category + ' not found!', 404, content_type='application/json')

    post_detail = get_post_detail(category_doc, post)
    if post_detail is None:
        return Response('Post with slug ' + post + ' not found!', 404, content_type='application/json')
    else:
        return Response(jsonpickle.encode(post_detail, unpicklable=False), 200, content_type='application/json')


@posts.route('/api/v1/posts/new', methods=['POST'])
def new_post():
    request_data = request.get_json(force=True)