# REMWaste Theme System

This directory contains the centralized theme configuration for the REMWaste Skip Selector application.

## 🎨 Theme Structure

### Core Files

- `theme.css` - Main theme configuration with CSS variables and component styles

## 🛠️ How to Use

### Changing Brand Colors

To update the primary brand colors, edit the CSS variables in `theme.css`:

```css
:root {
  --remwaste-primary: 59, 130, 246; /* Blue 500 */
  --remwaste-primary-dark: 37, 99, 235; /* Blue 600 */
  --remwaste-primary-light: 147, 197, 253; /* Blue 300 */
}
```

### Adding New Colors

1. Add new CSS variables in the `:root` section
2. Add dark mode variants in the `.dark` section if needed
3. Create utility classes for common use cases

### Component-Specific Styling

Each major component has its own section in `theme.css`:

- `.remwaste-progress-stepper` - Progress stepper styles
- `.remwaste-skip-card` - Skip card styles
- `.remwaste-bottom-bar` - Bottom bar styles
- `.remwaste-btn-*` - Button variants
- `.remwaste-badge-*` - Badge variants

### Responsive Design

The theme includes responsive utilities:

- `.remwaste-container` - Responsive container with proper padding
- Media queries for different screen sizes

### Animations

Pre-defined animations available:

- `.remwaste-animate-float` - Floating animation
- `.remwaste-animate-glow` - Glowing effect
- `.remwaste-animate-shimmer` - Shimmer effect

## 🎯 Best Practices

1. **Use CSS Variables**: Always use the predefined CSS variables instead of hardcoded colors
2. **Consistent Naming**: Follow the `remwaste-` prefix for all custom classes
3. **Dark Mode Support**: Always provide dark mode variants for new colors
4. **Performance**: Use `will-change` property for animated elements
5. **Accessibility**: Ensure proper contrast ratios for all color combinations

## 🔧 Customization Examples

### Changing the Primary Color to Green

```css
:root {
  --remwaste-primary: 34, 197, 94; /* Green 500 */
  --remwaste-primary-dark: 22, 163, 74; /* Green 600 */
  --remwaste-primary-light: 134, 239, 172; /* Green 300 */
}
```

### Adding a New Status Color

```css
:root {
  --remwaste-info: 59, 130, 246; /* Blue 500 */
  --remwaste-info-dark: 37, 99, 235; /* Blue 600 */
  --remwaste-info-light: 147, 197, 253; /* Blue 300 */
}

.remwaste-badge-info {
  background: linear-gradient(
    90deg,
    rgb(var(--remwaste-info)),
    rgb(var(--remwaste-info-dark))
  );
  color: white;
  font-weight: 600;
  box-shadow: var(--remwaste-shadow-md);
}
```

### Creating a New Component Style

```css
.remwaste-new-component {
  background: rgb(var(--remwaste-bg-primary));
  border: 1px solid rgb(var(--remwaste-border-primary));
  border-radius: var(--remwaste-radius-lg);
  box-shadow: var(--remwaste-shadow-md);
  padding: var(--remwaste-spacing-md);
}

.dark .remwaste-new-component {
  background: rgb(var(--remwaste-slate-900));
  border: 1px solid rgb(var(--remwaste-slate-700));
}
```

## 📱 Responsive Breakpoints

The theme uses these breakpoints:

- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`

## 🌙 Dark Mode

Dark mode is automatically supported through CSS variables. The theme switches between light and dark variants based on the `.dark` class on the root element.

## 🔍 Debugging

To debug theme variables, use browser dev tools:

1. Inspect element
2. Check computed styles
3. Look for CSS variable values starting with `--remwaste-`

## 📋 Maintenance Checklist

When updating the theme:

- [ ] Test in both light and dark modes
- [ ] Verify responsive behavior on all screen sizes
- [ ] Check accessibility contrast ratios
- [ ] Test all interactive states (hover, focus, active)
- [ ] Validate performance impact of changes
