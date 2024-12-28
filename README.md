# Library Management System (LMS) v1.0


## Table of contents
1. [General Information](#general-information)
2. [Introduction](#introduction)
3. [Technology & Methodology](#technology--methodology)
4. [Application Depenencies](#application-depenencies)
5. [Run Application](#run-application)
    1. [How to Run](#how-to-run)
    2. [Dummy Data Info.](#dummy-data---info)
6. [Features](#features)
    1. [Access Restriction Pattern](#access-restriction-pattern)
    2. [The 10 Analization Plots](#the-10-analization-plots)
7. [References](#references)

## General Information
The project, **Library Management System (LMS) v1.0** is a academic project created by me under the **Bachelors of Science (BS) Data Science and Applications** program of **Indian Institute of Technology Madras (IIT Madras)**. I hope you will find it interesting and you are welcome to make comments so that together we could make something more interesting and effective out of this.

## Introduction
In the digital age, the management of library resources extends beyond mere cataloging to encompass a comprehensive system that manages user interactions, book issues, and data analytics. The project developed has the basic requirements that any library management system aimed at streamlining the process of borrowing books, tracking user activity, and maintaining an extensive database of books and user information have. This system leverages modern web technologies and database management practices to offer robust features such as real-time availability checks, auto-return, and detailed reporting for librarians. The objective was to enhance user experience, improve library operational efficiency, and provide a scalable solution that could adapt to growing educational needs.

## Technology & Methodology
For the backend modeling we have used Flask-Restful APIs which then integrated with the frontend controllers and views through Flask and requests modules.

More precisely, the `lms-api` folder contains all the business logic and model's controllers whereas the `lms-frontend` folder contains majorly the views with the very next controllers of those views for enabling them to have interaction with the business logic layer.

## Application Depenencies
```
Flask==3.0.1
Flask-RESTful==0.3.10
Flask-SQLAlchemy==3.1.1
Flask-JWT-Extended==4.6.0
Flask-Bcrypt==1.0.1
requests==2.31.0
matplotlib==3.8.4
```

_The same has been given in the `root/requirements.txt`_
To install all from the given file, kindly run the command:
`pip install -r requirements.txt` after activating the environment, command to activate `.lms-env\Scripts\activate`.

## Run Application

### How to Run
> [!IMPORTANT]
> Here all the instructions are made with respect to Windows OS. If another is used kindly alter the commandline inputs accordingly.

Simply, open the root folder named in a command prompt using `cd /d /path/to/folder/root` and then create a python virtual environment using the following command, `python -m venv .lms-env` after which you have to install the dependencies as mentioned above [check again](#application-depenencies).

Now, activate the created environment manually in the root folder then, run the following command

```
$ python main.py
```
Just the above will handle both the API service and the frontend functionalities simultaneously.

### Dummy Data - Info.
We have made some dummy data pre-processed into the system and the same has been mentioned below to get glimpse on the first run.

- Logins
  - For _Admin_, use the following
    ```
      E-Mail:    admin@lms.com
      Password:  admin@lms.com
  	```

  - For _Librarian_, use the following
    ```
      E-Mail:    librarian@lms.com
      Password:  librarian@lms.com
  
      E-Mail:    librarian02@lms.com
      Password:  librarian02@lms.com
  	```

  - For _Student_, use the following
    For user, we have 10 accounts from `user01@lms.com` to `user10@lms.com` and the each of them can be accessed as, 

    ```
      E-Mail:    user01@lms.com
      Password:  user01@lms.com
  	```

## Features

### Access Restriction Pattern
Let us now get fammiliar with the operations that could be performed by respective roles.

The **User/Student/Reader**, `role = 2` can browse books, ask to issue them (5 at max), purchase. And each issued book will get expired after 15-days if not returned.

The **Librarian**, `role = 1` can approve/ignore the issue or purchase request of the users, can add and manage book along with its five master attributes. Have access to 10 different data analization plots.

The **Admin**, `role = 0` have access to view list of all users along with the 10 data analization plots and also can manage the books and masters made by other librarians but could not create a new one by its own.

### The 10 Analization Plots
> [!NOTE]
> There may a case when any of the following plots may not be showing up on the dashboard which simply means that there is not enough data to display them.

1. Distribution of books into categories
2. Distribution of books into genre
3. Distribution of books into languages
4. Distribution of books under active publishers
5. Distribution of books under active authors
6. Number of unanswered issue requests
7. Number of requests raised
8. Count (upper) and Sum of costs (lower) of book purchases for each month
9. Top 5 selling books
10. Distribution of readers into gender


## References
- GeekforGeeks & Stack Overflow for pinpointing mistakes made and also some new techniques explored there.
- https://flask.palletsprojects.com/en/3.0.x/
- https://flask-restful.readthedocs.io/en/latest/
- https://jinja.palletsprojects.com/en/3.1.x/
- https://flask-jwt-extended.readthedocs.io/en/3.0.0_release/changing_default_behavior/
- https://stackoverflow.com/questions/41744097/flask-jwt-generates-error-when-debug-false
- https://stackoverflow.com/questions/67704358/how-to-convert-string-bytes-to-a-png-file


---
Made by [Govind Grover](https://github.com/govindgrover)

[Back to top? ](#table-of-contents) 
