import React, { useMemo, useCallback } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Product, ProductListProps } from '@typings';
import { renderProductItem } from './renderItem';
import { styles } from './styles';

export const ProductList = React.memo<ProductListProps>(
  ({ products, orientation, isSelected, onToggleSelect, onDelete }) => {
    const numColumns = orientation === 'landscape' ? 2 : 1;

    const renderItem = useCallback(
      ({ item, index }: { item: Product; index: number }) => {
        return renderProductItem({
          item,
          index,
          isSelected,
          onToggleSelect,
          onDelete,
          numColumns,
        });
      },
      [isSelected, onToggleSelect, onDelete, numColumns],
    );

    const keyExtractor = useCallback((item: Product) => String(item.id), []);

    const getItemLayout = useCallback(
      (_: any, index: number) => ({
        length: 150,
        offset: 150 * index,
        index,
      }),
      [],
    );

    const listEmptyComponent = useMemo(
      () => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products found</Text>
        </View>
      ),
      [],
    );

    return (
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        key={numColumns}
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={numColumns === 2 ? styles.columnWrapper : undefined}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        maxToRenderPerBatch={15}
        initialNumToRender={15}
        windowSize={15}
        getItemLayout={getItemLayout}
        ListEmptyComponent={listEmptyComponent}
        scrollEventThrottle={16}
        decelerationRate="normal"
        updateCellsBatchingPeriod={100}
        nestedScrollEnabled
      />
    );
  },
);

