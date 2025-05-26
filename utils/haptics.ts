/**
 * Haptic feedback utility for web applications
 * Uses the Vibration API for mobile browsers
 */

export enum HapticFeedbackType {
  LIGHT = 'light',
  MEDIUM = 'medium',
  HEAVY = 'heavy',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  SELECTION = 'selection'
}

// Vibration patterns for different feedback types (in milliseconds)
// Chrome works better with shorter, simpler patterns
const VIBRATION_PATTERNS = {
  [HapticFeedbackType.LIGHT]: [25],
  [HapticFeedbackType.MEDIUM]: [50],
  [HapticFeedbackType.HEAVY]: [75],
  [HapticFeedbackType.SUCCESS]: [25, 25, 25],
  [HapticFeedbackType.WARNING]: [50, 50, 50],
  [HapticFeedbackType.ERROR]: [100, 50, 100],
  [HapticFeedbackType.SELECTION]: [15]
}

// Track if user has interacted with the page (required for Chrome)
let userHasInteracted = false

// Set up user interaction tracking
if (typeof window !== 'undefined') {
  const markUserInteraction = () => {
    userHasInteracted = true
    console.log('User interaction detected - haptics now available')
  }
  
  // Listen for various user interaction events
  document.addEventListener('click', markUserInteraction, { once: true })
  document.addEventListener('touchstart', markUserInteraction, { once: true })
  document.addEventListener('keydown', markUserInteraction, { once: true })
}

/**
 * Triggers haptic feedback if supported by the device
 * @param type - The type of haptic feedback to trigger
 */
export const triggerHaptic = (type: HapticFeedbackType = HapticFeedbackType.LIGHT): void => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return

  try {
    // Check if the Vibration API is supported
    if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
      const pattern = VIBRATION_PATTERNS[type]
      
      // Log for debugging (remove in production)
      console.log('Attempting haptic feedback:', { 
        type, 
        pattern, 
        userHasInteracted,
        isVisible: document.visibilityState === 'visible',
        isSecure: location.protocol === 'https:' || location.hostname === 'localhost'
      })
      
      // Chrome requires user gesture, secure context, and visible document
      if (userHasInteracted && document.visibilityState === 'visible') {
        const result = navigator.vibrate(pattern)
        console.log('Vibration result:', result)
        
        // If vibration failed with pattern, try single value
        if (!result && Array.isArray(pattern) && pattern.length > 1) {
          console.log('Pattern failed, trying single vibration')
          navigator.vibrate(pattern[0] || 25)
        }
      } else {
        console.log('Haptic feedback blocked:', {
          userHasInteracted,
          isVisible: document.visibilityState === 'visible'
        })
      }
    } else {
      console.log('Vibration API not supported')
    }
    
    // For iOS devices that support haptic feedback through webkit
    // This is experimental and may not work on all devices
    if ('webkitVibrate' in navigator) {
      const pattern = VIBRATION_PATTERNS[type]
      ;(navigator as any).webkitVibrate(pattern)
    }
  } catch (error) {
    // Log error for debugging
    console.warn('Haptic feedback error:', error)
  }
}

/**
 * Hook for using haptic feedback in React components
 */
export const useHaptic = () => {
  const haptic = (type: HapticFeedbackType = HapticFeedbackType.LIGHT) => {
    triggerHaptic(type)
  }

  return { haptic }
}

/**
 * Higher-order function to add haptic feedback to event handlers
 * @param handler - The original event handler
 * @param hapticType - The type of haptic feedback to trigger
 * @returns Enhanced event handler with haptic feedback
 */
export const withHaptic = <T extends (...args: any[]) => any>(
  handler: T,
  hapticType: HapticFeedbackType = HapticFeedbackType.LIGHT
): T => {
  return ((...args: any[]) => {
    triggerHaptic(hapticType)
    return handler(...args)
  }) as T
}

/**
 * Utility function for button press haptic feedback
 */
export const buttonPressHaptic = () => triggerHaptic(HapticFeedbackType.LIGHT)

/**
 * Utility function for navigation haptic feedback
 */
export const navigationHaptic = () => triggerHaptic(HapticFeedbackType.SELECTION)

/**
 * Utility function for success action haptic feedback
 */
export const successHaptic = () => triggerHaptic(HapticFeedbackType.SUCCESS)

/**
 * Utility function for error action haptic feedback
 */
export const errorHaptic = () => triggerHaptic(HapticFeedbackType.ERROR)

/**
 * Utility function for warning action haptic feedback
 */
export const warningHaptic = () => triggerHaptic(HapticFeedbackType.WARNING)

/**
 * Test function to check haptic feedback support and functionality
 */
export const testHapticFeedback = () => {
  console.log('=== Haptic Feedback Test ===')
  console.log('User Agent:', navigator.userAgent)
  console.log('Vibration API supported:', 'vibrate' in navigator)
  console.log('Document visibility:', document.visibilityState)
  console.log('Is HTTPS:', location.protocol === 'https:')
  
  if ('vibrate' in navigator) {
    console.log('Testing vibration...')
    const result = navigator.vibrate([100])
    console.log('Vibration test result:', result)
    
    // Test different patterns
    setTimeout(() => {
      console.log('Testing pattern vibration...')
      navigator.vibrate([50, 100, 50])
    }, 1000)
  } else {
    console.log('Vibration API not available')
  }
} 