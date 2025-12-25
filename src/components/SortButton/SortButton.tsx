import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { SortOrder } from '@typings';
import { styles } from './styles';

interface SortButtonProps {
  sortOrder: SortOrder;
  onPress: () => void;
}

export const SortButton = React.memo<SortButtonProps>(
  ({ sortOrder, onPress }) => {
    const getButtonText = () => {
      switch (sortOrder) {
        case 'asc':
          return 'Sort by Price (Asc)';
        case 'desc':
          return 'Sort by Price (Desc)';
        default:
          return 'Sort by Price';
      }
    };

    return (
      <TouchableOpacity
        style={[styles.button, sortOrder !== 'none' && styles.buttonActive]}
        onPress={onPress}
        activeOpacity={0.7}>
        <Text style={[styles.text, sortOrder !== 'none' && styles.textActive]}>
          {getButtonText()}
        </Text>
      </TouchableOpacity>
    );
  },
);
