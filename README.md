# Mindmap Creator

A modern, interactive mindmap creation tool built with Next.js, React Flow, and shadcn/ui. Create, edit, and visualize your ideas with an intuitive drag-and-drop interface.

![Mindmap Creator](https://img.shields.io/badge/Next.js-15.5.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Features

### 🎨 Core Functionality
- **Interactive Canvas**: Drag, drop, and connect nodes with smooth animations
- **Resizable Nodes**: Adjust node sizes to fit your content
- **Colorful Connections**: Each edge gets a unique vibrant color automatically
- **Click-to-Edit**: Simple inline editing for node text
- **Multi-Select**: Select multiple nodes with Cmd/Ctrl + Click
- **Auto-Save**: Your work is automatically saved to browser storage

### 🤖 AI Integration
- **AI-Powered Generation**: Use ChatGPT or other AI assistants to generate mindmaps
- **Pre-configured Prompts**: Structured prompts with proper JSON format
- **Copy or Open**: Copy prompt to clipboard or open directly in ChatGPT
- **Smart Positioning**: AI prompts include hierarchical and circular layout guidelines

### 💾 Data Management
- **Export to JSON**: Save your mindmaps as JSON files
- **Import from JSON**: Load previously saved mindmaps
- **Paste JSON**: Import by pasting JSON directly
- **File Upload**: Import by selecting a file from your device
- **Metadata Tracking**: Each export includes author info and timestamp

### ⌨️ Keyboard Shortcuts
- **Cmd/Ctrl + R**: Add node at cursor position
- **Cmd/Ctrl + C**: Connect two selected nodes
- **Delete**: Remove selected nodes/edges
- **Enter**: Save text changes
- **Escape**: Cancel editing

### 🎯 User Experience
- **Child Mode**: Toggle between guided (with confirmations) and expert mode
- **Dark Mode**: Full dark theme support with smooth transitions
- **Mobile Detection**: Prompts mobile users to use desktop browser
- **Tooltips**: Helpful hints when Child Mode is enabled
- **Toast Notifications**: Success/error messages (respects Child Mode)

### 🎨 Visual Features
- **Clean Minimalist Design**: White nodes with subtle shadows
- **Theme-Aware UI**: All components adapt to light/dark mode
- **Smooth Animations**: Transitions and hover effects
- **MiniMap**: Navigate large mindmaps easily
- **Zoom Controls**: Zoom from 0.2x to 2x
- **Background Grid**: Visual reference for positioning

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/iamnishantgaharwar/mindmap-creator.git

# Navigate to project directory
cd mindmap-creator

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📖 How to Use

### Creating Nodes
1. **Using Keyboard**: Press `Cmd/Ctrl + R` to add a node at your cursor position
2. **Using Button**: Click the "Commands" button to see all available shortcuts

### Editing Nodes
1. Click on any node to edit its text
2. Type your content
3. Press `Enter` to save or `Escape` to cancel
4. Select a node to see resize handles

### Connecting Nodes
1. **Drag Method**: Drag from a node's handle to another node
2. **Keyboard Method**: Select two nodes (Cmd/Ctrl + Click), then press `Cmd/Ctrl + C`
3. Each connection gets a random vibrant color

### Using AI to Generate Mindmaps
1. Click the "Ask AI" button
2. Choose "Open in ChatGPT" or "Copy Prompt"
3. Replace `[YOUR TOPIC HERE]` with your desired topic
4. Let AI generate the JSON structure
5. Copy the generated JSON
6. Use "Import" → "Paste JSON" to add it to your mindmap

### Exporting Your Work
1. Click the "Export" button
2. A JSON file will be downloaded with format: `mindmap-YYYY-MM-DD.json`
3. The file includes metadata (author, date, version)

### Importing Mindmaps
1. Click the "Import" button
2. Choose between:
   - **Paste JSON**: Paste JSON data directly
   - **Upload File**: Select a previously exported file
3. Your mindmap will be loaded instantly

### Child Mode
- **ON** (Default): Shows confirmation dialogs, tooltips, and success messages
- **OFF**: Actions execute immediately without interruptions
- Toggle in the top-right corner

### Dark Mode
- Click the Sun/Moon icon in the top-right corner
- Theme persists across sessions
- All UI elements adapt automatically

## 🛠️ Tech Stack

### Core
- **Next.js 15.5.6** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety
- **Turbopack** - Fast bundler

### UI & Styling
- **shadcn/ui** - Component library
- **Tailwind CSS 4** - Utility-first CSS
- **Radix UI** - Accessible primitives
- **Lucide React** - Icon library
- **next-themes** - Theme management

### Mindmap
- **@xyflow/react** - Interactive node-based UI
- **Zustand** - State management
- **React Flow** - Canvas and node system

### Utilities
- **class-variance-authority** - Variant styling
- **clsx** + **tailwind-merge** - Class merging
- **sonner** - Toast notifications

## 📁 Project Structure

```
mindmap-creator/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── switch.tsx
│   │   ├── tooltip.tsx
│   │   └── ...
│   ├── mindmap-canvas.tsx   # Main canvas component
│   ├── mindmap-nodes.tsx    # Custom node component
│   ├── mindmap-edges.tsx    # Custom edge component
│   └── theme-provider.tsx   # Theme context provider
├── store/
│   └── store.ts             # Zustand state management
├── lib/
│   └── utils.ts             # Utility functions
└── hooks/
    └── useMousePosition.tsx # Mouse tracking hook
```

## 🎨 Color Palette

### Edge Colors
The app uses 14 vibrant colors for edges:
- Red (#ef4444), Orange (#f97316), Amber (#f59e0b)
- Lime (#84cc16), Emerald (#10b981), Teal (#14b8a6)
- Cyan (#06b6d4), Blue (#3b82f6), Indigo (#6366f1)
- Violet (#8b5cf6), Purple (#a855f7), Fuchsia (#d946ef)
- Pink (#ec4899), Rose (#f43f5e)

### Theme Colors
- Uses shadcn/ui semantic color tokens
- Fully customizable via Tailwind CSS
- Automatic dark mode variants

## 🔧 Configuration

### Customizing Node Defaults
Edit `store/store.ts`:
```typescript
style: { width: 150, height: 80 } // Change default size
```

### Customizing Edge Colors
Edit `store/store.ts`:
```typescript
const edgeColors = [
  '#ef4444', // Add or modify colors
  // ...
];
```

### Customizing Zoom Limits
Edit `components/mindmap-canvas.tsx`:
```typescript
minZoom={0.2}  // Minimum zoom level
maxZoom={2}    // Maximum zoom level
```

## 📱 Browser Support

### Recommended
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### Mobile
- Not optimized for mobile devices
- Requires desktop browser for best experience
- Minimum screen width: 768px

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Nishant Gaharwar**
- GitHub: [@iamnishantgaharwar](https://github.com/iamnishantgaharwar)
- Website: [nishantgaharwar.com](https://www.nishantgaharwar.com)

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) - For the amazing node-based UI library
- [shadcn/ui](https://ui.shadcn.com/) - For the beautiful component library
- [Vercel](https://vercel.com/) - For Next.js and hosting platform

## 📊 Features Roadmap

- [ ] Collaborative editing
- [ ] Node templates and themes
- [ ] Image support in nodes
- [ ] Export to PNG/SVG
- [ ] Undo/Redo functionality
- [ ] Auto-layout algorithms
- [ ] Node grouping
- [ ] Search and filter nodes

## 🐛 Known Issues

- Mobile experience is limited (by design)
- Large mindmaps (500+ nodes) may impact performance
- Browser storage has size limits (~5-10MB)

## 💡 Tips & Tricks

1. **Organize Large Mindmaps**: Use the minimap for navigation
2. **Quick Connections**: Select nodes and use Cmd/Ctrl + C
3. **Batch Operations**: Multi-select with Cmd/Ctrl + Click
4. **Expert Mode**: Turn off Child Mode for faster workflow
5. **AI Generation**: Use specific topics for better AI results
6. **Regular Exports**: Export important mindmaps as backup
7. **Dark Mode**: Easier on eyes during long sessions

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation

---

Made with ❤️ by Nishant Gaharwar
