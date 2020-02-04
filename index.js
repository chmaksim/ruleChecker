var fs = require('fs');

class Rule {
    constructor({id, rule}){
        this.id = id;
        this.rule = new RegExp(rule);
        this.warnings = [];
    }

    pushWarning(warn){
        this.warnings.push(warn)
    }

    check(element){
        if (typeof element !== 'string') {
            throw new Error('pass string'); 
        }
        let warn = false;
        if (Boolean(element.match(this.rule))) {
            warn = `${element} not pass ${this.rule}`;
            this.pushWarning(warn);
        }
        return warn;
    }
}

var _rules = [];

function initialize({directoryPath, rules}) {
    _rules = [];
    if (rules && Array.isArray(rules)){
        _rules = rules.map(rule => new Rule(typeof rule === 'object' ? rule : {rule})); 
    } else if (typeof directoryPath === 'string') {
        let fileNames = fs.readdirSync(directoryPath).filter(name => name.match(/.*.\.rule$/));
        fileNames.forEach(fileName => {
            try {
                let rule = JSON.parse(fs.readFileSync(directoryPath + fileName, 'utf8'));
                if (rule.rule) {
                    _rules.push(new Rule(rule));
                } else {
                    throw new Error();
                }
            } catch {
                // console.log('bad file format');
            }
        });
    }
}

function checkRule(element) {
    let result = false;
    _rules.forEach(rule => {
        singleResult = rule.check(element);
        if (singleResult) {
            if (!result) {
                result = [];
            }
            result.push(singleResult)
        }
    });
    return result;
}

module.exports = {
    checkRule,
    initialize
}
