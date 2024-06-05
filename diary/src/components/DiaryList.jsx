import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* css */
import './DiaryList.css';

/* components */
import Button from './../components/Button';
import DiaryItem from './../components/DiaryItem';


const DiaryList = ({ data }) => {
    const nav = useNavigate();
    const [sort, setSort] = useState('latest');

    const onChangeSort = (e) => {
        setSort(e.target.value);
    }

    const getSortDiary = () => {
        return data.toSorted((a,b)=>{
            if( sort === 'oldset' ){
                return Number(a.date) - Number(b.date);
            } else {
                return Number(b.date) - Number(a.date);
            }
        })
    }

    const sortedData = getSortDiary();
    
    return(
        <div className="DiaryList">
            <div className="menu_bar">
                <select onChange={onChangeSort}>
                    <option value="latest">최신 순</option>
                    <option value="oldset">오래된 순</option>
                </select>
                <Button text="새 일기 쓰기" type={'POSITIVE'} onClick={()=>nav('/new')}/>
            </div>
            {
                sortedData.map((item)=> <DiaryItem key={item.id} {...item}/>)
            }
        </div>
    )
}

export default DiaryList;