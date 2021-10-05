# Team project inf.upol 2021 (B)

## How to run project

### API
- VSCODE: with GitBash run `dotnet run` in the `api` folder and go to http://localhost:5000/GraphQL/
- VS: click on run project & open browser on https://localhost:44307/GraphQL/

### Web
- when API runs install all dependencies by `npm i` and run the project `npm run start`

## DB Structure
### Course
- id (int)
- name (str)
- type (str)
- placeID (int)
- date (date)
- price (int)
- evaluation (float)
- description (str)
- instructorID (int)

### Place
- id (int)
- virtual (bool)
- name (str)
- capacity (int)
- url (str)
- address (str)
- city (str)
- postalCode (int)
- state (str)

### User
- id (int)
- name (str)
- surname (str)
- email (str)
- password (str)
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
- about (str)
- photoUrl (str)
