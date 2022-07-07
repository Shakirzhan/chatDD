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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DragItem = styled.div`
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;

const ListItem = ({ item, index, deleteItem }) => {
  const OPEN_MODAL = true;
  const CLOSE_MODAL = false;
  const [display, setDsiplay] = React.useState(CLOSE_MODAL);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    setDsiplay(OPEN_MODAL);
    setAnchorEl(null);
  };

  return (
    <>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        open={display}
        onClose={() => setDsiplay(CLOSE_MODAL)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Удалить элемент
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Вы уверены, что хотите удалить "{item.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            deleteItem(index)
            setDsiplay(CLOSE_MODAL)
          }} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
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
                      <MenuItem onClick={handleDelete}>Удалить</MenuItem>
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
