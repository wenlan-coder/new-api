# 进度日志

## 会话：2026-06-14

### 阶段 1：新增分组监控导航外链
- **状态：** in_progress
- **开始时间：** 2026-06-14
- 执行的操作：
  - 读取相关技能说明：`brainstorming`、`frontend-design`、`i18n-translate`、`karpathy-guidelines`、`planning-with-files-zh`
  - 搜索并读取现有“文档链接”和顶部导航模块配置
  - 与用户确认最小实现方案：新增 `group_monitor_link`，导航新增 `groupMonitor`
  - 按项目规则更新规划文件
  - 新增后端 `general_setting.group_monitor_link` 字段并通过 `/api/status` 暴露
  - 默认前端新增顶部导航项、导航开关、配置输入框与状态缓存刷新
  - 补齐 en/zh/fr/ja/ru/vi locale 文案
  - 根据用户确认撤回 classic 旧 UI 试探性改动，最终不保留 classic 文件变更
- 创建/修改的文件：
  - `.agents/planning/task_plan.md`
  - `.agents/planning/findings.md`
  - `.agents/planning/progress.md`
  - `setting/operation_setting/general_setting.go`
  - `controller/misc.go`
  - `web/default/src/lib/nav-modules.ts`
  - `web/default/src/hooks/use-top-nav-links.ts`
  - `web/default/src/features/system-settings/maintenance/config.ts`
  - `web/default/src/features/system-settings/maintenance/header-navigation-section.tsx`
  - `web/default/src/features/system-settings/general/quota-settings-section.tsx`
  - `web/default/src/features/system-settings/hooks/use-update-option.ts`
  - `web/default/src/features/system-settings/types.ts`
  - `web/default/src/features/system-settings/billing/index.tsx`
  - `web/default/src/features/system-settings/billing/section-registry.tsx`
  - `web/default/src/i18n/static-keys.ts`
  - `web/default/src/i18n/locales/en.json`
  - `web/default/src/i18n/locales/zh.json`
  - `web/default/src/i18n/locales/fr.json`
  - `web/default/src/i18n/locales/ja.json`
  - `web/default/src/i18n/locales/ru.json`
  - `web/default/src/i18n/locales/vi.json`

## 测试结果
| 测试 | 输入 | 预期结果 | 实际结果 | 状态 |
|------|------|---------|---------|------|
| i18n 同步 | `bun run i18n:sync` | 同步成功，报告无缺失 | 成功；en/fr/ja/ru/vi/zh missingCount、extrasCount、untranslatedCount 均为 0 | 通过 |
| 前端类型检查 | `bunx tsc -b --pretty false` | 无 TypeScript 错误 | 通过 | 通过 |
| Diff 空白检查 | `git diff --check` | 无尾随空白等问题 | 通过 | 通过 |
| Go 快速测试 | `go test ./setting/operation_setting ./controller` | 通过或暴露代码错误 | 失败：本地 Go 环境提示 `package testing is not in std (C:\Program Files\Go\src\testing)` | 环境受限 |

## 错误日志
| 时间戳 | 错误 | 尝试次数 | 解决方案 |
|--------|------|---------|---------|
| 2026-06-14 | 无 | 1 | 无 |
| 2026-06-14 | `go test` 因本地 Go 标准库环境缺失 `testing` 包失败 | 1 | 记录为环境限制；前端类型与 i18n 已验证 |

## 五问重启检查
| 问题 | 答案 |
|------|------|
| 我在哪里？ | 阶段 4：交付 |
| 我要去哪里？ | 向用户汇总改动与验证结果 |
| 目标是什么？ | 新增可配置的“分组监控”外链导航 |
| 我学到了什么？ | 见 `findings.md` |
| 我做了什么？ | 见上方记录 |

