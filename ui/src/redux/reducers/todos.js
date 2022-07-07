import types from "../types"

const initialState = {
  form: {
    title: '',
    description: ''
  },
  elementsLists: {
    todo: [],
    inProgress: [],
    done: [],
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TODO:
      return {
        ...state,
        elementsLists: {
          ...state.elementsLists,
          todo: [
            ...state.elementsLists.todo, 
            {
              id: action.id,
              title: action.title,
              description: action.description,
            }
          ],
        }
      }
    case types.DELETE_TODO:
      return {
        ...state,
        elementsLists: {
          ...state.elementsLists,
          todo: state.elementsLists.todo.filter((_todoItem, itemIndex) => itemIndex != action.index)
        }
      }
    case types.SET_TODOS:
      return {
        ...state,
        elementsLists: action.elementsLists
      }
    default:
      return state;
  }
}
