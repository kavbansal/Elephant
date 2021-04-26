from abc import ABC, abstractmethod
from enum import IntFlag
from pathlib import Path
from bson.objectid import ObjectId
from app.mongo_inst import mongo

class DaoFactory():
    """Factory for generating DAOs
    """
    def getDao(self, obj, args):
        """Instantiate a type of DAO and return it

        Arguments:
            obj {str} -- String denoting the DAO requested
            args {collection} -- the collection needed for the DAO to instantiate

        Returns:
            DatabaseObject -- gives the requested DAO type
        """
        if obj == 'user':
            return UserDao(args)
        elif obj == 'college':
            return CollegeDao(args)
        elif obj == 'appointment':
            return AppointmentDao(args)
        else:
            return None


class DatabaseObject(ABC):
    """
        Interface that defines important methods for DAOs to implement. Cannot
        be instantiated.
    """

    def __init__(self, collection):
        self.collection = collection

    @abstractmethod
    def findById(self):
        """
            Get an object by id from self.collection.
        """

        pass

    @abstractmethod
    def insert(self):
        """
            Add an object to self.collection.
        """
        pass

    @abstractmethod
    def update(self):
        """
            Update object in self.collection.
        """
        pass

    @abstractmethod
    def remove(self):
        """
            Remove object from self.collection.
        """
        pass

# <<Interface>> AbstractUser
#      ^          ^
#     User       Admin

class UserDao(DatabaseObject):
    """
        DAO converts user information from results given from MongoDB queries to
        their corresponding class representation.
    """

    def __init__(self, collection):
        """
            Initialize DAO

            Args:
                collection: the DB to access
        """
        super().__init__(collection)

        # Register the location attribute for documents in mongo to be used as a
        # geospatial index for querying
        self.collection.create_index([('location', '2dsphere' )])

    def findById(self, Id):
        """
            Find user by Id in self.collection

            Args:
                Id: the id of the user to find

            Retuns:
                an AbstractUser instance
        """

        # Get the item from our mongodb collection
        userDoc = self.collection.find_one({"_id": ObjectId(Id)})

        # Serialize it into an User object
        newUser = Student.fromDict(userDoc)

        if (userDoc['isMentor']):
            return Mentor.fromDict(userDoc)
        else:
            return Student.fromDict(userDoc)
        # return [User.fromDict(userDoc) for userDoc in filteredUsers]

    def findAllMatchingEmail(self, email):
        """
            Get all users with matching emails in self.collection.

            Args:
                email: the email to filter by

            Returns:
                list of AbstractUser instances
        """

        filteredUsers = self.collection.find({
            'email' : email
        })

        output = []
        # Serialize documents into Item objects and return them in a list
        for userDoc in filteredUsers:
            if (userDoc['isMentor']):
                output.append(Mentor.fromDict(userDoc))
            else:
                output.append(Student.fromDict(userDoc))
        return output

    def findAll(self):
        """
            Get all users in self.collection.

            Returns:
                a list of AbstractUsers
        """

        # Mongo query to get the items that have the specified tags from our
        # mongodb collection
        filteredUsers = self.collection.find()

        output = []
        # Serialize documents into Item objects and return them in a list
        for userDoc in filteredUsers:
            if (userDoc['isMentor']):
                output.append(Mentor.fromDict(userDoc))
            else:
                output.append(Student.fromDict(userDoc))
        return output
    
    def findAllMentors(self):
        """
            Get all users in self.collection.

            Returns:
                a list of AbstractUsers
        """

        # Mongo query to get the items that have the specified tags from our
        # mongodb collection
        filteredUsers = self.collection.find()

        output = []
        # Serialize documents into Item objects and return them in a list
        for userDoc in filteredUsers:
            if (userDoc['isMentor']):
                output.append(Mentor.fromDict(userDoc))
        return output


    def insert(self, user):
        """
            Add an User to self.collection

            Args:
                user: the user that is being inserted
        """
        data = user.toDict() # Get item info formatted in a JSON friendly manner
        data.pop('id') # Remove the id field

        # Insert the user into our mongodb collection,
        # get the ID it was assigned, give the user that id
        user_id = self.collection.insert_one(data).inserted_id
        new_user = self.collection.find_one({'_id': user_id})
        user.Id = str(new_user['_id'])

    def update(self, user):
        """
            Update a users information in self.collection.

            Args:
                user: the user that is being updated
        """

        Id = user.Id
        data = user.toDict() # Get item info formatted in a JSON friendly manner
        data.pop('id') # remove the id, shouldn't be updating it

        # find the item in our mongodb collection by its id,
        # update it with the new data
        self.collection.find_one_and_update({'_id': ObjectId(Id)}, {
            "$set": data
        }, upsert=False)


    def remove(self, Id):
        """
            Remove a User from self.collection by its id.

            Args:
                Id: the id of the listing to remove

            Returns:
                The number of users deleted
        """

        # Delete the item frmo our mongodb collection by its id
        returned = self.collection.delete_one({'_id': ObjectId(Id)})
        return returned.deleted_count

