import { paramMap } from "../common/paramMap";
import {
  IProperty,
  IEnumeration,
  IAll_Type,
  IComment,
} from "../types-json/types.d";
import Style from "../styles";

/**
 * 去除字符模板的前面的空格 (只去除了默认的 \n, 必须换行情况可以使用 \n)
 * @param target
 * @param name
 * @param descriptor
 */
function delStringPreTab(
  target: unknown,
  name: string,
  descriptor: PropertyDescriptor
) {
  const value = descriptor.value;
  descriptor.value = function (...e) {
    return value
      .apply(this, e)
      ?.replace(/\n[^\S\n]*/g, "\n")
      .replace(/\n\n\n/g, "\n\n")
      .trim();
  };
  return descriptor;
}

/**
 * 属性方法输出 md
 */
class Templates {
  constructor() {}

  @delStringPreTab
  TProperty(prop: IProperty) {
    if (!(prop && prop.name)) {
      throw new Error("TProperty： 没有属性名");
    }

    // 描述单独拿出来前置
    const descriptions = prop.comment?.tags?.filter(
      (tag) => paramMap(tag.tag).en === "description"
    );
    const _descriptions =
      descriptions && descriptions.length > 0
        ? descriptions
            .map((_d) =>
              _d.text
                .split("\n")
                ?.map((dec) => (dec ? `> ${dec}\n` : ""))
                .join("")
            )
            .join("\n")
        : "";

    // 复原代码样式
    let _code = ``;

    /**
     * **入参**
     * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
     * ┃   name  ┃   type(TODO:)  ┃  description  ┃
     * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
     */
    let params = prop.comment?.tags?.filter(
      (tag) => paramMap(tag.tag).en === "param"
    );
    const _param =
      params && params.length > 0
        ? `<table>
        <tr>
          <th>参数名</th>
          <th>描述</th>
        </tr>
        ${params
          .map((_p) => {
            return `<tr>
            <td>${_p.param}</td>
            <td>${_p.text}</td>
          </tr>`;
          })
          .join("")}
      </table>
    `
        : "";

    const _tagsAndExplanations = this.dealWithComments(prop.comment, [
      "description",
      "param",
    ]);

    // type 映射
    _code += this.dealWithTypes(prop.type);

    const codeTemplate = _code
      ? `
    \`\`\`ts
    ${_code}
    \`\`\``
      : ``;

    // 是映射方法的加个 "()"
    const tail = ["reflection"].includes(prop.type.type) ? "()" : "";
    const _name = prop.name + tail;

    return `

    ${Style.setTitle([_name, prop.id], 3)}
    ${_descriptions}
    ${codeTemplate}
    ${_param}
    ${_tagsAndExplanations}

    `;
  }

  /**
   * 属性方法输出 md
   */
  @delStringPreTab
  TEnum(prop: IEnumeration) {
    if (!prop.name) {
      throw new Error("TProperty： 没有属性名");
    }

    // 描述单独拿出来前置
    const descriptions = prop.comment?.tags?.filter(
      (tag) => paramMap(tag.tag).en === "description"
    );
    let _descriptions =
      descriptions && descriptions.length > 0
        ? descriptions
            .map((_d) =>
              _d.text
                .split("\n")
                ?.map((dec) => (dec ? `> ${dec}\n` : ""))
                .join("")
            )
            .join("\n")
        : "";

    const _tagsAndExplanations = this.dealWithComments(prop.comment, [
      "description",
      "param",
    ]);

    // TODO:
    const _params = `
      | enum key | enum value | 描述 |
      | :----: | :----: | ------ |
      ${prop.children
        .map((_p) => {
          if (_p.kindString !== "Enumeration member") {
            throw new Error("TEnum 中未识别的 kindString: " + _p.kindString);
          }
          return `| ${_p.name} | ${_p.defaultValue} | ${this.dealWithComments(
            _p.comment
          )
            .replace(/\n\n/g, "<br />")
            .replace(/\n/g, "")} |`;
        })
        .join("\n")}`;

    const _name = prop.name + " $^{enum}$";

    return `
    ${Style.setTitle([_name, prop.id], 2)}
    ${_descriptions}
    ${_params}
    ${_tagsAndExplanations}
    `;
  }

