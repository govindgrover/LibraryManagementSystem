# =============================================================================
# ==================== [ SETUP FOR API LOGGER (ONLY ONCE) ] ===================
# =============================================================================

from ..models.APILogger import APILogger

# setting-up logger
api_logger = APILogger().logger


# +++++++++++++++++++++++++++++++ START IMPORTS +++++++++++++++++++++++++++++++

# importing flask' current app
from flask import current_app as app

# to abort the connection when needed
from flask import abort

# to check JWT data
from flask_jwt_extended import get_jwt

# to create app-specific decorator function(s)
from functools import wraps

# ++++++++++++++++++++++++++++++++ END IMPORTS ++++++++++++++++++++++++++++++++


def role_restriction(allowed_roles : list):
	"""
	Function to allow only `allowed_roles` to proceed and abort(a Flask function) otherwise 
	"""

	def decorator(fn):

		@wraps(fn)
		def wrapper(*args, **kwargs):
			# u = Users()
			current_user_role = get_jwt()["role"] if ("role" in get_jwt()) else None

			if (
				(current_user_role not in allowed_roles)
				and not app.config["TESTING"]				# API-DEBUG
			):
			# if (
			# 	not u.has_permission(permission = permission_)
			# ):
				return abort(403)

			return fn(*args, **kwargs)
		
		return wrapper
	
	return decorator


