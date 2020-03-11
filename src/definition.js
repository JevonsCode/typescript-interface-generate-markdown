/**
 * genterate types define
 */
const def = `
const any = {
    type: "any"
};
const string = {
    type: "String",
}
const boolean = {
    type: "Boolean",
};
const number = {
    type: "Number",
};
function typeJudge(typeData) {
    if (!typeData) return "-";
    if ((typeof typeData.type) === "string") return typeData.type;
    if ((typeof typeData) === "object" && typeData instanceof Object) {
        const tps = [];
        for (const keyType in typeData) {
            tps.push(typeJudge(typeData[keyType]));
        }
        if (tps.length > 0) return "(" + tps.join(", ") + ")";
    }
    return "有其他类型没考虑到 来改";
}
const func = (x) => {
    return {
        type: "Function",
        input: typeJudge(x.input),
        output: typeJudge(x.output)
    }
};
const React = {
    ComponentClass: {
        type: 'React.ComponentClass'
    },
    KeyboardEvent: {
        type: 'React.KeyboardEvent'
    }
};
const arr = (x) => {
    return {
        type: "Array",
        param: x || any,
    }
}
const RegisteredStyle = (x) => {
    return {
        type: "RegisteredStyle",
        param: x || any,
    }
}

const _RegExp = {
    type: "RegExp"
}
`;


module.exports = { def }