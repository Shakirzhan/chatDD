import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const MainDialog = ({ title = '', actions = () => {}, children, display = false, onClose = () => {}, reset = () => {} }) => (
    <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        open={display}
        onClose={() => {
            onClose();
            reset();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
        <DialogActions>
            {actions(onClose)}
        </DialogActions>
    </Dialog>
);

export default MainDialog;
