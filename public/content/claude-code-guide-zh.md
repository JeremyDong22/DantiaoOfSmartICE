# Claude Code 新手完全安装指南 🤖
*版本 2.0 - 重新润色，让中文更自然流畅*
*因为连 Jeremy 也是从小白开始的（而且他对此很有幽默感）*

---

## 欢迎加入 AI 革命！（这次是认真的）

嘿，未来的 AI 大佬们！👋 你们即将开启一段神奇之旅，就像发现了新大陆一样兴奋，但这次不是去探险，而是去消灭代码中的各种 bug。这份指南会手把手教你安装 Claude Code——你可以把它当作你的 AI 编程搭档，永远不会吐槽你的变量命名有多奇葩。

---

## 🎭 Claude Code 的三种形态

在正式开始之前，咱们先了解一下 Claude Code 的三个版本。可以这么理解：入门版、进阶版，还有"卧槽这玩意还能操控浏览器"版：

### 1. **Web 版** - 新手友好 🌐
- **是什么**: 浏览器版本，开箱即用
- **适合谁**: 刚入门的、想快速体验的、不想折腾安装的
- **简单理解**: AI 的新手村

### 2. **Desktop 版** - 日常首选 💻
- **是什么**: 桌面应用，自带 MCP 工具套装
- **适合谁**: 日常办公、需要浏览器控制、想要专业体验的
- **简单理解**: AI 升级打怪，找到了正式工作

### 3. **CLI 版** - 大神专属 🚀
- **是什么**: 命令行工具，开发者专用，火力全开
- **适合谁**: 程序员、Terminal 控、想体验黑客感觉的
- **简单理解**: AI 修炼成仙，获得了编程界的九段黑带

---

## 🎪 准备账号（必备步骤）

想要和 AI 愉快玩耍，你需要先拿到入场券：

### 登录凭证
- **邮箱**: smartice.ai@outlook.com
- **密码**: 找 Jeremy 要（没错，就是要去麻烦他）
- **手机验证**: Jeremy 的手机（他就是我们的守门大叔，人很 nice 的）

### 搞定 Outlook 邮箱（必须要的）

你需要用 smartice.ai@outlook.com 这个邮箱来接收验证邮件，有两种方式：

