# ============================= [ START IMPORTS ] =============================

# flask functionalities
from flask import current_app as app
from flask import session

# to handle requests
from flask import render_template, redirect

# to restrict with a login
from ..functions.functions import login_required, restrict_access

# further functionalities
from ..functions.accessibilty import getMasterDataToSelect, getDashboardGraphLinks

# ============================== [ END IMPORTS ] ==============================


# ============================== [ START ROUTES ] =============================

@app.route("/lib", methods = ["GET"])
@app.route("/librarian", methods = ["GET"])
@app.route("/admin", methods = ["GET"])
@app.route("/ad", methods = ["GET"])
@login_required()
@restrict_access({0, 1})
def page_dashboard(is_allowed :int = False):
	if not is_allowed:
		session["is_access_denied"] = True
		return redirect("/access-denied")
	
	return render_template(
		"lib_screens/dashboard.html"
		, graph_data = getDashboardGraphLinks()
	)

@app.route("/lib/master/add", methods = ["GET"])
@login_required()
@restrict_access({0, 1})
def page_add_master(is_allowed :int = False):
	if not is_allowed:
		session["is_access_denied"] = True
		return redirect("/access-denied")
	
	return render_template("lib_screens/add_master.html")

@app.route("/lib/master/view", methods = ["GET"])
@app.route("/admin/master/view", methods = ["GET"])
@login_required()
@restrict_access({0, 1})
def page_view_masters(is_allowed :int = False):
	if not is_allowed:
		session["is_access_denied"] = True
		return redirect("/access-denied")
	
	return render_template("lib_screens/view_masters.html")

@app.route("/lib/book/add", methods = ["GET"])
@login_required()
@restrict_access({0, 1})
def page_add_book(is_allowed :int = False):
	if not is_allowed:
		session["is_access_denied"] = True
		return redirect("/access-denied")
	
	return render_template(
		"lib_screens/add_book.html"
		, master_records = getMasterDataToSelect()
	)


@app.route("/lib/book/view", methods = ["GET"])
@app.route("/admin/book/view", methods = ["GET"])
@login_required()
@restrict_access({0, 1})
def page_view_books(is_allowed :int = False):
	if not is_allowed:
		session["is_access_denied"] = True
		return redirect("/access-denied")
	
	return render_template(
		"lib_screens/view_books.html"
	)

@app.route("/lib/manage/requests", methods = ["GET"])
@login_required()
@restrict_access({0, 1})
def page_manage_requests(is_allowed :int = False):
	if not is_allowed:
		session["is_access_denied"] = True
		return redirect("/access-denied")
	
	return render_template(
		"lib_screens/manage_requests.html"
	)

@app.route("/lib/manage/borrows", methods = ["GET"])
@login_required()
@restrict_access({0, 1})
def page_manage_borrows(is_allowed :int = False):
	if not is_allowed:
		session["is_access_denied"] = True
		return redirect("/access-denied")
	
	return render_template(
		"lib_screens/manage_borrow_history.html"
	)

# =============================== [ END ROUTES ] ==============================
