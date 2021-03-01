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
        newUser = User.fromDict(UserDoc)

        if (userDoc['isAdmin']):
            return Admin.fromDict(userDoc)
        else:
            return User.fromDict(userDoc)
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
            if (userDoc['isAdmin']):
                output.append(Admin.fromDict(userDoc))
            else:
                output.append(User.fromDict(userDoc))
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
            if (userDoc['isAdmin']):
                output.append(Admin.fromDict(userDoc))
            else:
                output.append(User.fromDict(userDoc))
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

class AbstractUser(ABC):
    """
        An abstract class representing what a basic user should be able to do.
        Should not be instantiated.
    """
    def __init__(self, Id=None, name=None, email=None):
        """
            Initialize self.

            Args:
                Id: the id of self
                name: the name of self
                email: the email of self
        """
        self.Id = Id
        self.name = name                # Should be a string
        self.email = email              # Should be a string

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

    def __eq__(self, otherUser):
        if self.Id != otherUser.Id:
            return False
        if self.name != otherUser.name:
            return False
        if self.email != otherUser.email:
            return False
        return True

    def __str__(self):
        return self.name + ': ' + self.email

    def __repr__(self):
        return str(self)


class User(AbstractUser):

    def __init__(self, Id=None, name=None, email=None):
        super().__init__(Id, name, email)

    @classmethod
    def fromDict(cls, doc):
        user = cls()
        user.Id = str(doc['_id'])
        user.name = doc['name']
        user.email = doc['email']

        return user

    # when convert to dict, set isAdmin to false
    def toDict(self):
        output = {
            'id'            : self.Id,
            'name'          : self.name,
            'email'         : self.email,
            'isAdmin'       : False
        }
        return output


class Admin(AbstractUser):
    def __init__(self, Id=None, name=None, email=None):
        super().__init__(Id, name, email)

    @classmethod
    def fromDict(cls, doc):
        admin = cls()
        admin.Id = str(doc['_id'])
        admin.name = doc['name']
        admin.email = doc['email']

        return admin

    # when convert to dict, set isAdmin to true
    def toDict(self):
        output = {
            'id'            : self.Id,
            'name'          : self.name,
            'email'         : self.email,
            'isAdmin'       : True

        }
        return output
