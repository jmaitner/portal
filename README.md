# Road Ready Safety Portal

A modern, static Nuxt 3 learning management system showcasing a Florida Basic Driver Improvement course with interactive features.

## 🚀 Features

### Course Experience
- **14-Step Roadmap**: Numbered progression through 12 modules + Final Exam + Certificate
- **Interactive Timer**: Seat-time tracking with pause/resume functionality
- **Progress Tracking**: Visual progress indicators and completion status
- **Quiz System**: Interactive assessments with immediate feedback
- **Certificate Generation**: Professional certificate preview

### Technical Features
- **Static Generation**: Fully static site with Nuxt 3
- **SSR Compatible**: No hydration mismatches
- **Responsive Design**: Mobile-friendly interface
- **Accessibility**: ARIA labels, focus management, semantic HTML
- **Nuxt UI Pro**: Modern component library integration

## 🛠 Tech Stack

- **Framework**: Nuxt 3
- **UI Library**: Nuxt UI Pro
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Build**: Static generation with `nuxt generate`

## 📁 Project Structure

```
portal/
├── components/           # Vue components
│   ├── HeaderBar.vue    # Global navigation
│   ├── FooterBar.vue    # Footer links
│   ├── ModuleTree.vue   # Course roadmap
│   ├── LessonRenderer.vue # Content display
│   ├── QuizBlock.vue    # Quiz functionality
│   ├── TimerBlock.vue   # Countdown timer
│   └── PlayerToolbar.vue # Course navigation
├── pages/               # Route pages
│   ├── dashboard.vue    # Course overview
│   ├── course/          # Course pages
│   ├── support.vue      # Support page
│   └── legal/           # Legal pages
├── static-data/         # Static JSON fixtures
│   ├── courses.json     # Course metadata
│   ├── modules/         # Module content
│   └── quiz/            # Quiz questions
├── layouts/             # Page layouts
├── assets/              # CSS and assets
└── public/              # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jmaitner/portal.git
   cd portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Development**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run generate
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📖 Usage

### Course Navigation
- **Dashboard**: Overview of course progress and stats
- **Roadmap**: Click any step to navigate to content
- **Timer**: Pause/resume functionality for seat-time tracking
- **Final Exam**: 5-question assessment with 80% pass threshold
- **Certificate**: Professional completion certificate

### Demo Features
- **Timer Demo**: First lesson demonstrates 90-second countdown
- **Progress Tracking**: Visual indicators for completion status
- **Quiz Interaction**: Immediate feedback with explanations
- **Responsive Design**: Works on desktop and mobile

## 🎯 Key Components

### TimerBlock
- Client-only countdown timer
- Pause/resume functionality
- SSR-safe with fallback display
- Integrates with course progression

### ModuleTree (Roadmap)
- 14-step numbered progression
- Status indicators (not started, in-progress, complete, locked)
- Visual lock icons for exam/certificate
- Accessible navigation with proper focus management

### Course Player
- Two-column layout with roadmap and content
- Progress bar integration
- Timer controls for read lessons
- Navigation between lessons

## 🔧 Configuration

### Nuxt Config
- Nuxt UI Pro integration
- Static generation enabled
- Route rules for course pages
- Development license for UI Pro

### Static Data
All course content is stored in JSON fixtures:
- `courses.json`: Course metadata and progress
- `modules/fl-bdi.json`: 12 modules with lessons
- `quiz/fl-bdi-m1.json`: Module quiz
- `quiz/fl-bdi-final.json`: Final exam

## 🚀 Deployment

The site is built as a static site and can be deployed to any static hosting service:

```bash
npm run generate
# Deploy .output/public to your hosting service
```

## 📝 License

This project uses Nuxt UI Pro for development. For production use, ensure you have the appropriate license.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, please contact:
- Email: info@roadreadysafety.com
- Phone: (888) 885-5707

---

**Note**: This is a demo implementation showcasing the UI and functionality. In a production environment, you would integrate with a backend for user management, progress tracking, and certificate generation.
