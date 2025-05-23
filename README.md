# University Data Retreival Project with Javascript
## Description
This is a project built with **Javascript** where the backend server exposes data regarding about the graduate employments from local universities of Singapore via RESTful APIs and 
the frontend server would make use of these fetched data from the APIs to display delightful data cards according to the user's inputs.
The raw data is stored inside the csv file which will be extracted and exposed as REST APIs via **Express server**. This project includes advanced JS topics like 
asynchronous functions, Promises, custom html elements, etc.

## Tech Stacks Used
1. Node.js
2. Express.js
3. HTML, CSS, Bootstrap

## Pre-requisites
- Node.js and npm
- Live server extension (plugin for VSCode)

## How to run the project
Clone this repo to your local PC with the link 'https://github.com/AungPPhyo10/SG-University-data-retreival-project/'.
Open up the code base with your preferred code editor. _(This guide uses VS Code as the preferred editor)_

Inside your VS Code terminal, go to 'server' by using the command `cd server`.
Run the command `npm install`. This will install all the dependencies needed by the backend server.
Afterwards, the server can be run with the command `node server`.
Now, the API data can be accessed at 'http://localhost:8081/all' for example.

Split another terminal inside VS Code. Now go to 'client' by using the command `cd client`
Here, we will also install necessary dependencies by running the command `npm install`.
Then, go to the **index.html** and now you can proceed to use the live server to open up your frontend pages.
You may input the years into the search boxes to get relevant data about the graduate employment for that year.

> NOTE : The backend server and the frontend server must be running simultaneously to be able to fetch data.