## 当前 git status --short（2026-06-14）
- `M .gitignore`（本次之前已有/无关）
- `M AGENTS.md`（本次之前已有/无关）
- `M controller/misc.go`
- `M docker-compose.dev.yml`（本次之前已有/无关）
- `M makefile`（本次之前已有/无关）
- `M setting/operation_setting/general_setting.go`
- `M web/default/src/features/system-settings/billing/index.tsx`
- `M web/default/src/features/system-settings/billing/section-registry.tsx`
- `M web/default/src/features/system-settings/general/quota-settings-section.tsx`
- `M web/default/src/features/system-settings/hooks/use-update-option.ts`
- `M web/default/src/features/system-settings/maintenance/config.ts`
- `M web/default/src/features/system-settings/maintenance/header-navigation-section.tsx`
- `M web/default/src/features/system-settings/types.ts`
- `M web/default/src/hooks/use-top-nav-links.ts`
- `M web/default/src/i18n/locales/en.json`
- `M web/default/src/i18n/locales/fr.json`
- `M web/default/src/i18n/locales/ja.json`
- `M web/default/src/i18n/locales/ru.json`
- `M web/default/src/i18n/locales/vi.json`
- `M web/default/src/i18n/locales/zh.json`
- `M web/default/src/i18n/static-keys.ts`
- `M web/default/src/lib/nav-modules.ts`
- `?? .agents/planning/`

### 阶段 5：修正顶栏导航页配置体验
- **状态：** in_progress
- **开始时间：** 2026-06-14
- 执行的操作：
  - 查看用户截图，确认“分组监控”开关已开启但顶部未显示
  - 检查 `use-top-nav-links.ts`，确认导航显示依赖 `group_monitor_link` 非空
  - 决定将“分组监控链接”输入加入顶栏导航设置页，保存导航时同步保存链接

### 阶段 6：撤销顶栏导航页链接输入
- **状态：** complete
- **开始时间：** 2026-06-14
- 执行的操作：
  - 用户要求撤销上一批变更，保留上一次逻辑
  - 本阶段只移除顶栏导航页新增的链接输入、站点设置传参和提示翻译
  - 保留分组监控导航项、开关、`group_monitor_link` 配置字段及顶部导航显示逻辑
  - 确认 `web/default/src/features/system-settings/site/index.tsx` 与 `site/section-registry.tsx` 无 diff
- 验证结果：
  - `bun run i18n:sync` 通过，报告 missing/extras/untranslated 均为 0
  - `bunx tsc -b --pretty false` 通过
  - `git diff --check` 通过

### 阶段 7：修复分组监控链接已配置但导航不显示
- **状态：** complete
- **开始时间：** 2026-06-14
- 执行的操作：
  - 用户确认已设置分组监控地址但顶部仍未显示
  - 检查顶部导航渲染路径和 `/api/status` 数据来源
  - 决定在 `/api/status` 中对 `group_monitor_link` 使用 `common.OptionMap["general_setting.group_monitor_link"]` 兜底
  - 更新 `controller/misc.go` 并执行 `gofmt`
- 验证结果：
  - `bunx tsc -b --pretty false` 通过
  - `git diff --check` 通过

### 阶段 8：核查运行实例与数据库
- **状态：** complete
- **开始时间：** 2026-06-14
- 执行的操作：
  - 读取 `.env`，确认当前实例使用 MySQL：`root:123456@tcp(127.0.0.1:3306)/new-api?parseTime=true`
  - 通过临时只读 Go 脚本查询 `options` 表
  - 确认 `general_setting.group_monitor_link` 已落库，值为 `https://docs.newapi.pro`
  - 确认 `HeaderNavModules` 已包含 `groupMonitor:true`
  - 发现重启前 `/api/status` 未返回 `group_monitor_link`，原因是后端进程仍为旧代码
  - 停止旧的 `go run main.go` 进程及其 `main.exe` 子进程，并从项目根目录重新启动后端
  - 重新请求 `/api/status`，确认已返回 `group_monitor_link`
- 验证结果：
  - 后端监听 `http://localhost:3000/`
  - `/api/status` 返回 `docs_link`、`group_monitor_link`、`HeaderNavModules`
  - 数据库 `options` 表存在 `general_setting.group_monitor_link`

