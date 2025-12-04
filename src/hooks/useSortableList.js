import { useRef, useEffect } from "react";

export const useSortableList = (initialItems, onReorder) => {
  const itemsRef = useRef(initialItems);

  useEffect(() => {
    itemsRef.current = initialItems;
  }, [initialItems]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const items = itemsRef.current;
    const oldIndex = items.findIndex((i) => i.listId === active.id);
    const newIndex = items.findIndex((i) => i.listId === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    onReorder(oldIndex, newIndex);
  };

  return {
    items: initialItems,
    handleDragEnd,
  };
};