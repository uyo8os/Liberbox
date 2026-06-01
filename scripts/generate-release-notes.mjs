#!/usr/bin/env node

/**
 * 自动生成 GitHub Release Notes
 * 包含漂亮的下载链接徽章
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 从环境变量或参数获取版本号
const version = process.env.GITHUB_REF_NAME || process.argv[2] || 'v0.0.0';
const repoUrl = process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY
  ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}`
  : 'https://github.com/uyo8os/Liberbox';

// 读取模板
const templatePath = path.join(__dirname, '..', '.github', 'release-template.md');
let template = fs.readFileSync(templatePath, 'utf-8');

// 构建下载链接（注意：文件名不包含 v 前缀）
const versionWithoutV = version.replace(/^v/, '');
const releaseUrl = `${repoUrl}/releases/download/${version}`;
const windowsX64Setup = `${releaseUrl}/Liberbox-${versionWithoutV}-x64-setup.exe`;
const windowsX647z = `${releaseUrl}/Liberbox-${versionWithoutV}-x64.7z`;
const macosX64Dmg = `${releaseUrl}/Liberbox-${versionWithoutV}-x64.dmg`;
const macosArm64Dmg = `${releaseUrl}/Liberbox-${versionWithoutV}-arm64.dmg`;

// 获取上一个版本（用于生成 changelog 对比链接）
const getPreviousVersion = () => {
  try {
    // 这里可以通过 git tag 获取上一个版本
    // 简化处理，返回占位符
    return 'v0.0.0';
  } catch (error) {
    return 'v0.0.0';
  }
};

const previousVersion = getPreviousVersion();
const compareUrl = `${repoUrl}/compare/${previousVersion}...${version}`;

// 替换模板变量
template = template
  .replace(/{{VERSION}}/g, version)
  .replace(/{{WINDOWS_X64_SETUP}}/g, windowsX64Setup)
  .replace(/{{WINDOWS_X64_7Z}}/g, windowsX647z)
  .replace(/{{MACOS_X64_DMG}}/g, macosX64Dmg)
  .replace(/{{MACOS_ARM64_DMG}}/g, macosArm64Dmg)
  .replace(/{{COMPARE_URL}}/g, compareUrl)
  .replace(/{{CHANGELOG}}/g, '- See commit history for details');

// 输出到文件或标准输出
const outputPath = path.join(__dirname, '..', 'release-notes.md');
fs.writeFileSync(outputPath, template, 'utf-8');

console.log('✅ Release notes generated successfully!');
console.log(`📄 Output: ${outputPath}`);
console.log('\n--- Preview ---\n');
console.log(template);
