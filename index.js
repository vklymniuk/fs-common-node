'use strict'

/**
 * Adds commas to a number
 * @param { Number } number
 * @param { String } locale
 * 
 * @return { String }
 */
module.exports = function(number, locale) {
    return number.toLocaleString(locale);
};