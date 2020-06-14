from mongoengine import DoesNotExist
from database.db import db
from slugify import slugify


class Tag(db.Document):
    name = db.StringField(required=True)
    slug = db.StringField(required=True)


def find_tag_by_slug(slug):
    try:
        return Tag.objects(slug=slug).get()
    except DoesNotExist:
        return None


def get_array_tags(tags_name):
    array_tags = []
    for name in tags_name:
        try:
            tag = Tag.objects(name=name).get()
        except DoesNotExist:
            tag = Tag(
                name=name,
                slug=slugify(name)
            )
            tag.save()
        array_tags.append(tag)

    return array_tags
