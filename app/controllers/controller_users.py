from pathlib import Path

from flask import Blueprint, jsonify, request, send_from_directory, send_file
from app import mongo
from app.models.models import Student, AbstractUser, Mentor, UserDao, College, CollegeDao, DaoFactory, Appointment, Question, Answer

users_router = Blueprint("user", __name__)
colleges_router = Blueprint("college", __name__)

daoFactory = DaoFactory()
usersColl = mongo.db.users # our users collection in mongodb
mongo_user_dao = daoFactory.getDao('user', usersColl) # initialize a DAO with the collection
collegesColl = mongo.db.colleges
mongo_college_dao = daoFactory.getDao('college', collegesColl)

@users_router.route('/api/userinfo', methods=['POST'])
def add_user():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    isMentor = request.form['isMentor']
    
    # Find a matching user
    matchingUser = mongo_user_dao.findAllMatchingEmail(email)
    
    # If a user already exists upon login, then don't create a new user
    if matchingUser:
        return jsonify(matchingUser[0].toDict()), 200
    
    user = Student(name=name, email=email, password=password, isMentor=isMentor)
    mongo_user_dao.insert(user)
    return jsonify(user.toDict()), 200
        

@users_router.route('/api/userinfo', methods=['PUT'])
def update_user():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    matchingUser = mongo_user_dao.findAllMatchingEmail(email)

    if (isinstance(matchingUser[0], Mentor)):
        user = Mentor(Id=matchingUser[0].Id, name=name, email=email, password=password)
        mongo_user_dao.update(user)
        return jsonify(user.toDict()), 200
    else:
        user = Student(Id=matchingUser[0].Id, name=name, email=email, password=password)
        mongo_user_dao.update(user)
        return jsonify(user.toDict()), 200
    
@users_router.route('/api/userinfo/<Id>', methods=['DELETE'])
def delete_user(Id):
    numDeleted = mongo_user_dao.remove(Id)

    if numDeleted == 1:
        output = {'message': 'deleted'}
    else:
        output = {'message': 'not deleted'}

    return jsonify({'result': output}), 200


@users_router.route('/api/userinfo', methods=['GET'])
def get_all_users():
    # get list of all items using DAO and specifying the tags
    listOfUsers = mongo_user_dao.findAll()

    output = [user.toDict() for user in listOfUsers]
    return jsonify(output), 200

@users_router.route('/api/userinfo/<email>', methods=['GET'])
def get_user_by_email(email):
    # get list of all items using DAO and specifying the tags
    listOfUsers = mongo_user_dao.findAllMatchingEmail(email)

    output = [user.toDict() for user in listOfUsers]
    return jsonify(output), 200



@colleges_router.route('/api/collegeinfo', methods=['POST'])
def add_college():
    name = request.form['name']
    gpa = request.form['gpa']
    
    college = College(name=name, gpa=gpa)
    mongo_college_dao.insert(college)
    return jsonify(college.toDict()), 200
    
@users_router.route('/api/collegeinfo/<Id>', methods=['DELETE'])
def delete_college(Id):
    numDeleted = mongo_college_dao.remove(Id)

    if numDeleted == 1:
        output = {'message': 'deleted'}
    else:
        output = {'message': 'not deleted'}

    return jsonify({'result': output}), 200


@users_router.route('/api/collegeinfo', methods=['GET'])
def get_all_colleges():
    # get list of all items using DAO and specifying the tags
    listOfColleges = mongo_college_dao.findAll()

    output = [college.toDict() for college in listOfColleges]
    return jsonify(output), 200