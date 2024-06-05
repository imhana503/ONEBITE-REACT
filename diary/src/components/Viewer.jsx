/* css */
import './Viewer.css';

/* util */
import { emotionImage } from '../util/get-emotion-image';

const Viewer = ({ data }) => {
    return(
        <div className="Viewer">
            <section>
                <h4>오늘의 감정</h4>
                <div className={`emotion_img_wrapper emotion_img_wrapper_${data.emotionId}`}>
                    <img src={emotionImage(data.emotionId)} alt=""/>
                </div>
            </section>
            <section>
                <h4>오늘의 일기</h4>
                <div className="content_wrapper">
                    <p>{data.content}</p>
                </div>
            </section>
        </div>
    )
}

export default Viewer;