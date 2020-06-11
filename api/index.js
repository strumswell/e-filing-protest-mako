const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()

// Parser for JSON
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Inject routes
require('./routes/docs')(app);
require('./routes/versammlung')(app);
require('./routes/general')(app);

// Listen for REST-Calls
app.listen(3000, () => {
    console.log('API started on port 3000...');
});
