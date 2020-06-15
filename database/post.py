from mongoengine import DoesNotExist
from .db import db
from .category import Category, find_category_by_slug
from .tag import Tag, get_array_tags
from models.post_list import build_post_list
from models.post_detail import PostDetail
from slugify import slugify
import datetime


class Post(db.Document):
    title = db.StringField(required=True)
    slug = db.StringField(required=True)
    author = db.StringField(required=True)
    category = db.ReferenceField(Category)
    createdAt = db.DateTimeField(default=datetime.datetime.now(), required=True)
    viewsCount = db.IntField(default=0)
    image = db.StringField(required=True)
    content = db.StringField(required=True)
    tags = db.ListField(db.ReferenceField(Tag))


def get_post_list(limit, offset, sort):
    posts = Post.objects.order_by(sort)[offset:offset + limit]
    count = Post.objects.count()

    return build_post_list(posts, count, limit, offset)


def get_post_list_by_category(category, limit, offset, sort):
    posts = Post.objects(category=category.id).order_by(sort)[offset:offset + limit]
    count = Post.objects(category=category.id).count()

    return build_post_list(posts, count, limit, offset)


def get_post_list_by_tag(tag, limit, offset, sort):
    posts = Post.objects(tags=tag.id).order_by(sort)[offset:offset + limit]
    count = Post.objects(tags=tag.id).count()

    return build_post_list(posts, count, limit, offset)


def get_post_detail(category, post_slug):
    try:
        post = Post.objects(category=category.id, slug=post_slug).get()
        Post.objects(category=category.id, slug=post_slug).update_one(inc__viewsCount=1)
        return PostDetail(post)
    except DoesNotExist:
        return None


def create_post(data):
    category = find_category_by_slug(data['category'])
    tags = get_array_tags(data['tags'])
    post = Post(
        title=data['title'],
        slug=slugify(data['title']),
        author=data['author'],
        category=category,
        image=data['image'],
        content=data['content'],
        tags=tags
    )
    post.save()
    return post.id
