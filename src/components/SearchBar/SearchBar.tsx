import React from 'react';
import { View, TextInput } from 'react-native';
import { styles } from './styles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar = React.memo<SearchBarProps>(
  ({ value, onChangeText, placeholder = 'Search products...' }) => {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    );
  },
);
