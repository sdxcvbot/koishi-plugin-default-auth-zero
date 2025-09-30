import { Context } from 'koishi'

export const name = 'default-auth-zero'

// 必须声明 database 依赖，否则会报 property database is not registered
export const inject = ['database']

export function apply(ctx: Context) {
  // ① 数据库层：把 authority 默认值改成 0，新建用户直接是 0
  ctx.model.extend('user', {
    authority: { type: 'unsigned', initial: 0 },
  })

  // ② 运行期兜底：把“疑似新用户且默认成 1”的降到 0（兼容数据库里已存在的数据）
  ctx.middleware(async (session, next) => {
    if (!session.platform || !session.userId) return next()

    const user = await ctx.database.getUser(
      session.platform,
      session.userId,
      ['authority', 'name', 'flag'] as any,
    ) as any

    if (!user) return next()

    // 简单判定“新用户”的条件：名字为空 + flag=0
    const isNewUser = (!user.name || user.name === '') && (user.flag === 0 || user.flag == null)

    if (user.authority == null || (user.authority === 1 && isNewUser)) {
      await ctx.database.setUser(session.platform, session.userId, { authority: 0 } as any)
    }

    return next()
  })
}
