// 这是 ESLint 的配置文件
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    // 在生产环境中禁用 console 日志
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 在生产环境中禁用 debugger
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 使用 Prettier 进行代码格式化
    "prettier/prettier": [
      "error",
      {
        // 使用单引号
        singleQuote: false,
        // 在对象字面量中使用空格
        bracketSpacing: true,
        // 在多行 JSX 元素的最后一行放置 > 而不是放在下一行
        jsxBracketSameLine: false,
        // 不使用尾随逗号
        trailingComma: "es5",
        // 每行最多 120 个字符
        printWidth: 120,
        // 使用 2 个空格缩进
        tabWidth: 2,
        // 使用分号
        semi: true,
        // 不检查行尾空格
        ignoreWhitespace: true,
      },
    ],
  },
};
