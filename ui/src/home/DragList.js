import * as React from 'react';
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

class DragList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: {
        todo: [],
        inProgress: [],
        done: []
      }
    };
  }

  removeFromList(list, index) {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };
  
  addToList(list, index, element) {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    
    const { elements } = this.state;
    const listCopy = { ...elements };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = this.removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = this.addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    this.setState({ elements: listCopy })
  }

  render() {
    const { elements } = this.state;
    const lists = ["todo", "inProgress", "done"];

    return (
      <Wrap>
        <DragDropContextContainer>
          <DragDropContext onDragEnd={(props) => this.onDragEnd(props)}>
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
}

export default DragList;
