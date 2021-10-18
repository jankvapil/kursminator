
/**
 * @typedef GlobalState
 * @type {object}
 * @property {Array<Course>} courses
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
 * @property {string?} price
 * @property {string?} evaluation
 */