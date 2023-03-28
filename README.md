# Client Management System #

Client Management System (CMS) is a data capture web application for Quantum Leap Corporation that aims to simplify the process of onboarding vendors and subcontractors, ensuring that all necessary forms are collected and retained for record-keeping. CMS also allows for approval workflow processing and the ability to visualize which stage of a workflow a vendor is at the moment.


This is the first release of LJPS which contains its core functionalities as provided by the sponsor.

## Installation ##

To install CMS, follow these steps:

### Backend ###

### Frontend ###

-   Clone the repository to your local machine.
-   Install Node.js from https://nodejs.org/
-   Open a terminal window and navigate to the project directory.
-   Navigate into the "frontend" folder
-   Run npm install to install the required dependencies.
-   Run npm start to start the application.


## Configuration ##

To configure CMS, follow these steps:

- Open the application.properties file located in the backend/src/main/resources directory.
- Change the value of the spring.data.mongodb.uri property to the URI of your MongoDB instance.

## Usage ##

To use My Web App, follow these steps:

- Open your web browser and navigate to the [Login Page](http://localhost:3000/react/login).
- Login with any of the available Vendor/Admin/Approver accounts

<b>Admin 1</b>
- Username: kelvin.yap.2020@scis.smu.edu.sg
- Password: kelvinyap

<b>Approver 1</b>
- Username: rhys.tan.2020@scis.smu.edu.sg
- Password: rhystan

<b>Vendor 1</b>
- Username: bruno.goh.2020@scis.smu.edu.sg
- Password: brunogoh

<b>Vendor 2</b>
- Username: dominicteow.2020@scis.smu.edu.sg
- Password: domteow

## Account Features ##

### All Users ###
- Access the current form in each workflow (zero or more) that they are expected to complete.
- Edit current forms and subsequently submit them; support for saving partially edited forms
  without submission is also required.
- Efficiently browse and view all previously submitted own forms in each workflow.
- Log out.

### Admin ###
- Create/read/update/delete accounts of users in the system.
- Assign workflows to users.
- List status of workflows of any users.
- Highlight what documents are missing for which users.
- Send an email reminder to a user to submit a form in a specific workflow.
- Generate printouts (preferably PDF documents) representing forms with collected data.

### Approver ###
- Approve and reject workflows


## Technologies Used ##
- React.js
- Spring Boot
- MongoDB

## Course and Team Information ##

IS442 Object-Oriented PRogramming<br>
AY2022-2023, Term 2<br>
Group 1<br>
Team 4

## Authors ##

* Bruno Goh Jing Hang bruno.goh.2020@scis.smu.edu.sg <br>
* Tan Yu Qing Rhys rhys.tan.2020@scis.smu.edu.sg<br>
* Teow Zhen Yang Dominic dominicteow.2020@scis.smu.edu.sg <br>
* Yap Jie En Kelvin kelvin.yap.2020@scis.smu.edu.sg <br>
* Alvin Ling Wei Chow alvin.ling.2021@scis.smu.edu.sg <br>
* Neo Jing Min jingmin.neo.2020@scis.smu.edu.sg


