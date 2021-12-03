
/**
 * Checks if email is in valid format
 * 
 * @param {string} email 
 * @returns {boolean} 
 */
export const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
}