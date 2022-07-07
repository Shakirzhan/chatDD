import { Draggable } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import WrapDialog from "../components/WrapDialog";

const DragItem = styled.div`
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;

const ListItem = ({ item, index, deleteItem }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
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
                    <IconButton
                      size="large"
                      aria-label="display more actions"
                      edge="end"
                      onClick={handleMenu}
                      color="inherit"
                      style={{ float: "right" }}
                    >
                      <MoreIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Редактировать</MenuItem>
                      <WrapDialog 
                        title="Удалить элемент"
                        actions={(onClose = () => {}) => (<>
                          <Button onClick={deleteItem(onClose, index)} autoFocus>
                            Удалить
                          </Button>
                      </>)}
                        buttons={(openDialog = () => {}) => <MenuItem onClick={openDialog}>Удалить</MenuItem>}
                      >
                          <Typography variant="body2">
                            Вы уверены, что хотите удалить "{item.title}"?
                          </Typography>
                      </WrapDialog>
                      
                    </Menu>
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
    </>
  );
};

export default ListItem;
