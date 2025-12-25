import React, { useEffect, useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  ViewStyle,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Shimmer } from './Shimmer';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  Pressable,
} from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  withSequence,
  withDelay,
  interpolate,
  Extrapolation,
  Easing,
} from 'react-native-reanimated';
import { Product } from '@typings';
import { styles } from './styles';

interface ProductItemProps {
  product: Product;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onDelete?: (id: number) => void;
  style?: ViewStyle;
  index?: number;
}

const AnimatedTouchableOpacity = Reanimated.createAnimatedComponent(Pressable);

export const ProductItem = React.memo<ProductItemProps>(
  ({ product, isSelected, onToggleSelect, onDelete, style, index = 0 }) => {
    const translateX = useSharedValue(0);
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    const translateY = useSharedValue(20);
    const imageOpacity = useSharedValue(0);
    const checkboxScale = useSharedValue(1);
    const checkmarkOpacity = useSharedValue(0);
    const borderWidth = useSharedValue(0);
    const shadowOpacity = useSharedValue(0.1);
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
      if (isSelected) {
        scale.value = withSequence(
          withSpring(1.01, {
            damping: 8,
            stiffness: 600,
            mass: 0.6,
          }),
        );
        borderWidth.value = withSpring(2, {
          damping: 12,
          stiffness: 300,
        });
        shadowOpacity.value = withTiming(0.25, {
          duration: 300,
          easing: Easing.out(Easing.ease),
        });
        checkboxScale.value = withSequence(
          withSpring(1.02, {
            damping: 8,
            stiffness: 500,
          }),
          withSpring(1, {
            damping: 12,
            stiffness: 400,
          }),
        );
        checkmarkOpacity.value = withDelay(
          70,
          withTiming(1, {
            duration: 200,
            easing: Easing.out(Easing.ease),
          }),
        );
      } else {
        scale.value = withSpring(1, {
          damping: 15,
          stiffness: 250,
        });
        borderWidth.value = withSpring(0, {
          damping: 12,
          stiffness: 300,
        });
        shadowOpacity.value = withTiming(0.1, {
          duration: 300,
          easing: Easing.out(Easing.ease),
        });
        checkboxScale.value = withSpring(1.2, {
          damping: 10,
          stiffness: 400,
        });
        checkmarkOpacity.value = withTiming(0, {
          duration: 150,
        });
      }
    }, [
      isSelected,
      scale,
      borderWidth,
      shadowOpacity,
      checkboxScale,
      checkmarkOpacity,
    ]);

    const handlePress = useCallback(() => {
      onToggleSelect(Number(product.id));
    }, [onToggleSelect, product.id]);

    const handleDelete = useCallback(() => {
      if (onDelete) {
        onDelete(Number(product.id));
      }
    }, [onDelete, product.id]);

    const swipeGesture = Gesture.Pan()
      .activeOffsetX([-10, 10])
      .failOffsetY([-15, 15])
      .minPointers(1)
      .maxPointers(1)
      .onUpdate(e => {
        if (
          e.translationX < 0 &&
          Math.abs(e.translationX) > Math.abs(e.translationY)
        ) {
          translateX.value = e.translationX;
          const progress = Math.min(Math.abs(e.translationX) / 100, 1);
          opacity.value = interpolate(
            progress,
            [0, 1],
            [1, 0.4],
            Extrapolation.CLAMP,
          );
          scale.value = interpolate(
            progress,
            [0, 1],
            [1, 0.95],
            Extrapolation.CLAMP,
          );
        }
      })
      .onEnd(e => {
        if (
          e.translationX < -100 &&
          Math.abs(e.translationX) > Math.abs(e.translationY) * 2
        ) {
          translateX.value = withTiming(-500, {
            duration: 350,
            easing: Easing.in(Easing.ease),
          });
          opacity.value = withTiming(0, {
            duration: 300,
          });
          scale.value = withTiming(0.8, {
            duration: 300,
          });
          runOnJS(handleDelete)();
        } else {
          translateX.value = withSpring(0, {
            damping: 18,
            stiffness: 350,
            mass: 0.5,
          });
          opacity.value = withTiming(1, {
            duration: 250,
            easing: Easing.out(Easing.ease),
          });
          scale.value = withSpring(1, {
            damping: 15,
            stiffness: 250,
          });
        }
      });

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
          { scale: scale.value },
        ],
      };
    }, []);

    const imageAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: imageOpacity.value,
      };
    }, []);

    const checkboxAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: checkboxScale.value }],
      };
    }, []);

    const checkmarkAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: checkmarkOpacity.value,
        transform: [
          {
            scale: interpolate(
              checkmarkOpacity.value,
              [0, 1],
              [0.5, 1],
              Extrapolation.CLAMP,
            ),
          },
        ],
      };
    }, []);

    const composedGesture = Gesture.Race(swipeGesture);

    return (
      <GestureHandlerRootView style={styles.gestureContainer}>
        <GestureDetector gesture={composedGesture}>
          <AnimatedTouchableOpacity
            style={[
              styles.container,
              isSelected && styles.selected,
              style,
              animatedStyle,
            ]}
            onPress={handlePress}
          >
            <View style={styles.imageContainer}>
              {imageLoading && (
                <View style={styles.shimmerContainer}>
                  <Shimmer width={120} height={120} borderRadius={12} />
                </View>
              )}
              <Reanimated.View
                style={[styles.imageWrapper, imageAnimatedStyle]}
              >
                <FastImage
                  source={{
                    uri: product.image,
                    priority: FastImage.priority.normal,
                  }}
                  style={styles.image}
                  resizeMode={FastImage.resizeMode.cover}
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => {
                    setImageLoading(false);
                    imageOpacity.value = withTiming(1, {
                      duration: 400,
                      easing: Easing.out(Easing.ease),
                    });
                  }}
                  onError={() => {
                    setImageLoading(false);
                    imageOpacity.value = withTiming(1, {
                      duration: 400,
                    });
                  }}
                />
              </Reanimated.View>
            </View>

            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title} numberOfLines={2}>
                    {product.title}
                  </Text>
                  <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Reanimated.View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkboxChecked,
                      checkboxAnimatedStyle,
                    ]}
                  >
                    {isSelected && (
                      <Reanimated.View
                        style={[styles.checkmark, checkmarkAnimatedStyle]}
                      >
                        <View style={styles.checkmarkInner} />
                      </Reanimated.View>
                    )}
                  </Reanimated.View>
                </View>
              </View>

              <Text style={styles.description} numberOfLines={2}>
                {product.description}
              </Text>

              <View style={[styles.tagsContainer]}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tagsScrollContent}
                  nestedScrollEnabled={true}
                  scrollEnabled={true}
                  bounces={false}
                  alwaysBounceHorizontal={false}
                  alwaysBounceVertical={false}
                >
                  {product.tags.map((tag, tagIndex) => (
                    <View key={tagIndex} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </AnimatedTouchableOpacity>
        </GestureDetector>
      </GestureHandlerRootView>
    );
  },
);

