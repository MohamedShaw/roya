import React from 'react';
import { styles } from './styles';
import { View, Text } from 'react-native';
import { SearchBar } from '@components/SearchBar/SearchBar';
import { SortButton } from '@components/SortButton/SortButton';
import { DeleteButton } from '@components/DeleteButton/DeleteButton';
import { HeaderProps } from '@typings';

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  handleSearchChange,
  sortOrder,
  toggleSort,
  handleDelete,
  hasSelection,
  selectedIds,
}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Product List</Text>
      </View>
      <View style={styles.controlsContainer}>
        <SearchBar value={searchQuery} onChangeText={handleSearchChange} />
        <View style={styles.buttonsRow}>
          <View style={[styles.buttonContainer, styles.buttonSpacing]}>
            <SortButton sortOrder={sortOrder} onPress={toggleSort} />
          </View>
          <View style={styles.buttonContainer}>
            <DeleteButton
              onPress={handleDelete}
              disabled={!hasSelection}
              count={selectedIds.size}
            />
          </View>
        </View>
      </View>
    </>
  );
};
