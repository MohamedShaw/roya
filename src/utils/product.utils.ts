import { Product, SortOrder } from '@typings';

export const filterProducts = (
  products: Product[],
  searchQuery: string,
): Product[] => {
  if (searchQuery.length < 3) {
    return products;
  }

  const query = searchQuery.toLowerCase().trim();

  return products.filter((product) => {
    const titleMatch = product.title.toLowerCase().includes(query);
    const tagsMatch = product.tags.some((tag) =>
      tag.toLowerCase().includes(query),
    );

    return titleMatch || tagsMatch;
  });
};

export const sortProductsByPrice = (
  products: Product[],
  sortOrder: SortOrder,
): Product[] => {
  if (sortOrder === 'none') {
    return products;
  }

  const sorted = [...products].sort((a, b) => a.price - b.price);

  return sortOrder === 'asc' ? sorted : sorted.reverse();
};

export const getNextSortOrder = (currentOrder: SortOrder): SortOrder => {
  switch (currentOrder) {
    case 'none':
      return 'asc';
    case 'asc':
      return 'desc';
    case 'desc':
      return 'none';
    default:
      return 'none';
  }
};

