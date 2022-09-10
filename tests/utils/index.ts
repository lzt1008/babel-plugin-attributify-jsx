import * as babel from "@babel/core";
import pluginAttributifyJSX from "../../src/index";

const transform = (code: string) =>
  babel.transformSync(code, {
    plugins: [pluginAttributifyJSX],
    presets: ["@babel/preset-react"],
  });

export { transform };
