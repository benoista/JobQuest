// Express initialization
const express = require('express');
const cors = require('cors');
const app = express();
// Link to DB connection
const db = require('./db.js');
const cookieParser = require('cookie-parser');

app.use(cors({
    credentials: true,
    origin: true
})); // allow all origins
app.use(express.json());
app.use(cookieParser());

// Link to routes files
const peopleRoutes = require('./routes/peopleRoutes.js');
const companiesRoutes = require('./routes/companiesRoutes.js');
const advertisementsRoutes = require('./routes/advertisementsRoutes.js');
const sectorRoutes = require('./routes/sectorRoutes.js');

app.use('/people', peopleRoutes);
app.use('/advertisements', advertisementsRoutes);
app.use('/companies', companiesRoutes);
app.use('/sector', sectorRoutes);

// Listening port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
