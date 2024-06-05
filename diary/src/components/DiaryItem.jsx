import { useNavigate } from 'react-router-dom';

/* css */
import './DiaryItem.css';

/* components */
import Button from './../components/Button';

import { emotionImage }  from './../util/get-emotion-image';

const DiaryItem = ({ id, content, date, emotionId }) => {
    const nav = useNavigate();

    const onClickGoDiaryPage = () => {
        nav(`/diary/${id}`)
    }

    return(
        <div className="DiaryItem">
            <div className={`img_section img_section_${emotionId}`} onClick={onClickGoDiaryPage}>
                <img src={emotionImage(emotionId)} alt=""/>
            </div>
            <div className="info_section" onClick={onClickGoDiaryPage}>
                <div className="created_date">{new Date(date).toLocaleDateString()}</div>
                <div className="content">{content}</div>
            </div>
            <div className="button_section">
                <Button text={'수정하기'} onClick={()=>nav(`/edit/${id}`)}/>
            </div>
        </div>
    )
}

export default DiaryItem;