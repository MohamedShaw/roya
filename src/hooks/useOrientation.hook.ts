import { Orientation } from '@typings';
import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export const useOrientation = (): Orientation => {
  const [orientation, setOrientation] = useState<Orientation>(() => {
    const { width, height } = Dimensions.get('window');
    return width < height ? 'portrait' : 'landscape';
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window }: { window: ScaledSize }) => {
        const newOrientation: Orientation =
          window.width < window.height ? 'portrait' : 'landscape';
        setOrientation(newOrientation);
      },
    );

    return () => subscription?.remove();
  }, []);

  return orientation;
};


