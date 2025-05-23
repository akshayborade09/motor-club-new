"use client";

import { useState, useEffect } from 'react';

type Orientation = 'portrait' | 'landscape';
type Device = 'mobile' | 'desktop';

export const useOrientation = (): { orientation: Orientation, device: Device } => {
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [device, setDevice] = useState<Device>('mobile');

  useEffect(() => {
    // Check device type
    const checkDevice = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setDevice(isMobile ? 'mobile' : 'desktop');
    };

    // Check orientation
    const updateOrientation = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }
    };

    // Initial checks
    checkDevice();
    updateOrientation();

    // Listen for orientation changes
    const orientationChangeHandler = () => {
      updateOrientation();
    };

    window.addEventListener('resize', orientationChangeHandler);
    window.addEventListener('orientationchange', orientationChangeHandler);

    return () => {
      window.removeEventListener('resize', orientationChangeHandler);
      window.removeEventListener('orientationchange', orientationChangeHandler);
    };
  }, []);

  return { orientation, device };
}; 