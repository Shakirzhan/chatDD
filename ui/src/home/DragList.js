import React from "react";
import Button from '@mui/material/Button';
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { connect } from 'react-redux';
import DraggableElement from "./DraggableElement";
import WrapDialog from "../components/WrapDialog";
import TaskForm from "../components/TaskForm";
import { addItem, deleteItem, setTodos, setInput, reset } from "../redux/actions";

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

function DragList({ elements, add, del, set, setData, resetData, form: { title, description } }) {
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
    set(listCopy);
  };

  const addAction = (onClose = () => {}) => () => {
    if(!title || !description) {
      setData({ name: 'titleError', value: !title });
      setData({ name: 'descriptionError', value: !description });

      return;
    }

    onClose(); 
    add({
      id: Math.random().toString(),
      title,
      description
    })
    resetData();
  }

  const deleteAction = (onClose = () => {}, index = null) => () => {
    del(index);
    onClose();
  }

  const cancel = (onClose = () => {}) => () => {
    resetData();
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
                deleteItem={deleteAction}
              >
                {listKey === lists[0] && <WrapDialog 
                  nameButton="Добавить" 
                  title="Добавить елемент"
                  actions={(onClose = () => {}) => (<>
                    <Button onClick={cancel(onClose)}>Отмена</Button>
                    <Button onClick={addAction(onClose)} autoFocus>
                      Добавить
                    </Button>
                  </>)}
                  reset={cancel()}
                  buttons={(openDialog = () => {}) => (
                    <Button onClick={openDialog}>Добавить</Button>
                  )}
                >
                  <TaskForm />
                </WrapDialog>}
              </DraggableElement>
            ))}
          </ListGrid>
        </DragDropContext>
      </DragDropContextContainer>
    </Wrap>
  );
}

const mapStateToProps = (state) => ({
  elements: state.todos.elementsLists,
  form: state.todos.form
})

const mapDispatchToProps = (dispatch) => ({
  add: (item = {}) => dispatch(addItem(item)),
  del: (index = null) => dispatch(deleteItem(index)),
  set: (todos = {}) => dispatch(setTodos(todos)),
  setData: (data = {}) => dispatch(setInput(data)),
  resetData: () => dispatch(reset())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragList)

