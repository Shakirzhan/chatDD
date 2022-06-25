import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";

const DragDropContextContainer = styled.div`
  height: 100%;
  margin-top: 10px;
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
`;

const WrapModal = styled.div`
  padding-top: 16px;
`;

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
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        open={display}
        onClose={() => setDsiplay(CLOSE_MODAL)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Добавить элемент
        </DialogTitle>
        <DialogContent>
          <WrapModal>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField 
                  type="text" 
                  label="Заголовок" 
                  variant="outlined" 
                  onChange={(e) => setTitle(e.target.value)} 
                  value={title} 
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  type="text" 
                  label="Описание" 
                  variant="outlined" 
                  onChange={(e) => setDescription(e.target.value)} 
                  value={description}  
                  fullWidth
                />
              </Grid>
            </Grid>
          </WrapModal>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDsiplay(CLOSE_MODAL)}>Закрыть</Button>
          <Button onClick={() => add()} autoFocus>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
      <DragDropContextContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <ListGrid>
            {lists.map((listKey) => (
              <DraggableElement
                elements={elements[listKey]}
                key={listKey}
                prefix={listKey}
              >
                {listKey === lists[0] && <Button onClick={() => setDsiplay(OPEN_MODAL)}>Добавить</Button>}
              </DraggableElement>
            ))}
          </ListGrid>
        </DragDropContext>
      </DragDropContextContainer>
    </Wrap>
  );
}

export default DragList;
