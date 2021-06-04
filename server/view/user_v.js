// SWI / Selbstlerneinheit 1 / Beispiel Übung 2
// Stand: 18.09.2019

'use strict';

// Modulimporte

const PATH = require('path');
const PUG = require('pug');

class LocalEventView_cl {
    constructor() {
        let baseDir_a = PATH.dirname(require.main.filename).split(PATH.sep);
        baseDir_a.pop();
        let baseDir_s = baseDir_a.join(PATH.sep);
        let path_s = PATH.resolve(baseDir_s, 'client', 'templates', 'userhome.pug');
        this.compiledUserSettingTemplate_p = PUG.compileFile(path_s);

        path_s = PATH.resolve(baseDir_s, 'client', 'templates', 'localeventuserinformation.pug');
        this.compiledlocaleventuserinformationTemplate_p = PUG.compileFile(path_s);

        path_s = PATH.resolve(baseDir_s, 'client', 'templates', 'agency.pug');
        this.compiledagencyTemplate_p = PUG.compileFile(path_s);

    }


    home_px(data_user_apl, event_data_apl) {
        let markup_s = this.compiledUserSettingTemplate_p({ localUser_opl: data_user_apl, localEvent_opl: event_data_apl });
        return markup_s;
    }

    localeventuserinformation_px(data_user_apl, event_data_apl) {
        let markup_s = this.compiledlocaleventuserinformationTemplate_p({ localUser_opl: data_user_apl, localEvent_opl: event_data_apl });
        return markup_s;
    }

    agency_px(data_user_apl, event_data_apl) {
        let markup_s = this.compiledagencyTemplate_p({ localUser_opl: data_user_apl });
        return markup_s;
    }
}
module.exports = new LocalEventView_cl();
// EOF