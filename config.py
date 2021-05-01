class TestConfig(object):
    MONGO_DBNAME = "testdb"
    MONGO_URI = "mongodb://localhost:27017/" + MONGO_DBNAME


class ProdConfig(object):
    """ MONGO_DBNAME = "proddb"
    MONGO_URI = "mongodb://localhost:27017/" + MONGO_DBNAME """
    MONGO_URI = "mongodb+srv://jlizarr1:fuzRZbivOaaxj5Va@cluster0.qlruk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
