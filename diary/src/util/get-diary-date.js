export function getDate(currentDate){
    let year = new Date(currentDate).getFullYear();
    let month = new Date(currentDate).getMonth()+1;    
    let date = new Date(currentDate).getDate();
    if( month < 10 ){
        month = `0${month}`;
    } 
    if( date < 10 ){
        date = `0${date}`;
    } 

    return `${year}-${month}-${date}`;
}