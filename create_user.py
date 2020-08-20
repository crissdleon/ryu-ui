from sqlalchemy.orm import sessionmaker
from user import User, engine
from werkzeug.security import generate_password_hash

Session = sessionmaker(bind=engine)
session = Session()

if __name__ == "__main__":
    user=User(user="text2",password=generate_password_hash("test2"))
    session.add(user)
    session.commit()


