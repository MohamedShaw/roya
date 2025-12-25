import React from 'react';
import { Dimensions } from 'react-native';
import { Product } from '@typings';
import { ProductItem } from '@components';
import { styles } from './styles';

interface RenderItemProps {
  item: Product;
  index: number;
  isSelected: (id: number) => boolean;
  onToggleSelect: (id: number) => void;
  onDelete?: (id: number) => void;
  numColumns: number;
}

export const renderProductItem = ({
  item,
  index,
  isSelected,
  onToggleSelect,
  onDelete,
  numColumns,
}: RenderItemProps) => {
  return (
    <ProductItem
      product={item}
      isSelected={isSelected(Number(item.id))}
      onToggleSelect={onToggleSelect}
      onDelete={onDelete}
      index={index}
      style={
        numColumns === 2
          ? {
              ...styles.twoColumnItem,
              width: (Dimensions.get('screen').width / 2) * 0.9,
            }
          : undefined
      }
    />
  );
};

