# BookNote / 摘书

手机端优先的读书摘抄记录 Web App 原型。

## 本地预览

这个版本是零依赖静态网页，可以直接用本地服务器打开：

```bash
node server.mjs
```

然后访问：

```text
http://localhost:4173
```

## GitHub Pages 部署

1. 在 GitHub 新建一个仓库，例如 `BookNote`。
2. 把本目录推送到仓库的 `main` 分支。
3. 进入仓库 `Settings` -> `Pages`。
4. `Build and deployment` 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/root`。
6. 保存后等待 1-2 分钟，手机打开 GitHub 给出的 Pages 地址。

页面使用相对路径引用 `src/styles.css` 和 `src/app.js`，可以直接部署在 GitHub Pages 的仓库子路径下。
