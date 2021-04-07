from setting import app
import views

app.add_url_rule('/','home',views.index)
app.add_url_rule('/upload_image','upload_image',views.upload_image,methods=['POST'])

if __name__ == '__main__':
    app.run(debug=False,use_reloader=True)
