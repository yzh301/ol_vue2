/*
 * @Author: WuDaoTingFeng.yzh 2683849644@qq.com
 * @Date: 2023-03-27 20:57:38
 * @LastEditors: WuDaoTingFeng.yzh 2683849644@qq.com
 * @LastEditTime: 2023-03-27 20:58:19
 * @FilePath: \ol_vue2\src\untils\function.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const variableJudge = (obj, keyName) => {
  if (!obj) return null;
  let keys = (keyName + "").split(".");
  let tempObj = obj;
  for (let i = 0; i < keys.length; i++) {
    if (!tempObj) return;
    if (keys[i] !== "") tempObj = tempObj?.[keys[i]];
  }
  return tempObj;
};
