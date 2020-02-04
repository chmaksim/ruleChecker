const { expect } = require('chai');
const { checkRule, initialize } = require('../index');

describe("rule checker tests", function () {

    this.timeout(2000);
    const directoryPath = './test/rules/';

    it("Test 1 (get files from directory)", () => {
        const element = '666';
        initialize({directoryPath});
        result = checkRule(element);
        expect(Boolean(result)).equal(true);
    });
    
    it("Test 2 (get files from array)", () => {
        const element = '5';
        let rules = [];
        let fs = require('fs');
        let fileNames = fs.readdirSync(directoryPath).filter(name => name.match(/.*.\.rule$/));
        fileNames.forEach(fileName => {
            try {
                let rule = JSON.parse(fs.readFileSync(directoryPath + fileName, 'utf8'));
                if (rule.rule) {
                    rules.push(rule);
                } else {
                    throw new Error();
                }
            } catch {
                // console.log('bad file format');
            }
        });
        initialize({rules});
        result = checkRule(element);
        expect(Boolean(result)).equal(true);
    });
});

