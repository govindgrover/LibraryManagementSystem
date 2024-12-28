# ============================= [ START IMPORTS ] =============================

# flask functionalities
from flask import current_app as app
from flask import session

# to handle requests
from flask import render_template, redirect, url_for

# to restrict with a login and role
from ..functions.functions import login_required, restrict_access

# further functionalities
from ..functions.accessibilty import getBooksDataToBrowse, getBookDetails, getMyLibraryList

# ============================== [ END IMPORTS ] ==============================


# ============================== [ START ROUTES ] =============================

@app.route("/browse", methods = ["GET"])
@login_required()
@restrict_access({2})
def page_browse(is_allowed :int = False):
	if not is_allowed:
		session["is_access_denied"] = True
		return redirect("/access-denied")
	
	return render_template(
		"user_screens/browse_books.html"
		, data_to_browse = getBooksDataToBrowse()
	)

@app.route("/browse/details/<book_id>", methods = ["GET"])
@login_required()
@restrict_access({2})
def view_book_details(book_id = None, is_allowed :bool = False):
	if not is_allowed:
		session["is_access_denied"] = True
		return redirect("/access-denied")

	return render_template(
		"user_screens/view_book_details.html"
		, book_details = getBookDetails(book_id)
	)

@app.route("/mylibrary", methods = ["GET"])
@login_required()
@restrict_access({2})
def view_mylibrary(is_allowed :bool = False):
	if not is_allowed:
		session["is_access_denied"] = True
		return redirect("/access-denied")

	return render_template(
		"user_screens/my_library.html"
		, my_library = getMyLibraryList()
	)

# =============================== [ END ROUTES ] ==============================
