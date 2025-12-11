# Simple LLM Chat (简体中文)

一个基于 React、Tailwind CSS 和 TypeScript 构建的现代化、响应式且功能丰富的 LLM 聊天界面。本项目采用 Monorepo 架构，提供统一的核心库和 UI 组件库，同时支持 PC 端和移动端应用。

## 功能特性

- **多平台支持**:
  - **PC Web**: 功能齐全的桌面端界面，包含侧边栏、设置和 Artifact 面板。
  - **Mobile Web**: 针对移动端优化的体验，支持触摸操作和响应式布局。
- **高级流式传输**:
  - 实时响应流式传输。
  - 支持 Server-Sent Events (SSE) 和 WebSocket 协议。
  - 可扩展的 `StreamAdapter` 架构。
- **丰富的内容渲染**:
  - **Markdown**: 完整的 Markdown 支持，包括表格、列表和格式化。
  - **代码高亮**: 支持代码块语法高亮和复制功能。
  - **Artifacts**: 专用的面板用于查看和管理生成的代码或内容。
- **思考过程**: 可视化模型的"思维链"或推理过程（支持展开/折叠）。
- **个性化设置**:
  - 主题切换（亮色/暗色模式）。
  - 模型选择。
  - 使用模式（通用、开发者、创意）。
- **开发者友好**:
  - **Monorepo**: 使用 pnpm workspaces 管理模块化开发。
  - **类型安全**: 使用 TypeScript 构建。
  - **现代技术栈**: React, Vite, Tailwind CSS, Zustand.

## 项目结构

本项目采用 Monorepo 结构组织：

- **apps/**
  - `pc`: 桌面端 Web 应用。
  - `mobile`: 移动端 Web 应用。
- **packages/**
  - `core`: 核心业务逻辑、类型定义和流式适配器。
  - `ui`: 共享 UI 组件（聊天界面、Markdown 渲染器、设置）。
  - `store`: 状态管理（Zustand stores）。
  - `utils`: 共享工具函数。

## 快速开始

### 前置要求

- Node.js (v18+)
- pnpm (v8+)

### 安装

1. 克隆仓库:

   ```bash
   git clone <repository-url>
   cd llm-chat-ui
   ```

2. 安装依赖:
   ```bash
   pnpm install
   ```

### 开发

启动开发服务器:

- **PC 应用**:

  ```bash
  pnpm dev:pc
  ```

- **移动端应用**:
  ```bash
  pnpm dev:mobile
  ```

### 构建

构建所有包和应用:

```bash
pnpm build:all
```

构建特定目标:

```bash
pnpm build:pc      # 构建 PC 应用
pnpm build:mobile  # 构建移动端应用
pnpm build:ui      # 构建 UI 包
```

## 许可证

MIT