### 阶段 9：新增服务条款
- **状态：** complete
- **开始时间：** 2026-06-14
- 执行的操作：
  - 用户要求在“用户协议 / 隐私政策”后面新增“服务条款”
  - 搜索并确认现有法律文档链路：`legal` 配置、`/api/status` 启用字段、独立正文接口、页脚和登录/注册入口
  - 更新规划文件，采用最小改动方案：新增 `legal.terms_of_service`，内容非空时显示
  - 后端新增 `TermsOfService` 配置字段、`terms_of_service_enabled` 状态字段和 `/api/terms-of-service` 接口
  - 新 UI 站点设置页在隐私政策后新增“服务条款”配置输入
  - 新增 `/terms-of-service` 页面，复用现有法律文档渲染能力，支持 Markdown、HTML 和外部 URL
  - 页脚、登录/注册法律勾选、认证页底部文案都接入服务条款，顺序为用户协议、隐私政策、服务条款
  - 将 `legal.user_agreement`、`legal.privacy_policy`、`legal.terms_of_service` 加入 status 缓存刷新白名单
  - 补齐 en/zh/fr/ja/ru/vi 多语言文案
- 验证结果：
  - `bun run i18n:sync` 通过，报告各语言 missing/extras/untranslated 均为 0
  - `bunx tsc -b --pretty false` 通过
  - `go test ./setting/system_setting ./controller ./router -run '^$'` 通过
  - `git diff --check` 通过
  - 重启后端后，`/api/status` 返回 `terms_of_service_enabled:false`，`/api/terms-of-service` 返回成功且当前内容为空

## 当前 git status --short（2026-06-14 02:35）
- `M .gitignore`（本次之前已有/无关）
- `M AGENTS.md`（本次之前已有/无关）
- `M controller/misc.go`
- `M docker-compose.dev.yml`（本次之前已有/无关）
- `M makefile`（本次之前已有/无关）
- `M router/api-router.go`
- `M setting/operation_setting/general_setting.go`
- `M setting/system_setting/legal.go`
- `M web/default/src/components/layout/components/footer.tsx`
- `M web/default/src/features/auth/components/legal-consent.tsx`
- `M web/default/src/features/auth/components/terms-footer.tsx`
- `M web/default/src/features/auth/sign-in/components/user-auth-form.tsx`
- `M web/default/src/features/auth/sign-up/components/sign-up-form.tsx`
- `M web/default/src/features/auth/types.ts`
- `M web/default/src/features/legal/api.ts`
- `M web/default/src/features/legal/index.ts`
- `M web/default/src/features/system-settings/billing/index.tsx`
- `M web/default/src/features/system-settings/billing/section-registry.tsx`
- `M web/default/src/features/system-settings/general/quota-settings-section.tsx`
- `M web/default/src/features/system-settings/general/system-info-section.tsx`
- `M web/default/src/features/system-settings/hooks/use-update-option.ts`
- `M web/default/src/features/system-settings/maintenance/config.ts`
- `M web/default/src/features/system-settings/maintenance/header-navigation-section.tsx`
- `M web/default/src/features/system-settings/site/index.tsx`
- `M web/default/src/features/system-settings/site/section-registry.tsx`
- `M web/default/src/features/system-settings/types.ts`
- `M web/default/src/hooks/use-top-nav-links.ts`
- `M web/default/src/i18n/locales/en.json`
- `M web/default/src/i18n/locales/fr.json`
- `M web/default/src/i18n/locales/ja.json`
- `M web/default/src/i18n/locales/ru.json`
- `M web/default/src/i18n/locales/vi.json`
- `M web/default/src/i18n/locales/zh.json`
- `M web/default/src/i18n/static-keys.ts`
- `M web/default/src/lib/nav-modules.ts`
- `M web/default/src/routeTree.gen.ts`
- `?? .agents/planning/`
- `?? web/default/src/features/legal/terms-of-service.tsx`
- `?? web/default/src/routes/terms-of-service.tsx`

### 阶段 10：修复认证页条款文案中英混杂并停止服务
- **状态：** complete
- **开始时间：** 2026-06-14
- 执行的操作：
  - 用户截图指出登录页底部条款提示前半句英文、后半句中文
  - 检查 `web/default/src/features/auth/components/terms-footer.tsx`，确认前半句未调用 `t()`
  - 将 `{text}` 改为 `{t(text)}`
  - 补齐 en/zh/fr/ja/ru/vi 中 `By clicking sign in, you agree to our` 和 `By creating an account, you agree to our`
- 验证结果：
  - `bun run i18n:sync` 通过，报告各语言 missing/extras/untranslated 均为 0
  - `bunx tsc -b --pretty false` 通过
  - `git diff --check` 通过
