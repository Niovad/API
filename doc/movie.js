/**
 * @apiDefine logged Logged users
 */

/**
 * @api {post} /movie/add Add a movie
 * @apiName AddMovie
 * @apiGroup Movie
 * @apiDescription Add a new movie. Title and release date are mandatory, and a lot of fields can be added (see below)
 * @apiPermission logged
 *
 * @apiParam {String} title
 * @apiParam {Date} release_date Format is YYYY-MM-DD
 * @apiParam {Url} [image]
 * @apiParam {Number{4}} [production_year]
 * @apiParam {Date} [original_release_date] Format is YYYY-MM-DD
 * @apiParam {String[]} [director]
 * @apiParam {String[]} [producer]
 * @apiParam {String[]} [scriptwriter]
 * @apiParam {String[]} [actor]
 * @apiParam {String[]} [gender]
 * @apiParam {String[]} [composer]
 * @apiParam {String} [original_title]
 * @apiParam {String} [other_title]
 * @apiParam {String} [gender]
 * @apiParam {String[]} [plot]
 * @apiParam {String[]} [informations]
 * @apiParamExample {json} Example:
 *     {
 *       "title": "foobar",
 *       "release_date": "1999-03-31",
 *       "production_year": "1998"
 *     }
 *
 * @apiSuccess (201) {String} status "Created"
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 201 Created
 *     {
 *       "status": "Created"
 *     }
 *
 * @apiError (400) InvalidParameter An invalid parameter has been provided
 * @apiErrorExample InvalidParameter
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": "Error",
 *       "message": "An invalid parameter has been provided"
 *     }
 *
 * @apiError (400) AlreadyExists This movie already exists
 * @apiErrorExample AlreadyExists
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": "Error",
 *       "message": "Movie \"foobar\" already exists"
 *     }
 *
 * @apiError (401) Unauthorized You must be logged in to perform this action
 * @apiErrorExample Unauthorized
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "status": "Error",
 *       "message": "You must be logged in to perform this acion"
 *     }
 */
