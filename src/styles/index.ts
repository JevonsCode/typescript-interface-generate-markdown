
interface IStyleProp {
  form: "html" | "md"
}

function _form(target: unknown, name: string, descriptor: PropertyDescriptor) {
  const value = descriptor.value;
  descriptor.value = function (...e) {
    return value.apply(this, e)?.[this.outForm];
  }
  return descriptor;
}

class Style {
  outForm: IStyleProp['form'] = "md";

  constructor(p: IStyleProp) {
    this.outForm = p.form;
  }

  /**
   * title html
   * @param content [ 内容 ， ID ]
   * @param level 1-5
   */
  @_form
  setTitle(content: [string | number, string | number] | [string | number], level: number, clearStyle?: boolean) {
    if (!content[0]) {
      throw new Error("title 不能为空");
    }

    switch (level) {
      case 1:
        return {
          html: `<h1 id="${content[1]}">${content[0]}</h1>`,
          md: `# ${content[0]}`
        }
      case 2:
        return {
          html: `<h2 id="${content[1]}">${content[0]}</h2>`,
          md: `## ${content[0]}`
        }
      case 3:
        return {
          html: `<div style="border-radius: 3px; background-color: #efefef; padding: 3.2px 6.4px; font-size: 20px; font-weight: 700;" id="${content[1]}">${content[0]}</div>`,
          md: `### ${content[0]}`
        }
      case 4:
        return {
          html: `<h4 id="${content[1]}">${content[0]}</h4>`,
          md: `#### ${content[0]}`
        }
      case 5:
        return {
          html: `<h5 id="${content[1]}">${content[0]}</h5>`,
          md: `##### ${content[0]}`
        }
      default:
        return {
          html: `<b>${content[0]}</b>`,
          md: `**${content[0]}**`
        }
    }
  }
}

export default new Style({
  form: "md"
});