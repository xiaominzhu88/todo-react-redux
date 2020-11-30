const initialState = {
  todos: [],
  filter: 'ALL', //completed, active...
};

// create key (could also use simple uuid())
function createId() {
  let id = 0;
  return function () {
    return id++;
  };
}
const genId = createId();

function todoList(state = initialState, action) {
  switch (action.type) {
    case 'ADD': {
      const todos = [
        ...state.todos,
        {
          text: action.text,
          completed: false,
          id: genId(),
        },
      ];
      return { ...state, todos };
    }
    case 'UPDATE':
      let updatedTodos = [];
      let newTodo = action.el;
      for (let i = 0; i < state.todos.length; i++) {
        let currentTodo = state.todos[i];
        if (currentTodo.id === newTodo.id) {
          updatedTodos.push(newTodo);
        } else {
          updatedTodos.push(currentTodo);
        }
      }
      return { ...state, todos: updatedTodos };

    case 'FILTER':
      return Object.assign({}, state, {
        filter: action.displayStatus,
      });

    case 'REMOVE':
      return { ...state, todos: [] };

    default:
      return state;
  }
}

export default todoList;
