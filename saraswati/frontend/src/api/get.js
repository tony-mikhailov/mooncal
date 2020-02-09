import makeRequest from './helpers/makeRequest';

export function getDateData(date){
    return( 
        makeRequest(`${date.year}/${date.month}/${date.day}/json`)
    )
   
}

export function getMonthData(date){
    makeRequest(`${date.year}/${date.month}/json`)
}

