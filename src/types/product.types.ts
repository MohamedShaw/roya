export interface Product {
  id: string | number;
  title: string;
  price: number;
  tags: string[];
  description: string;
  image: string;
}

export type SortOrder = 'none' | 'asc' | 'desc';

export type Orientation = 'portrait' | 'landscape';

export interface ProductListProps {
  products: Product[];
  orientation: Orientation;
  isSelected: (id: number) => boolean;
  onToggleSelect: (id: number) => void;
  onDelete?: (id: number) => void;
}

export interface HeaderProps {
  searchQuery: string;
  handleSearchChange: (text: string) => void;
  sortOrder: SortOrder;
  toggleSort: () => void;
  handleDelete: () => void;
  hasSelection: boolean;
  selectedIds: Set<number>;
}
