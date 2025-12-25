import { useState, useCallback } from 'react';

export const useSelection = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const toggleSelection = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isSelected = useCallback(
    (id: number) => selectedIds.has(id),
    [selectedIds],
  );

  const hasSelection = selectedIds.size > 0;

  return {
    selectedIds,
    toggleSelection,
    clearSelection,
    isSelected,
    hasSelection,
  };
};

