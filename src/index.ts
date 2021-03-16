import SetContent from "./setContent";
import { MkTypesTs } from "./types-json";

class COMMENCE {
  constructor() {
    this.init();
  }

  async init() {
    await MkTypesTs();

    new SetContent({});
  }
}

new COMMENCE();