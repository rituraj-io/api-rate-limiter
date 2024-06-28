const express = require('express');

const apiRoutes = require('./routes/apiRoutes');

const app = express(),
	port = process.env.PORT || 3000;

app.use(express.json());

app.use('*', apiRoutes);

app.listen(port, () => console.log(`Listening to port ${port}`));