class CollegeDao(DatabaseObject):
    """
        DAO converts college information from results given from MongoDB queries to
        their corresponding class representation.
    """

    def __init__(self, collection):
        """
            Initialize DAO

            Args:
                collection: the DB to access
        """
        super().__init__(collection)

        # Register the location attribute for documents in mongo to be used as a
        # geospatial index for querying
        self.collection.create_index([('location', '2dsphere' )])

    def findById(self, Id):
        """
            Find college by Id in self.collection

            Args:
                Id: the id of the user to find

            Retuns:
                a college instance
        """

        # Get the item from our mongodb collection
        collegeDoc = self.collection.find_one({"_id": ObjectId(Id)})

        # Serialize it into an User object
        newCollege = College.fromDict(collegeDoc)

        return newCollege

    def findAll(self):
        """
            Get all colleges in self.collection.

            Returns:
                a list of Colleges
        """

        # Mongo query to get the items that have the specified tags from our
        # mongodb collection
        filteredColleges = self.collection.find()

        output = []
        # Serialize documents into Item objects and return them in a list
        for collegeDoc in filteredColleges:
            output.append(College.fromDict(collegeDoc))
        return output

    def insert(self, college):
        """
            Add a College to self.collection

            Args:
                college: the college that is being inserted
        """
        data = college.toDict() # Get item info formatted in a JSON friendly manner
        data.pop('id') # Remove the id field

        # Insert the user into our mongodb collection,
        # get the ID it was assigned, give the user that id
        college_id = self.collection.insert_one(data).inserted_id
        new_college = self.collection.find_one({'_id': college_id})
        college.Id = str(new_college['_id'])

    def update(self, college):
        """
            Update a users information in self.collection.

            Args:
                college: the college that is being updated
        """

        Id = college.Id
        data = college.toDict() # Get item info formatted in a JSON friendly manner
        data.pop('id') # remove the id, shouldn't be updating it

        # find the item in our mongodb collection by its id,
        # update it with the new data
        self.collection.find_one_and_update({'_id': ObjectId(Id)}, {
            "$set": data
        }, upsert=False)


    def remove(self, Id):
        """
            Remove a College from self.collection by its id.

            Args:
                Id: the id of the listing to remove

            Returns:
                The number of users deleted
        """

        # Delete the item frmo our mongodb collection by its id
        returned = self.collection.delete_one({'_id': ObjectId(Id)})
        return returned.deleted_count

