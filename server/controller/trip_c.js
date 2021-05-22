// SWI / Selbstlerneinheit 1 / Beispiel Übung 2
// Stand: 18.09.2019

'use strict';

// Modulimporte

const FS = require('fs');
const PATH = require('path');
const EXPRESS = require('express');
const localTripData_o = require('../db/trip_d');
const localTripView_o = require('../view/localevent_v');

const router_o = EXPRESS.Router();
const ressourcePath_s = '/trip';
const ressourcePathId_s = '/trip/:id';

// Pfade relativ zum Pfad, der bei der Benutzung des Moduls angegeben wird!

// da bei einfacher Formularbearbeitung nur GET udn POST zugelassen sind, müssen die anderen
// REST-Pfade simuliert werden

router_o.get(ressourcePath_s, function (req_opl, res_ops) {
   let data_a = localTripData_o.get_all();
   let markup_s = localTripView_o.list_px(data_a);
   res_ops.send(markup_s);
});

router_o.get(ressourcePathId_s, function (req_opl, res_ops) {
   let data_o = localTripData_o.get_by_id(req_opl.params.id);
   let markup_s = localTripView_o.detail_px(data_o);
   res_ops.send(markup_s);
});

router_o.post(ressourcePath_s+'/create/:id', function (req_opl, res_ops) {
    let id_s = localEventData_o.add(req_opl.body);
    res_ops.redirect('/trip/'+id_s);
 });
 
 router_o.post(ressourcePath_s+'/save/:id', function (req_opl, res_ops) {
    localEventData_o.set(req_opl.params.id, req_opl.body);
    res_ops.redirect('/trip/'+req_opl.params.id);
 });
 
 router_o.post(ressourcePath_s+'/delete/:id', function (req_opl, res_ops) {
    localEventData_o.del(req_opl.params.id);
    // Liste anzeigen
    res_ops.redirect('/trip');
 });
 

module.exports = router_o;
// EOF
