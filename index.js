const express = require('express');
const db = require('./models');
const app = express();
const PORT = process.env.PORT || 8888;

app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json({extended: true}));
app.use(require('method-override')('_method'));

app.use('/api', require('./api'));
app.use(express.static('public'));


//db.sequelize.sync({force:true});

app.listen(PORT);