import { useState, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';

/* css */
import './Editor.css';

/* components */
import Button from './../components/Button';
import EmotionItem from './../components/EmotionItem';

/* util */
import { getDate } from './../util/get-diary-date';
import { emotionList } from './../util/get-emotion-list';

const Editor = ({ data, onSubmit }) => {  
    const nav = useNavigate();
    const [input, setInput] = useState({
        date:new Date(),
        emotionId:3,
        content:'',
    })

   const onChangeInput = (e) => {   
       let name = e.target.name;
       let value = e.target.value;  

       if( name === 'date' ){
            value = new Date(value);
       }

       setInput({
            ...input,
            [name] : value,
       });
      
   }

   const onClickSubmit = () => {
        onSubmit(input)
   }

   useEffect(()=>{
    if( data ){
        setInput({
            ...data,
            date:new Date( Number(data.date) )
        })
    }
   },[data])


    
    return(
        <div className="Editor">
            <section>
                <h4>오늘의 날짜</h4>
                <input
                    type="date"
                    name="date"
                    value={getDate(input.date)}
                    onChange={onChangeInput}
                />
            </section>
            <section className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_list_wrapper">
                    {
                        emotionList.map((item)=>{
                            return <EmotionItem 
                                key={item.emotionId} 
                                {...item}
                                isSelected={ item.emotionId === input.emotionId }
                                onClick={()=>{
                                    onChangeInput({
                                        target:{
                                            name:'emotionId',
                                            value:item.emotionId,
                                        }
                                    })
                                }}
                            />
                        })
                    }
                </div>
            </section>
            <section>
                <h4>오늘의 일기</h4>
                <textarea
                    name="content"
                    onChange={onChangeInput}
                    value={input.content}
                />
            </section>
            <section className="button_section">
                <Button text="취소하기" onClick={()=>nav(`/`)}/>
                <Button text="작성완료" type={'POSITIVE'} onClick={onClickSubmit}/>
            </section>
        </div>
    )
}

export default Editor;