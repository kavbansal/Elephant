from app import create_app
from config import ProdConfig

application = create_app(ProdConfig)
if __name__ == "__main__":
    application.run(debug=True)
