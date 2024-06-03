import './App.css';

import React, { useState, useReducer, useRef, createContext } from 'react';

import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';

const mockData = [
  {
    id:1,
    isDone:true,
    content:'todo list 첫번째',
    date:new Date().getTime(),
  },
  {
    id:2,
    isDone:false,
    content:'두번째 할일',
    date:new Date().getTime(),
  },
  {
    id:3,
    isDone:false,
    content:'세번째 할일',
    date:new Date().getTime(),
  },
];

function reducer(state, action){
  switch(action.type){
    case 'CREATE' :      
      return [action.data, ...state];
    case 'DELETE' :
      return state.filter((item)=> item.id !== action.targetId);
    case 'UPDATE' :
      return state.map((item)=> item.id === action.targetId ? {...item, isDone:!item.isDone} : item )
    default :
      return state;
  }
}

export const TodoContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(4);

  const onCreate = (content) => {
    dispatch({
      type:'CREATE',
      data:{
        id:idRef.current++,
        isDone:false,
        content:content,
        date:new Date().getTime(),
      }
    })
  };

  const onDelete = (targetId) => {
    dispatch({
      type:'DELETE',
      targetId:targetId,
    })
  }

  const onUpdate = (targetId) => {
    dispatch({
      type:'UPDATE',
      targetId:targetId,
    });    
  }

  return (
    <div className="todoList">
      <Header/>
      <TodoContext.Provider value={{ onCreate, onDelete, onUpdate, todos }}>
        <Editor/>
        <List />
      </TodoContext.Provider>
    </div>
  )
}

export default App
