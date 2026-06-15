# 发现与决策

## 需求
- 用户要求新增“分组监控”顶部导航。
- 点击行为与“文档”一致：跳转外部链接。
- 需要支持后台配置，并放在当前文档链接所在页面附近。
- 用户强调最小改动。
- 用户要求在“用户协议 / 隐私政策”后面新增“服务条款”，并支持自己配置内容。
- 用户要求处理系统名称的统一 i18n：需要中文名称和英文名称，前端语言只保留中文和英文，系统名称可以单独设置英文显示名称。
- 用户要求“用户协议 / 隐私政策 / 服务条款”也支持英文内容，并继续写入计划，方便后续将修改合并到官方代码。
- 用户要求直接提交代码到 GitHub，并发布自己的 Docker 版本；确认保留页面中的官方版本检测。

## 研究发现
- 默认前端中，`web/default/src/features/system-settings/general/quota-settings-section.tsx` 已有 `general_setting.docs_link` 输入项。
- 顶部导航模块配置由 `HeaderNavModules` 控制，默认前端解析文件为 `web/default/src/lib/nav-modules.ts`，后台设置页配置文件为 `web/default/src/features/system-settings/maintenance/config.ts`。
- 后台导航设置页 `header-navigation-section.tsx` 的简单模块已经包含 `docs` 开关，可用同样方式加入 `groupMonitor`。
- 经典前端也存在 docs 外链逻辑，但用户截图与当前改动点指向默认前端；本次先按默认前端最小范围处理，若发现状态接口共享字段必须补后端再补。
- `controller/misc.go` 的 `/api/status` 只手动暴露了 `docs_link`，新增 `group_monitor_link` 必须在这里显式加入，否则顶部导航无法读取。
- `use-update-option.ts` 的状态缓存刷新白名单未包含 `general_setting.docs_link`，新增外链配置也需要加入，否则保存后顶部导航可能仍读旧缓存。
- 用户确认使用新 UI，因此 classic 旧 UI 不纳入本次最终改动范围；曾短暂评估 classic 顶栏后已撤回相关修改。
- 用户截图显示在新 UI 的“顶栏导航”页已经开启“分组监控”，但顶部未显示。代码原因是 `useTopNavLinks` 仅在 `group_monitor_link` 非空时显示外链，而链接输入目前在计费/额度页面，不在该导航页，容易误解。
- 当前 `.env` 使用 MySQL：`SQL_DSN=root:123456@tcp(127.0.0.1:3306)/new-api?parseTime=true`。
- `general_setting.group_monitor_link` 实际存储在数据库 `options` 表，主键列 `key`，值列 `value`。
- 只读查询确认当前数据库已有 `general_setting.group_monitor_link="https://docs.newapi.pro"`，同时 `HeaderNavModules` 里已有 `groupMonitor:true`。
- 重启前运行中的 `/api/status` 未返回 `group_monitor_link`，说明当时后端进程仍在运行旧代码。
- 重启后端后，`/api/status` 已返回 `group_monitor_link: "https://docs.newapi.pro"`。
- 现有法律文档配置在 `setting/system_setting/legal.go`，字段为 `UserAgreement` 和 `PrivacyPolicy`，注册名为 `legal`。
- 新 UI 的站点配置页通过 `SystemInfoSection` 编辑 `legal.user_agreement` 和 `legal.privacy_policy`。
- `/api/status` 返回 `user_agreement_enabled` 和 `privacy_policy_enabled`，正文分别由 `/api/user-agreement`、`/api/privacy-policy` 获取。
- 页脚、登录/注册法律勾选组件和 auth 页底部都根据 status 中的启用字段展示法律链接。
- 新增服务条款后，保存 `legal.terms_of_service` 会影响 `/api/status` 的 `terms_of_service_enabled`，需要加入 status 缓存刷新白名单。
- 新 UI 的 TanStack Router 会更新 `routeTree.gen.ts`，新增 `/terms-of-service` 路由后该生成文件也会变更。
- 认证页底部 `TermsFooter` 中前半句 `By clicking sign in, you agree to our` 原本只是普通字符串，未经过 `t()`，而链接文本经过 `t()`，因此中文环境会出现中英混杂。
- 当前后端状态接口 `controller/misc.go` 只返回 `system_name: common.SystemName`。
- 当前后端传统配置项只有 `SystemName`，定义在 `common/constants.go`，加载和更新在 `model/option.go`。
- 默认前端 `web/default/src/hooks/use-system-config.ts` 只读取 `system_name` 并映射到 store 的 `systemName`。
- 默认前端 `web/default/src/stores/system-config-store.ts` 只持久化一个 `systemName`。
- 默认前端系统设置页 `web/default/src/features/system-settings/general/system-info-section.tsx` 只有一个 `SystemName` 输入框。
- 默认前端当前 locale 文件包括 `en/zh/fr/ja/ru/vi`，项目规则原先记录六种语言；本次用户明确要求语言化只保留中文和英文，需要同步调整 i18n 配置、语言选择和同步脚本约束。
- `AGENTS.md` 保护 `new-api` / `QuantumNous` 相关项目标识，系统名称功能可以新增站点显示名配置，但不能删除或替换受保护项目标识。

