from mongoengine import DoesNotExist
from database.db import db


class Tag(db.Document):
    name = db.StringField(required=True)
    slug = db.StringField(required=True)


def find_tag_by_slug(slug):
    try:
        return Tag.objects(slug=slug).get()
    except DoesNotExist:
        return None


def find_tags_by_slug(tags_slug):
    return Tag.objects(slug__in=tags_slug)
