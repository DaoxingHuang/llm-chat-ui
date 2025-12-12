# Release Notes

## v1.0.0

### English

**Key Features:**

- **Multi-Platform Support**:
  - **PC Web**: Full-featured desktop interface with sidebar, settings, and artifact panel.
  - **Mobile Web**: Optimized mobile experience with touch-friendly controls and responsive layout.
- **Advanced Streaming**:
  - Real-time response streaming.
  - Support for Server-Sent Events (SSE) and WebSocket protocols.
  - Extensible `StreamAdapter` architecture.
- **Rich Content Rendering**:
  - **Markdown**: Full Markdown support including tables, lists, and formatting.
  - **Code Highlighting**: Syntax highlighting for code blocks with copy functionality.
  - **Artifacts**: Dedicated panel for viewing and managing generated code or content.
- **Thinking Process**: Visualizes the model's "Chain of Thought" or reasoning process (expandable/collapsible).
- **Extension Capabilities (New)**:
  - **Custom Component Injection**: Inject custom React components directly into the chat stream using Markdown Directives (`::component-name`).
  - **Built-in Examples**:
    - `::user-profile`: Displays a rich user profile card.
    - `::image-plus`: Renders an image with title, description, and link.
    - `::data-list`: Renders a structured list from JSON data.
- **Customizable Settings**:
  - Theme switching (Light/Dark mode).
  - Model selection.
  - Usage modes (General, Developer, Creative).
- **Developer Friendly**:
  - **Monorepo**: Managed with pnpm workspaces for modular development.
  - **Typed**: Built with TypeScript for type safety.
  - **Modern Stack**: React, Vite, Tailwind CSS, Zustand.

---

### 中文发布说明 (Chinese Release Notes)

**主要特性:**

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
- **扩展能力 (新增)**:
  - **自定义组件注入**: 允许通过 Markdown 指令（`::component-name`）将自定义 React 组件直接注入到聊天流中。
  - **内置示例**:
    - `::user-profile`: 显示丰富的用户资料卡片。
    - `::image-plus`: 渲染带有标题、描述和链接的图片。
    - `::data-list`: 根据 JSON 数据渲染结构化列表。
- **个性化设置**:
  - 主题切换（亮色/暗色模式）。
  - 模型选择。
  - 使用模式（通用、开发者、创意）。
- **开发者友好**:
  - **Monorepo**: 使用 pnpm workspaces 管理模块化开发。
  - **类型安全**: 使用 TypeScript 构建。
  - **现代技术栈**: React, Vite, Tailwind CSS, Zustand.
