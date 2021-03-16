import * as fs from "fs";
import { makeFile } from "../common/mkFile";

export async function MkTypesTs() {

  const readFile = () => new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/types.json`, 'utf-8', (err, data) => {
      if (data) {
        resolve(data);
        return;
      }

      throw Error("\n\n\nmake typescript file " + err + "\n\n\n")
    });
  });

  const JSONString = await readFile();

  const insertStr = `import { IJSON } from "./types.d";\n\nexport const JSON: IJSON =  ${JSONString}`;

  await makeFile(`${__dirname}/types.ts`, insertStr);
}
