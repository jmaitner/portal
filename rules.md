# Portal Development Rules

## 🚫 **CRITICAL: No Regression Rules**

### **1. One Header Policy**
- **ALL pages MUST use `layouts/default.vue` for the header**
- **Page files MAY NOT render a header component or header markup**
- **HeaderBar component is DEPRECATED - use inline header in default layout only**
- **REJECT any PR that adds headers to individual pages**

### **2. No Green CTAs Rule**
- **Green (`color="success"`) is ONLY for success states (passed, checkmarks)**
- **ALL primary CTAs MUST use `color="primary"`**
- **REJECT any PR with `color="success"` on buttons that aren't success states**
- **Global default: `defaultVariants: { color: 'primary' }`**

### **3. TimerCard Progress Bar Ban**
- **TimerCard MUST NOT contain `<UProgress>` or progress bars**
- **TimerCard layout: Top row = Time • Next, Bottom row = Status text**
- **REJECT any PR that adds progress bars to TimerCard**

### **4. CSS Load Order (Brand Colors Must Win)**
- **assets/css/main.css import order MUST be:**
  1. `@import "tailwindcss";` (v4 from Nuxt UI Pro)
  2. `@import "@nuxt/ui-pro";` (framework styles)
  3. `@import "./tokens.css";` (your overrides LAST)
- **REJECT any PR that changes this order**

### **5. Icon Naming Convention**
- **ONLY use Nuxt UI "i-" preset: `i-heroicons-*`**
- **NEVER use `heroicons:` strings**
- **Valid examples: `i-heroicons-check-circle`, `i-heroicons-lock-closed`**
- **Build MUST fail if invalid icon names are detected**

### **6. Static Preview Discipline**
- **ALWAYS run `npm run repreview` before checking port 4173**
- **NEVER trust old builds - always regenerate**
- **Hard refresh (Cmd/Ctrl+Shift+R) or incognito tab required**

### **7. Prerender Requirements**
- **Course routes MUST be in `nitro.prerender.routes`**
- **Current: `['/course/fl-bdi']`**
- **Verify `/dist/course/fl-bdi/index.html` exists after build**

## 🔧 **Implementation Details**

### **Header Structure (layouts/default.vue only)**
```vue
<header class="border-b bg-white">
  <div class="mx-auto max-w-[1120px] h-16 px-4 lg:px-6 flex items-center justify-between gap-4">
    <!-- Left: Logo + Brand -->
    <div class="flex items-center space-x-3">
      <img src="/branding/logo.svg" alt="Road Ready Safety" class="h-6 w-auto" />
      <span class="text-lg font-semibold text-gray-900">Road Ready Safety</span>
    </div>
    
    <!-- Center: Empty (no breadcrumbs) -->
    <div class="flex-1"></div>
    
    <!-- Right: Progress Pill + Support + Avatar -->
    <div class="flex items-center space-x-4">
      <!-- Progress Pill -->
      <div class="hidden sm:flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
        8%
      </div>
      
      <!-- Support Link -->
      <NuxtLink to="/support" class="text-gray-600 hover:text-gray-900 font-medium text-sm">
        Support
      </NuxtLink>
      
      <!-- Mobile Hamburger + Desktop Avatar -->
    </div>
  </div>
</header>
```

### **TimerCard Structure**
```vue
<!-- Top Row: Time • Next -->
<div class="flex items-center justify-between">
  <div class="text-center">
    <div class="text-2xl font-bold text-blue-900">{{ formattedTime }}</div>
    <div class="text-sm text-blue-700 font-medium">Time Remaining</div>
  </div>
  
  <UButton color="primary" variant="solid" size="lg">
    Next
  </UButton>
</div>

<!-- Bottom Row: Status Text Only -->
<div class="text-center text-sm text-gray-600">
  Timer in progress
</div>
```

## 🚨 **Violation Consequences**
- **Build will fail** if rules are violated
- **PR will be rejected** if any regression is detected
- **Developer must fix** before merging

## ✅ **Acceptance Criteria**
- [ ] No page-level headers exist
- [ ] All buttons use `color="primary"` (except success states)
- [ ] TimerCard has no progress bars
- [ ] CSS loads in correct order
- [ ] All icons use `i-heroicons-*` format
- [ ] Course route is prerendered
- [ ] Static preview works without 404s
