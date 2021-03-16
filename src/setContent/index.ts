import { IJSON, IModule } from "../types-json/types.d"
import { makeFile } from "../common/mkFile";
import { outDir } from "../config";
import GenterateModule from "../genterate-module";
import Store from "../common/store";

interface ISetContent {
  modus?: "mkfile" | "insertHtml"
}

class SetContent {
  modus: ISetContent["modus"];
  files: string[] = [];

  constructor(p: ISetContent) {
    p.modus && (this.modus = p.modus);

    this.init();
  }

  async init() {
    await this.mkfileProgressBar();
  }

  /**
   * 按照 module 生成文件
   * @param interfaceFileItem 
   */
  async insertModuleContent(moduleContent: IModule) {
    if (this.files.includes(moduleContent.name)) {
      moduleContent.name += "_copy"
    }

    const content = new GenterateModule(moduleContent);
    await content.init();
    await makeFile(outDir + "/" + moduleContent.name + ".md", content.content);
    this.files.push(moduleContent.name);
  }

  /**
   * 生成进度条
   */
  async mkfileProgressBar() {
    const JSON = require("../types-json/types") as IJSON;

    const contentDataArray = JSON.children;

    if (!(contentDataArray && contentDataArray.length)) {
      throw new Error("JSON 为空，若未执行\n\n请先执行: yarn type\n");
    }

    let count = 0;

    for (let index = 0; index < contentDataArray.length; ++index) {
      const child = contentDataArray[index];

      if (child.name.match(/^(index)/)) continue;

      const regExp = new RegExp(`^(\-){${index + 1}}`);
      const pr = contentDataArray.map(f => "-").join("").replace(regExp, (new Array(index + 1).join("=")));

      console.log(`[${pr}-]`, "开始生成", child.name);

      count++;

      await this.insertModuleContent(child);
    }

    console.log(`[${contentDataArray.map(f => "=").join("")}]`, "全部生成成功 ✔️ \n\n共计: " + count + " 个");

    await this.mkReadme();
    console.log("\nREADME.md 已生成\n");
  }

  /**
   * 生成 readme 给 git pages 使用
   */
  async mkReadme() {

    const header = `

    
\n\n`;

    const readme = Store.mkFile.map(fileInfo => {
      let content = `## [${fileInfo.name}](./${fileInfo.fileName}.md)\n\n${fileInfo.desc.replace(/\n/g, "")}`;

      return content;
    }).join("\n\n");

    await makeFile(outDir + "/README.md", header + readme);
  }
}

/**
 * 默认是生成文件且插入内容
 */
SetContent.prototype.modus = "mkfile"

export default SetContent