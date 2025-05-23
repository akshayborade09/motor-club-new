"use client";

import { RotateCwSquare } from 'lucide-react';

interface OrientationMessageProps {
  device: 'mobile' | 'desktop';
}

export default function OrientationMessage({ device }: OrientationMessageProps) {
  return (
    <div className="h-screen w-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <RotateCwSquare size={32} className="text-gray-700" />
      </div>
      
      <h2 className="text-xl font-bold mb-2">Please rotate your device</h2>
      
      {device === 'mobile' ? (
        <p className="text-gray-600">
          For better experience, please use Motor Club in portrait mode.
        </p>
      ) : (
        <p className="text-gray-600">
          For better experience, please open Motor Club on a mobile device.
        </p>
      )}
    </div>
  );
} 