class AppointmentDao(DatabaseObject):
    """
        DAO converts college information from results given from MongoDB queries to
        their corresponding class representation.
    """

    def __init__(self, collection):
        """
            Initialize DAO

            Args:
                collection: the DB to access
        """
        super().__init__(collection)

        # Register the location attribute for documents in mongo to be used as a
        # geospatial index for querying
        self.collection.create_index([('location', '2dsphere' )])

    def findById(self, Id):
        """
            Find college by Id in self.collection

            Args:
                Id: the id of the user to find

            Retuns:
                a college instance
        """

        # Get the item from our mongodb collection
        appointmentDoc = self.collection.find_one({"_id": ObjectId(Id)})

        # Serialize it into an User object
        newAppointment = Appointment.fromDict(appointmentDoc)

        return newAppointment

    def findAll(self):
        """
            Get all appointments in self.collection.

            Returns:
                a list of Appointments
        """

        # Mongo query to get the items that have the specified tags from our
        # mongodb collection
        filteredAppointments = self.collection.find()

        output = []
        # Serialize documents into Item objects and return them in a list
        for appointmentDoc in filteredAppointments:
            output.append(Appointment.fromDict(appointmentDoc))
        return output
    
    def findAllMatchingUserId(self, userId):
        """
            Get all appointments with matching users in self.collection.

            Args:
                userId: the userId to filter by

            Returns:
                list of Appointment instances
        """

        filteredMentorAppointments = self.collection.find({
            'mentorId' : userId
        })

        filteredStudentAppointments = self.collection.find({
            'studentId' : userId
        })

        output = []
        # Serialize documents into Item objects and return them in a list
        for userDoc in filteredMentorAppointments:
            output.append(Appointment.fromDict(userDoc))
        for userDoc in filteredStudentAppointments:
            output.append(Appointment.fromDict(userDoc))
        return output

    def insert(self, appointment):
        """
            Add a Appointment to self.collection

            Args:
                appointment: the appointment that is being inserted
        """
        data = appointment.toDict() # Get item info formatted in a JSON friendly manner
        data.pop('id') # Remove the id field

        # Insert the user into our mongodb collection,
        # get the ID it was assigned, give the user that id
        appointment_id = self.collection.insert_one(data).inserted_id
        new_appointment = self.collection.find_one({'_id': appointment_id})
        appointment.Id = str(new_appointment['_id'])

    def update(self, appointment):
        """
            Update a users information in self.collection.

            Args:
                appointment: the appointment that is being updated
        """

        Id = appointment.Id
        data = appointment.toDict() # Get item info formatted in a JSON friendly manner
        data.pop('id') # remove the id, shouldn't be updating it

        # find the item in our mongodb collection by its id,
        # update it with the new data
        self.collection.find_one_and_update({'_id': ObjectId(Id)}, {
            "$set": data
        }, upsert=False)


    def remove(self, Id):
        """
            Remove a Appointment from self.collection by its id.

            Args:
                Id: the id of the listing to remove

            Returns:
                The number of users deleted
        """

        # Delete the item frmo our mongodb collection by its id
        returned = self.collection.delete_one({'_id': ObjectId(Id)})
        return returned.deleted_count

class AbstractUser(ABC):
    """
        An abstract class representing what a basic user should be able to do.
        Should not be instantiated.
    """
    def __init__(self, Id=None, name=None, email=None, password=None, isMentor=None):
        """
            Initialize self.

            Args:
                Id: the id of self
                name: the name of self
                email: the email of self
                password: the user password
                isMentor: true if user is a mentor
        """
        self.Id = Id
        self.name = name                # Should be a string
        self.email = email              # Should be a string
        self.password = password
        self.isMentor = isMentor

    @classmethod
    def fromDict(cls, doc):
        """
            Creates an Abstract User instance from a dictioanry

            Args:
                doc: the dictionary to convert

            Returns:
                a AbstractUser instance
        """
        abstractUser = cls()
        abstractUser.Id = str(doc['_id'])
        abstractUser.name = doc['name']
        abstractUser.email = doc['email']
        abstractUser.password = doc['password']
        abstractUser.isMentor = doc['isMentor']
        return abstractUser

    @abstractmethod
    def toDict(self):
        """
            Convert self to a dictionary.
        """

        # current instance (self) and converts to dictionary
        pass

    @property
    def Id(self):
        return self.__Id

    @Id.setter
    def Id(self, Id):
        self.__Id = Id

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, name):
        self.__name = name

    @property
    def email(self):
        return self.__email

    @email.setter
    def email(self, email):
        self.__email = email

    @property
    def password(self):
        return self.__password

    @password.setter
    def password(self, password):
        self.__password = password

    @property
    def isMentor(self):
        return self.__isMentor

    @isMentor.setter
    def isMentor(self, isMentor):
        self.__isMentor = isMentor

    def __eq__(self, otherUser):
        if self.Id != otherUser.Id:
            return False
        if self.name != otherUser.name:
            return False
        if self.email != otherUser.email:
            return False
        if self.password != otherUser.password:
            return False
        if self.isMentor != otherUser.isMentor:
            return False
        return True

    def __str__(self):
        return self.name + ': ' + self.email

    def __repr__(self):
        return str(self)


