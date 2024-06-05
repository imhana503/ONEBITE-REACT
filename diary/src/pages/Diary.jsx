import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/* components */
import Button from './../components/Button';
import Header from './../components/Header';
import Viewer from './../components/Viewer';

/* hooks */
import usePageTitle from './../hooks/usePageTitle';

/* useContext */
import { DiaryWrapData } from './../App';

/* util */
import { getDate } from './../util/get-diary-date';


const Diary = () => {
    const data = useContext(DiaryWrapData);
    const nav = useNavigate();
    const params = useParams();
    usePageTitle(`${params.id}번째 일기 상세보기 | `);

    const processData = data.find((item)=> Number(item.id) === Number(params.id));

    const currentDate = getDate(processData.date);
    return(
        <div>
             <Header
                title={currentDate}
                leftChild={<Button text={'<뒤로가기'} onClick={()=>nav(-1)}/>}
                rightChild={<Button text={'수정하기'} onClick={()=>nav(`/edit/${params.id}`)}/>}
            />
            <Viewer data={processData}/>
        </div>
    )
}

export default Diary;