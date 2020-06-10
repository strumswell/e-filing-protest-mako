const pool = require('../util/db');

// Send standardized response
function sendResponse(response, status, error, result) {
    response.status(status).send(JSON.stringify({ "status": status, "error": error, "result": result }));
}

// ==================
//  Versammlung routes
// ==================
module.exports = (app) => {
    // Get all rallies
    app.get('/api/v1/versammlung', (request, response) => {
        let sql = "SELECT * FROM versammlungen";
        let query = pool.query(sql, (error, results) => {
            // Somethings wrong interally
            if (error) return sendResponse(response, 500, "Interner Fehler", null);
            // All good
            sortedResults = { offen: [], inBearbeitung: [], abgestimmt: [], abgesagt: [] }
            results.forEach(result => {
                switch (result.status) {
                    case "offen":
                        sortedResults.offen.push(result)
                        break;
                    case "inBearbeitung":
                        sortedResults.inBearbeitung.push(result)
                        break;
                    case "abgestimmt":
                        sortedResults.abgestimmt.push(result)
                        break;
                    case "abgesagt":
                        sortedResults.abgesagt.push(result)
                        break;
                }
            });
            sendResponse(response, 200, null, sortedResults);
        });
    });

    // Get a specific rally
    app.get('/api/v1/versammlung/:uuid', (request, response) => {
        let sql = "SELECT * FROM versammlungen WHERE uuid='" + request.params.uuid + "'";
        let query = pool.query(sql, (error, results) => {
            // Somethings wrong interally
            if (error) return sendResponse(response, 500, "Interner Fehler", null);
            // UUID is unkown
            if (results.length < 1) return sendResponse(response, 404, "Unbekannte UUID", null);
            // All good
            sendResponse(response, 200, null, results[0]);
        });
    });
}