- 停止服务：
  - 停止后端 `go.exe` PID 48252 和 `main.exe` PID 18196
  - 停止前端 `bun.exe` PID 32552、`rsbuild.exe` PID 61536、`node.exe` PID 60024
  - 确认本地 `3000` 和 `5173` 端口无 `LISTENING`

## 当前 git status --short（2026-06-14 停止服务后）
- `M .gitignore`（本次之前已有/无关）
- `M AGENTS.md`（本次之前已有/无关）
- `M controller/misc.go`
- `M docker-compose.dev.yml`（本次之前已有/无关）
- `M makefile`（本次之前已有/无关）
- `M router/api-router.go`
- `M setting/operation_setting/general_setting.go`
- `M setting/system_setting/legal.go`
- `M web/default/src/components/layout/components/footer.tsx`
- `M web/default/src/features/auth/components/legal-consent.tsx`
- `M web/default/src/features/auth/components/terms-footer.tsx`
- `M web/default/src/features/auth/sign-in/components/user-auth-form.tsx`
- `M web/default/src/features/auth/sign-up/components/sign-up-form.tsx`
- `M web/default/src/features/auth/types.ts`
- `M web/default/src/features/legal/api.ts`
- `M web/default/src/features/legal/index.ts`
- `M web/default/src/features/system-settings/billing/index.tsx`
- `M web/default/src/features/system-settings/billing/section-registry.tsx`
- `M web/default/src/features/system-settings/general/quota-settings-section.tsx`
- `M web/default/src/features/system-settings/general/system-info-section.tsx`
- `M web/default/src/features/system-settings/hooks/use-update-option.ts`
- `M web/default/src/features/system-settings/maintenance/config.ts`
- `M web/default/src/features/system-settings/maintenance/header-navigation-section.tsx`
- `M web/default/src/features/system-settings/site/index.tsx`
- `M web/default/src/features/system-settings/site/section-registry.tsx`
- `M web/default/src/features/system-settings/types.ts`
- `M web/default/src/hooks/use-top-nav-links.ts`
- `M web/default/src/i18n/locales/en.json`
- `M web/default/src/i18n/locales/fr.json`
- `M web/default/src/i18n/locales/ja.json`
- `M web/default/src/i18n/locales/ru.json`
- `M web/default/src/i18n/locales/vi.json`
- `M web/default/src/i18n/locales/zh.json`
- `M web/default/src/i18n/static-keys.ts`
- `M web/default/src/lib/nav-modules.ts`
- `M web/default/src/routeTree.gen.ts`
- `?? .agents/planning/`
- `?? web/default/src/features/legal/terms-of-service.tsx`
- `?? web/default/src/routes/terms-of-service.tsx`

## 当前 git status --short（2026-06-14 01:54）
- `M .gitignore`（本次之前已有/无关）
- `M AGENTS.md`（本次之前已有/无关）
- `M controller/misc.go`
- `M docker-compose.dev.yml`（本次之前已有/无关）
- `M makefile`（本次之前已有/无关）
- `M setting/operation_setting/general_setting.go`
- `M web/default/src/features/system-settings/billing/index.tsx`
- `M web/default/src/features/system-settings/billing/section-registry.tsx`
- `M web/default/src/features/system-settings/general/quota-settings-section.tsx`
- `M web/default/src/features/system-settings/hooks/use-update-option.ts`
- `M web/default/src/features/system-settings/maintenance/config.ts`
- `M web/default/src/features/system-settings/maintenance/header-navigation-section.tsx`
- `M web/default/src/features/system-settings/types.ts`
- `M web/default/src/hooks/use-top-nav-links.ts`
- `M web/default/src/i18n/locales/en.json`
- `M web/default/src/i18n/locales/fr.json`
- `M web/default/src/i18n/locales/ja.json`
- `M web/default/src/i18n/locales/ru.json`
- `M web/default/src/i18n/locales/vi.json`
- `M web/default/src/i18n/locales/zh.json`
- `M web/default/src/i18n/static-keys.ts`
- `M web/default/src/lib/nav-modules.ts`
- `?? .agents/planning/`

## 会话：2026-06-15

