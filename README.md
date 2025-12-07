# UTM Builder

UTM parameter generator tool for marketers

## 📖 Project Overview

A dark-themed UTM URL generator. Easily and quickly create UTM parameters for marketing campaign tracking.

- 🌐 **Live Demo**: [utm-builder.vercel.app](https://utm-builder.vercel.app)
- 📊 **Google Analytics Tracking Enabled**

## 🎯 Learning Project

This project is a learning project built while learning React, Vite, and Tailwind CSS.

### Documentation

- **Development Guide**: [CLAUDE.md](CLAUDE.md) — Project architecture and implementation guide
- **[Quick Reference](docs/quick-reference.md)** — Quick concept lookup
- **[Concepts Dictionary](docs/concepts-dictionary.md)** — Detailed concept explanations
- **[Changelog](CHANGELOG.md)** — Version history and feature list

## ✨ Current Features

### Core Features

- ✅ 6 UTM parameter inputs (Base URL, Source, Medium, Campaign, Term, Content)
- ✅ Real-time URL generation and preview
- ✅ Automatic localStorage saving (data persists on refresh)
- ✅ Multiple row add/delete (bulk delete with range selection)
- ✅ Independent URL generation and copying per row
- ✅ Full reset functionality

### Notion-style Keyboard Interactions 🎯

- ✅ **Perfect cell/row mode switching** (ESC: edit → cell selection → row selection)
- ✅ Keyboard navigation (arrow keys to move cells, Enter to move down)
- ✅ Cell range selection and copy/paste (Shift+arrow keys)
- ✅ Row range selection and copy/paste
- ✅ Keyboard shortcuts (Cmd/Ctrl+S: save, Cmd/Ctrl+A: select all)
- ✅ Toast notification system (copy/paste success notifications)

### Technical Features

- ✅ **Root cause problem-solving focused design** (no workarounds, clear state flow)
- ✅ useEffect-based automatic focus management
- ✅ Separation of concerns architecture (useCellSelection, useRowSelection, useKeyboardNavigation)

## 🛠️ Tech Stack

- React 19.2
- Vite 6.4
- Tailwind CSS 3.x
- localStorage API

## 🚀 Getting Started

```bash
# Clone repository
git clone https://github.com/itsblakeyeon/utm-builder.git
cd utm-builder

# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:5173 in your browser

## 📦 Build

```bash
# Production build
npm run build

# Preview build result
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── BuilderTab.jsx        # Main builder screen
│   ├── UTMTableRow.jsx       # UTM table row component
│   ├── UTMTableInput.jsx     # UTM input field component
│   ├── BuilderTableHeader.jsx # Table header
│   ├── SavedTab.jsx          # Saved URL management
│   ├── UTMGuide.jsx          # UTM guide
│   └── Toast.jsx             # Toast notification component
├── hooks/
│   ├── useLocalStorage.js    # localStorage management Hook
│   ├── useKeyboardNavigation.js # Keyboard navigation (basic)
│   ├── useCellSelection.js   # Cell selection and copy/paste
│   ├── useRowSelection.js    # Row selection and copy/paste
│   ├── useRowClipboard.js    # Row copy/paste
│   └── useToast.js            # Toast notification Hook
├── utils/
│   ├── urlBuilder.js         # UTM URL generation logic
│   ├── validation.js         # URL validation
│   └── rowFactory.js         # Row creation utility
├── App.jsx                   # Root component
└── main.jsx                  # Entry point
```

## 🎨 Key Features

### Multiple Row Management

- Add new UTM URL generation rows with "+ Add Row" button
- Independent parameter input and URL generation per row
- Row deletion functionality (minimum 1 row maintained)

### Auto-save

- All input values automatically saved to localStorage
- Data persists after page refresh
- Data restored on revisit after browser close

### URL Validation

- Base URL format validation
- Warning message displayed for invalid URL input
- Automatic protocol addition (https://)

## 📝 Future Plans

- [ ] Preset system (frequently used Source+Medium+Campaign templates)
- [ ] URL shortening feature (Bitly API integration)
- [ ] QR code generation
- [ ] Statistics dashboard
- [ ] Mobile responsive design (table → card view)

## 📄 License

ISC

---

Made with ❤️ for learning React
