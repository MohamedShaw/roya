import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import {
  useOrientation,
  useProductFilter,
  useProductSort,
  useSelection,
} from '@hooks';
import { ProductList, Header } from '@components';
import { Product } from '@typings';
import { PRODUCTS_DATA } from '@data';
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles} from './styles'
export const ProductListHoc: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const orientation = useOrientation();
  const {
    selectedIds,
    toggleSelection,
    clearSelection,
    isSelected,
    hasSelection,
  } = useSelection();
  const filteredProducts = useProductFilter(products, searchQuery);
  const { sortedProducts, sortOrder, toggleSort } =
    useProductSort(filteredProducts);

  const handleDelete = useCallback(() => {
    setProducts(prevProducts =>
      prevProducts.filter(product => !selectedIds.has(Number(product.id))),
    );
    clearSelection();
  }, [selectedIds, clearSelection]);

  const handleDeleteItem = useCallback((id: number) => {
    setProducts(prevProducts =>
      prevProducts.filter(product => Number(product.id) !== id),
    );
  }, []);

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchQuery(text);
      if (hasSelection) {
        clearSelection();
      }
    },
    [hasSelection, clearSelection],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        sortOrder={sortOrder}
        toggleSort={toggleSort}
        handleDelete={handleDelete}
        hasSelection={hasSelection}
        selectedIds={selectedIds}
      />
      <ProductList
        products={sortedProducts}
        orientation={orientation}
        isSelected={isSelected}
        onToggleSelect={toggleSelection}
        onDelete={handleDeleteItem}
      />
    </SafeAreaView>
  );
};
