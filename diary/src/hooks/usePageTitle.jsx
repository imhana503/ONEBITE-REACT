import { useEffect } from 'react';

const usePageTitle = (title) => {
    useEffect(()=>{
        const $title = document.getElementsByTagName('title')[0];
        $title.innerText = `${title}감정 일기장`;
    },[title]);    
}

export default usePageTitle;