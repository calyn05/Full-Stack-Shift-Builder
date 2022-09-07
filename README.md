# Full-Stack-Shift-Builder-Project

A full-stack web application built with JavaScript, HTML5, and CSS. As for database, I used local-storage.

# Introduction

Applicattion name: "Manage-My-Shifts"

# Case Study

A client approached you with a request to build an app to track the employees' working hours.
The workplace is required to keep track of an employee's monthly working hours for the purpose of calculating wages, collecting fees, calculating expenses, etc. The main request is to develop an app that would allow an employee to keep track of his/her work hours and calculate how much money they should receive each month, according to the amount of work hours they have worked.

# The Purpose

The purpose of the app is to provide a clear and simple solution for employees who need to submit their hourly report for their monthly salary.

# Main Goals

- Managing my shifts in my various jobs
- Management of hours by workplace
- Generate reports and statistics according to various filters

# Working in the following environments

- Browser
- Suitable for smartphones
- Suitable for tablets

# Arhitecture and Technological Requirements

Integrate Manage My Shifts - Client without server side data.

- Infrastructure:

  - Client side
  - HTML5
  - CSS3
  - JavaScript

- Database:

  - Local Storage

- Language:

  - English

- Security:
  - Local Storage - the data will be saved to the local storage of the browser.

# Flowchart application usage

## Login screen

When the user opens the app, he enters the login page with a link to a password registration page that will be saved to local storage. The user will be asked to put user information that will be saved to lcoal storage, but only for 60 minutes.

## Login page content

- Username input - at least 6 characters - will be saved to local storage
- A password (at least 6 characters) - will be saved to local storage
- Login button - after clicking the login button, the data will be saved to local storage. If no, appropriate error message will be displayed.
- There should be a button to confirm the registration.

## Error message types

- Username and password are too short
- Password must contain letters, numbers, and a special character that is neither a letter nor a number
- If the input passes successfully, then data will be saved to local storage.

## Contents of a registration page

- Email - An email field for an email format
- Username - at least 6 characters - will be saved to local storage
- Password (at least 6 characters) - will be saved to local storage
- Confirm password field - must be the same as the password field // # Added by me
- First name - will be saved to local storage
- Last name - will be saved to local storage
- Age - number between 18 and 65
- Register button - Clicking on the register checks if the data is correct, and the data will be saved to local storage.
- After a successful registration, the user will go to hjome page, which includes a top bar menu.
- If the user forgets the password, he can reset it. But resetting the password at this point will delete all user data.

## Home page content

A header that includes the company logo

- Top bar menu that will contain :
  - My shifts - Displays a list of all shifts and a + button to add a shift
  - A table with all the shifts will be displayed. Clicking on a shift will give you the option to edit the shift details
  - Editing a profile - Ability to edit the profile
  - The right part of the item will display Hello - Username
  - Log Out
- Footer Contains:
  - Menu bar
- The body of the homepage will contain
  - Search options according to two parameters:
    - Shift
    - From date to date
  - A table that shows all the shifts with the following column names
    - Date
    - Start time
    - End time
    - Hourly wage
    - Shift place
    - Total profit per shift
  - At the bottom of the table will be a presentation of the month in which the user earned the highest earnings

## Page Content - Adding a shift

- Page content Adding a Date Shift - Date Selection button
- Start time - Start time selection button
- End time - End time selection button
- Hourly wage - text box
- Workplace - dropdown list
- Shift slug (unique name)
  - Each shift has a unique name. TYhe user will be notified if the name already exists, and the user will have to choose a new name.
- Comments - text area
- Save button - After pressing the save button there will be a rotating progress bar, and the data is saved to local storage.

## Profile editing Page

- On this page the user will be able to edit his details.

# The page will include the following fields:

- Email - An email field for an email format
- Username - at least 6 characters - will be saved to local storage
- Password (at least 6 characters) - will be saved to local storage
- Confirm password field - must be the same as the password field // # Added by me
- First name - will be saved to local storage
- Last name - will be saved to local storage
- Age - number between 18 and 65
- Update button - Clicking on the update button checks if the data is correct, and the data will be saved to local storage.
- After a successful update, the user will go to the home page.

# The development will be done in the following order

- Register Page
- Login Page
- Edit profile Page
- Adding a shift Page
- Home Page
