// SWI / Selbstlerneinheit 1 / Beispiel Übung 2
// Stand: 17.09.2019

// Modulimporte

const FS = require('fs');
const EXPRESS = require('express');
const router_o = EXPRESS.Router();
const ressourcePath_s = '/user';

const userData_o = require('../db/user_d');

router_o.get(ressourcePath_s, function(req_opl, res_ops) {
    // nur zum Ausprobieren der verschiedenen Möglichkeiten, die Pfade beim Routing anzugeben
    res_ops.redirect("/");
});

router_o.post(ressourcePath_s, function(req_opl, res_ops) {
    let allUser_o = userData_o.get_all();
    let found_b = false;
    let user_o = req_opl.body;
    let activeUser;
    if ((user_o != undefined) && (user_o != null)) {
        for (let key_s in allUser_o) {
            if (user_o.user == allUser_o[key_s].name_s) {
                if (user_o.password == allUser_o[key_s].pwd_s) {
                    found_b = true;
                    activeUser = allUser_o[key_s];
                }
            }
        }
    }
    if (found_b) {
        if (activeUser.role_s == "user") {
            res_ops.redirect('/localevent/');
        }
        if (activeUser.role_s == "organizer") {
            res_ops.redirect('/organizer/');
        }
    } else {
        res_ops.redirect('/');
    }


    router_o.post(ressourcePath_s + '/create/:id', function(req_opl, res_ops) {
        let id_s = userData_o.add(req_opl.body);
    });

    router_o.post(ressourcePath_s + '/save/:id', function(req_opl, res_ops) {
        localEventData_o.set(req_opl.params.id, req_opl.body);
    });

    router_o.post(ressourcePath_s + '/delete/:id', function(req_opl, res_ops) {
        localEventData_o.del(req_opl.params.id);
    });
});

module.exports = router_o;
// EOF