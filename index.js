const fs = require('fs')
    , path = require('path');

const dissectors = {};

const files = fs.readdirSync(path.join(__dirname, 'dissectors'));

function exec(dissector) {
    let regex = dissector.regex
        , map = dissector.map
        , type = dissector.type;

    return function (string) {
        let matches = string.match(regex)
            , ret = {};

        if (!matches) return null;
        for (let k in map) {
            let v = map[k];
            ret[v] = matches[k];
        }

        ret.type = type;
        return ret;
    }
}

for (let i = 0; i < files.length; i++) {
    let module = require(path.join(__dirname, 'dissectors', files[i]));
    if (!module || !module.regex || !module.map || !module.type) continue;
    module.dissect = exec(module);
    dissectors[module['type']] = module;
}

exports.dissectors = dissectors;