  /**
   * @description 处理 Types
   *
   *
   */
  @delStringPreTab
  dealWithTypes(type: IAll_Type) {
    let typeCode = ``;

    switch (type.type) {
      case "reference":
        typeCode += type.name;
        if (type.typeArguments) {
          typeCode += "<";
          type.typeArguments.forEach((typeArgument) => {
            typeCode += this.dealWithTypes(typeArgument);
          });
          typeCode += ">";
        }
        break;

      case "intrinsic":
        typeCode += type.name;
        break;

      case "union":
        typeCode +=
          "(" +
          type.types.map((_t) => this.dealWithTypes(_t)).join(" | ") +
          ")";
        break;

      case "reflection":
        // 暂时只有 reflection
        if (type.declaration.kindString === "Type literal") {
          // 方法入参
          let parameters = "";
          // 方法返回
          let returns = "";
          // 处理 code, 还原样式
          type.declaration.signatures?.forEach((signature, index) => {
            if (signature.kindString === "Call signature") {
              // 参数
              parameters =
                signature?.parameters
                  ?.map((param) => {
                    let _type = "";

                    // 参数是 interface （如：(x: IProps) => void
                    _type = this.dealWithTypes(param.type);

                    return `${param.name}${
                      param?.flags?.isOptional ? "?" : ""
                    }: ${_type}`;
                  })
                  .join(", ") || ``;

              // 这里暂时只有：IType_intrinsic | IType_reference
              returns = this.dealWithTypes(signature.type);
            } else {
              throw new Error(
                "signatures 中未识别的 kindString: " + signature.kindString
              );
            }

            typeCode = index ? "\n" : "" + `(${parameters}) => ${returns}`;
          });
        } else {
          throw new Error(
            "reflection 中未识别的 kindString: " + type.declaration.kindString
          );
        }
        break;

      case "array":
        const r = this.dealWithTypes(type.elementType);
        typeCode = `${r}[]`;
        break;

      // 固定值
      case "literal":
        typeCode = type.value;
        break;

      default:
        throw new Error("\n\ntype.type 未定义: " + JSON.stringify(type) + "\n");
    }

    return typeCode;
  }

  /**
   * 处理注释
   * @param prop
   * @param excludes 排除的 tag
   */
  @delStringPreTab
  dealWithComments(comment: IComment, excludes: string[] = []) {
    let _tagsAndExplanations = ``;

    if (comment?.shortText) {
      _tagsAndExplanations +=
        comment.shortText
          .split("\n")
          ?.map((dec) => (dec ? `*${dec}*\n` : ""))
          .join("") + "\n\n";
    }

    comment?.tags?.forEach((tag) => {
      const { zh, en } = paramMap(tag.tag);
      if (!(zh && en)) return;

      if (excludes.includes(en)) return;

      if (!["description"].includes(en))
        _tagsAndExplanations += `${Style.setTitle([zh], 4)}\n\n`;

      switch (en) {
        case "examples":
          const examp = tag.text.replace(/(\n )/g, `\r`);
          _tagsAndExplanations += `\`\`\`ts\n${examp.replace(/^(\n*)/, "")}${
            ["\n", "\r"].includes(examp.slice(-1)) ? `` : `\n`
          }\`\`\``;
          break;
        case "description":
          _tagsAndExplanations += tag.text
            .split("\n")
            ?.map((dec) => (dec ? `> ${dec}\n` : ""))
            .join("");
          break;
        default:
          _tagsAndExplanations += `${tag.text}`;
      }

      _tagsAndExplanations += `\n\n`;
    });

    return _tagsAndExplanations;
  }
}

export default new Templates();
