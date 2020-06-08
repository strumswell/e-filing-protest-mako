const pool = require('../util/db');

// Send standardized response
function sendResponse(response, status, error, result) {
    response.status(status).send(JSON.stringify({ "status": status, "error": error, "result": result }));
}

// ==================
//  Versammlung routes
// ==================
module.exports = (app) => {
    // DEMO
    app.get('/v1/versammlung', (request, response) => {
        let sql = "SELECT * FROM versammlung";
        let query = pool.query(sql, (error, results) => {
            //Somethings wrong interally
            if (error) return sendResponse(response, 500, "Internal server error.", null);
            // All good
            sendResponse(response, 200, null, results);
        });
    });
}