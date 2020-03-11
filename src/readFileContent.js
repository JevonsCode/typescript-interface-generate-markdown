/**
 * @function get Comments & "?"
 * 
 * split code with lines
 * get interface name util next interface key-name , that contents put into interface name object
 * 
 * get comment: find all "@default" and "@desc" keys . Take out the following text and put it in the next key-name
 * get is it necessary (?): Find out if each line contains "?" add to previous key-name
 */
const { delSp } = require("./typeToObj");

class ObCon {
    constructor() { }

    init (data) {
        let obData = {}; // 合成的内容
        let obDefault; // 获取一个 default 直到获取到参数，然后将这个值置空
        let obDesc; // 获取一个 desc 直到获取到参数，然后将这个值置空
        let matryoshkaObjName; // obj 嵌套 obj 嵌套 obj 嵌套 ob... 所以说无论何时数据最好不要写那么多嵌套
        let matryoshkaObjNamePreSpacesLength; // 上一个字段前面的空格 用来匹配大括号

        // 把传过来的一页代码按照行来划分
        const lineString = data.split(/\n/);

        let interfaceName; // 当前的 interface name
        lineString.forEach(item => {
            // 排除空行
            if (!delSp(item)) return;
            // 排除 [key: string]: any;
            if (delSp(item).match(/^\[\w+:\s?\w+\]/)) return;
            // 排除 import
            if (delSp(item).match(/^import/)) return;
            // 排除 "//" 
            if (delSp(item).match(/^\/\//)) return;

            // interface xxx 那一行
            // const interfaceLine = item.match(/interface\s+(\w+)\s*(extends)?\s?+((\w+)?)\s*\{/);
            let interfaceLine;
            if (item.includes("interface")) {
                if (item.match(/interface\s+(\w+)\s*extends\s+(\w+)\s*\{/)) {
                    interfaceLine = item.match(/interface\s+(\w+)\s*extends\s+(\w+)\s*\{/);
                    interfaceLine[1] = `_${interfaceLine[1]}`
                } else if (item.match(/interface\s+(\w+)\s*\{/)) {
                    interfaceLine = item.match(/interface\s+(\w+)\s*\{/);
                }
            }
            // 把名字赋值给 "现在的 interface 名字"
            if (interfaceLine && Array.isArray(interfaceLine) && interfaceLine[1]) {
                interfaceName = interfaceLine[1];
                // 让 obData 中有这个 name
                obData[interfaceName] = {};
                return;
            }

            if (!interfaceName) return;

            const defaultLine = item.match(/\@default\s+(.*)/);
            const descLine = item.match(/\@desc\s+(.*)/);

            if (defaultLine && Array.isArray(defaultLine) && defaultLine[1] && delSp(defaultLine[1])) {
                obDefault = delSp(defaultLine[1]);
            }

            if (descLine && Array.isArray(descLine) && descLine[1] && delSp(descLine[1])) {
                obDesc = delSp(descLine[1]);
            }

            // 清除 matryoshkaObjName 判断：当前行是 }; 或 } 且 和 matryoshkaObjName 的 line 前面空格一样
            if (matryoshkaObjName && item.match(/^(\s+)\}\;?(\s+)?/)) {

                if (this.spacesLength(item) === matryoshkaObjNamePreSpacesLength) {
                    matryoshkaObjName = undefined;
                }

                return;
            }

            const keyLine = item.match(/(\w+)(\?)?(\(.*\))?\:\s+(.*)/); // 0 行值 1 key name 2 "?" 3 (.*)
            if (keyLine && Array.isArray(keyLine) && keyLine[1]) {
                // 去掉这一行前后的空格
                const delSpKeyLine = delSp(keyLine[0]);

                // 多级嵌套 TODO ！

                // 如果这一行最后一位是 {
                if (delSpKeyLine[delSpKeyLine.length - 1] === "{") {
                    matryoshkaObjName = keyLine[1]; // 走这里 x(lim(x→1)) 的概率接下来是 obj 嵌套，除非有很奇葩的格式
                    matryoshkaObjNamePreSpacesLength = this.spacesLength(item);
                    obData[interfaceName][matryoshkaObjName] = {
                        require_read_: !keyLine[2],
                        default_read_: obDefault,
                        desc_read_: obDesc,
                        children: {}
                    };
                    return;
                }

                if (delSpKeyLine) {

                }
                if (matryoshkaObjName) {
                    obData[interfaceName][matryoshkaObjName].children[keyLine[1]] = {
                        require_read_: !keyLine[2],
                        default_read_: obDefault,
                        desc_read_: obDesc,
                    }
                } else {
                    obData[interfaceName][keyLine[1]] = {
                        require_read_: !keyLine[2],
                        default_read_: obDefault,
                        desc_read_: obDesc
                    }
                }

                if (obDefault || obDesc) {
                    obDefault = undefined;
                    obDesc = undefined;
                }
            }

        });
        //         return `const jsonData = \`${JSON.stringify(obData)}\`
        // module.exports = JSON.parse(jsonData);`;
        return JSON.stringify(obData);
    }

    // 前面有几个空格
    spacesLength (str) {
        if (typeof str !== "string") return null;
        const count = str.match(/^(\s+)((\}\;?)|(\w+\??))/)[1];
        if (!count) return 0;
        return count.length;
    }
}

module.exports = new ObCon();