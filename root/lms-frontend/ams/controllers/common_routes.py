# ============================= [ START IMPORTS ] =============================

# flask functionalities
from flask import current_app as app
from flask import session

# to handle requests
import requests
from flask import make_response, redirect, send_file

# to handle file operations
from os.path import join as path_join

# to log internal error responses from the API
from ..functions.functions import app_logger

# to restrict with a login
from ..functions.functions import login_required, restrict_access

# ============================== [ END IMPORTS ] ==============================


# ============================== [ START ROUTES ] =============================

@app.route("/static/pp/<pname>", methods = ["GET"])
# @login_required()
def fetchProfilePicture(pname :str):
	img = requests.get(
		"http://127.0.0.1:5000/api/v1/fetch/static/profile_pictures/{}".format(
			pname
		)
	)

	resp = make_response(img.content)
	resp.headers.set('Content-Type', img.headers["Content-Type"])

	return resp

@app.route("/static/ci/<cimg>", methods = ["GET"])
# @login_required()
def fetchBookCoverImage(cimg :str):
	img = requests.get(
		"http://127.0.0.1:5000/api/v1/fetch/static/books_cover_img/{}".format(
			cimg
		)
	)

	resp = make_response(img.content)
	resp.headers.set('Content-Type', img.headers["Content-Type"])

	return resp

@login_required()
@app.route("/book/read/<book_id>", methods = ["GET"])
def getBookContent(book_id :str):
	book_content = requests.get(
		"http://127.0.0.1:5000/api/v1/book/retrive/{}".format(book_id)
		, headers	=	{
			"Authorization" : "Bearer {}".format(
				session["app_user"]["access_token"]
			)
		}
	)

	if book_content.status_code == 200:
		resp = make_response(book_content.content)
		resp.headers.set('Content-Type', book_content.headers["Content-Type"])

		return resp
	else:
		# something went wrong
		app_logger.critical(
			"A {} request has been made to {} with the data, {} and the response JSON is: {}".format(
				"get"
				, "http://127.0.0.1:5000/api/v1/book/retrive/" + book_id
				, None
				, (book_content.json()) if book_content.headers["Content-Type"] == "application/json" else book_content.content
			)
		)
		# reported to the logger

		return redirect("/404")

@app.route("/get-graphs/<gname>", methods = ["GET"])
# @login_required()
def fetchGraphPlots(gname :str = ""):
	return send_file(
		path_join(
			app.root_path
			, app.config["TEMP_GRAPH_IMAGES_FOLDER"]
			, gname
		)
	)

# =============================== [ END ROUTES ] ==============================
