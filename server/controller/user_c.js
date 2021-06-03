// SWI / Selbstlerneinheit 1 / Beispiel Übung 2
// Stand: 17.09.2019

// Modulimporte

const FS = require('fs');
const EXPRESS = require('express');
const router_o = EXPRESS.Router();
const ressourcePath_s = '/user';

const userData_o = require('../db/user_d');
const localEventData_o = require('../db/localevent_d');
const UserHomeView_o = require('../view/user_v');

let currentUserId_s = "";

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
            res_ops.redirect('/user/home/' + activeUser.id_s);
        }
        if (activeUser.role_s == "organizer") {
            res_ops.redirect('/organizer/');
        }
    } else {
        res_ops.redirect('/');
    }
    this.currentUserId_s = activeUser.id_s;
});

router_o.get(ressourcePath_s + "/home/:id", function(req_opl, res_ops) {
    let data_a = userData_o.get_by_id(req_opl.params.id);
    let dataEvent_a = localEventData_o.get_all();
    let markup_s = UserHomeView_o.home_px(data_a, dataEvent_a);
    res_ops.send(markup_s);
});

router_o.get(ressourcePath_s + "/localeventuserinformation/:id", function(req_opl, res_ops) {
    let data_a = userData_o.get_by_id(this.currentUserId_s);
    let dataEvent_a = localEventData_o.get_by_id(req_opl.params.id);
    let markup_s = UserHomeView_o.localeventuserinformation_px(data_a, dataEvent_a);
    res_ops.send(markup_s);
});

router_o.post(ressourcePath_s + '/add_sugg/:id', function(req_opl, res_ops) {
    let id_s = userData_o.add_sugg(req_opl.body, req_opl.params.id);
    res_ops.redirect('/organizer/UserList');
});

router_o.post(ressourcePath_s + '/del_sugg/:id', function(req_opl, res_ops) {
    let id_s = userData_o.del_sugg(req_opl.body, req_opl.params.id);
    res_ops.redirect('/organizer/UserList');
});

router_o.post(ressourcePath_s + '/add_book/:id', function(req_opl, res_ops) {
    let id_s = userData_o.add_book(req_opl.body, req_opl.params.id);
    res_ops.redirect('/user/home/' + this.currentUserId_s);
});

router_o.post(ressourcePath_s + '/del_book/:id', function(req_opl, res_ops) {
    let id_s = userData_o.del_book(req_opl.body, req_opl.params.id);
    res_ops.redirect('/user/home/' + this.currentUserId_s);
});

router_o.post(ressourcePath_s + '/create/:id', function(req_opl, res_ops) {
    let id_s = userData_o.add(req_opl.body);
    res_ops.redirect('/organizer/UserList');
});

router_o.post(ressourcePath_s + '/save/:id', function(req_opl, res_ops) {
    userData_o.set_by_id(req_opl.body, req_opl.params.id);
    res_ops.redirect('/organizer/UserList');
});

router_o.post(ressourcePath_s + '/delete/:id', function(req_opl, res_ops) {
    userData_o.del(req_opl.params.id);
    res_ops.redirect('/organizer/UserList');
});

module.exports = router_o;
// EOF