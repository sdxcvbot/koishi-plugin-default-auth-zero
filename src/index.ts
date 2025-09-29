import { Context } from 'koishi'

export const name = 'default-auth-zero'

export function apply(ctx: Context) {
  // ① 从模型层把默认值改为 0（新建用户直接是 0）
  ctx.model.extend('user', {
    authority: { type: 'unsigned', initial: 0 },
  })

  // ② 运行期兜底：把“疑似新用户且默认成 1”的降到 0（兼容库中已存在的数据）
  ctx.middleware(async (session, next) => {
    if (!session.platform || !session.userId) return next()

    // 只取需要的字段，使用 any 放宽 TS 约束，兼容不同版本字段声明
    const user = await ctx.database.getUser(
      session.platform,
      session.userId,
      ['authority', 'name', 'flag'] as any,
    ) as any

    if (!user) return next()

    // 用最稳妥的“空名 + flag=0”作为“新用户”特征
    const isNewUser = (!user.name || user.name === '') && (user.flag === 0 || user.flag == null)

    // A：authority 为空 → 设 0
    // B：authority 为 1 且疑似新用户 → 设 0
    if (user.authority == null || (user.authority === 1 && isNewUser)) {
      await ctx.database.setUser(session.platform, session.userId, { authority: 0 } as any)
    }

    return next()
  })
}
