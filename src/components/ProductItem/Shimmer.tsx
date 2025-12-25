import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

import { styles } from './styles';
interface ShimmerProps {
  width?: number;
  height?: number;
  borderRadius?: number;
}

export const Shimmer: React.FC<ShimmerProps> = ({
  width = 120,
  height = 120,
  borderRadius = 12,
}) => {
  const shimmerTranslate = useSharedValue(-width);

  useEffect(() => {
    shimmerTranslate.value = withRepeat(
      withTiming(width * 2, { duration: 1500 }),
      -1,
      false,
    );
  }, [shimmerTranslate, width]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            shimmerTranslate.value,
            [-width, width * 2],
            [-width, width * 2],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, [width]);

  return (
    <View style={[styles.shimmerWrapper, { width, height, borderRadius }]}>
      <Reanimated.View style={[styles.shimmer, animatedStyle]} />
    </View>
  );
};
