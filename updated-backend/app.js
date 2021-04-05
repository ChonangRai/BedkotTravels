const express = require('express');
const morgan = require('morgan');

const bodyParser = require('body-parser');

const db = require('./database/db');
const cors = require('cors')



const registration_route = require('./routes/registration_route');
const destinationRoute = require('./routes/destinationRoute');
const adminRoute = require('./routes/adminRoute');
const bookingRoute = require('./routes/bookingRoute');
const app = express();

app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))

app.use(morgan("dev"));
app.use(registration_route);

app.use(destinationRoute);
app.use(adminRoute);
app.use(bookingRoute);
app.listen(90);
