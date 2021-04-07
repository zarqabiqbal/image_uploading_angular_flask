from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import base64
from io import BytesIO



def getLimiter(app):
    limiter = Limiter(
        app,
        key_func = get_remote_address
    )
    return limiter

def encode_image(file):
    data=file.read()
    return base64.b64encode(data)

def decode_image(data):
    decodeImage = base64.b64decode(data)
    ioBufferImage = BytesIO(decodeImage)
    return ioBufferImage