class Student(AbstractUser):

    def __init__(self, Id=None, name=None, email=None, password=None, isMentor=None):
        super().__init__(Id, name, email, password, isMentor)

    @classmethod
    def fromDict(cls, doc):
        student = cls()
        student.Id = str(doc['_id'])
        student.name = doc['name']
        student.email = doc['email']
        student.password = doc['password']
        student.isMentor = doc['isMentor']

        return student

    # when convert to dict, set isAdmin to false
    def toDict(self):
        output = {
            'id'            : self.Id,
            'name'          : self.name,
            'email'         : self.email,
            'password'      : self.password,
            'isMentor'       : False
        }
        return output


class Mentor(AbstractUser):
    def __init__(self, Id=None, name=None, email=None, password=None, isMentor=None):
        super().__init__(Id, name, email, password, isMentor)

    @classmethod
    def fromDict(cls, doc):
        mentor = cls()
        mentor.Id = str(doc['_id'])
        mentor.name = doc['name']
        mentor.email = doc['email']
        mentor.password = doc['password']
        mentor.isMentor = doc['isMentor']
        # mentor.schoolId = str(doc['_schoolId'])

        return mentor

    # when convert to dict, set isAdmin to true
    def toDict(self):
        output = {
            'id'            : self.Id,
            'name'          : self.name,
            'email'         : self.email,
            'password'      : self.password,
            # 'schoolId'      : self.schoolId,
            'isMentor'       : True

        }
        return output

class College(ABC):

    def __init__(self, Id=None, name=None, gpa=None, image=None):
        """
            Initialize self.

            Args:
                Id: the id of self
                name: the name of self
                gpa: the avg gpa of self
                image: picture of the college
        """
        self.Id = Id
        self.name = name                # Should be a string
        self.gpa = gpa              # Should be a float/double
        self.image = image

    @classmethod
    def fromDict(cls, doc):
        college = cls()
        college.Id = str(doc['_id'])
        college.name = doc['name']
        college.gpa = doc['gpa']
        college.image = doc['image']
        return college

    # when convert to dict, set isAdmin to false
    def toDict(self):
        output = {
            'id'            : self.Id,
            'name'          : self.name,
            'gpa'           : self.gpa,
            'image'           : self.image,
        }
        return output

    @property
    def Id(self):
        return self.__Id

    @Id.setter
    def Id(self, Id):
        self.__Id = Id

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, name):
        self.__name = name

    @property
    def gpa(self):
        return self.__gpa

    @gpa.setter
    def gpa(self, gpa):
        self.__gpa = gpa

    @property
    def image(self):
        return self.__image

    @image.setter
    def image(self, image):
        self.__image = image

    def __eq__(self, otherUser):
        if self.Id != otherUser.Id:
            return False
        if self.name != otherUser.name:
            return False
        if self.gpa != otherUser.gpa:
            return False
        if self.image != otherUser.image:
            return False
        return True

    def __str__(self):
        return self.name + ': ' + self.gpa

    def __repr__(self):
        return str(self)

class Appointment(ABC):
    def __init__(self, Id=None, studentId=None, mentorId=None, dateTime = None, sessionType=None):
        """
            Initialize self.

            Args:
                Id: the id of self
                name: the name of self
                gpa: the avg gpa of self
        """
        self.Id = Id
        self.studentId = studentId
        self.mentor = mentorId
        self.dateTime = dateTime
        self.sessionType = sessionType

    @classmethod
    def fromDict(cls, doc):
        appointment = cls()
        appointment.Id = str(doc['_id'])
        appointment.studentId = doc['studentId']
        appointment.mentorId = doc['mentorId']
        appointment.dateTime = doc['dateTime']
        appointment.sessionType = doc['sessionType']
        return appointment

    def toDict(self):
        output = {
            'id'            : self.Id,
            'studentId'       : self.studentId,
            'mentorId'        : self.mentorId,
            'dateTime'      : self.dateTime,
            'sessionType'      : self.sessionType,
        }
        return output

    @property
    def Id(self):
        return self.__Id

    @Id.setter
    def Id(self, Id):
        self.__Id = Id

    @property
    def studentId(self):
        return self.__studentId

    @studentId.setter
    def studentId(self, studentId):
        self.__studentId = studentId

    @property
    def mentorId(self):
        return self.__mentorId

    @mentorId.setter
    def mentor(self, mentorId):
        self.__mentorId = mentorId

    @property
    def dateTime(self):
        return self.__dateTime

    @dateTime.setter
    def dateTime(self, dateTime):
        self.__dateTime = dateTime

    @property
    def sessionType(self):
        return self.__sessionType

    @sessionType.setter
    def sessionType(self, sessionType):
        self.__sessionType = sessionType

    def __eq__(self, otherUser):
        if self.Id != otherUser.Id:
            return False
        if self.student != otherUser.student:
            return False
        if self.mentor != otherUser.mentor:
            return False
        if self.dateTime != otherUser.dateTime:
            return False
        if self.sessionType != otherUser.sessionType:
            return False
        return True

    def __str__(self):
        return self.studentId + ': ' + self.mentorId + ': ' + self.dateTime

    def __repr__(self):
        return str(self)


