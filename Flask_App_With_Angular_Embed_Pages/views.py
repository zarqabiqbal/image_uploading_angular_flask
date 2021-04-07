from flask import render_template,request,jsonify
from setting import limiter,UPLOAD_FOLDER,BASE_URL
from extras import encode_image,decode_image
from datetime import datetime
from werkzeug.datastructures import FileStorage
from flask_jwt import jwt_required
import requests,os,json

def index():
    return render_template('index.html')

@limiter.limit("5 per minute")
@jwt_required()
def upload_image():
    try:
        file = request.files["image#upload"]
        image = encode_image(file)
        image_name = str(file.filename)
        image_type = file.content_type
    except:
        return {"error":"given wrong parameter"}
    ioBufferImage = decode_image(image)
    image = FileStorage(ioBufferImage, filename=image_name, content_type=image_type)
    imageNewName=image_name.rsplit('.')
    imageNewName=imageNewName[0]+"."+datetime.now().strftime("%m%d%Y_%H%M%S")+"."+imageNewName[1]
    path = os.path.join(os.path.abspath(UPLOAD_FOLDER),imageNewName)
    image.save(path)
    image.close()
    # return jsonify({})
    return jsonify({'success':'upload successful','image_details':{'name':image_name}})
