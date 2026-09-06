# AGENTS.md

## 项目概览

- 这是无构建步骤的纯静态站点，面向 GitHub Pages 部署；没有 `package.json`、测试框架或 CI 配置。
- 主站入口是 [index.html](index.html)，文章列表由 [assets/main.js](assets/main.js) 读取 [posts/posts.json](posts/posts.json) 后生成，共享样式在 [assets/style.css](assets/style.css)。
- [shizhang/index.html](shizhang/index.html) 是独立的记账 PWA，数据保存在浏览器 `localStorage`，不要把它与主站脚本混用。
- [iptv/](iptv/) 只存放播放列表数据；[404.html](404.html) 是独立错误页。

## 开发与验证

- 本地预览应在仓库根目录运行 `python -m http.server 8000`，然后访问 `http://localhost:8000/`；不要直接用 `file://` 打开，因为主站使用 `fetch()` 读取 JSON。
- 修改后至少检查主站首页、文章列表页、404 页和 `/shizhang/` 是否能正常加载。浏览器控制台不应出现资源、JSON 或 Service Worker 错误。
- `shizhang` 的 Service Worker 只在 HTTPS 或 localhost 下工作。修改其页面或静态资源后，递增 [shizhang/sw.js](shizhang/sw.js) 的 `VERSION`，避免旧缓存继续生效。

## 内容变更约定

- 新增文章时，同时创建 `posts/<slug>.html` 并在 [posts/posts.json](posts/posts.json) 中添加 `title`、`date`、`url` 和可选的 `summary`。
- 保持文章 URL 与 JSON 中的 `url` 一致，并使用仓库已有的相对路径风格。
- 修改 JSON 时保持合法 JSON；文章排序由 [assets/main.js](assets/main.js) 按日期倒序处理。
- 保留现有中文文案、HTML 结构和缩进风格，除非任务明确要求重做界面。

## 变更边界与注意事项

- 主站脚本只负责文章列表和页脚年份；独立功能应放在对应页面或其专属资源中，避免把 PWA 逻辑引入主站。
- 不要在没有明确需求时改动 IPTV 地址；这些地址可能受局域网、跨域、运营商限制或时效影响。
- `shizhang` 的数据清空不可恢复；不要在调试或验证中调用清空数据操作。
- 仓库没有依赖安装或打包步骤。验证失败时优先检查相对路径、JSON 格式、浏览器控制台和 Service Worker 缓存。