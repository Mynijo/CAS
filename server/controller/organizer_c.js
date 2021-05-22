// SWI / Selbstlerneinheit 1 / Beispiel Übung 2
// Stand: 18.09.2019

'use strict';

// Modulimporte

const FS = require('fs');
const PATH = require('path');
const EXPRESS = require('express');
const userData_o = require('../db/user_d');
const localEventData_o = require('../db/localevent_d');
const organizerHomeView_o = require('../view/organizer_v');

const router_o = EXPRESS.Router();
const ressourcePath_s = '/organizer';

// Pfade relativ zum Pfad, der bei der Benutzung des Moduls angegeben wird!

// da bei einfacher Formularbearbeitung nur GET udn POST zugelassen sind, müssen die anderen
// REST-Pfade simuliert werden

router_o.get(ressourcePath_s, function (req_opl, res_ops) {
   let data_a = userData_o.get_all();
   let markup_s = organizerHomeView_o.home_px(data_a);
   res_ops.send(markup_s);
});

router_o.get(ressourcePath_s+"/UserList" , function (req_opl, res_ops) {
   let data_a = userData_o.get_all();
   let markup_s = organizerHomeView_o.userList_px(data_a);
   res_ops.send(markup_s);
});

router_o.get(ressourcePath_s+"/EventSetting", function (req_opl, res_ops) {
   let data_a = localEventData_o.get_all();
   let markup_s = organizerHomeView_o.eventSetting_px(data_a);
   res_ops.send(markup_s);
});

router_o.get(ressourcePath_s+"/ProvideEvents" , function (req_opl, res_ops) {
   let data_a = [userData_o.get_all(), localEventData_o.get_all()];
   let markup_s = organizerHomeView_o.provideEvents_px(data_a);
   res_ops.send(markup_s);
});

router_o.get(ressourcePath_s+"/Analyze", function (req_opl, res_ops) {
   let data_a = localEventData_o.get_all();
   let markup_s = organizerHomeView_o.analyze_px(data_a);
   res_ops.send(markup_s);
});
module.exports = router_o;
// EOF
