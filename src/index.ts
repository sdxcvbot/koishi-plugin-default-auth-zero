import { Context } from 'koishi'

export const name = 'default-auth-zero'

export function apply(ctx: Context) {
  ctx.middleware(async (session, next) => {
    if (!session.userId) return next()

    // 不带字段列表，避免 TS keyof 冲突
    const user = await session.observeUser()

    // 兜底：如果没拿到用户对象，直接放行
    if (!user) return next()

    const isEmptyObject = (v: any) =>
      v != null &&
      typeof v === 'object' &&
      !Array.isArray(v) &&
      Object.keys(v).length === 0

    // 这些字段有的版本没有，统一用 any + 可选链拿
    const nameEmpty = !user.name
    const flagZero = (user as any).flag === 0 || user.flag === 0
    const permsEmpty = Array.isArray((user as any).permissions)
      ? (user as any).permissions.length === 0
      : true
    const usageEmpty = isEmptyObject((user as any).usage) || (user as any).usage == null
    const timersEmpty = isEmptyObject((user as any).timers) || (user as any).timers == null

    const isNewUser =
      nameEmpty && flagZero && permsEmpty && usageEmpty && timersEmpty

    // A: authority 为空（某些老库可能）→ 设 0
    // B: authority 是默认 1 且判断为“新用户” → 设 0
    if (user.authority == null || (user.authority === 1 && isNewUser)) {
      user.authority = 0
    }

    return next()
  })
}
