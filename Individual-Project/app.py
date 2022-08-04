from flask import Flask, render_template, request, redirect, url_for, flash
from flask import session as login_session
import pyrebase

config = {
	"apiKey": "AIzaSyA26Nwzp5Jki1SiAn2VTb8Wor0I-7-yfdc",
  	"authDomain": "meet---personal-project.firebaseapp.com",
  	"projectId": "meet---personal-project",
  	"storageBucket": "meet---personal-project.appspot.com",
  	"messagingSenderId": "615262391499",
  	"appId": "1:615262391499:web:e6343b9d443797b6561f4e",
  	"measurementId": "G-K7Q3XE8TDJ", 
	"databaseURL":"https://meet---personal-project-default-rtdb.europe-west1.firebasedatabase.app/"
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

app = Flask(__name__, template_folder='templates', static_folder='static')
app.config['SECRET_KEY'] = 'fsoifj23423@#$388dsjhfsv@#$@#@2849238dfskjfw'

@app.route('/', methods = ['GET', 'POST'])
def signup():
	error = ""
	if request.method == 'POST':
		email = request.form['email']
		password = request.form['password']
		username = request.form['username']
		user = {'username': username, 'email':email}
		try: 
			login_session['user'] = auth.create_user_with_email_and_password(email,password)
			db.child('Users').child(login_session['user']['localId']).set(user)
			return redirect(url_for('index'))
		except:
			error = "Authentication failed"
	return render_template('signup.html', error =error)

@app.route('/signin', methods=['GET', "POST"])
def signin():
	error = ''
	if request.method =='POST':
		email = request.form['email']
		password = request.form['password']
		try:
			login_session['user'] = auth.sign_in_with_email_and_password(email,password)
			return redirect(url_for('index'))
		except:
			error = 'Authentication failed'
	return render_template('signup.html')

@app.route('/index')
def index():
	return render_template('index.html')

@app.route('/react_attack')
def game():
	return render_template('game.html')
if __name__ == '__main__':
	app.run(debug=True)