# 📝 Release Notes Auto-Generation Guide

## 🎯 Feature Description

When you push a new version tag (e.g., `v0.2.8`), GitHub Actions will automatically:

1. ✅ Build Windows and macOS versions

2. ✅ Create a GitHub Release

3. ✅ Upload build artifacts

4. ✅ **Automatically generate a Release description with a nice download button**

## 🎨 Preview

The Release page will display:

```markdown

# 🎉 Liberbox v0.2.8

## 📦 Download link:

### Windows 10/11:

[64-bit EXE button] [64-bit 7Z button]

### macOS 11+:

[Intel DMG button] [Apple Silicon DMG button]

---

## 🔧 Installation

### Windows

1. Download the `.exe` installer

2. Run the installer and follow the setup wizard

3. Launch Liberbox from the Start Menu

### macOS

1. Download the `.dmg` file for your architecture

2. Open the DMG and drag Liberbox to Applications

3. Launch Liberbox from the Applications folder

```

## 🚀 How to Use

### Automatic Release (Recommended)

1. **Create and push version tag**:

```bash

git tag v0.2.8

git push origin v0.2.8

```

2. **Wait for GitHub Actions to complete**:

- Visit the `Actions` tab to check the build progress

- After the build is complete, the Release will be automatically created

3. **View Release**:

- Visit the `Releases` page

- You will see the Release with a nice download button

### Manual Release

If you need to manually trigger the build:

1. Visit `Actions` tab

2. Select `Build` workflow

3. Click `Run workflow`

4. Select branch and run

## 🎨 Customize the download button

### Using Shields.io badges

The download button is generated using [Shields.io](https://shields.io/), formatted as:

```markdown

[![tag text](https://img.shields.io/badge/text-type-color?style=for-the-badge&logo=icon&logoColor=white)](download link)

```

### Example

**Windows button**:

```markdown

[![64-bit [EXE](https://img.shields.io/badge/64--bit-EXE-0078D4?style=for-the-badge&logo=windows&logoColor=white)](Download Link)

**macOS Buttons**:

```markdown

[![Intel DMG](https://img.shields.io/badge/Intel-DMG-000000?style=for-the-badge&logo=apple&logoColor=white)](Download Link)

```

### Available Icons

- `logo=windows` - ​​Windows icon

- `logo=apple` - Apple icon

- `logo=linux` - Linux icon

- `logo=7zip` - 7-Zip icon

- `logo=github` - GitHub icon

### Available Colors

- `0078D4` - Windows Blue

- `000000` - Black (macOS)

- `FCC624` - Linux Yellow

- `28A745` - Green

- `DC3545` - Red

## 📂 File Structure

```
.github/

├── workflows/

│ └── build.yml # Build and release workflow

├── release-template.md # Release description template

└── RELEASE_NOTES_GUIDE.md # This guide

scripts/

└── generate-release-notes.mjs # Release Notes generation script (optional)

```

## 🔧 Modifying the Release Description

### Method 1: Modify the workflow file

Edit `.github/workflows/build.yml`, find the `Publish Release` step, and modify the `body:` part.

### Method 2: Using a Template File

1. Edit `.github/release-template.md`

2. Run the generation script:

``bash
node scripts/generate-release-notes.mjs v0.2.8

```
3. View the generated `release-notes.md`

## 📝 Adding Changelogs

### Automatic Generation

GitHub will automatically generate a "Full Changelog" link, showing all commits between the two versions.

### Manual Addition

Add the following to the `body:` section of your workflow:

```yaml
body: |

# 🎉 Liberbox ${{ github.ref_name }}

## 📝 What's Changed

- ✨ New Features: Added XXX

- 🐛 Fixes: Fixed YYY

- 🔧 Optimizations: Improved ZZZ

## 📦 Download Link:

...
```

## 🎯 Best Practices

1. **Semantic Versioning**: Use the `v major version.minor version.revision number` format (e.g., `v0.2.8`)

2. **Clear Commit Messages**: Use meaningful commit messages for easy changelog generation

3. **Test Before Releasing**: Ensure local testing is successful before pushing tags

4. **Timely Documentation Updates**: Explain important changes in the Release description

## 🔗 Related Links

- [Shields.io Documentation](https://shields.io/)

- [GitHub Actions Documentation](https://docs.github.com/en/actions)

- [softprops/action-gh-release](https://github.com/softprops/action-gh-release)