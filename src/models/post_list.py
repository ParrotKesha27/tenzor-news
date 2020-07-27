from .post_preview import PostPreview


class PostList:
    def __init__(self, items, has_more):
        self.items = items
        self.hasMore = has_more


def build_post_list(posts, count, limit, offset):
    array_post = []
    for post in posts:
        array_post.append(PostPreview(post))

    has_more = offset + limit < count

    return PostList(array_post, has_more)
