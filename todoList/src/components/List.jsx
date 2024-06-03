import './List.css';
import React, { useContext, useState } from 'react';
import TodoItem from './TodoItem';
import { TodoContext } from './../App';


const List = () => {
    const { todos } = useContext(TodoContext);
    const [search, setSearch] = useState('');
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const getFilter = () => {
        if( search === '' ){
            return todos;
        }

        return todos.filter((item)=> item.content.toLowerCase().includes( search.toLowerCase() ) );
    }

    const filterTodos = getFilter();

    return(
        <div className="list">
            <div className="list-title">Todo List</div>
            <div className="list-search">
                <input
                    type="text"
                    placeholder='검색어를 입력해주세요'
                    value={search}
                    onChange={onChangeSearch}
                />
            </div>
            <ul className="list-cont">
                {
                    filterTodos.map((item)=> <TodoItem key={item.id} {...item}/>)
                }
            </ul>
        </div>
    )
}

export default List;