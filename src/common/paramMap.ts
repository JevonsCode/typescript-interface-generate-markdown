/**
 * @param paramName 参数 key
 * @description 将 解释 key 转换
 */
export const paramMap = (paramName: string) => {
  switch (paramName) {
    case "name":
      return {
        en: "name",
        zh: "名称"
      };

    case "desc":
    case "description":
      return {
        en: "description",
        zh: "描述"
      };

    case "return":
    case "returns":
      return {
        en: "returns",
        zh: "返参解释"
      };

    case "example":
    case "examples":
      return {
        en: "examples",
        zh: "示例"
      };

    case "tip":
    case "tips":
      return {
        en: "tips",
        zh: "注意"
      };

    // 特定 key, 会单独输出 params
    case "param":
      return {
        en: "param",
        zh: "参数"
      };

    default:
      return {
        en: paramName,
        zh: paramName
      }
  }
}