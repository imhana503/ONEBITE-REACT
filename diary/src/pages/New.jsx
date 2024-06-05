import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

/* components */
import Button from './../components/Button';
import Header from './../components/Header';
import Editor from './../components/Editor';

/* hooks */
import usePageTitle from './../hooks/usePageTitle';

/* useContext */
import { DiaryFunction } from './../App';

const New = () => {
    const { onCreate } = useContext(DiaryFunction);
    const nav = useNavigate();
    usePageTitle(`새 일기쓰기  | `);

    const onSubmit = (input) => {
        onCreate(
            input.date.getTime(),
            input.content,
            input.emotionId,
        );
        nav('/', { replace : true })
    }
    return(
        <div>
             <Header
                title={`새 일기쓰기`}
                leftChild={<Button text={'<뒤로가기'} onClick={()=>nav(-1)}/>}             
            />
            <Editor onSubmit={onSubmit}/>
        </div>
    )
}

export default New;