## 技术决策
| 决策 | 理由 |
|------|------|
| 新配置项使用 `group_monitor_link` | 与现有 `docs_link` 命名风格一致 |
| 导航模块 key 使用 `groupMonitor` | TypeScript 对象中保持 camelCase，避免下划线字段混入导航模块 |
| 英文 i18n key 使用 `Group Monitor` | 界面 label 可清晰翻译为“分组监控” |
| 将 `general_setting.docs_link` 与 `general_setting.group_monitor_link` 都加入状态刷新名单 | 外链类配置会影响 `/api/status` 和顶部导航显示 |
| 不修改 classic 旧 UI | 用户明确说明使用新 UI，保持最小改动 |
| 在“顶栏导航”页面同屏加入“分组监控链接”输入 | 开关与外链地址需要一起配置，避免开启后无地址导致不可见 |
| 撤回顶栏导航页同屏链接输入 | 用户要求保留上一版逻辑，链接仍在文档链接附近配置 |
| `/api/status` 对 `group_monitor_link` 使用 OptionMap 兜底 | 用户已配置地址但导航仍不显示，需避免运行时配置结构未同步或状态缓存读到空值 |
| 通过重启后端让新增 status 字段生效 | 当前后端是 `go run main.go` 长驻进程，源码修改不会自动热加载 |
| 服务条款使用 `legal.terms_of_service` | 与现有 `legal.user_agreement`、`legal.privacy_policy` 保持一致 |
| 服务条款内容非空才显示入口 | 复用现有法律文档启用语义 |
| 将三项 legal 配置加入 status 刷新白名单 | 保存法律文档内容后页脚、登录注册勾选文案需要立刻反映启用状态 |
| `TermsFooter` 的前半句也使用 `t(text)` | 保证认证页条款提示整体语言一致 |
| 系统名称中英文改造需先确认字段语义 | “中文名称”和“英文显示名称”可能有两种落库方式，需避免破坏已有 `SystemName` 配置 |
| `SystemName` 作为中文/默认系统名称继续使用 | 用户确认；避免迁移旧值 |
| 新增 `SystemNameEn` 作为英文显示名称 | 英文界面优先显示，空值回退 `SystemName` |
| `fr/ja/ru/vi` 仅隐藏，不删除 locale 文件 | 用户确认“可以隐藏，不用单独清楚” |

## 待确认问题
| 问题 | 说明 |
|------|------|
| `SystemName` 是否作为中文名称继续保留 | 最小兼容方案是保留旧字段作为默认/中文名称，新增英文显示名字段 |
| 英文显示名字段为空时如何回退 | 推荐回退到 `SystemName`，避免英文界面空标题 |
| 旧的 fr/ja/ru/vi locale 文件是否删除 | 用户要求只保留中文和英文，但删除文件会扩大 diff，需要确认是否同时清理语言选择与脚本 |

## 阶段 11 实现发现
- 后端新增传统配置项 `SystemNameEn`，并通过 `/api/status` 返回 `system_name_en`。
- 默认前端 `useSystemConfig` 会根据当前界面语言返回本地化后的 `systemName`：英文优先 `systemNameEn`，否则回退 `systemName`；中文始终使用 `systemName`。
- `main.tsx` 的首屏标题初始化也按相同规则选择系统名，避免 React 启动前标题语言不一致。
- `SystemBrand` 原本直接读取 `status.system_name`，会绕过本地化系统名；已改为使用 `useSystemConfig().systemName`。
- `i18n/config.ts` 的 `supportedLngs` 收敛为 `en/zh`，`languages.ts` 只暴露中文和英文选项。
- `sync-i18n.mjs` 仅同步 active locales：`en/zh`；旧的 `fr/ja/ru/vi` 文件保留在目录中但不再作为运行时语言入口。
- 现有法律文档后端配置在 `setting/system_setting/legal.go`，当前字段只有 `UserAgreement`、`PrivacyPolicy`、`TermsOfService`。
- 现有法律文档正文接口在 `controller/misc.go`：`GetUserAgreement`、`GetPrivacyPolicy`、`GetTermsOfService`，当前直接返回默认字段，不区分语言。
- 现有法律文档前端设置入口在 `web/default/src/features/system-settings/general/system-info-section.tsx`，当前只提供三项默认内容输入。
- 现有登录、注册、页脚只根据 `*_enabled` 判断是否展示入口；这些启用字段当前只看默认字段是否非空。

