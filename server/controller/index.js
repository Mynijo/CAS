// SWI / Selbstlerneinheit 1 / Beispiel Übung 2
// Stand: 18.09.2019

'use strict';

// Modulimporte

const PATH = require('path');
const EXPRESS = require('express');
const BODYPARSER = require('body-parser');
const MORGAN = require('morgan');

const localEventController_o = require('./localevent_c');
const userController_o = require('./user_c');

// Anwendungsrahmen einrichten und konfigurieren

let app_o = EXPRESS();

let baseDir_a = PATH.dirname(require.main.filename).split(PATH.sep);
baseDir_a.pop();
let baseDir_s = baseDir_a.join(PATH.sep);

app_o.use(EXPRESS.static(PATH.join(baseDir_s, 'client')));

app_o.use(BODYPARSER.text());
app_o.use(BODYPARSER.urlencoded({ extended: false }));

app_o.use(MORGAN('dev'));

app_o.use('/', userController_o);
app_o.use('/', localEventController_o);

app_o.get('/', function (req_opl, res_ops) {
   // Startseite ausliefern
   let path_s = PATH.join(baseDir_s, 'client', 'html', 'main.html');
   console.log(path_s);
   res_ops.sendFile(path_s);
});

app_o.use(function(req_opl, res_ops, next_ops) {
   let err_o = new Error('Not Found');
   err_o.status = 404;
   next_ops(err_o); // Aufruf des nächsten Controller
});

app_o.use(function(err_opl, req_opl, res_ops, next_ops) {
   res_ops.status(err_opl.status || 500);
   console.log("error: "+ err_opl.message)
   res_ops.send(JSON.stringify({
      message: err_opl.message,
      status: err_opl.status
   }));
});

module.exports = app_o;
// EOF
