import { useState } from "react";

export const useSortableList = (initialItems, onReorder) => {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.listId === active.id);
    const newIndex = items.findIndex((i) => i.listId === over.id);

    const newItems = [...items];
    const [moved] = newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, moved);

    setItems(newItems);
    onReorder(oldIndex, newIndex); // mantiene compatibilidad con tu lógica actual
  };

  return {
    items,
    handleDragEnd,
  };
};
