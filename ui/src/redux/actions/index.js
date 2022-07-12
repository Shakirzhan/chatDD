import types from "../types";

export const addItem = (item) => ({
    type: types.ADD_TODO,
    id: item.id,
    title: item.title,
    description: item.description
})

export const deleteItem = (id) => ({
    type: types.DELETE_TODO,
    id
})

export const setTodos = (elementsLists) => ({
    type: types.SET_TODOS,
    elementsLists
})

export const setInput = ({ name, value }) => ({
    type: types.SET_INPUT,
    name,
    value
})

export const change = ({ title, description, id }) => ({
    type: types.CHANGE,
    title, 
    description, 
    id,
})

export const reset = () => ({
    type: types.RESET
})

export const addToken = (token) => ({
    type: types.ADD_TOKEN,
    token
})