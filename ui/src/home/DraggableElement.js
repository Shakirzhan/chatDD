import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import styled from "styled-components";

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
  position: relative;
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background-color: rgb(228 229 236 / 1);
  box-sizing: border-box;
  max-height: 100%
`;

const names = {
  "todo": "Сделать",
  "inProgress": "В ходе выполнения",
  "done": "Выполнено"
}

const Wrap = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
`;

const FlyButton = styled.div`
  position: absolute;
  top: -5px;
  right: 0;
`;

const DraggableElement = ({ prefix, elements, children, deleteItem }) => (
  <DroppableStyles>
    <ColumnHeader>
      {names[prefix]} ({elements.length})
      <FlyButton>{children}</FlyButton>
    </ColumnHeader>
    <Wrap>
      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((item, index) => (
              <ListItem 
                key={item.id} 
                item={item} 
                index={index} 
                deleteItem={deleteItem} 
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrap>
  </DroppableStyles>
);

export default DraggableElement;
