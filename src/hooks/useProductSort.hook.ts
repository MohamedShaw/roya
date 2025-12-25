import { useState, useMemo, useCallback } from 'react';
import { Product, SortOrder } from '@typings';
import { sortProductsByPrice, getNextSortOrder } from '@utils';

export const useProductSort = (products: Product[]) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');

  const sortedProducts = useMemo(
    () => sortProductsByPrice(products, sortOrder),
    [products, sortOrder],
  );

  const toggleSort = useCallback(() => {
    setSortOrder((prev) => getNextSortOrder(prev));
  }, []);

  const resetSort = useCallback(() => {
    setSortOrder('none');
  }, []);

  return {
    sortedProducts,
    sortOrder,
    toggleSort,
    resetSort,
  };
};

