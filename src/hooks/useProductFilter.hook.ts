import { useMemo } from 'react';
import { Product } from '@typings';
import { filterProducts } from '@utils';

export const useProductFilter = (
  products: Product[],
  searchQuery: string,
): Product[] => {
  return useMemo(
    () => filterProducts(products, searchQuery),
    [products, searchQuery],
  );
};

