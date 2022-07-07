import types from "../types"

const initialState = {
  form: {
    title: '',
    description: '',
    titleError: false,
    descriptionError: false,
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
    case types.SET_INPUT:
      return {
        ...state,
        form: {
          ...state.form,
          [action.name]: action.value
        }
      }
    case types.CHANGE:
        return {
          ...state,
          elementsLists: {
            ...state.elementsLists,
            todo: state.elementsLists.todo.map((todo, index) => {
              if(index === action.index) {
                return {
                  ...todo,
                  title: action.title,
                  description: action.description,
                }
              }

              return todo;
            })
          }
        }
    case types.RESET: 
      return {
        ...state,
        form: initialState.form
      }
    default:
      return state;
  }
}
