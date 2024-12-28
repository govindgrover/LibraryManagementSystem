import subprocess

# declaring variables
python_in_envir			=	".lms-env\\Scripts\\python"	# python in our environment
api_application			=	"lms-api/app.py"				# API App
frontend_application	=	"lms-frontend/app.py"			# Frontend App

# start both applications
process1 = subprocess.Popen([python_in_envir, api_application])
process2 = subprocess.Popen([python_in_envir, frontend_application])

# printing info
print("\n\n", "API & Fronted servers has been strated...")
print("Kindly visit, http://localhost:8080, for Project LMS", "\n\n")

# wait for the processes to complete (indefinitely)
process1.wait()
process2.wait()
