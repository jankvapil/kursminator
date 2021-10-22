# Team project inf.upol 2021 (B)

## How to run project

### API
- VSCODE: with GitBash run `dotnet run` in the `api` folder and go to http://localhost:5000/GraphQL/
- VS: click on run project & open browser on https://localhost:44307/GraphQL/

### Web
- when API runs install all dependencies by `npm i` and run the project `npm run dev`

## DB Structure

### Course
- id (int)
- name (str)
- capacity (int)
- type (str)
- date (date)
- duration (int) <!-- in minutes -->
- price (int)
- description (str)
- skills (string[])
- evaluation (float)
- placeID (int)
- instructorID (int)

### Place
- id (int)
- virtual (bool)
- name (str)
- url (str)
- address (str)
- city (str)

### User
- id (int)
- name (str)
- surname (str)
- email (str)
- roleID (int)
- credits (int)

### Role
- id (int)
- name (str)

### UserCourseReservation
- userID (int)
- courseID (int)

### UserCourseFavourites
- userID (int)
- courseID (int)

### Instructor
- id (int)
- name (str)
- surname (str)
- age (int)
- specialization (str)
- about (str)
- contact (str)
- photoUrl (str)
