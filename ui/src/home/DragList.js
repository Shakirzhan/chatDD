import React from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import WrapDialog from "../components/WrapDialog";

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
  const [elements, setElements] = React.useState(elementsLists);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [titleError, setTitleError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
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

  const add = (onClose = () => {}) => () => {
    if(!title || !description) {
      setTitleError(!title);
      setDescriptionError(!description);

      return;
    }

    onClose();
    elementsLists = elements
    elementsLists.todo.push({
      id: Math.random().toString(),
      title,
      description
    })
    setTitle('');
    setDescription('');
    setTitleError(false);
    setDescriptionError(false);
    setElements(elementsLists);
  }

  const deleteItem = (onClose = () => {}, index = null) => () => {
    const listCopy = { ...elements };
    listCopy.todo = listCopy.todo.filter((_todoItem, itemIndex) => itemIndex != index)
    setElements(listCopy);
    onClose();
  }

  const cancel = (onClose = () => {}) => () => {
    setTitleError(false);
    setDescriptionError(false);
    setTitle('');
    setDescription('');
    onClose();
  }

  return (
    <Wrap>
      <DragDropContextContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <ListGrid>
            {lists.map((listKey) => (
              <DraggableElement
                elements={elements[listKey]}
                key={listKey}
                prefix={listKey}
                deleteItem={deleteItem}
              >
                {listKey === lists[0] && <WrapDialog 
                  nameButton="Добавить" 
                  title="Добавить елемент"
                  actions={(onClose = () => {}) => {
                    return (<>
                      <Button onClick={cancel(onClose)}>Отмена</Button>
                      <Button onClick={add(onClose)} autoFocus>
                        Добавить
                      </Button>
                    </>)
                  }}
                  buttons={(openDialog = () => {}) => {
                    return (
                      <Button onClick={openDialog}>Добавить</Button>
                    )
                  }}
                >
                  <WrapModal>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField 
                          type="text" 
                          label="Заголовок" 
                          variant="outlined" 
                          helperText={titleError && "Поле Заголовок обязательное для заполнения!"}
                          onChange={(e) => setTitle(e.target.value)} 
                          value={title} 
                          error={titleError}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField 
                          type="text" 
                          label="Описание" 
                          variant="outlined" 
                          helperText={descriptionError && "Поле Описание обязательное для заполнения!"}
                          onChange={(e) => setDescription(e.target.value)} 
                          value={description}  
                          error={descriptionError}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </WrapModal>
                </WrapDialog>}
              </DraggableElement>
            ))}
          </ListGrid>
        </DragDropContext>
      </DragDropContextContainer>
    </Wrap>
  );
}

export default DragList;
