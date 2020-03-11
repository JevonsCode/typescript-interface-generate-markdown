const fs = require("fs");
const path = require('path');
const TypeToObj = require("./typeToObj");
const { def } = require("./definition");
const ObCon = require("./readFileContent");


// read file contents
const data = fs.readFileSync(`./example/type.d.ts`).toString();

const obCom = ObCon.init(data);
// write json
const fileJson = path.join(__dirname, `../write/type.json`);
fs.writeFile(fileJson, obCom, function (err) {
    if (err) return console.error(err);
});


const spliceNewData = TypeToObj.init(data);

// format contents
let writeData = `
${def}

${spliceNewData.data}

${spliceNewData.mergesExtends.join("\n")}

${spliceNewData.merges.join("\n")}
`;
const splitWriteData = writeData.split(/\n/);
// get all of interface KEYs
let keyCombine = ``;
splitWriteData.forEach(wItem => {
    const w = wItem.match(/var\s(\w+)\s\=/);
    if (w && Array.isArray(w) && w[1]) {
        keyCombine += ` ${w[1]},`
    }
});
keyCombine = `\n\nmodule.exports = {${keyCombine}};`;
writeData += keyCombine;

const fileJs = path.join(__dirname, `../write/type.js`);
fs.writeFile(fileJs, writeData, function (err) {
    if (err) return console.error(err);
});
