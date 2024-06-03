import './Editor.css';

import React, { useState, useRef, useContext } from 'react';
import { TodoContext }  from './../App';

const Editor = () => {
    const { onCreate } = useContext(TodoContext);
    const [newTodo, setNewTodo] = useState('');
    const inputRef = useRef();

    const onChangeNewTodo = (e) => {
        setNewTodo(e.target.value)
    }

    const onClickSubmit = () => {
        if( newTodo === '' ){
            inputRef.current.focus();
            return;
        }
        onCreate(newTodo);
        setNewTodo('');
        inputRef.current.focus();
    }

    return(
        <div className="editor">
            <div className="editor-search">
                <input
                    type="text"
                    placeholder='새로운 Todo'
                    value={newTodo}
                    onChange={onChangeNewTodo}
                    ref={inputRef}
                />
                <button type="button" onClick={onClickSubmit}>추가</button>
            </div>
        </div>
    )
}

export default Editor;