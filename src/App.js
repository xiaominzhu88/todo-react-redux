import React, { useState } from 'react';
import './App.css';
import { connect } from 'react-redux';
import add from './store/actions/add';
import update from './store/actions/update';
import filterTodos from './store/actions/filter';

function App({ dispatch, filter, todos }) {
  const [todo, setTodo] = useState('');

  function addTodo() {
    // save to redux store
    dispatch(add(todo));

    // clean input
    setTodo('');
  }

  // => reducer, click on item to switch completed/uncomplete
  function clickItem(el) {
    const newTodo = Object.assign({}, el, {
      completed: !el.completed,
    });
    dispatch(update(newTodo));
  }

  function showTodos(status) {
    // dispatch  => reducer => store
    dispatch(filterTodos(status));
  }

  // render todos after filter
  function getRender() {
    let filtered = [];
    if (filter === 'ALL') {
      filtered = todos;
    } else if (filter === 'COMPLETE') {
      filtered = todos.filter((item) => item.completed === true);
    } else if (filter === 'ACTIVE') {
      filtered = todos.filter((item) => item.completed === false);
    } else if (filter === 'REMOVE') {
      filtered = [];
    }
    return filtered;
  }

  const renderedTodos = getRender();

  return (
    <div className="App">
      <h1>Todo</h1>
      <input value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={addTodo}>+</button>
      <div>
        <ul>
          {/*connect => got state */}
          {renderedTodos.map((el, i) => (
            <li
              className={el.completed ? 'complete' : 'uncomplete'}
              onClick={() => clickItem(el)}
              key={i}
            >
              {el.text}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => showTodos('ALL')}>All</button>
        <button onClick={() => showTodos('COMPLETE')}>Completed</button>
        <button onClick={() => showTodos('ACTIVE')}>Active</button>
        <button
          onClick={() => {
            showTodos('REMOVE');
            window.location.reload();
          }}
        >
          Remove All
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  // state from reducers
  console.log('接收reducer的原始state: ', state);
  return {
    todos: state.todos,
    filter: state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('把传入的todo信息派发去store，用在add button上: ', dispatch);
  return {
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
