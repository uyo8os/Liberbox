# 📝 Release Notes 自动生成指南

## 🎯 功能说明

当你推送一个新的版本标签（如 `v0.2.8`）时，GitHub Actions 会自动：

1. ✅ 构建 Windows 和 macOS 版本
2. ✅ 创建 GitHub Release
3. ✅ 上传构建产物
4. ✅ **自动生成带有漂亮下载按钮的 Release 描述**

## 🎨 效果预览

Release 页面会显示：

```markdown
# 🎉 Liberbox v0.2.8

## 📦 Download link:

### Windows 10/11:

[64-bit EXE 按钮] [64-bit 7Z 按钮]

### macOS 11+:

[Intel DMG 按钮] [Apple Silicon DMG 按钮]

---

## 🔧 Installation

### Windows
1. Download the `.exe` installer
2. Run the installer and follow the setup wizard
3. Launch Liberbox from the Start Menu

### macOS
1. Download the `.dmg` file for your architecture
2. Open the DMG and drag Liberbox to Applications
3. Launch Liberbox from Applications folder
```

## 🚀 使用方法

### 自动发布（推荐）

1. **创建并推送版本标签**：
   ```bash
   git tag v0.2.8
   git push origin v0.2.8
   ```

2. **等待 GitHub Actions 完成**：
   - 访问 `Actions` 标签页查看构建进度
   - 构建完成后，Release 会自动创建

3. **查看 Release**：
   - 访问 `Releases` 页面
   - 你会看到带有漂亮下载按钮的 Release

### 手动发布

如果需要手动触发构建：

1. 访问 `Actions` 标签页
2. 选择 `Build` workflow
3. 点击 `Run workflow`
4. 选择分支并运行

## 🎨 自定义下载按钮

### 使用 Shields.io 徽章

下载按钮使用 [Shields.io](https://shields.io/) 生成，格式：

```markdown
[![标签文字](https://img.shields.io/badge/文字-类型-颜色?style=for-the-badge&logo=图标&logoColor=white)](下载链接)
```

### 示例

**Windows 按钮**：
```markdown
[![64-bit EXE](https://img.shields.io/badge/64--bit-EXE-0078D4?style=for-the-badge&logo=windows&logoColor=white)](下载链接)
```

**macOS 按钮**：
```markdown
[![Intel DMG](https://img.shields.io/badge/Intel-DMG-000000?style=for-the-badge&logo=apple&logoColor=white)](下载链接)
```

### 可用的图标

- `logo=windows` - Windows 图标
- `logo=apple` - Apple 图标
- `logo=linux` - Linux 图标
- `logo=7zip` - 7-Zip 图标
- `logo=github` - GitHub 图标

### 可用的颜色

- `0078D4` - Windows 蓝色
- `000000` - 黑色（macOS）
- `FCC624` - Linux 黄色
- `28A745` - 绿色
- `DC3545` - 红色

## 📂 文件结构

```
.github/
├── workflows/
│   └── build.yml              # 构建和发布 workflow
├── release-template.md        # Release 描述模板
└── RELEASE_NOTES_GUIDE.md     # 本指南

scripts/
└── generate-release-notes.mjs # Release Notes 生成脚本（可选）
```

## 🔧 修改 Release 描述

### 方法 1：修改 workflow 文件

编辑 `.github/workflows/build.yml`，找到 `Publish Release` 步骤，修改 `body:` 部分。

### 方法 2：使用模板文件

1. 编辑 `.github/release-template.md`
2. 运行生成脚本：
   ```bash
   node scripts/generate-release-notes.mjs v0.2.8
   ```
3. 查看生成的 `release-notes.md`

## 📝 添加更新日志

### 自动生成

GitHub 会自动生成 "Full Changelog" 链接，显示两个版本之间的所有提交。

### 手动添加

在 workflow 的 `body:` 部分添加：

```yaml
body: |
  # 🎉 Liberbox ${{ github.ref_name }}
  
  ## 📝 What's Changed
  
  - ✨ 新功能：添加了 XXX
  - 🐛 修复：修复了 YYY
  - 🔧 优化：改进了 ZZZ
  
  ## 📦 Download link:
  ...
```

## 🎯 最佳实践

1. **语义化版本**：使用 `v主版本.次版本.修订号` 格式（如 `v0.2.8`）
2. **清晰的提交信息**：使用有意义的提交信息，方便生成 changelog
3. **测试后发布**：确保在本地测试通过后再推送标签
4. **及时更新文档**：在 Release 描述中说明重要变更

## 🔗 相关链接

- [Shields.io 文档](https://shields.io/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [softprops/action-gh-release](https://github.com/softprops/action-gh-release)
