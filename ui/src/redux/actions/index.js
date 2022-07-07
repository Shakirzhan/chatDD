import types from "../types";

export const addItem = (item) => ({
    type: types.ADD_TODO,
    id: item.id,
    title: item.title,
    description: item.description
})

export const deleteItem = (index) => ({
    type: types.DELETE_TODO,
    index
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

export const reset = () => ({
    type: types.RESET
})