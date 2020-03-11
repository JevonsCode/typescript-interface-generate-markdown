/**
 * typeToObj
 * 
 * @function 取其结构、合并嵌套 Take its structure, merge nesting
 * 
 * 2020-03-04 17:32:41
 * @TODO 注释           ✅
 *       是否必须        ✅
 * 
 * 2020-03-05 18:18:02
 * @TODO 去除 "// xxx"  ✅
 *       枚举           ✅
 *       继承           ✅
 * 
 * 2020-03-06 16:25:34
 * @TODO JSON 中继承与 js 的关联
 *       对应取值
 *       生成表格
 */

class TypeToObj {
    constructor() { }

    init (data) {
        let newData;
        let merges = [];
        let imports = [];
        let mergesExtends = [];

        newData = data.replace(/interface/g, "var")
            .replace(/(var\s?\w+\s?)(\{)/g, "$1= {")
            .replace(/\}\,/g, "}")
            .replace(/\;/g, ",")
            .replace(/export(\s+)?/g, "")
            .replace(/type \w+ \= \w+\s?(\&\s?\w+\s?)+\,?/g, (x) => {
                merges.push(x);
                return "";
            });

        // 处理 React.ComponentClass[any]
        newData = newData.replace(/React\.ComponentClass\<\w+\>/g, "React.ComponentClass");
        newData = newData.replace(/React\.KeyboardEvent\<\w+\>/g, "React.ComponentClass");

        // 处理 RegisteredStyle
        newData = newData.replace(/RegisteredStyle\<(.*)>/g, "RegisteredStyle($1)");

        // 处理 [xxx: xxx]: xxx;
        newData = newData.replace(/\[(\w+):\s?(\w+)\]\:\s?\w+\,?\;?/g, "");

        // 在 Function 之前处理 "?"
        // newData = newData.replace(/\?/g, "__readNotRequire");
        newData = newData.replace(/\?/g, "");


        // 处理 | 的关系 > " | RegExp"
        // newData = newData.replace(/([\w, \.]+(\s?\|\s?[\w, \.]+)+)\,/g, ($1) => `[${$1.replace(/\|/g, ",")}],`);
        newData = newData.replace(/\:\s((.+)(\s?\|\s?(.+))+\,)/g, ": [$1],");
        const orData = newData.match(/\[(.*)\|(.*)\]/g);
        orData && orData.length > 0 && orData.forEach(element => {
            const ele = element.replace(/\|/g, ",\n");
            newData = newData.replace(element, ele);
        });

        newData = newData.replace(/RegExp/g, "_RegExp");

        // 处理 Function 
        newData = newData.replace(/(\w+)\((.*)\): (\w+)/g, `$1: func({input: $2, output: $3})`);
        newData = newData.replace(/\(?\((.*)\)\s?\=\>\s?(\w+)\)?/g, "func({input: $1, output: $2})");
        newData = newData.replace(/func\(\{input:\s?(.*)\,\s?output/g, ($1, $2) => `func({input: ${$2 ? "{" + $2 + "}" : "undefined"}, output`);
        newData = newData.replace(/output\:\s?void/g, "output: undefined");

        // 处理 Array[xxx]
        newData = newData.replace(/Array\<\s?(.*)\s?\>/g, "arr($1)");
        newData = newData.replace(/(\w+)\[\]/g, "arr($1)");

        // 处理 input
        newData = newData.replace(/(import.*from ((\"|\').*(\"|\'))(\,)?)/g, (i) => {
            imports.push(i.replace(",", ";"));
            return ""; // 去掉 input
        });

        // 处理枚举
        newData = newData.replace(/enum\s+(\w+)\s+\{/g, "var $1 = {");
        newData = newData.replace(/(\w+)\s?=\s?(\"\w+\")/g, "$1: $2"); // 替换枚举里的等号 这个规则应该只有枚举的匹配

        // var IKeyboardInputProps = { ..._IKeyboardInputProps, inherit_read_: [IKeyBoardProps] };
        // 处理 extends
        let extendsDataArr = [];
        newData = newData.replace(/(\w+)\s+extends\s+(.*)\s+\{/g, ($0, $1, $2) => {
            extendsDataArr = [{ keyName: $1, extendsed: $2 }]
            return `_${$1} = {`;
        });
        mergesExtends = extendsDataArr.map(exteItems => {
            if (!exteItems) return;
            return `var ${exteItems.keyName} = {..._${exteItems.keyName}, ...${exteItems.extendsed}, extendsCommbine_read_: [\"${exteItems.extendsed}\"]};`
        });

        // 处理 interface 的合并 &
        merges = merges.map(mergeItem => {
            let mi = mergeItem.replace(/\s/g, "").replace(/\,/g, "");
            const arr = mi.split(`=`);
            arr[0] = arr[0].replace("type", "var ");
            arr[1] = ` {...${this.delSp(arr[1]).replace(/&/g, ", ...")}, andCombine_read_: [\"${this.delSp(arr[1]).replace(/&/g, "\", \"")}\"]};`;
            const re = arr.join("=");

            return re;
        });


        // 拼接页面内容 imports.join("\n") newData merges
        const spliceNewData = {
            data: newData, // long long String
            merges, // array
            mergesExtends, // array
            imports // array
        }
        return spliceNewData;
    }

    /**
     * 删除前后空格
     * @param {string} str 
     */
    delSp (str) {
        if (!str) return;
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
}

module.exports = new TypeToObj();