from flask import Flask
from route.openapi import swaggerui_blueprint, SWAGGER_URL
from route.post import posts
from database.db import initialize_db

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb+srv://admin:adminpassword@cluster0-4ubld.mongodb.net/main_db?retryWrites=true&w=majority'
}
db = initialize_db(app)

app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)
app.register_blueprint(posts)


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
