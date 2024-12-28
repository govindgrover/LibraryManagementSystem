# ============================= [ START IMPORTS ] =============================

# flask functionalities
from flask import current_app as app
from flask import session

# to handle requests
from flask import render_template, redirect, url_for

# to restrict with a login
from ..functions.functions import login_required

# ============================== [ END IMPORTS ] ==============================

# ============================== [ START ROUTES ] =============================

@app.route("/", methods = ["GET"])
@login_required()
def page_index():
	return render_template("index.html")

@app.route("/register", methods = ["GET"])
def page_register():
	if (
		session == {}
		or "app_user" not in session
		or "access_token" not in session["app_user"]
		or len(session["app_user"]["access_token"]) <= 0
	):
		return render_template("register.html")
	else:
		return redirect(url_for("page_logout"))


@app.route("/login", methods = ["GET"])
def page_login():
	"""
	Renders the login page which is common for all users given that the user
	is not yet logged in before.
	"""

	if (
		session == {}
		or "app_user" not in session
		or "access_token" not in session["app_user"]
		or len(session["app_user"]["access_token"]) <= 0
	):
		return render_template("login.html")
	else:
		return redirect(url_for("page_logout"))


@app.route("/logout", methods = ["GET"])
@login_required()
def page_logout():
	"""
	Renders the logout page which is common for all users given that the user
	is logged in before.
	"""

	return render_template("logout.html")


@app.route("/myaccount", methods = ["GET"])
@login_required()
def page_myaccount():
	return render_template("my_account.html")


@app.route("/access-denied", methods = ["GET"])
def page_access_denied():
	if "is_access_denied" in session and session["is_access_denied"]:
		return render_template("access_denied.html")
	
	return redirect("/home")

@app.route("/404", methods = ["GET"])
def page_404():
	return render_template("404.html")


# =============================== [ END ROUTES ] ==============================
