from mongoengine import DoesNotExist
from .db import db


class Category(db.Document):
    name = db.StringField(required=True)
    slug = db.StringField(required=True)


def find_category_by_slug(slug):
    try:
        return Category.objects(slug=slug).get()
    except DoesNotExist:
        return None
