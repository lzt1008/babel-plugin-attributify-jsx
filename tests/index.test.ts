import { describe, expect, it } from "vitest";
import { transform } from "./utils";

describe("babel-plugin-attributify-jsx", () => {
  it(`should add "" to attr with empty value`, () => {
    const code = `<div flex></div>`;

    const result = transform(code);

    expect(result.code).toMatchInlineSnapshot(`
      "/*#__PURE__*/
      React.createElement(\\"div\\", {
        flex: \\"\\"
      });"
    `);
  });

  it(`should not change attr with value`, () => {
    const code = `<div flex="~" px></div>`;

    const result = transform(code);

    expect(result.code).toMatchInlineSnapshot(`
      "/*#__PURE__*/
      React.createElement(\\"div\\", {
        flex: \\"~\\",
        px: \\"\\"
      });"
    `);
  });

  it(`should not change attr of type JSXSpreadAttribute`, () => {
    const code = `<div flex="~" px data={{a: 1, b: 2}}></div>`;

    const result = transform(code);

    expect(result.code).toMatchInlineSnapshot(`
      "/*#__PURE__*/
      React.createElement(\\"div\\", {
        flex: \\"~\\",
        px: \\"\\",
        data: {
          a: 1,
          b: 2
        }
      });"
    `);
  });

  it(`should handle nested tags`, () => {
    const code = `<div flex><div px-10 text-20px>hello</div></div>`;

    const result = transform(code);

    expect(result.code).toMatchInlineSnapshot(`
      "/*#__PURE__*/
      React.createElement(\\"div\\", {
        flex: \\"\\"
      }, /*#__PURE__*/React.createElement(\\"div\\", {
        \\"px-10\\": \\"\\",
        \\"text-20px\\": \\"\\"
      }, \\"hello\\"));"
    `);
  });

  it(`should handle complex nested tags`, () => {
    const code = `
    <div
      flex
      data={{a: 1, onClick() { console.log('hello')}}}
    >
      <div
        px-10
        text-20px
        onClick={() => {
          console.log("click")
        }}
      >
      hello
      </div>
    </div>
    `;

    const result = transform(code);

    expect(result.code).toMatchInlineSnapshot(`
      "/*#__PURE__*/
      React.createElement(\\"div\\", {
        flex: \\"\\",
        data: {
          a: 1,

          onClick() {
            console.log('hello');
          }

        }
      }, /*#__PURE__*/React.createElement(\\"div\\", {
        \\"px-10\\": \\"\\",
        \\"text-20px\\": \\"\\",
        onClick: () => {
          console.log(\\"click\\");
        }
      }, \\"hello\\"));"
    `);
  });
});