#### 方案1：网页版（省事方案）
1. 打开 [outlook.com](https://outlook.com)
2. 用上面的账号密码登录
3. 等着收 Claude Code 的验证邮件

#### 方案2：Outlook 客户端（体验更好）
**Mac 用户：**
- 去 [Mac App Store](https://apps.apple.com/app/microsoft-outlook/id985367838) 下载
- 或者直接从 [微软官网](https://www.microsoft.com/en-us/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook) 下载

**Windows 用户：**
- 去 [Microsoft Store](https://www.microsoft.com/store/apps/9nrx63209r7b) 下载
- 或者下载完整的 [Microsoft Office](https://www.office.com/) 套件

---

## 🎯 安装教程：选择你的道路

### 方案1：Web 版（建议新手从这开始）

**为什么推荐先试这个？** 就像下水前先试试水温，安全稳妥。

1. **打开网站**: [claude.ai](https://claude.ai)
2. **点击登录**: 右上角那个按钮，很显眼的
3. **输入邮箱**: smartice.ai@outlook.com
4. **输入密码**: Jeremy 给你的那个（没给的话赶紧去要）
5. **检查邮件**: 去 Outlook 找验证邮件
6. **点击验证**: 点邮件里的链接
7. **完成！** 现在你可以用 Web 版了

**小贴士**: 记得把这个页面加书签，你肯定还会用到的。

---

### 方案2：Desktop 版（推荐日常使用）

**为什么选这个？** 功能比 Web 版强大，就像 Web 版的加强版老哥。

#### 第一步：下载安装包
- **官方下载地址**: [claude.ai/download](https://claude.ai/download)
- **选择系统**: Mac 或 Windows 版本
- **文件大小**: 大概 100MB（下载时间够你泡杯茶的）

#### 第二步：安装过程

**Mac 安装：**
1. 双击下载的 `.dmg` 文件
2. 把 Claude Code 拖到应用程序文件夹里
3. 从应用程序启动（或者用 Spotlight 搜索"Claude Code"）
4. 如果 macOS 说"无法验证开发者"：
   - 去系统偏好设置 → 安全性与隐私
   - 点击"仍要打开"（放心，这个软件很安全）

**Windows 安装：**
1. 双击下载的 `.exe` 文件
2. 按照安装向导一路"下一步"就行
3. 从开始菜单或桌面图标启动

#### 第三步：登录（和 Web 版一样）
1. 输入邮箱 smartice.ai@outlook.com
2. 输入 Jeremy 给你的密码
3. 去邮箱点验证链接
4. 搞定！

#### 第四步：MCP 工具（这是重点）
Desktop 版自带 MCP 工具，让 Claude 可以：
- 控制你的浏览器（像个贴心的数字助手）
- 访问电脑文件（当然需要你的允许）
- 使用各种开发工具

*这些功能都是自动开启的，不需要额外配置！*

---

### 方案3：CLI 版（程序员专属）

**注意**: 这是给那些觉得图形界面太弱鸡的开发者准备的。如果你连 Terminal 是啥都不知道，建议先用 Desktop 版练练手。

#### 前置条件检查
- **命令行工具**（Windows 用命令提示符，Mac/Linux 用 Terminal）
- **Node.js 环境** ([nodejs.org](https://nodejs.org/) 去下载)
- **基础命令行知识**（或者愿意现学现用的勇气）

#### 安装步骤
1. **打开 Terminal/命令提示符**
2. **用 npm 安装**:
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
3. **验证安装成功**:
   ```bash
   claude-code --version
   ```
4. **登录账号**:
   ```bash
   claude-code login
   ```
5. **按提示输入账号密码**
6. **去邮箱验证**
7. **恭喜你成为 CLI 大神！** ✨

#### CLI 常用命令
```bash
# 开启聊天模式
claude-code chat

# 分析代码文件
claude-code analyze myfile.js

# 查看帮助文档
claude-code --help
```

---

## 🎊 成功进入！接下来做什么？

### 了解账号权限
- **套餐等级**: 你用的是高级版（很豪华！）
- **Token 消耗**: 每次对话都会消耗 Token（可以理解为 AI 的能量值）
- **每日限制**: 额度很充足，但不是无限的（Claude 也要休息的嘛）
- **使用监控**: 可以在设置里查看使用情况

### 新手入门建议
1. **先打个招呼**: 从"你好，Claude！"开始（有礼貌总没错）
2. **问个简单问题**: "你都能帮我做什么？"
3. **测试文件功能**（Desktop/CLI 版）: "你能帮我看看电脑上的文件吗？"
4. **尝试 MCP 功能**（Desktop 版）: "能帮我打开一个浏览器页面吗？"

---

## 🆘 常见问题解决（遇到麻烦时看这里）

### 问题排查指南

**"登录不了！"**
- 检查邮箱有没有拼错
- 确认密码是对的
- 问问 Jeremy 是不是改密码了（他偶尔会改）

**"没收到验证邮件！"**
- 看看 Outlook 的垃圾邮件文件夹
- 等个几分钟（有时邮件会晚点到）
- 重新试一次登录流程

**"Desktop 版打不开！"**
- 重启电脑试试（万能解决方案）
- 看看杀毒软件是不是拦截了
- 重新下载安装一遍

**"CLI 安装失败！"**
- 确认 Node.js 装好了
- 试试用管理员权限运行
- 检查网络连接是否正常

---

## 🎈 实战经验分享

1. **慢慢来**: 别想着第一天就做出下一个 Facebook，先从小项目开始
2. **仔细看回复**: Claude 解释得很详细，别急着跳过
3. **多问问题**: 有不懂的就继续问，不要不好意思
4. **保存重要对话**: Desktop 版可以保存聊天记录，很有用
5. **大胆试验**: Claude 不会嫌弃你的奇怪问题（真的不会）

---

## 🚀 接下来怎么玩？

安装完成后，可以根据你的水平选择不同的使用方式：

### 新手阶段：
1. 从 Web 版开始熟悉
2. 让 Claude 解释编程概念
3. 请教 debug 问题
4. 练习简单的编程题

### 进阶阶段：
1. 升级到 Desktop 版
2. 试试文件分析功能
3. 让 Claude 帮忙处理大项目
4. 玩玩浏览器自动化

### 高手阶段：
1. 掌握 CLI 版本
2. 整合到开发流程中
3. 用 MCP 工具处理复杂任务
4. 教其他人使用（知识要分享嘛！）

---

## 📞 求助渠道

- **技术问题**: 找 Jeremy（他可能在某个角落写代码）
- **账号问题**: 找 Jeremy 要密码
- **使用问题**: 直接问 Claude！（挺有意思的对吧？）
- **新功能建议**: 告诉 Jeremy，让他去跟 Anthropic 提

---

## 🎯 结语

恭喜你！你现在拥有了最牛逼的 AI 编程助手之一。有了它你可以：
- 比喝了三杯咖啡的程序员还快地 debug
- 跟 AI 导师一起学新技术
- 把无聊的重复工作自动化
- 用 AI 加持的生产力震惊小伙伴们

记住：Claude Code 是工具，不是大脑的替代品。要用它来增强你的能力，而不是替代思考。如果搞砸了什么，就怪 Jeremy 好了——他已经习惯背锅了。

现在开始愉快地写代码吧！数字世界在等着你用 AI 加持的作品去征服它。

---

*祝你编程愉快！*
*- SmartICE 团队*

---

## 📋 常用链接汇总

### Claude Code 相关：
- [Web 版入口](https://claude.ai)
- [Desktop 版下载](https://claude.ai/download)
- CLI 安装: `npm install -g @anthropic-ai/claude-code`

### 邮箱相关：
- [Outlook 网页版](https://outlook.com)
- [Outlook Mac 版](https://apps.apple.com/app/microsoft-outlook/id985367838)
- [Outlook 官方下载](https://www.microsoft.com/en-us/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook)
- [Outlook Windows 版](https://www.microsoft.com/store/apps/9nrx63209r7b)

### 环境依赖：
- [Node.js 官网](https://nodejs.org/) （CLI 版需要）
- [Microsoft Office](https://www.office.com/) （可选，完整版 Office 套件）

### 登录信息：
- 邮箱: smartice.ai@outlook.com
- 密码: 找 Jeremy 要
- 手机验证: Jeremy 的手机