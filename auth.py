from user import User
from create_user import session
from werkzeug.security import check_password_hash
import jwt
import datetime
def login(user:str ,password:str): 
    query = session.query(User).filter(User.user==user).first()
    return query and check_password_hash(query.password, password)

        
def generate_token(user):
    return jwt.encode({'user':user,'exp':datetime.datetime.utcnow() + datetime.timedelta(days=1) }, 'KMVX3(j{G1.=rR%gSpq6', algorithm='HS256').decode("utf-8")

def decode_token(token):

    try:         
       return  jwt.decode(token,'KMVX3(j{G1.=rR%gSpq6', algorithm='HS256')
    except:
        return None
        