### 阶段 11：系统名称中英文显示与 i18n 简化
- **状态：** complete
- **开始时间：** 2026-06-15
- 执行的操作：
  - 读取用户指定的 `brainstorming` 技能规则。
  - 读取 `planning-with-files-zh`、项目 `AGENTS.md` 和当前规划文件。
  - 搜索系统名称相关数据流，确认当前只有单一 `SystemName` / `system_name`。
  - 读取后端状态接口、传统 option 更新逻辑、前端系统配置 hook/store、系统信息设置页。
  - 写入本次计划、发现和进度记录。
  - 用户确认 `SystemName` 作为中文/默认系统名称，新增英文显示名字段；确认 `fr/ja/ru/vi` 隐藏即可，不删除文件。
  - 后端新增 `common.SystemNameEn`、`OptionMap["SystemNameEn"]`、`updateOptionMap` 分支和 `/api/status` 的 `system_name_en`。
  - 前端系统设置页新增“英文系统名称”输入项，保存键为 `SystemNameEn`。
  - 前端系统配置 store/hook 增加 `systemNameEn`，并按当前语言选择展示名称。
  - 首屏 `document.title` 初始化和后续 hook 更新都接入本地化系统名。
  - 用户反馈切换英文后过一会才变化；追查发现 `SystemBrand` 仍直接读 `status.system_name`，已改为使用统一的本地化系统名。
  - 前端运行时语言入口收敛为中文和英文；旧 locale 文件保留。
- 当前结论：
  - 当前系统名称没有中英文双字段。
  - 推荐设计方向是保留 `SystemName` 兼容旧配置，新增英文显示名配置，并在前端按当前语言选择展示名。
  - 前端语言范围需要从 `en/zh/fr/ja/ru/vi` 收敛到 `en/zh`，但删除旧 locale 文件和清理语言选择入口需要用户确认。
- 验证结果：
  - `bun run i18n:sync` 通过，报告仅包含 en/zh，missing/extras/untranslated 均为 0。
  - `bunx tsc -b --pretty false` 通过。
  - 追加修正 `SystemBrand` 后再次执行 `bunx tsc -b --pretty false` 通过。
  - `go test ./common ./model ./controller -run '^$'` 通过。
  - `git diff --check` 通过。
  - 追加修正 `SystemBrand` 后再次执行 `git diff --check` 通过。
  - 重启后端后，`/api/status` 返回 `system_name_en`。
  - 前端 `http://127.0.0.1:5173/` 返回 200。

## 当前 git status --short（2026-06-15 阶段 11 完成）
- `M .gitignore`（本次之前已有/无关）
- `M AGENTS.md`（本次之前已有/无关）
- `M common/constants.go`
- `M controller/misc.go`
- `M docker-compose.dev.yml`（本次之前已有/无关）
- `M makefile`（本次之前已有/无关）
- `M model/option.go`
- `M router/api-router.go`（上一轮服务条款相关）
- `M setting/operation_setting/general_setting.go`（上一轮分组监控相关）
- `M setting/system_setting/legal.go`（上一轮服务条款相关）
- `M web/default/scripts/sync-i18n.mjs`
- `M web/default/src/components/layout/components/system-brand.tsx`
- `M web/default/src/features/system-settings/general/system-info-section.tsx`
- `M web/default/src/features/system-settings/hooks/use-update-option.ts`
- `M web/default/src/features/system-settings/site/index.tsx`
- `M web/default/src/features/system-settings/site/section-registry.tsx`
- `M web/default/src/features/system-settings/types.ts`
- `M web/default/src/hooks/use-system-config.ts`
- `M web/default/src/i18n/config.ts`
- `M web/default/src/i18n/languages.ts`
- `M web/default/src/i18n/locales/_reports/_sync-report.json`
- `M web/default/src/i18n/locales/en.json`
- `M web/default/src/i18n/locales/zh.json`
- `M web/default/src/main.tsx`
- `M web/default/src/stores/system-config-store.ts`
- 其余 `web/default/src/i18n/locales/fr|ja|ru|vi.json`、法律文档、分组监控相关文件为前序阶段遗留修改或同步结果，本阶段未删除这些语言文件。
- `?? .agents/planning/`
- `?? web/default/src/features/legal/terms-of-service.tsx`（上一轮服务条款相关）
- `?? web/default/src/routes/terms-of-service.tsx`（上一轮服务条款相关）

