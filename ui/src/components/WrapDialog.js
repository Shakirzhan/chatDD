import React from "react";
import MainDialog from "./MainDialog";

const WrapDialog = ({ buttons = () => {}, ...props }) => {
    const OPEN_MODAL = true;
    const CLOSE_MODAL = false;
    const [display, setDsiplay] = React.useState(CLOSE_MODAL);
    const openDialog = () => {
        setDsiplay(OPEN_MODAL)
    }
    const onClose = () => {
        setDsiplay(CLOSE_MODAL)
    }

    return (
        <>
            <MainDialog display={display} onClose={onClose} { ...props } />
            {buttons(openDialog)}
        </>
    )
}

export default WrapDialog;