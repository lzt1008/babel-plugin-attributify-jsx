import type { NodePath } from "@babel/core";
import { JSXOpeningElement, stringLiteral } from "@babel/types";
import { declare } from "@babel/helper-plugin-utils";

export default declare(() => {
  const visitor = {
    JSXOpeningElement: (path: NodePath<JSXOpeningElement>) => {
      const attributes = path.node.attributes;
      attributes.forEach((attr) => {
        if (
          attr.type === "JSXAttribute" &&
          !attr.value
        ) {
          attr.value = stringLiteral("");
        }
      });
    },
  };

  return {
    name: "plugin-attributify-jsx",
    visitor: {
      Program(path) {
        path.traverse(visitor);
      },
    },
  };
});
