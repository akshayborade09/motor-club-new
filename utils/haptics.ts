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
const VIBRATION_PATTERNS = {
  [HapticFeedbackType.LIGHT]: [10],
  [HapticFeedbackType.MEDIUM]: [20],
  [HapticFeedbackType.HEAVY]: [30],
  [HapticFeedbackType.SUCCESS]: [10, 50, 10],
  [HapticFeedbackType.WARNING]: [20, 100, 20],
  [HapticFeedbackType.ERROR]: [50, 100, 50],
  [HapticFeedbackType.SELECTION]: [5]
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
    if ('vibrate' in navigator) {
      const pattern = VIBRATION_PATTERNS[type]
      navigator.vibrate(pattern)
    }
    
    // For iOS devices that support haptic feedback through webkit
    // This is experimental and may not work on all devices
    if ('webkitVibrate' in navigator) {
      const pattern = VIBRATION_PATTERNS[type]
      ;(navigator as any).webkitVibrate(pattern)
    }
  } catch (error) {
    // Silently fail if haptic feedback is not supported
    console.debug('Haptic feedback not supported:', error)
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