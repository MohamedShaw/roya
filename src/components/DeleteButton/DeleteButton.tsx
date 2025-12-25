import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

interface DeleteButtonProps {
  onPress: () => void;
  disabled?: boolean;
  count: number;
}

export const DeleteButton = React.memo<DeleteButtonProps>(
  ({ onPress, disabled = false, count }) => {
    return (
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}>
        <Text style={[styles.text, disabled && styles.textDisabled]}>
          Delete Selected ({count})
        </Text>
      </TouchableOpacity>
    );
  },
);



