/*
 * @Author: WuDaoTingFeng.yzh 2683849644@qq.com
 * @Date: 2023-03-24 22:50:19
 * @LastEditors: WuDaoTingFeng.yzh 2683849644@qq.com
 * @LastEditTime: 2023-03-27 22:05:29
 * @FilePath: \ol_vue2\babel.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

let plugins = [];
if (IS_PROD) {
  plugins.push("transform-remove-console");
}
plugins = [
  ...plugins,
  [
    "component",
    {
      libraryName: "element-ui",
      styleLibraryName: "theme-chalk",
    },
  ],
];
module.exports = {
  presets: [
    ["@vue/app", { useBuiltIns: "entry" }],
    ["@babel/preset-env", { modules: false }],
  ],
  plugins: plugins,
};
