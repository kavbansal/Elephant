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

class AbstractUser(ABC):
    """
        An abstract class representing what a basic user should be able to do.
        Should not be instantiated.
    """
    def __init__(self, Id=None, name=None, email=None, password=None):
        """
            Initialize self.

            Args:
                Id: the id of self
                name: the name of self
                email: the email of self
                password: the user password
        """
        self.Id = Id
        self.name = name                # Should be a string
        self.email = email              # Should be a string
        self.password = password

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

    def __eq__(self, otherUser):
        if self.Id != otherUser.Id:
            return False
        if self.name != otherUser.name:
            return False
        if self.email != otherUser.email:
            return False
        if self.password != otherUser.password:
            return False
        return True

    def __str__(self):
        return self.name + ': ' + self.email

    def __repr__(self):
        return str(self)


class Student(AbstractUser):

    def __init__(self, Id=None, name=None, email=None, password=None):
        super().__init__(Id, name, email, password)

    @classmethod
    def fromDict(cls, doc):
        student = cls()
        student.Id = str(doc['_id'])
        student.name = doc['name']
        student.email = doc['email']
        student.password = doc['password']

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
    def __init__(self, Id=None, name=None, email=None, password=None):
        super().__init__(Id, name, email, password)

    @classmethod
    def fromDict(cls, doc):
        mentor = cls()
        mentor.Id = str(doc['_id'])
        mentor.name = doc['name']
        mentor.email = doc['email']
        mentor.password = doc['password']
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

    def __init__(self, Id=None, name=None, gpa=None):
        """
            Initialize self.

            Args:
                Id: the id of self
                name: the name of self
                gpa: the avg gpa of self
        """
        self.Id = Id
        self.name = name                # Should be a string
        self.gpa = gpa              # Should be a float/double

    @classmethod
    def fromDict(cls, doc):
        college = cls()
        college.Id = str(doc['_id'])
        college.name = doc['name']
        college.gpa = doc['gpa']
        return college

    # when convert to dict, set isAdmin to false
    def toDict(self):
        output = {
            'id'            : self.Id,
            'name'          : self.name,
            'gpa'           : self.gpa,
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

    def __eq__(self, otherUser):
        if self.Id != otherUser.Id:
            return False
        if self.name != otherUser.name:
            return False
        if self.gpa != otherUser.gpa:
            return False
        return True

    def __str__(self):
        return self.name + ': ' + self.gpa

    def __repr__(self):
        return str(self)
