'use strict';
import joi from 'joi';

/*
 *  User validator class with methods
 */
class UserValidator {
    /*
     * Method to validate User 
     */
    createUser = (req, res, next) => {
        return new Promise((resolve, reject) => {
            resolve();
            next();
        });
    };
};

export default new UserValidator();