## 阶段 12 设计草案
- 字段设计：保留 `legal.user_agreement`、`legal.privacy_policy`、`legal.terms_of_service` 作为中文/默认内容；新增 `legal.user_agreement_en`、`legal.privacy_policy_en`、`legal.terms_of_service_en` 作为英文内容。
- 后端返回：正文接口根据请求语言选择内容。推荐优先读取 `Accept-Language`，英文请求返回英文内容；如果英文内容为空，则回退中文/默认内容。
- 启用状态：`user_agreement_enabled`、`privacy_policy_enabled`、`terms_of_service_enabled` 只要中文/默认内容或英文内容任一非空即为 true，避免只配置英文时入口不显示。
- 前端设置页：在每个法律文档输入后增加对应英文内容输入，标签使用“用户协议（英文）/ 隐私政策（英文）/ 服务条款（英文）”或英文界面对应翻译。
- 前端请求：法律文档页面继续调用原接口，不新增路由；由浏览器当前语言或请求头驱动后端返回内容，减少前端改动面。
- 缓存刷新：将三项英文字段加入 `STATUS_RELATED_KEYS`，保存后刷新 `/api/status`。
- 回退规则：英文界面优先英文内容，英文为空回退中文/默认内容；中文界面使用中文/默认内容，默认内容为空时可回退英文内容以避免空页。

## 阶段 12 实现发现
- `setting/system_setting/legal.go` 新增 `UserAgreementEn`、`PrivacyPolicyEn`、`TermsOfServiceEn`，json key 分别为 `user_agreement_en`、`privacy_policy_en`、`terms_of_service_en`。
- `/api/status` 的三个法律入口启用字段改为任一语言内容非空即启用。
- `/api/user-agreement`、`/api/privacy-policy`、`/api/terms-of-service` 按 `Accept-Language` 选择内容：英文请求优先英文内容，空则回退默认内容；非英文请求优先默认内容，空则回退英文内容。
- 默认前端法律文档 API 会显式携带当前界面语言的 `Accept-Language`，避免浏览器语言和站内语言切换不一致。
- 法律文档页面的 React Query key 加入当前语言，用户切换语言后会重新请求对应内容。
- 站点设置页为三份法律文档新增英文内容输入框，保存键为 `legal.user_agreement_en`、`legal.privacy_policy_en`、`legal.terms_of_service_en`。

## 阶段 13 发布发现
- 当前 `origin` 为 `https://github.com/wenlan-coder/new-api.git`，当前分支为 `tokennova`。
- 当前 `upstream` 为 `https://github.com/QuantumNous/new-api.git`。
- 代码里的更新检测页面请求 `https://api.github.com/repos/Calcium-Ion/new-api/releases/latest`，本次保留该官方检测源。
- GitHub releases API 返回当前官方最新版本为 `v1.0.0-rc.11`。
- 根目录 `VERSION` 原本为空，导致本地/构建未注入时页面显示默认 `v0.0.0`。
- 本次自定义发布版本号设为 `v1.0.0-rc.11-transnova.1`，Docker 镜像目标按 origin 推断为 `ghcr.io/wenlan-coder/new-api:v1.0.0-rc.11-transnova.1`。
- 本机未安装 GitHub CLI：`gh` 不在 PATH 中。
- 现有 `.github/workflows/docker-build.yml` 硬编码发布到 `calciumion/new-api`，不适合直接用于自定义 GHCR 镜像。
- 现有 `.github/workflows/docker-image-alpha.yml` 虽然包含 GHCR，但仍登录并发布 Docker Hub 官方镜像，可能依赖 `DOCKERHUB_USERNAME` / `DOCKERHUB_TOKEN` secrets，也不适合作为本次稳定发布入口。
- 本机 Docker 构建失败原因是 Docker Hub 匿名 token 获取超时，属于本机网络/Registry 访问问题；可通过 GitHub Actions 云端构建绕开。

## 遇到的问题
| 问题 | 解决方案 |
|------|---------|
| 暂无 | 暂无 |

## 资源
- `web/default/src/features/system-settings/general/quota-settings-section.tsx`
- `web/default/src/features/system-settings/maintenance/header-navigation-section.tsx`
- `web/default/src/features/system-settings/maintenance/config.ts`
- `web/default/src/lib/nav-modules.ts`

## 视觉/浏览器发现
- 用户截图显示顶部导航为“首页 / 控制台 / 模型广场 / 文档 / 关于”，新增项应与现有文字导航一致，不需要新视觉样式。

---
*每执行2次查看/浏览器/搜索操作后更新此文件*
*防止视觉信息丢失*
