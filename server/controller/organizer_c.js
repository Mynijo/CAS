// SWI / Selbstlerneinheit 1 / Beispiel Übung 2
// Stand: 18.09.2019

'use strict';

// Modulimporte

const FS = require('fs');
const PATH = require('path');
const EXPRESS = require('express');
const userData_o = require('../db/user_d');
const localUserView_o = require('../view/organizer_v');

const router_o = EXPRESS.Router();
const ressourcePath_s = '/organizer';

// Pfade relativ zum Pfad, der bei der Benutzung des Moduls angegeben wird!

// da bei einfacher Formularbearbeitung nur GET udn POST zugelassen sind, müssen die anderen
// REST-Pfade simuliert werden

router_o.get(ressourcePath_s, function (req_opl, res_ops) {
   let data_a = userData_o.get_all();
   let markup_s = localUserView_o.list_px(data_a);
   res_ops.send(markup_s);
});

module.exports = router_o;
// EOF
