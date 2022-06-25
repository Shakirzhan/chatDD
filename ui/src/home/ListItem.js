import { Draggable } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DragItem = styled.div`
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;

const ListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
