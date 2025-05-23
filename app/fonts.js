// app/fonts.js
import localFont from 'next/font/local'

// Define the Open Sauce One font with all weights
export const openSauceOne = localFont({
  src: [
    {
      path: '../public/fonts/OpenSauceOne-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSauceOne-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSauceOne-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSauceOne-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSauceOne-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSauceOne-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-open-sauce-one',
})