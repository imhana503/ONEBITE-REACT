import { useState, createContext, useReducer, useRef, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

/* page */
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import Notfound from './pages/Notfound';

const mockData = [
  {
    id:1,
    date:new Date('2024.6.1'),
    content:'첫번쨰 일기내용입니다',
    emotionId:3,
  },
  {
    id:2,
    date:new Date().getTime(),
    content:'두번쨰 일기내용입니다',
    emotionId:2,
  },
  {
    id:3,
    date:new Date().getTime(),
    content:'세번쨰 일기내용입니다',
    emotionId:1,
  },
  {
    id:4,
    date:new Date('2024.5.30'),
    content:'네번쨰 일기내용입니다',
    emotionId:3,
  },
];


function reducer( state, action){
  let nextState;
  switch( action.type ){  
    case 'INIT' : {
      return action.data.parsedData;
    }
    case 'CREATE' :  {
      nextState = [...state, action.data];
      break;
    }       
    case 'UPDATE' : {
      nextState = state.map((item)=> String(item.id) === String(action.data.id) ? action.data : item );
      break;
    }
    case 'DELETE' : {
      nextState =  state.filter((item)=> String(item.id) !== String(action.data.targetId));
      break;
    }    
    default:
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(nextState));
  return nextState;
}

export const DiaryWrapData = createContext();
export const DiaryFunction = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(()=>{
    const storedData = localStorage.getItem('diary');
    if( !storedData ){
      return;
    }

    const parsedData = JSON.parse(storedData);
    let maxId = 0;
    parsedData.forEach((item)=>{
      if( Number(item.id) > maxId ){
        maxId = item.id;
      }      
    });
    idRef.current = maxId+=1;
    
    dispatch({
      type:'INIT',
      data:{
        parsedData
      }
    })
  },[])

  const onDelete = (targetId) => {
    dispatch({
      type:'DELETE',
      data:{
        targetId
      }
    })
  }

  const onUpdate = ( id, date, content, emotionId ) => {
    dispatch({
      type:'UPDATE',
      data:{
        id,
        date, 
        content, 
        emotionId
      }
    })
  }

  const onCreate = ( date, content, emotionId ) => {
    dispatch({
      type:'CREATE',
      data:{
        id:idRef.current++,
        date,
        content, 
        emotionId
      }
    })
  }

  return (  
    <DiaryWrapData.Provider value={data}>
      <DiaryFunction.Provider value={{ onDelete, onUpdate, onCreate }}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/new" element={<New/>}/>
          <Route path="/diary/:id" element={<Diary/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
          <Route path="*" element={<Notfound/>}/>
        </Routes>
      </DiaryFunction.Provider>
    </DiaryWrapData.Provider>
  )
}

export default App
