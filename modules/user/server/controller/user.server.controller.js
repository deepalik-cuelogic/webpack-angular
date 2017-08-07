import Promise from 'bluebird';
import httpRequest from 'request';
import logger from '../../../../config/lib/logger.js';

Promise.promisifyAll(httpRequest);

/*
 *  User class with methods
 */
class UserController {

    // constructor to initialize the properties
    constructor() {}

    /*
     * Method to rateBreakDown
     */
    createUser = (req, res, next) => {
        logger.debug("create user api called");
        return new Promise((resolve, reject) => {
                resolve();
                res.send("Hello");

            })
            .catch((error) => {
                log.error("Error in create user:", error);
                reject(error);
                next(error);
            });
    };
};
export default new UserController();