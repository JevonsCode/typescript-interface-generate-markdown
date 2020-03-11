const path = require('path');
const fs = require('fs');
const TYPE = require("../../write/type.js");
const JsonDataFile = path.join(__dirname, "../../write/type.json");
let JsonData = fs.readFileSync(JsonDataFile);
JsonData = JSON.parse(JsonData);

let combineData = {};
const commbineName = {
    and: "andCombine_read_",
    extendsTo: "extendsCommbine_read_"
}

// TYPE(IKeyBoardProps)

function Traversal (typeName) {
    let jsonTypeName;
    let jsTypeName = TYPE[typeName];

    if (!jsTypeName || !(jsTypeName instanceof Object)) {
        return false;
    };

    if (jsTypeName.hasOwnProperty(commbineName.and)) {
        let _and = jsTypeName[commbineName.and];
        if (!_and || !(Array.isArray(_and))) return;
        _and = [..._and];
        delete jsTypeName[commbineName.and];

        _and.forEach(a => {
            let valueCorresponding = JsonData[a];
            if (!valueCorresponding) {
                if (TYPE[a].hasOwnProperty(commbineName.extendsTo)) {
                    delete jsTypeName[commbineName.extendsTo];
                    valueCorresponding = JsonData[`_${a}`];
                }
            }
            jsonTypeName = { ...jsonTypeName, ...valueCorresponding }
        });
    } else if (jsTypeName.hasOwnProperty(commbineName.extendsTo)) {
        let _extends = jsTypeName[commbineName.extendsTo];
        if (!_extends || !(Array.isArray(_extends))) return;
        _extends = [..._extends];
        delete jsTypeName[commbineName.extendsTo];

        __extend = _extends[0];
        let extendsCorresponding = JsonData[__extend];
        if (!extendsCorresponding) return false;
        let keyName = JsonData[`_${typeName}`];
        if (!keyName) return false;
        jsonTypeName = { ...keyName, ...extendsCorresponding };
    } else {
        jsonTypeName = JsonData[typeName];
    }

    return { jsTypeName, jsonTypeName }
}

// ----------------------------- C R E A T ----------------------------------
function createTable (typeName) {
    const rData = Traversal(typeName);
    if (!rData) return " ⚠️ 一定是传值有问题！"
    const { jsTypeName, jsonTypeName } = rData;
    if (!jsTypeName || !jsonTypeName) return "<b style=\"color: red;\">又又又又又出 <span style=\"font-size: 100px;\">BUG</span> 了，整个人都不好了 : ( </b>"

    let tableHtml = `
    <table>
    <tr>
        <th>参数名</th>
        <th style="width: 260px;">类型</th>
        <th>说明</th>
        <th>是否必传</th>
        <th>默认</th>
    </tr>`;

    const typeFilter = (i) => {
        // 或的关系
        if (Array.isArray(i)) {
            let types = i.map(ii => ii.type).join(" </u>or<u> ");
            return (
                `<td>
                    <u>${types}</u>
                </td>
                `
            )
        }

        // 没有 type 情况 枚举 & 有子集
        if (!i.type) {
            let types = [];
            let children = [];

            for (const t_key in i) {
                if (typeof i[t_key] === "string") types.push(i[t_key]);
                if (typeof i[t_key] === "object") children.push(i[t_key]);
            }
            if (types.length !== 0) {
                return (
                    `<td>
                    <span style="background: #2228;  border-radius: 3px; text-align: left; padding: 1px 4px; color: #fff;">ENUM</span>&nbsp;&nbsp;
                        <u>${types.join("</u> , <u>")}</u>
                    </td>
                    `
                )
            }
            if (children.length !== 0) {

                let childrenTable = [];
                for (const childKey in i) {
                    if (!childKey || !i[childKey]) return;
                    childrenTable.push(`<tr style="">
                            <td>${childKey}</td>
                            <td>${i[childKey].type}</td>
                        </tr>
                    `);
                }

                return `
                <td><div>
                    <table style="font-size: 10px;">
                        ${childrenTable.map(i => i).join("")}
                    </table>
                </div>
                </td>
                `
                // <tr>
                //     <th>参数名</th>
                //     <th>类型</th>
                //     <th>说明</th>
                //     <th>是否必传</th>
                //     <th>默认</th>
                // </tr>
            }
        }

        const t = i.type;



        if (t === "Function") {
            return (
                `<td>
                    <div>
                    <div style="float: left; width: 70px;">${t}</div>
                    <div style="float: left; min-width: 100px;">
                        <div style="margin-bottom: 4px; color: #2228;"><span style="background: #2228;  border-radius: 3px; text-align: left; padding: 1px 4px; color: #fff;">input</span> ${i.input || ""}</div>
                            <div style=" color: #2228;"><span style="background: #2228; border-radius: 3px; text-align: left; line-height: auto; padding: 1px 4px; color: #fff;">output</span> ${i.output || ""}</div>
                        </div>
                    </div>
                </td>
                `
            )
        }
        if (Array.isArray(t)) {
            return (
                `<td>
                    <div style="background: #5555">${t.toString()}</div>
                </td>
                `
            )
        }
        if (0) {

        }

        return `<td>${t}</td>`
    }

    /**
     * 写这个还要注意前后顺序，以后有好的办法重新优化 TODO
     */
    for (const x in jsTypeName) {
        if (x && jsTypeName[x]) {
            tableHtml += `
        <tr>
            <td>${x}</td>
            ${typeFilter(jsTypeName[x]) || "-"}
            <td>${jsonTypeName[x] && jsonTypeName[x].desc_read_ || "-"}</td>
            <td>${jsonTypeName[x] && (typeof jsonTypeName[x].require_read_ === "boolean") ? jsonTypeName[x].require_read_ : "-"}</td>
            <td>${jsonTypeName[x] && jsonTypeName[x].default_read_ || "-"}</td>
        </tr>
        `
        }
    }

    tableHtml += `</table>`;
    tableHtml = tableHtml.replace(/(    )/g, "");
    tableHtml = tableHtml.replace(/\n/g, "");
    return tableHtml;
}

const htmlData = createTable("BadgeProps");

const fileJson = path.join(__dirname, `../../write/demo.md`);
fs.writeFile(fileJson, htmlData, function (err) {
    if (err) return console.error(err);
});