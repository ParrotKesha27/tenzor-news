from flask_swagger_ui import get_swaggerui_blueprint

SWAGGER_URL = '/api/docs'
OPENAPI_PATH = '/static/openapi.yaml'
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    OPENAPI_PATH,
    config={
        'app_name': "Tenzor-news"
    }
)