### 阶段 12：法律文档中英文内容支持
- **状态：** complete
- **开始时间：** 2026-06-15
- 执行的操作：
  - 用户要求继续写入计划，方便后续把当前修改合并到官方代码。
  - 搜索并确认现有法律文档链路：`legal` 配置、`/api/status` 启用字段、三项正文接口、设置页输入、登录/注册/页脚入口。
  - 写入阶段 12 计划与设计草案，暂未改业务代码。
  - 新增法律文档英文配置字段和默认值。
  - 修改 `/api/status`，入口启用状态改为中英文任一内容非空即可显示。
  - 修改三项法律正文接口，按 `Accept-Language` 返回中英文内容并保留回退。
  - 修改默认前端法律文档 API，请求时携带当前界面语言。
  - 修改法律文档页面查询缓存 key，加入当前语言，避免切换语言后读取旧缓存。
  - 修改站点设置页、设置类型、默认值和 section registry，新增三项英文内容输入。
  - 将三项英文 legal 配置加入 status 刷新白名单。
  - 补齐 en/zh 文案，并保持 fr/ja/ru/vi 文件隐藏不删除。
- 初步设计：
  - 保留旧字段作为中文/默认内容。
  - 新增三项英文内容字段：`legal.user_agreement_en`、`legal.privacy_policy_en`、`legal.terms_of_service_en`。
  - 正文接口按请求语言返回内容，英文为空回退中文/默认内容。
  - 启用状态任一语言内容非空即可显示入口。
- 验证结果：
  - `bun run i18n:sync` 通过，报告仅包含 en/zh，missing/extras/untranslated 均为 0。
  - `bunx tsc -b --pretty false` 通过。
  - `go test ./setting/system_setting ./controller ./router -run '^$'` 通过。
  - `git diff --check` 通过。
  - 重启后端后，`/api/status` 返回 200，三项法律正文接口在 `Accept-Language: en` 下均返回 200。

## 当前 git status --short（2026-06-15 阶段 12 完成）
- `M .gitignore`（本次之前已有/无关）
- `M AGENTS.md`（本次之前已有/无关）
- `M common/constants.go`（阶段 11 系统名）
- `M controller/misc.go`
- `M docker-compose.dev.yml`（本次之前已有/无关）
- `M makefile`（本次之前已有/无关）
- `M model/option.go`（阶段 11 系统名）
- `M router/api-router.go`（上一轮服务条款相关）
- `M setting/operation_setting/general_setting.go`（上一轮分组监控相关）
- `M setting/system_setting/legal.go`
- `M web/default/scripts/sync-i18n.mjs`（阶段 11 语言范围）
- `M web/default/src/components/layout/components/footer.tsx`（上一轮服务条款相关）
- `M web/default/src/components/layout/components/system-brand.tsx`（阶段 11 系统名）
- `M web/default/src/features/auth/components/legal-consent.tsx`（上一轮服务条款相关）
- `M web/default/src/features/auth/components/terms-footer.tsx`（上一轮服务条款相关）
- `M web/default/src/features/auth/sign-in/components/user-auth-form.tsx`（上一轮服务条款相关）
- `M web/default/src/features/auth/sign-up/components/sign-up-form.tsx`（上一轮服务条款相关）
- `M web/default/src/features/auth/types.ts`（上一轮服务条款相关）
- `M web/default/src/features/legal/api.ts`
- `M web/default/src/features/legal/index.ts`（上一轮服务条款相关）
- `M web/default/src/features/legal/legal-document.tsx`
- `M web/default/src/features/system-settings/general/system-info-section.tsx`
- `M web/default/src/features/system-settings/hooks/use-update-option.ts`
- `M web/default/src/features/system-settings/site/index.tsx`
- `M web/default/src/features/system-settings/site/section-registry.tsx`
- `M web/default/src/features/system-settings/types.ts`
- `M web/default/src/i18n/locales/_reports/_sync-report.json`
- `M web/default/src/i18n/locales/en.json`
- `M web/default/src/i18n/locales/zh.json`
- 其余分组监控、系统名、服务条款、旧隐藏语言文件为前序阶段遗留修改或同步结果。
- `?? .agents/planning/`
- `?? web/default/src/features/legal/terms-of-service.tsx`（上一轮服务条款相关）
- `?? web/default/src/routes/terms-of-service.tsx`（上一轮服务条款相关）

