const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))
const port = process.env.PORT || 3000
const router = require('./routes/routes')

app.use('/recipes', router);

app.listen(port, () => console.log(`listening on port ${port}..`))

