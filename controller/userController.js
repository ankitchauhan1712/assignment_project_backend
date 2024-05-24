//Import------------------------------------------------------------------
import ResponseUtil from "../utils/response.utils.js";
import userManager from "../manager/userManager.js";

//End----------------------------------------------------------------------

/**
 * FUNCTION STARTS FROM HERE
 */

/**
 * User Data
 * @createdBy Ankit
 */
export function saveUserData(request, response) {

    userManager.saveUserData(request.body , request.file)
    .then((result) => {
      if (result.error) {
        response.send(ResponseUtil.error(500, result));
      } else {
        response.send(ResponseUtil.success(result));
      }
    })
    .catch((err) => response.send(ResponseUtil.error(500, err)));
}
/**
 * User Login
 * @createdBy Ankit
 */
export function login(request, response) {

    userManager.login(
    request.body.email,
    request.body.password,
    request.body.category
  )
    .then((result) => {
      if (result.error) {
        response.send(ResponseUtil.error(500, result));
      } else {
        response.send(ResponseUtil.success(result));
      }
    })
    .catch((err) => response.send(ResponseUtil.error(500, err)));
}

/**
 * Admin Login
 * @createdBy Ankit
 */
export function adminLogin(request, response) {
 
  AuthenticationManager.adminLogin(
    request.body.email,
    request.body.password
  )
    .then((result) => {
      if (result.error) {
        response.send(ResponseUtil.error(500, result));
      } else {
        response.send(ResponseUtil.success(result));
      }
    })
    .catch((err) => response.send(ResponseUtil.error(500, err)));
}