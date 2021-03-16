import { IModule, IInterface, IEnumeration } from "../types-json/types.d";
import { paramMap } from "../common/paramMap";
import Templates from "./template";
import Style from "../styles";
import Store from "../common/store";

/**
 * 解析 JSON 内容生成 HTML/MD
 */
export default class GenterateTable {
  content = ``;
  module: IModule;

  constructor(module: IModule) {
    this.module = module;
  }

  async init() {
    // 仅模块生成页面
    if (this.module.kindString === "Module") {
      this.setFileHeader();
      this.dealWithInterfaces();
      this.dealWithEnums();
    } else {
      console.warn(
        "新的输出类型 (会导致输出不完整稳定，请修改脚本) ---> ",
        this.module.kindString
      );
    }
  }

  /**
   * 整个页面的标题与描述
   */
  setFileHeader() {
    const includeTitleInterface = this.module.children.find((moduleChild) => {
      return moduleChild?.comment?.tags?.find(
        (tag) => paramMap(tag.tag).en === "name"
      );
    });

    if (!includeTitleInterface) {
      throw new Error("没有找到页面标题");
    }

    const name = includeTitleInterface?.comment?.tags.find(
      (tag) => paramMap(tag.tag).en === "name"
    );
    const desc = includeTitleInterface?.comment?.tags.find(
      (tag) => paramMap(tag.tag).en === "description"
    );

    this.content += `${Style.setTitle([name?.text, name?.text], 1)}\n\n`;
    // 换行的注解前面要加上 ">"
    const _desc = desc?.text
      .split("\n")
      .map((dec) => (dec ? `> ${dec}\n` : ""))
      .join("");
    this.content += _desc + "\n" || "";

    Store.mkFile.push({
      name: name.text,
      desc: _desc,
      fileName: this.module.name,
    });
  }

  /**
   * 处理 interface
   */
  dealWithInterfaces() {
    const interfaces = this.module.children.filter(
      (child) => child.kindString === "Interface"
    ) as IInterface[];

    if (interfaces.length === 0) return;

    interfaces.forEach((interfaceItem) => {
      // (interfaceItem.kindString === "Interface")
      this.content += `${Style.setTitle([interfaceItem.name], 2)}\n\n`;

      if (!interfaceItem.comment?.tags?.find((_t) => _t.tag === "name"))
        this.content +=
          Templates.dealWithComments(interfaceItem.comment, ["name"]) + "\n\n";

      interfaceItem.children.forEach((child) => {
        // 暂时 interface Property 只有这种属性值
        if (child.kindString === "Property") {
          this.content += Templates.TProperty(child) + "\n\n---\n\n";
        } else {
          console.warn(
            "Property 新的输出类型 (会导致输出不完整稳定，请修改脚本) ---> ",
            child.kindString
          );
        }
      });
    });
  }

  /**
   * 处理 enum
   */
  dealWithEnums() {
    const enums = this.module.children.filter(
      (child) => child.kindString === "Enumeration"
    ) as IEnumeration[];

    if (enums.length === 0) return;

    enums.forEach((_enum) => {
      if (_enum.kindString === "Enumeration") {
        this.content += Templates.TEnum(_enum) + "\n\n---\n\n";
      } else {
        console.warn(
          "dealWithEnums 新的输出类型 (会导致输出不完整稳定，请修改脚本) ---> ",
          _enum.kindString
        );
      }
    });
  }
}
