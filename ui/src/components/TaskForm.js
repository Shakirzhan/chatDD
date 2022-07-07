import React from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const WrapModal = styled.div`
  padding-top: 16px;
`;

const TaskForm = () => {
    const [titleError, setTitleError] = React.useState(false);
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    return (
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
    )
}