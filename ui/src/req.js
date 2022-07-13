import api from './api';

const getHeaders = (token = null) => {
    const _token = token || window.localStorage.getItem('token') || '';

    if(!_token) {
      return false;
    }

    return {
        Authorization: `Bearer ${_token}`
    };
}

const list = (headers) => headers && api.get('/list', {
    headers
  })
  .then(response => {
    const list = response.data;
    const todo = list.filter(item => item.type == "todo").map(item => ({
      ...item,
      id: item.id.toString()
    }))
    const inProgress = list.filter(item => item.type == "inProgress").map(item => ({
      ...item,
      id: item.id.toString()
    }))
    const done = list.filter(item => item.type == "done").map(item => ({
      ...item,
      id: item.id.toString()
    }))
    const elementsLists = {
      todo,
      inProgress,
      done
    };
    
    return elementsLists;
  })
  .catch(() => {})

  export default {
    list,
    getHeaders,
  }