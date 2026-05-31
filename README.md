# FlyClash

FlyClash 是一个基于 Clash（Mihomo）内核的桌面代理客户端，采用 `Next.js + Electron` 架构，提供订阅管理、连接监控、系统代理切换、日志与流量统计等能力。

---

## 项目审计摘要

基于当前仓库配置与代码结构（`package.json`、`electron-builder.yml`、`scripts/prepare.mjs`、`electron/main.js`）的审计结论：

1. **架构清晰**：前端与桌面主进程职责分离，Electron 主进程模块化程度较高。
2. **无独立远程后端**：本项目后端能力主要由本地 Electron 主进程 + 本地二进制（Mihomo / helper）提供。
3. **构建链路完整**：支持 Windows/macOS/Linux 打包，多架构构建能力在脚本与 CI 中已有体现。
4. **已识别风险点**：
   - `next.config.js` 开启了 `typescript.ignoreBuildErrors: true`，可能掩盖 TS 类型问题。
   - `electron:build` 依赖 `electron-builder.local.yml`，该文件被 `.gitignore` 忽略，首次构建可能报缺失。
   - 构建依赖外网下载资源（Mihomo、Geo 数据），网络受限时会失败。
   - `better-sqlite3` 依赖本地原生模块环境，Node/Electron 版本不匹配时需重编译。

---

## 项目结构

```text
FlyClash/
├─ app/                      # Next.js App Router 页面
├─ components/               # 共享 UI 组件
├─ src/                      # 业务逻辑、状态、服务、工具
├─ electron/                 # Electron 主进程与 IPC、系统集成
│  ├─ main-process/
│  ├─ ipc-handlers/
│  ├─ websocket/
│  ├─ database/
│  └─ ...
├─ native/                   # Go 原生工具
│  ├─ helper/                # Windows 提权 helper service
│  └─ sysproxy/              # Windows 系统代理工具
├─ scripts/
│  └─ prepare.mjs            # 构建前资源准备（下载内核/数据）
├─ public/                   # 静态资源
├─ electron-builder.yml      # 打包配置
├─ next.config.js            # Next.js 配置
└─ package.json
```

---

## 技术架构

- **UI 层（Renderer）**：`Next.js 14 + React 18 + Tailwind CSS + Radix UI`
- **桌面容器层**：`Electron 35`
- **本地服务层（Backend in Desktop）**：
  - Electron 主进程负责 IPC、系统集成、服务编排
  - 通过本地 Mihomo 内核提供代理能力
  - `better-sqlite3` 提供本地数据库存储
  - Go 工具（`native/helper`、`native/sysproxy`）提供 Windows 特定能力

---

## 前端技术栈

- `Next.js 14`（App Router）
- `React 18`
- `TypeScript`
- `Tailwind CSS`
- `Radix UI`
- 状态与数据：`zustand`、`swr`
- 国际化：`i18next`、`react-i18next`

---

## 后端技术栈

> 本项目无独立部署的 Web 后端，后端能力为本地桌面后端。

- `Electron Main Process`（Node.js）
- `better-sqlite3`（本地 SQLite）
- `ws` / `axios`（本地服务通信）
- Go 原生程序：
  - `native/helper`（Windows 服务 / 提权相关）
  - `native/sysproxy`（Windows 系统代理写入）

---

## 快速开始开发

### 1) 环境要求

- **Node.js**：建议 `20.x`（CI 使用 Node 20）
- **npm**：建议 `>= 10`
- **操作系统**：Windows / macOS / Linux
- **可选（Windows）**：
  - Go `1.21+`（用于本地编译 `flyclash-helper.exe`）
  - C/C++ 构建工具（用于 `better-sqlite3` 原生模块场景）

### 2) 安装依赖

```bash
npm install
```

### 3) 启动开发服务器

仅前端开发：

```bash
npm run dev
```

桌面开发（推荐）：

```bash
npm run electron:dev
```

### 4) 开发命令

```bash
npm run dev            # Next 开发模式
npm run electron:dev   # Next + Electron 联调
npm run lint           # 代码检查
npm run rebuild:native # 重建 better-sqlite3 原生模块
npm run clean          # 清理构建产物
```

---

## 可用脚本

### 构建命令

```bash
npm run build
npm run electron:build
npm run electron:build:ci
npm run electron:build:mac
npm run electron:build:mac:x64
npm run electron:build:mac:arm64
npm run electron:build:mac:universal
```

### 其他命令

```bash
npm run prepare
npm run prepare:win
npm run prepare:win:x64
npm run prepare:win:ia32
npm run prepare:win:arm64
npm run prepare:mac
npm run prepare:mac:x64
npm run prepare:mac:arm64
npm run prepare:linux
npm run prepare:linux:x64
npm run prepare:linux:arm64
npm run start
npm run electron
npm run clean
```

---

## 构建发布

### 环境准备

1. 安装依赖：`npm install`
2. 准备工具文件（尤其 Windows）：
   - `tools/sysproxy*.exe`（系统代理工具）
   - `tools/speedtest.exe`（测速工具）
   - `tools/flyclash-helper.exe`（可由 `prepare` 在本机有 Go 时自动构建）
3. 执行资源准备（下载 Mihomo 与 Geo 数据）：`npm run prepare`（或对应平台命令）
4. 构建前端：`npm run build`
5. 执行打包：`electron-builder`（可通过 npm script 间接调用）

