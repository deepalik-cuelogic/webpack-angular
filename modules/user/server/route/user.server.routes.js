import userController from "../controller/user.server.controller.js";
import validator from "../validator/user.server.validator.js";

module.exports = (routerobject) => {
    
    // route for createUser
    routerobject.get("/createUser", validator.createUser, userController.createUser);

    routerobject.get('/', )

    return routerobject;
};