### 阶段 13：提交代码并发布自定义 Docker 版本
- **状态：** in_progress
- **开始时间：** 2026-06-15
- 执行的操作：
  - 确认当前分支为 `tokennova`。
  - 确认 `origin` 为 `https://github.com/wenlan-coder/new-api.git`，用于推送代码。
  - 确认页面保留的官方更新检测源为 `Calcium-Ion/new-api`。
  - 通过 GitHub releases API 确认当前官方最新 release 为 `v1.0.0-rc.11`。
  - 将根目录 `VERSION` 写为 `v1.0.0-rc.11-transnova.1`。
  - 执行发布前检查：`bun run i18n:sync`、`bunx tsc -b --pretty false`、`bun run build`、`go test ./setting/system_setting ./controller ./router -run '^$'`、`git diff --check` 均通过。
  - 确认本地和远端均不存在 `v1.0.0-rc.11-transnova.1` tag。
- 待执行：
  - 提交并推送当前分支。
  - 创建并推送 `v1.0.0-rc.11-transnova.1` tag。
  - 构建并推送 GHCR Docker 镜像。

## 当前 git status --short（2026-06-15 发布前检查后）
- `M .gitignore`
- `M AGENTS.md`
- `M VERSION`
- `M common/constants.go`
- `M controller/misc.go`
- `M docker-compose.dev.yml`
- `M makefile`
- `M model/option.go`
- `M router/api-router.go`
- `M setting/operation_setting/general_setting.go`
- `M setting/system_setting/legal.go`
- `M web/default/scripts/sync-i18n.mjs`
- `M web/default/src/components/layout/components/footer.tsx`
- `M web/default/src/components/layout/components/system-brand.tsx`
- `M web/default/src/features/auth/components/legal-consent.tsx`
- `M web/default/src/features/auth/components/terms-footer.tsx`
- `M web/default/src/features/auth/sign-in/components/user-auth-form.tsx`
- `M web/default/src/features/auth/sign-up/components/sign-up-form.tsx`
- `M web/default/src/features/auth/types.ts`
- `M web/default/src/features/legal/api.ts`
- `M web/default/src/features/legal/index.ts`
- `M web/default/src/features/legal/legal-document.tsx`
- `M web/default/src/features/system-settings/billing/index.tsx`
- `M web/default/src/features/system-settings/billing/section-registry.tsx`
- `M web/default/src/features/system-settings/general/quota-settings-section.tsx`
- `M web/default/src/features/system-settings/general/system-info-section.tsx`
- `M web/default/src/features/system-settings/hooks/use-update-option.ts`
- `M web/default/src/features/system-settings/maintenance/config.ts`
- `M web/default/src/features/system-settings/maintenance/header-navigation-section.tsx`
- `M web/default/src/features/system-settings/site/index.tsx`
- `M web/default/src/features/system-settings/site/section-registry.tsx`
- `M web/default/src/features/system-settings/types.ts`
- `M web/default/src/hooks/use-system-config.ts`
- `M web/default/src/hooks/use-top-nav-links.ts`
- `M web/default/src/i18n/config.ts`
- `M web/default/src/i18n/languages.ts`
- `M web/default/src/i18n/locales/_reports/_sync-report.json`
- `M web/default/src/i18n/locales/en.json`
- `M web/default/src/i18n/locales/fr.json`
- `M web/default/src/i18n/locales/ja.json`
- `M web/default/src/i18n/locales/ru.json`
- `M web/default/src/i18n/locales/vi.json`
- `M web/default/src/i18n/locales/zh.json`
- `M web/default/src/i18n/static-keys.ts`
- `M web/default/src/lib/nav-modules.ts`
- `M web/default/src/main.tsx`
- `M web/default/src/routeTree.gen.ts`
- `M web/default/src/stores/system-config-store.ts`
- `?? .agents/planning/`
- `?? web/default/src/features/legal/terms-of-service.tsx`
- `?? web/default/src/routes/terms-of-service.tsx`

---
*每个阶段完成后或遇到错误时更新此文件*
