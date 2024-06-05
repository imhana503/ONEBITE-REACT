import { useState, useContext } from 'react';

/* components */
import Button from './../components/Button';
import Header from './../components/Header';
import DiaryList from './../components/DiaryList';

/* hooks */
import usePageTitle from './../hooks/usePageTitle';

/* useContext */
import { DiaryWrapData } from './../App';

function getDiaryList(dateCalendar, data){
    const firstDate = new Date(
        dateCalendar.getFullYear(),
        dateCalendar.getMonth(),
        1,
        0,
        0,
        0
    ).getTime();

    const lastDate = new Date(
        dateCalendar.getFullYear(),
        dateCalendar.getMonth()+1,
        0,
        23,
        59,
        59
    ).getTime();

    return data.filter((item)=> item.date >= firstDate && lastDate >= item.date);
}

const Home = () => {
    const data = useContext(DiaryWrapData);
    const [dateCalendar, setDateCalendar] = useState(new Date());

    const onClickPrev = () => {
        setDateCalendar(
            new Date( dateCalendar.getFullYear(), dateCalendar.getMonth()-1 )
        );  
    }

    const onClickNext = () => {
        setDateCalendar(
            new Date( dateCalendar.getFullYear(), dateCalendar.getMonth()+1 )
        )
    }

    const filterDiaryList = getDiaryList(dateCalendar, data);
    usePageTitle(``);

    return(
        <div>
            <Header
                title={`${dateCalendar.getFullYear()}년 ${dateCalendar.getMonth()+1}월`}
                leftChild={<Button text={'<'} onClick={onClickPrev}/>}
                rightChild={<Button text={'>'} onClick={onClickNext}/>}
            />
            <DiaryList data={filterDiaryList}/>
        </div>
    )
}

export default Home;