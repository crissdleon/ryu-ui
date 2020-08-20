from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

Base = declarative_base()

engine = create_engine('sqlite:///data.db')

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    user = Column(String)
    password = Column(String)

    def __repr__(self):
        return f'User {self.name}'


Base.metadata.create_all(engine)
