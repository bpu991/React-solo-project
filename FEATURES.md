
User Stories
-------------
1. As an authorized user, I want to view a simple landing page that will give me the option to sign-in or sign-up
    - Acceptance Criteria 
        - [ ] When the user visits the `/` route, they will be displayed a landing page with a sign in or sign up button

2. As a user, I want to be able to sign up for the website via a sign-up form with the route `/signup`.
    - The sign-up form will take in a name, email, username and password
    - After sign-up, the user will be redirected to the `/explore` route which will display photos uploaded by other users.
    - If a user already has signed up before, an error message will pop up and ask if want to sign-in instead.
    - Acceptance Criteria
        - [ ] User can visit `/signup` and will be shown a form with name, email, username and password input fields
        - [ ] If a user enters invalid data (missing fields, wrongly formatted email, etc) they will be displayed an error message
        - [ ] If username or email is already in use, they will be displayed an error message and ask if they would like to sign-in instead

3. As a user, I want to be able to login to the website in order to access the rest of the website.
    - The user will enter in email OR username and their password
    - The login form will be accessable through the route `/login`
    - If the user does not exist yet, an error message will be displayed
    - Acceptance Criteria
        - [ ] User can visit `/login` and be served a form requesting email/username and password
        - [ ] After inputting valid information, user will be redirected to `/explore` to display featured photos
        - [ ] If the user enters incorrect info, an error message will be displayed

4. As a user, I want to be able to log-out of the application
    - The user will click the 'logout' button to log out
    - They will be redirect to the landing page `/` 
    - Acceptance Critera
        - [ ] User will be displayed a log out button on the nav bar header
        - [ ] user will be redirected to `/` after clicking button

5. As a user, I want to be able to view photos from other users on the `/explore` page
    - After being redirected from the login/signup forms, the user will be able to view a table of recently uploaded photos from other users.
    - After clicking on the photo, they will be redirected to the a route of `/photo/:id` and will be able to leave comments and likes 
    - Acceptance Criteria 
        - [ ] A viewable table of recently uploaded photos from other users
        - [ ] Be redirected to `/photo/:id` after clicking on the photo and have the ability to leave comments and likes 

6. As a user, I want to view my profile page with all of the photos I have posted 
    - Acceptance Criteria
        - [ ] Going to the route of `/users/:id` will bring the user to their profile 
        - [ ] Profiles will have a viewable table of all of the photos they have uploaded as well as basic information such as their name and email address

7. As a user, I want to have the ability to upload my own photo from my computer
    - Acceptance Criteria
        - [ ] Will be using Cloudinary to be able to browse my files in order to upload them from my own computer 

Features - MVP
---------------
- [ ] landing page with login and signup button
- [ ] a sign up page for new users
- [ ] a login page for existing users
- [ ] a explore page that will display photos from different users
- [ ] the ability to click on individual photos and be able to view them on a separate route with the ability to leave likes and comments
- [ ] the ability to have users upload their own photos to display on the explore page

Pages and Routes
----------------

`/` -> Landing page with signup and log-in options

`/sign-up` -> Form generated that will have name, email, username, and password input fields

`/log-in` -> Form generated for existing users that will have email/username and password input fields

`/explore` -> Explore page with a table of photos from different users. This is the 'home' page after logging in.

`/users/:id` -> Profile page for users

`/photo/:id` -> Page for individual photos where users can view/leave comments and add likes

`/photo/new` -> Page for uploading new photos to the explore page
