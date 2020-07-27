from models.category import Category
from models.tag import Tag


class PostDetail:
    def __init__(self, post):
        self.title = post.title
        self.slug = post.slug
        self.author = post.author
        self.category = Category(post.category)
        self.createdAt = post.createdAt.strftime('%d %B %Y')
        self.viewsCount = post.viewsCount
        self.content = post.content
        self.tags = []
        for tag in post.tags:
            self.tags.append(Tag(tag))
