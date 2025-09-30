# koishi-plugin-default-auth-zero

一个用于 Koishi 的插件：  
**保证新用户的权限等级 (`authority`) 默认为 0，而不是 Koishi 默认的 1。**

---

## ✨ 功能
- 将新注册用户的权限等级默认设置为 **0**。  
- 避免用户初始时就获得不必要的权限。  
- 对已经存在于数据库中的“刚创建就成了 1 的新用户”，会自动降级为 0。  

---

## 📦 安装
```bash
npm i koishi-plugin-default-auth-zero
