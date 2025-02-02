# Toast Notification System

## Overview
The toast notification system provides a consistent way to display feedback to users across the Muisique application. It follows the design system and accessibility guidelines.

## Components

### 1. Toast Component
Located in `src/components/ui/toast.tsx`
- Provides base toast functionality
- Uses Radix UI for accessibility
- Supports different variants (default, destructive)

### 2. Toaster Component
Located in `src/components/ui/toaster.tsx`
- Manages toast display and positioning
- Handles multiple toasts with proper stacking
- Provides smooth animations

### 3. useToast Hook
Located in `src/components/ui/use-toast.ts`
- Custom hook for managing toast state
- Provides methods for showing and dismissing toasts
- Handles toast lifecycle

## Usage

```typescript
import { toast } from "@/components/ui/use-toast"

// Show a success toast
toast({
  title: "Success",
  description: "Operation completed successfully",
  duration: 3000,
})

// Show an error toast
toast({
  title: "Error",
  description: "Something went wrong",
  variant: "destructive",
})
```

## Best Practices

1. **Duration**: 
   - Use 3000ms for success messages
   - Use 5000ms for error messages
   - Use longer durations for important messages

2. **Variants**:
   - Use 'default' for general information
   - Use 'destructive' for errors
   - Consider user's action importance

3. **Content**:
   - Keep messages concise
   - Use clear, actionable language
   - Include necessary context

4. **Accessibility**:
   - All toasts are keyboard navigable
   - Screen reader friendly
   - Support reduced motion preferences

## Implementation Notes

1. The toast system is implemented as a client-side feature
2. Uses React's Context API for state management
3. Follows Muisique's design system
4. Supports mobile responsiveness
