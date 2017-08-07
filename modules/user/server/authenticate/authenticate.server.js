'use strict';
import jwt from 'jsonwebtoken';
import logger from '../../../../config/lib/logger.js';
import fs from 'fs';
import path from 'path';

// Read the keycloak certification file
const cert = fs.readFileSync(path.resolve("./keycloak_certfile.pem"));
export class Authenticate {

    authenticate = (req, res, next) => {
        let self = this;
        return (req, res, next) => {
            logger.info("Authenticate: going to authenticate request " + req.originalUrl);
            if (!req.body.isAuthorized) {
                //get the token
                try {

                    let auth = req.headers.authorization;
                    let access_token = auth.split(" ")[1];
                    if (access_token) {

                        //verify the token
                        jwt.verify(access_token, cert, { algorithms: ["RS256"] }, function(err, decoded) {

                            if (err) {
                                logger.error("Error", err);

                                //if expired
                                if (self.checkTokenExpired(err)) {
                                    res.status(401).json({ message: "Not Authenticated" });
                                } else {
                                    //tampered
                                    logger.info("Request is tampered");
                                    res.status(401).json({ message: "Not Authenticated" });
                                }

                            } else {
                                //authenticate request
                                req.body.user_id = decoded["sub"];
                                req.body.user = {};
                                req.body.user.id = decoded["sub"];
                                req.body.user.name = decoded["name"];
                                req.body.user.given_name = decoded["given_name"];
                                req.body.user.username = decoded["preferred_username"];
                                req.body.user.email = decoded["email"];
                                next();
                            }
                        })
                    } else {
                        //logger.error("No access token in request");
                        res.status(400).json({ message: "Bad Request.Missing Token." });
                    }
                } catch (err) {
                    logger.info("Bad Request");
                    res.status(400).json({ message: "Bad Request" });
                }
            } else {
                logger.info("Authenticate: No request authentication performed as request already authorized " + req.originalUrl + " " + req.body.isAuthorized);
                next();
            }

            var checkTokenExpired = (err) => {
                if (err.name === "TokenExpiredError") {
                    return true;
                }
                return false;
            }
        }
    }
}

export default new Authenticate();