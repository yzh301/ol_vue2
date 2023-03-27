module.exports = {
  ignoreFiles: ["**/*.js", "src/assets/css/element-variables.scss", "theme/"],
  extends: ["stylelint-config-standard-vue", "stylelint-config-prettier"],
  customSyntax: "postcss-html",
  rules: {
    // 允许空的样式文件
    "no-empty-source": null,
    // 允许使用未知的 at-rule，如 @extend
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["extend"],
      },
    ],
  },
};
