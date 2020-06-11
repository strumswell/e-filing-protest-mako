const pool = require('../util/db');
const { v4: uuidv4 } = require('uuid');

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

    // Create new rally
    app.post('/api/v1/versammlung', (request, response) => {
        let data = request.body;
        // Generate UUID
        data.uuid = uuidv4();
	console.log(data);
        // Build query and execute
        let sql = "INSERT INTO versammlungen SET ?";
        let query = pool.query(sql, data, (error, results) => {
	    console.log(error);
            // Missing or wrong attributes used
            if (error && error.code === "ER_NO_DEFAULT_FOR_FIELD") return sendResponse(response, 400, "Fehlerhafte Anfrage. Möglicherweise fehlen Attribute, check die Docs!", null);
            // Somethings wrong interally, has "code" when DB doesn't respond. Body of node error!
            if (error) return sendResponse(response, 500, "Interner Error", null);
            // All good
            sendResponse(response, 200, null, { "uuid": data.uuid });
        });
    });

    // Update specific rally
    app.put('/api/v1/versammlung/:uuid', (request, response) => {
        let data = request.body;
        // Update DB
        let sql = "UPDATE versammlungen SET ? where uuid='" + request.params.uuid + "'";
        let status = ["offen", "inBearbeitung", "abgestimmt", "abgesagt"];
        let query = pool.query(sql, data, (error, results) => {
            // Missing or wrong attributes used
            if (status.indexOf(data.status) == -1) return sendResponse(response, 400, "Fehlerhafte Anfrage. Möglicherweise fehlen Attribute, check die Docs!", null);
            if (error && error.code === "ER_PARSE_ERROR") return sendResponse(response, 400, "Fehlerhafte Anfrage. Möglicherweise fehlen Attribute, check die Docs!", null);
            //Somethings wrong interally, has "code" when DB doesn't respond. Body of node error!
            if (error) return sendResponse(response, 500, "Interner Fehler", null);
            // Id is unkown and no changes were made
            if (results.affectedRows < 1) return sendResponse(response, 404, "Unbekannte UUID", null);
            // All good
            console
            sendResponse(response, 200, null, "Versammlung aktualisiert!");
        });
    });
}
