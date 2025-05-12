import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Product {
  id: string;
  title: string;
  description: string;
}

interface ProductListProps {
  products: Product[];
  onReorder: (result: any) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onReorder }) => {
  return (
    <DragDropContext onDragEnd={onReorder}>
      <Droppable droppableId="product-list">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {products.map((product, index) => (
              <Draggable key={product.id} draggableId={product.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-4 mb-2 bg-white shadow rounded"
                  >
                    <h3 className="font-bold">{product.title}</h3>
                    <p>{product.description}</p>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ProductList; 