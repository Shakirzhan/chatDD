import React from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { setInput } from "../redux/actions";

const WrapModal = styled.div`
  padding-top: 16px;
`;
const TaskForm = ({ form: { title, description, titleError, descriptionError }, set }) => (
    <WrapModal>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField 
                    type="text" 
                    label="Заголовок" 
                    variant="outlined" 
                    helperText={titleError && "Поле Заголовок обязательное для заполнения!"}
                    onChange={(e) => set({ name: e.target.name, value: e.target.value })} 
                    name="title"
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
                    onChange={(e) => set({ name: e.target.name, value: e.target.value })}
                    name="description"
                    value={description}  
                    error={descriptionError}
                    fullWidth
                />
            </Grid>
        </Grid>
    </WrapModal>
);
const mapStateToProps = (state) => ({
    form: state.todos.form
});
const mapDispatchToProps = (dispatch) => ({
    set: (data) => dispatch(setInput(data)) 
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskForm)