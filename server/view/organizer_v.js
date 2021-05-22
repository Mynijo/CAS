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
        this.compiledListTemplate_p = PUG.compileFile(path_s);

    }

    list_px(data_apl) {
        let markup_s = this.compiledListTemplate_p({ allLocalEvents_apl: data_apl });
        return markup_s;
    }
}
module.exports = new LocalEventView_cl();
// EOF