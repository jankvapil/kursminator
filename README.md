# typ-b

## DB Entity

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

