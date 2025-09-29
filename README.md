# koishi-plugin-default-auth-zero

一个用于 Koishi 的插件：  
**保证新建用户的权限等级 (`authority`) 默认值为 0，而不是 Koishi 默认的 1。**

---

## ✨ 功能
- 自动将新注册用户的权限等级设置为 **0**。
- 避免用户初始时就获得不必要的权限。
- 兼容现有数据库中已经存在 `authority=1` 的新用户记录，会自动降级为 0。

---

## 📦 安装
```bash
npm i koishi-plugin-default-auth-zero
