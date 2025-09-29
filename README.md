# koishi-plugin-default-auth-zero

让 **Koishi 新用户的 `authority` 默认值为 0**，并兼容性地把“疑似新用户且默认成 1”的降为 0。

## 为什么
部分环境中新建用户会是 `authority=1`。为避免新用户初始权限过高，本插件：
1) 通过 `ctx.model.extend('user', { authority: { initial: 0 } })` 把**默认值改为 0**；  
2) 运行期兜底：对“刚创建/未配置的用户”若发现 `authority=1`，自动降为 `0`。

## 安装
```bash
npm i koishi-plugin-default-auth-zero