> 注意：构建过程依赖外网下载资源，建议确保网络可访问 GitHub Releases。

### Windows 构建

推荐 CI 兼容方式：

```bash
npm run electron:build:ci
```

本地配置方式（需存在 `electron-builder.local.yml`）：

```bash
# macOS / Linux
cp electron-builder.local.example.yml electron-builder.local.yml

# Windows PowerShell
Copy-Item electron-builder.local.example.yml electron-builder.local.yml

npm run electron:build
```

### macOS 构建

```bash
npm run electron:build:mac
# 或指定架构
npm run electron:build:mac:x64
npm run electron:build:mac:arm64
```

### 指定架构

示例（先准备对应架构资源，再打包）：

```bash
npm run prepare:win:x64
npx electron-builder --win --x64

npm run prepare:linux:arm64
npx electron-builder --linux --arm64
```

### 指定产物类型

```bash
npx electron-builder --win nsis
npx electron-builder --win 7z
npx electron-builder --mac dmg
npx electron-builder --mac zip
npx electron-builder --linux deb
npx electron-builder --linux rpm
```

### 指定架构和产物类型

```bash
npx electron-builder --win nsis --x64
npx electron-builder --mac dmg --arm64
npx electron-builder --linux deb --x64
```

### 构建产物

默认输出目录：`dist/`

根据 `electron-builder.yml`，主要产物命名规则如下：

- Windows：`FlyClash-${version}-${arch}-setup.exe`、`*.7z`
- macOS：`FlyClash-${version}-${arch}.dmg`、`*.zip`
- Linux：`FlyClash-${version}-${arch}.deb`、`*.rpm`

---

## 包管理器要求

- 使用 **npm**（仓库包含 `package-lock.json`，并通过 `.npmrc` 约束依赖行为）
- 不建议混用 `pnpm` / `yarn`，避免锁文件与原生模块行为不一致

---

## 开发环境问题

1. **`electron-builder.local.yml` 缺失**
   `electron:build` 会读取该文件。仓库已提供模板 `electron-builder.local.example.yml`，请先复制为 `electron-builder.local.yml`；或改用 `npm run electron:build:ci`。

2. **`better-sqlite3` 编译/加载失败**
   先执行 `npm run rebuild:native`，并确认 Node/Electron 版本匹配。

3. **`prepare` 阶段下载失败**
   属于网络问题（GitHub 资源不可达）时，请检查代理/网络后重试。

4. **Windows 权限相关问题（系统代理/TUN）**
   建议以管理员权限运行，确保 helper/service 可正常调用。

5. **`tools/*.exe` 缺失导致功能或打包失败**
   仓库规则会忽略二进制文件，若本地缺少 `sysproxy/speedtest/helper` 可执行文件，需先自行准备再构建。

---

## 开发注意事项

- 项目采用 Electron + Next 静态导出（`output: 'export'`），不要按传统 SSR 项目方式理解打包路径。
- `scripts/prepare.mjs` 会生成/覆盖 `tools/data` 与 `extra/sidecar` 下资源，构建前必须执行。
- 若修改主进程 IPC，请同步检查渲染进程调用与类型定义。
- 若新增原生依赖，请评估跨平台（Win/macOS/Linux）构建影响。

---

## 注意事项

- 本工具涉及系统代理与网络转发，请遵守当地法律法规与组织安全政策。
- 构建发布前建议固定 Node 版本并在干净环境执行，避免“本机可用、CI 失败”。
- 发布包前请验证核心功能：启动内核、切换节点、系统代理、日志连接、订阅更新。

---

## 常见问题

### 1. `npm run electron:dev` 启动失败怎么办？

先执行：

```bash
npm install
npm run rebuild:native
npm run electron:dev
```

如果仍失败，优先检查 `better-sqlite3` 和端口占用（默认 Next 开发端口 `3000`）。

### 2. 为什么 `npm run electron:build` 报配置文件不存在？

该命令依赖本地文件 `electron-builder.local.yml`（默认不入库）。

可先复制模板：

```bash
# macOS / Linux
cp electron-builder.local.example.yml electron-builder.local.yml

# Windows PowerShell
Copy-Item electron-builder.local.example.yml electron-builder.local.yml
```

或改用：

```bash
npm run electron:build:ci
```

### 3. 为什么构建时会卡在 prepare/download？

`prepare` 会下载 Mihomo 和 Geo 数据文件。网络受限时会重试并可能失败，请检查网络代理或镜像策略。

### 4. macOS 能否在 Windows 上直接产出 `.dmg`？

不建议。请在 macOS 环境构建 macOS 安装包（CI 也是分别在对应系统 runner 构建）。

### 5. 如何仅构建某个架构？

先执行对应 `prepare:*:<arch>`，再使用 `electron-builder` 的 `--x64 / --arm64 / --ia32` 参数。

### 6. 提示 `未找到 speedtest.exe / sysproxy.exe` 怎么办？

请先确认 `tools/` 目录下已有对应可执行文件；这些文件通常不会提交到仓库，需要在本地或 CI 流程中预先生成/放置。

---

## 致谢

- [Mihomo](https://github.com/MetaCubeX/mihomo)
- [Next.js](https://nextjs.org)
- [Electron](https://www.electronjs.org)
- [Radix UI](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)

## 许可证

[MIT License](LICENSE)
