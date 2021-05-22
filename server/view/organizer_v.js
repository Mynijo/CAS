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
        let path_s = PATH.resolve(baseDir_s, 'client', 'templates', 'organizerhome.pug');
        this.compiledHomeTemplate_p = PUG.compileFile(path_s);

        path_s = PATH.resolve(baseDir_s, 'client', 'templates', 'userlist.pug');
        this.compiledUserListTemplate_p = PUG.compileFile(path_s);

        path_s = PATH.resolve(baseDir_s, 'client', 'templates', 'eventsettings.pug');
        this.compiledEventSettingTemplate_p = PUG.compileFile(path_s);

        path_s = PATH.resolve(baseDir_s, 'client', 'templates', 'usersetting.pug');
        this.compiledUserSettingTemplate_p = PUG.compileFile(path_s);

        path_s = PATH.resolve(baseDir_s, 'client', 'templates', 'provideevents.pug');
        this.compiledProvideEventsTemplate_p = PUG.compileFile(path_s);

        path_s = PATH.resolve(baseDir_s, 'client', 'templates', 'analyze.pug');
        this.compiledAnalyzeTemplate_p = PUG.compileFile(path_s);
    }

    home_px(data_apl) {
        let markup_s = this.compiledHomeTemplate_p({ allLocalEvents_apl: data_apl });
        return markup_s;
    }

    userList_px(data_apl) {
        let markup_s = this.compiledUserListTemplate_p({ allLocalEvents_apl: data_apl });
        return markup_s;
    }

    userSetting_px(data_opl) {
        let action_s;
        if (data_opl["id_s"] == "0") {
            action_s = "create";
        } else {
            action_s = "save";
        }
        let markup_s = this.compiledUserSettingTemplate_p({ action_s: action_s, localEvent_opl: data_opl });
        return markup_s;
    }
    eventSetting_px(data_apl) {
        let markup_s = this.compiledEventSettingTemplate_p({ allLocalEvents_apl: data_apl });
        return markup_s;
    }

    provideEvents_px(data_apl) {
        let markup_s = this.compiledProvideEventsTemplate_p({ allLocalEvents_apl: data_apl });
        return markup_s;
    }

    analyze_px(data_apl) {
        let markup_s = this.compiledAnalyzeTemplate_p({ allLocalEvents_apl: data_apl });
        return markup_s;
    }

}
module.exports = new LocalEventView_cl();
// EOF