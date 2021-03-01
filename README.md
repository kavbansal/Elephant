# Elephant

# Running the App

## Notes

- React default serves on <http://localhost:3000>
- Nodejs version 13.9.0
- Python version 3.7.5
- Need to have npm, nodejs, python installed.
- Backend doesn't work right now.

## Front End (ReactJS)

1. Open a new terminal and head to /elephant
2. Enter the command `npm install` to get the correct node modules and packages needed to run the front end.
3. Enter the command `npm start` 

## API Server (Flask)

1. Create a virtual environment if haven't. This would be `virtualenv -p python3 env`
2. Start up your virtual environment (windows is `.\env\Scripts\activate`, linux is  `source ./env/bin/activate`)
3. With the virtual environment activated, `pip install -r requirements.txt`
4. run start_server.sh

## Database (MongoDB)

### WINDOWS

1. Head to the location of your mongodb installation
2. Run 'mongo.exe' from the bin subfolder, found in the version subfolder of the 'server' subfolder

### MAC

1. Open terminal and head to /app
2. Enter the command `mongod --dbpath=./data/db/`

# Technical Development Plan

## Iteration 1
- Create basic frontend webpage
- Design classes and database tables

## Iteration 2
- Set up applicant sign in and profile
- Implement school search
- Implement page for each school with latest information for easy access

## Iteration 3
- Set up mentor sign in and profile
- Set up core requesting/receiving consultation appointment system
- Create rating system for mentors

## Iteration 4
- Implement Q&A section for each school
- Implement algorithm to sort mentors based on fit with applicant (using profile info)
- Add filtering system
- Implement sign up for both mentors and applicants

## Iteration 5
- Implement Messaging
- Implement Payment
- UI Improvements

# Wireframes (in progress)
https://www.figma.com/file/UO6YbQUoaK2SEgRAYZdDKo/Elephant-Project
