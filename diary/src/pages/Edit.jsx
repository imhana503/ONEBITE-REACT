import { useContext } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

/* components */
import Button from './../components/Button';
import Header from './../components/Header';
import Editor from './../components/Editor';

/* hooks */
import usePageTitle from './../hooks/usePageTitle';

/* useContext */
import { DiaryWrapData, DiaryFunction } from './../App';

const Edit = () => {
    const { onUpdate } = useContext(DiaryFunction);
    const nav = useNavigate();
    const data = useContext(DiaryWrapData); 
    const { onDelete } = useContext(DiaryFunction); 
    const params = useParams();
    const processData = data.find((item)=> Number(item.id) === Number(params.id));

    usePageTitle(`${params.id}번째 일기 수정  | `);

    const onClickDelete = () => {
        onDelete(processData.id);
        nav(-1, { replace : true })
    }

    const onSubmit = (input) => {
        if( window.confirm(`일기를 정말 수정하시겠습니까?`) ){
            onUpdate(
                params.id,
                input.date,
                input.content,
                input.emotionId
            );
            nav('/', { replace : true })

        }
        
    }

    return(
        <div>
            <Header
                title="일기 수정하기"
                leftChild={<Button text="<뒤로가기" onClick={()=>nav(-1)}/>}
                rightChild={<Button text="삭제하기" type={'NEGATIVE'} onClick={onClickDelete}/>}
            />
            <Editor data={processData} onSubmit={onSubmit}/>
        </div>
    )
}

export default Edit;