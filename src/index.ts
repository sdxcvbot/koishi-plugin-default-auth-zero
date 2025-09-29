import { Context } from 'koishi'

export const name = 'default-auth-zero'

export function apply(ctx: Context) {
  ctx.middleware(async (session, next) => {
    // 只处理 onebot QQ 用户
    if (session.platform !== 'onebot' || !session.userId) return next()

    // 只选择 authority 字段，解决 TS 类型错误（必须显式传 fields）
    const user = await session.observeUser(['authority'])

    // 仅在【新创建/未设定】时设置为 0；已绑定/手动授权后的不再修改
    if (user.authority == null) {
      user.authority = 0
    }

    return next()
  })
}
