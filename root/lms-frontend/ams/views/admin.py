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

@app.route("/admin/manage/users", methods = ["GET"])
@login_required()
@restrict_access({0})
def page_view_users(is_allowed :int = False):
	if not is_allowed:
		session["is_access_denied"] = True
		return redirect("/access-denied")
	
	return render_template("admin_screens/manage_users.html")

# =============================== [ END ROUTES ] ==============================
