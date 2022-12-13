const express = require('express');
const app = express();
require('dotenv').config({ path: './config/.env' });

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extend: true }));

const routerUser = require('./routes/users.routes');
app.use('/api/users', routerUser);

const loginUser = require('./routes/loginUser.routes');
app.use('/api/user/authentification', loginUser);

const etudiants = require('./routes/etudiants.routes');
app.use('/api/etudiants', etudiants);

const filieres = require('./routes/filieres.routes');
app.use('/api/filieres', filieres);

const promotions = require('./routes/promotions.routes');
app.use('/api/promotions', promotions);

const cours = require('./routes/cours.routes');
app.use('/api/cours', cours);

const sessions = require('./routes/session.routes');
app.use('/api/sessions', sessions);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Le serveur tourne sur le port ' + PORT);
});