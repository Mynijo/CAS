// SWI / Selbstlerneinheit 1 / Beispiel Übung 2
// Stand: 17.09.2019

'use strict';

// Modulimporte

const app_o = require('./controller');

app_o.listen(8001, function () {
  console.log('server listening on port 8001!');
});
// EOF