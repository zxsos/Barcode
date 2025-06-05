# 🏷️ 条形码生成器

一个功能丰富、界面美观的条形码生成工具，支持生成、下载和打印条形码。

![版本](https://img.shields.io/badge/版本-1.0.0-blue.svg)
![许可证](https://img.shields.io/badge/许可证-MIT-green.svg)
![平台](https://img.shields.io/badge/平台-Web-orange.svg)

## ✨ 主要功能

### 🎯 核心功能
- **条形码生成**：支持任意长度数字条形码（CODE128 格式）
- **实时预览**：输入即时验证与状态提示
- **下载导出**：一键下载 PNG 格式条形码图片
- **智能打印**：多种打印布局，自适应尺寸优化

### 🎨 界面特性
- **黑夜模式**：护眼的深色主题切换
- **颜色自定义**：条形码和背景颜色可调节
- **预设方案**：内置多种配色预设
- **响应式设计**：完美适配桌面和移动设备

### 📝 便捷功能
- **历史记录**：自动保存生成历史（最多 20 条）
- **快速重生成**：一键重新生成历史条形码
- **粘贴支持**：智能处理粘贴的数字内容
- **输入验证**：实时数字计数和格式检查

### 🖨️ 打印特性
- **多种尺寸**：小标签、标准、大标签预设
- **批量打印**：支持 1-1000 个条形码批量打印
- **智能布局**：根据数量和尺寸自动选择最佳布局
- **打印预览**：小型预览窗口实时显示效果

## 🚀 快速开始

### 📦 项目结构
```
qcode/
├── index.html          # 主页面文件
├── script.js           # 核心功能脚本
├── styles.css          # 样式表
├── README.md           # 项目说明文档
└── lib/               # 依赖库
    ├── JsBarcode.all.min.js  # 条形码生成库
    └── tailwind.min.css      # Tailwind CSS 框架
```

### 🔧 安装和运行
1. **克隆或下载项目**
   ```bash
   git clone [项目地址]
   cd qcode
   ```

2. **本地运行**
   - 方式一：直接在浏览器中打开 `index.html`
   - 方式二：使用本地服务器（推荐）
     ```bash
     # 使用 Python
     python -m http.server 8000
     
     # 使用 Node.js
     npx http-server
     
     # 使用 Live Server 扩展（VS Code）
     ```

3. **访问应用**
   - 直接打开：`file:///path/to/qcode/index.html`
   - 本地服务器：`http://localhost:8000`

## 📖 使用指南

### 基本使用
1. **输入数字**：在输入框中输入任意长度的数字
2. **生成条形码**：点击"生成条形码"按钮
3. **下载图片**：点击"下载条形码"保存为 PNG 格式
4. **打印条形码**：点击"打印条形码"设置打印参数

### 高级功能
- **颜色设置**：展开颜色设置面板，自定义条形码颜色
- **历史管理**：查看历史记录，快速重新生成
- **黑夜模式**：点击右上角按钮切换主题
- **批量打印**：在打印设置中调整数量和布局

### 键盘快捷键
- `Enter`：生成条形码
- `Esc`：关闭打印设置对话框
- `Ctrl + ↑/↓`：调整打印数量（在打印对话框中）

## 🛠️ 技术栈

### 前端技术
- **HTML5**：语义化标记和现代 Web 标准
- **CSS3**：动画效果、响应式布局、CSS 变量
- **JavaScript (ES6+)**：现代 JavaScript 特性
- **Tailwind CSS**：原子化 CSS 框架

### 核心依赖
- **JsBarcode**：条形码生成库
- **Canvas API**：图形绘制和导出
- **Local Storage**：本地数据持久化
- **Print API**：浏览器打印功能

### 兼容性
- **现代浏览器**：Chrome 60+、Firefox 60+、Safari 12+、Edge 79+
- **移动端**：iOS Safari、Chrome Mobile、Samsung Internet
- **不支持**：Internet Explorer

## 🎨 特色功能详解

### 智能输入验证
- 实时字符过滤（只允许数字和空格）
- 支持任意长度数字输入
- 动态状态提示和按钮控制
- 粘贴内容智能处理

### 丰富的视觉效果
- 按钮点击波纹动画
- 输入框脉冲呼吸效果
- 成功操作闪光提示
- 错误时元素震动反馈

### 打印布局优化
```
小尺寸 (≤240px²)  → 紧凑网格布局 (节省纸张)
中等尺寸 (≤480px²) → 标准网格布局
大尺寸 (>480px²)   → 垂直列表布局
```

### 数据持久化
- 历史记录自动保存（localStorage）
- 黑夜模式偏好记忆
- 打印设置保存
- 颜色偏好存储

## 📱 响应式设计

### 桌面端 (≥1024px)
- 完整功能布局
- 多列历史记录
- 大尺寸预览画布

### 平板端 (768px-1023px)
- 自适应布局调整
- 触控优化的按钮尺寸
- 简化的颜色设置面板

### 移动端 (<768px)
- 单列垂直布局
- 增大触控目标
- 简化的操作界面

## 🔧 自定义配置

### 修改默认设置
编辑 `script.js` 中的配置变量：
```javascript
// 修改历史记录数量限制
const MAX_HISTORY_ITEMS = 20;

// 修改默认打印设置
const DEFAULT_PRINT_WIDTH = 3;
const DEFAULT_PRINT_HEIGHT = 120;
const DEFAULT_PRINT_QUANTITY = 1;
```

### 添加新的颜色预设
在 `index.html` 中添加新的预设按钮：
```html
<button type="button" onclick="applyColorPreset('#FF6B6B', '#F8F9FA')"
        class="click-effect w-8 h-8 rounded border-2 border-gray-300">
    <!-- 预设样式 -->
</button>
```

### 自定义打印样式
修改 `styles.css` 中的打印媒体查询：
```css
@media print {
    /* 自定义打印样式 */
    .custom-print-layout {
        /* 您的样式 */
    }
}
```

## 🚀 部署建议

### 静态网站托管
- **GitHub Pages**：免费、简单、集成 Git
- **Netlify**：自动构建、CDN 加速
- **Vercel**：零配置部署、边缘计算
- **阿里云 OSS**：国内访问速度快

### 本地服务器
```bash
# Nginx 配置示例
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/qcode;
    index index.html;
}

# Apache 配置示例
<VirtualHost *:80>
    DocumentRoot /path/to/qcode
    ServerName your-domain.com
</VirtualHost>
```

## 🤝 贡献指南

### 开发环境设置
1. Fork 本项目
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -m 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 创建 Pull Request

### 代码规范
- 使用 2 空格缩进
- 函数和变量使用驼峰命名
- 添加必要的注释
- 保持代码简洁易读

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [JsBarcode](https://github.com/lindell/JsBarcode) - 强大的条形码生成库
- [Tailwind CSS](https://tailwindcss.com/) - 优秀的 CSS 框架
- 所有贡献者和用户的支持

## 📞 联系方式

如果您有任何问题或建议，请通过以下方式联系：
- 📧 Email: [您的邮箱]
- 🐛 Issues: [项目 Issues 页面]
- 💬 讨论: [项目讨论区]

---

⭐ 如果这个项目对您有帮助，请考虑给它一个星标！
