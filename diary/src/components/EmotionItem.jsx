/* css */
import './EmotionItem.css';

/* util */
import { emotionImage } from './../util/get-emotion-image';

const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
    return(
        <div 
            className={`EmotionItem ${ isSelected ? `EmotionItem_on_${emotionId}` : ''} `}
            onClick={()=>onClick(emotionId)}
        >
            <img 
                className="emotion_img"
                src={emotionImage(emotionId)} 
                alt=""
            />
            <div className="emotion_name">{emotionName}</div>
        </div>
    )
}

export default EmotionItem;