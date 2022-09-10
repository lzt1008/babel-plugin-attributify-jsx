# babel-plugin-attributify-jsx

Support JSX valueless attributify

```jsx
() => (
  <div flex px text-4xl animate-spin>
  </div>
)
```

Will be transformed to:

```jsx
() => (
  <div flex="" px="" text-4xl="" animate-spin="">
  </div>
)
```

<details>
<summary>Without this transformer</summary>

React's JSX trasnformer by default will treat valueless attributes as boolean attributes.

```jsx
() => (
  <div flex={true} px={true} text-4xl={true} animate-spin={true}>
  </div>
)
```

</details>

## Install

```bash
npm i -D babel-plugin-attributify-jsx
```

```ts
// vite.config.js
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-attributify-jsx"],
      },
    }),
  ],
});

```

## Caveats

> ⚠️ Because of the JSX rule, attribute name can't contain `[` `]` `:` `%`, so there are several restriction when using

```html
<div translate-x-100% /> <!-- cannot end with `%` -->

<div hover:text-2xl /> <!-- cannot contain `:` -->

<div translate-x-[100px] /> <!-- cannot contain `[` or `]` -->
```

Instead, you may want to use valued attributes instead:

```html
<div translate="x-100%" />

<div hover="text-2xl" />

<div translate="x-[100px]" />
```
