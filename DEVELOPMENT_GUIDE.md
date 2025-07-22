# Development Prompt Template untuk Inventory Management System

## 🎯 Project Context
Kami sedang mengembangkan **Inventory Management System** dengan stack:
- **Backend**: Node.js + Express.js + TypeScript (Port 5000)
- **Frontend**: Next.js 15 + React 18 + TypeScript + Tailwind CSS (Port 3000)
- **Database**: [MongoDB/PostgreSQL - akan ditentukan]
- **Styling**: Modern UI dengan Tailwind CSS + shadcn/ui components

## 📁 Struktur Project
```
app_1_inventory/
├── backend/                 # Node.js API Server
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── utils/         # Helper functions
│   ├── server.js          # Entry point
│   └── package.json
└── frontend/               # Next.js App
    ├── src/
    │   ├── app/           # App Router pages
    │   ├── components/    # React components
    │   │   ├── ui/       # Reusable UI components
    │   │   └── inventory/ # Feature components
    │   ├── lib/          # Utilities & services
    │   ├── types/        # TypeScript definitions
    │   └── hooks/        # Custom React hooks
    └── package.json
```

## 🎨 Design System
- **Colors**: Blue primary (#2563eb), Slate neutral
- **Typography**: Modern, clean fonts
- **Components**: Professional shadcn/ui based
- **Layout**: Responsive, mobile-first approach
- **Icons**: Lucide React icons

## 🔧 Development Standards

### Frontend (Next.js)
```typescript
// ✅ Good Component Structure
'use client';

import { useState } from 'react';
import { SomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InventoryItem } from '@/types';

interface ComponentProps {
  items: InventoryItem[];
  onAction: (item: InventoryItem) => void;
}

export function ComponentName({ items, onAction }: ComponentProps) {
  const [loading, setLoading] = useState(false);

  return (
    <Card className="p-6">
      {/* Component content */}
    </Card>
  );
}
```

### Backend (Express)
```javascript
// ✅ Good API Structure
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/inventory', async (req, res) => {
  try {
    // Logic here
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
```

## 📝 Coding Guidelines

### 1. Component Naming
- PascalCase untuk components: `InventoryTable`
- camelCase untuk functions: `handleAddItem`
- kebab-case untuk files: `inventory-table.tsx`

### 2. Type Safety
- Selalu gunakan TypeScript interfaces
- Define proper types di `src/types/index.ts`
- No `any` types kecuali absolutely necessary

### 3. Styling
- Gunakan Tailwind CSS classes
- Konsisten dengan design system
- Responsive design (mobile-first)
- Accessibility considerations

### 4. State Management
- useState untuk local state
- Custom hooks untuk complex logic
- Context API untuk global state (jika perlu)

### 5. Error Handling
- Try-catch blocks untuk async operations
- User-friendly error messages
- Proper loading states

## 🚀 Feature Implementation Approach

### Saat Menambah Feature Baru:

1. **Planning**:
   - Define requirements
   - Plan component structure
   - Consider API endpoints needed

2. **Backend First**:
   - Create API endpoints
   - Test dengan Postman/Thunder Client
   - Document API response

3. **Frontend Implementation**:
   - Create types/interfaces
   - Build UI components
   - Integrate with API
   - Handle loading & error states

4. **Testing**:
   - Manual testing
   - Edge cases
   - Mobile responsiveness

## 📋 Current Features Status

### ✅ Completed
- [x] Project setup (Backend + Frontend)
- [x] Basic UI components (Button, Input, Card, Badge)
- [x] Header component
- [x] Stats cards
- [x] Inventory table
- [x] Search functionality
- [x] Mock data API
- [x] GitHub repositories

### 🚧 In Progress
- [ ] Add/Edit/Delete functionality
- [ ] Modal components
- [ ] Form validation
- [ ] Better responsive design

### 📋 Roadmap
- [ ] Database integration
- [ ] User authentication
- [ ] Image uploads
- [ ] Export functionality
- [ ] Advanced filtering
- [ ] Reports & analytics
- [ ] Deployment

## 💡 Prompt Examples

### Untuk Menambah Feature:
"Kami ingin menambah [FEATURE NAME] pada inventory system. Buat implementasi yang:
1. Konsisten dengan design system yang ada
2. Menggunakan TypeScript dengan proper types
3. Handle error states dan loading states
4. Mobile-responsive
5. Ikuti struktur component yang sudah ada"

### Untuk Bug Fixes:
"Ada issue dengan [COMPONENT/FEATURE]. Mohon debug dan fix sambil memastikan:
1. Tidak break existing functionality
2. Maintain type safety
3. Follow coding standards
4. Test di different screen sizes"

### Untuk Improvements:
"Improve [COMPONENT/FEATURE] untuk lebih user-friendly dan modern:
1. Better UX/UI
2. Performance optimization
3. Accessibility improvements
4. Code cleanup jika perlu"

---

**Selalu gunakan template ini sebagai context saat develop!** 🎯
