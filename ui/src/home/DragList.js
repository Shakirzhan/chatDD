import React from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";

const DragDropContextContainer = styled.div`
  height: 100%
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
  height: 100%;
  overflow-y: scroll;
  background-color: rgb(242 243 249 / 1); 
  &::-webkit-scrollbar {
    display: none;
  }
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  box-sizing: border-box;
`;

const Wrap = styled.div`
  padding: 1rem;
  flex-direction: column;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
`

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["todo", "inProgress", "done"];

function DragList() {
  let elementsLists = {
    todo: [],
    inProgress: [],
    done: []
  }
  const OPEN_MODAL = true;
  const CLOSE_MODAL = false;
  const [elements, setElements] = React.useState(elementsLists);
  const [display, setDsiplay] = React.useState(CLOSE_MODAL);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const listCopy = { ...elements };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  const add = () => {
    setDsiplay(CLOSE_MODAL);
    elementsLists = elements
    elementsLists.todo.push({
      id: Math.random().toString(),
      title,
      description
    })
    setTitle('')
    setDescription('')
    setElements(elementsLists);
  }

  return (
    <Wrap>
      <Button onClick={() => setDsiplay(OPEN_MODAL)}>Добавить</Button>
      <Modal
        hideBackdrop
        open={display}
        onClose={() => {}}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <div>
            <input 
              type="text" 
              placeholder="Заголовок" 
              onChange={(e) => setTitle(e.target.value)} 
              name="title" 
              value={title} 
            />
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Описание" 
              onChange={(e) => setDescription(e.target.value)} 
              name="description" value={description} 
            />
          </div>
          <Button onClick={() => add()}>Добавить</Button>
        </Box>
      </Modal>
      <DragDropContextContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <ListGrid>
            {lists.map((listKey) => (
              <DraggableElement
                elements={elements[listKey]}
                key={listKey}
                prefix={listKey}
              />
            ))}
          </ListGrid>
        </DragDropContext>
      </DragDropContextContainer>
    </Wrap>
  );
}

export default DragList;
