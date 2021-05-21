// SWI / Selbstlerneinheit 1 / Beispiel Übung 2
// Stand: 18.09.2019

'use strict';

// Modulimporte

const FS = require('fs');
const PATH = require('path');

class UserData_cl {
   constructor () {
      let baseDir_a = PATH.dirname(require.main.filename).split(PATH.sep);
      baseDir_a.pop();
      let baseDir_s = baseDir_a.join(PATH.sep);
      this.path_s = PATH.resolve(baseDir_s, 'data', 'user.json');
      this.maxidPath_s = PATH.resolve(baseDir_s, 'data', 'maxid_user.json');
      let content_s = FS.readFileSync(this.path_s, 'utf8');
      this.allData_o = JSON.parse(content_s);
   }

   get_all () {
      let data_a = [];
      for (let key_s in this.allData_o) {
         if (key_s != "0") {
            data_a.push(this.allData_o[key_s]);
         }
      }
      return data_a;
   }

   get_by_id (id) {
      for (let key_s in this.allData_o) {
         if (key_s == id) {
            return this.allData_o[key_s];
         }
      }
      return null;
   }

   add (data_opl) {
      let id_s = this.getNewId_p();
      let data_o = data_opl;
      data_o["id_s"] = id_s;
      this.allData_o[id_s] = data_o;
      this.sync_p();
      return id_s;
   }

   set_by_id(data_opl, id){
      if (id_spl in this.allData_o) {
         this.allData_o[id_spl] = data_opl;
         this.sync_p();
      }
      else{
         add(data_opl);
      }
   }

   del_by_id() {
      let result_b = false;
      if (id_spl in this.allData_o) {
         delete this.allData_o[id_spl];
         result_b = true;
         this.sync_p();
      }
      return result_b;
   }


   sync_p () {
      let data_s = JSON.stringify(this.allData_o, null, 3);
      FS.writeFileSync(this.path_s, data_s);
   }

   getNewId_p () {
      let data_o = JSON.parse(FS.readFileSync(this.maxidPath_s, 'utf8'));
      data_o.maxid += 1;
      let data_s = JSON.stringify(data_o);
      FS.writeFileSync(this.maxidPath_s, data_s);
      return data_o.maxid.toString();
   }

}

module.exports = new UserData_cl();
// EOF