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

# General Flow

- User gets to landing page, can read about Elephant and sign up, or sign in if they have already signed up.
- Can view booked appointments on dashboard. Please note, in-app messaging is currently a work in progress but will be added soon. For now, mentors and students are connected via e-mail after booking a consultation.
- Can view schools and select any one to go to its profile page, where you are greeted by large visuals. User can easily view important up-to-date statistics like average GPA, acceptance rate, and more. User can also view commonly asked questions and answers from mentors, and can see currently featured mentors and a full list of mentors from this university with whom they can connect and schedule a consultation.

The 3 core goals of Elephant are present in this minimum viable product: Allow students to easily view the latest info on top schools, allow students to view questions and trusted yet honest answers about each school, and allow students to schedule consultations with mentors at these schools to better understand their fit, plan and revise their essays, and more. With that being said, we are still working on improving Elephant to make it a more seamless experience with things like in-app messaging (frontend demo available on dashboard page) and PayPal integration. A good portion of time was spent refining our business model, so we hope to apply what we have learned on that side and what we have built on the technical side to make Elephant's initial launch as strong as possible.


# Technical Development Plan (original)

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

# Wireframes
https://www.figma.com/file/UO6YbQUoaK2SEgRAYZdDKo/Elephant-Project
