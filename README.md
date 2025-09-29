# koishi-plugin-default-auth-zero

**作用**：仅将**新绑定/首次出现且未设权限**的 **OneBot(QQ)** 用户权限设置为 **0**（`authority = 0`）。  
> **不会修改**已经绑定过的用户，**不会覆盖**你手动授权过的权限。

---

## 功能点
- 中间件方式拦截 OneBot(QQ) 会话；仅当用户的 `authority == null`（未设定）时，写入 `0`。
- 不影响其他平台用户。
- 与群管/白名单/黑名单等插件搭配，先统一权限基线更安全。

## 安装
**插件市场**搜索 `koishi-plugin-default-auth-zero` 或命令行：
```bash
npm i koishi-plugin-default-auth-zero
# 或 pnpm add koishi-plugin-default-auth-zero
# 或 yarn add koishi-plugin-default-auth-zero
```
安装后在 Koishi 控制台启用即可，无需额外配置。

## 使用说明
- 新用户（通过 OneBot/QQ 首次发消息，数据库中还没有 `authority`）会被设为 `0`。
- 已经存在且你曾手动设过权限（无论正/负），插件**不会**再改动。
- 若要临时保留正权限的新用户，可先停用插件后进行授权。

## 工作原理
- 仅处理 `session.platform === 'onebot' && session.userId` 的会话。
- 通过 `session.observeUser(['authority'])` 只读取 `authority` 字段；
- 若 `user.authority == null`，则写回 `0`。

## 兼容性
- 需要 **Koishi v4+**
- Node.js **16+**
- 依赖 **database** 服务（用于 `observeUser`）

## 开发与发布
源码位于 `src/`，编译产物在 `lib/`。已配置 `prepublishOnly` 自动构建：
```bash
npm i
npm run build
npm publish --access public
# 之后更新先修改 package.json 的 version，再 npm publish
```

## 变更日志
- **1.0.4**
  - 修正 `package.json` 中 `koishi.description` 的结构为多语言对象；新增 `service.required=["database"]`。
  - README 改为“仅新绑定为 0，已绑定/手动授权不改”的描述。
- **1.0.3**
  - 修复 TS：`observeUser(['authority'])` 以避免类型错误；仅在 `authority == null` 时赋值为 0。
- **1.0.2**
  - 切换为 TypeScript 项目结构，新增 `src/`、`tsconfig.json`、构建脚本。
- **1.0.1**
  - 完善 `package.json` 与 README。
- **1.0.0**
  - 初始版本（JS）。

## 许可证
[MIT](./LICENSE)
