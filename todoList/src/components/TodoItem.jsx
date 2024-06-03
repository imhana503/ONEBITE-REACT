import { useContext } from 'react';
import { TodoContext } from './../App';

const TodoItem = ({ id, isDone, content, date  }) => {
    const { onDelete, onUpdate } = useContext(TodoContext);

    const onClickDelete = () => {
        onDelete(id);
    }

    const onChangeCheckbox = () => {
        onUpdate(id);
    }
    

    return(
        <li className="list-item">
            <input
                readOnly
                checked={isDone}
                type="checkbox"
                onChange={onChangeCheckbox}
            />
            <span className="txt">{content}</span>
            <span className="date">{new Date(date).toLocaleDateString()}</span>
            <button type="button" onClick={onClickDelete}>삭제</button>
        </li>
    )
}

export default TodoItem;