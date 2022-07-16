import types from "../types";

export const addItem = (item) => ({
    type: types.ADD_TODO,
    id: item.id,
    title: item.title,
    description: item.description,
    setType: item.type,
})

export const deleteItem = ({ id, type }) => ({
    type: types.DELETE_TODO,
    mainType: type,
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

export const change = ({ title, description, id, type }) => ({
    type: types.CHANGE,
    mainType: type,
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