class Question(ABC):
    def __init__(self, Id=None, schoolId=None, poster=None, body=None, likes=None):
        """
            Initialize self.

            Args:
                Id: the id of self
                name: the name of self
                gpa: the avg gpa of self
        """
        self.Id = Id
        self.schoolId = schoolId
        self.poster = poster
        self.body = body
        self.likes = likes

    @classmethod
    def fromDict(cls, doc):
        question = cls()
        question.Id = str(doc['_id'])
        question.schoolId = str(doc['schoolId'])
        question.poster = doc['poster']
        question.body = doc['body']
        question.likes = doc['likes']
        return question

    def toDict(self):
        output = {
            'id'            : self.Id,
            'schoolId'      : self.schoolId,
            'poster'        : self.poster,
            'body'          : self.body,
            'likes'         : self.likes,
        }
        return output

    @property
    def Id(self):
        return self.__Id

    @Id.setter
    def Id(self, Id):
        self.__Id = Id

    @property
    def schoolId(self):
        return self.__schoolId

    @schoolId.setter
    def schoolId(self, schoolId):
        self.__schoolId = schoolId

    @property
    def poster(self):
        return self.__poster

    @poster.setter
    def poster(self, poster):
        self.__poster = poster

    @property
    def body(self):
        return self.__body

    @body.setter
    def body(self, body):
        self.__body = body

    @property
    def likes(self):
        return self.__likes

    @likes.setter
    def likes(self, likes):
        self.__likes = likes

    def __eq__(self, otherUser):
        if self.Id != otherUser.Id:
            return False
        if self.schoolId != otherUser.schoolId:
            return False
        if self.poster != otherUser.poster:
            return False
        return True

    def __str__(self):
        return self.poster + ': ' + self.body

    def __repr__(self):
        return str(self)

class Answer(ABC):
    def __init__(self, Id=None, questionId=None, schoolId=None, poster=None, body=None, likes=None):
        """
            Initialize self.

            Args:
                Id: the id of self
                name: the name of self
                gpa: the avg gpa of self
        """
        self.Id = Id
        self.questionId = questionId
        self.schoolId = schoolId
        self.poster = poster
        self.body = body
        self.likes = likes

    @classmethod
    def fromDict(cls, doc):
        answer = cls()
        answer.Id = str(doc['_id'])
        answer.questionId = str(doc['questionId'])
        answer.schoolId = str(doc['schoolId'])
        answer.poster = doc['poster']
        answer.body = doc['body']
        answer.likes = doc['likes']
        return answer

    def toDict(self):
        output = {
            'id'            : self.Id,
            'questionId'    : self.questionId,
            'schoolId'      : self.schoolId,
            'poster'        : self.poster,
            'body'          : self.body,
            'likes'         : self.likes,
        }
        return output

    @property
    def Id(self):
        return self.__Id

    @Id.setter
    def Id(self, Id):
        self.__Id = Id

    @property
    def schoolId(self):
        return self.__schoolId

    @schoolId.setter
    def schoolId(self, schoolId):
        self.__schoolId = schoolId

    @property
    def poster(self):
        return self.__poster

    @poster.setter
    def poster(self, poster):
        self.__poster = poster

    @property
    def body(self):
        return self.__body

    @body.setter
    def body(self, body):
        self.__body = body

    @property
    def likes(self):
        return self.__likes

    @likes.setter
    def likes(self, likes):
        self.__likes = likes

    def __eq__(self, otherUser):
        if self.Id != otherUser.Id:
            return False
        if self.schoolId != otherUser.schoolId:
            return False
        if self.poster != otherUser.poster:
            return False
        return True

    def __str__(self):
        return self.poster + ': ' + self.body

    def __repr__(self):
        return str(self)
