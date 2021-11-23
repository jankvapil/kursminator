
/**
 * @typedef GlobalState
 * @type {object}
 * @property {Array<Course>} courses
 * @property {Array<UserCourseReservation>} userCourseReservations
 */

/**
 * @typedef Place
 * @type {object}
 * @property {string} name - Name of a place where the course is held
 * @property {bool} virtual - Sign if place is virtual
 * @property {string?} url - Url address (if place is virtual)
 * @property {string?} address - Place address (if place is real)
 * @property {string?} city - Place city (if place is real)
 */

/**
 * @typedef Course
 * @type {object}
 * @property {string} name Name of a course
 * @property {string} date
 * @property {number?} price
 * @property {number?} evaluation
 * @property {number?} capacity
 * @property {string?} type
 * @property {string?} description
 * @property {number?} duration
 * @property {ECourseDifficulty?} difficulty
 * @property {string?} photoUrl
 * @property {number?} occupancy
 * @property {Array<string>?} skills
 * @property {Array<CourseChapter>?} content
 * @property {Instructor?} instructor
 * @property {Place?} place
 */

/**
 * @typedef Instructor
 * @type {object}
 * @property {string} name
 * @property {string} surname
 * @property {number?} age
 * @property {string?} specialization
 * @property {string?} about
 * @property {string?} contact
 * @property {string?} photoUrl
 * @property {Array<Course>?} courses
 */

/**
 * @typedef User
 * @type {object}
 * @property {number} id
 * @property {string} name
 * @property {string} surname
 * @property {string} email
 * @property {string} photoUrl
 * @property {number} roleId
 * @property {number} credits
 */

/** 
 * @enum {string} 
 */
const ECourseDifficulty = {
    UNSPECIFIED: "UNSPECIFIED",
    BEGINNER: "BEGINNER",
    INTERMEDIATE: "INTERMEDIATE",
    ADVANCED : "ADVANCED",
    EXPERT : "EXPERT"
  };

/** 
 * @typedef CourseChapter
 * @type {object}
 * @property {string} name
 * @property {Array<string>?} subchapters
 */

/** 
 * @typedef UserCourseReservation
 * @type {object}
 * @property {Course} course
 */

export default ECourseDifficulty

