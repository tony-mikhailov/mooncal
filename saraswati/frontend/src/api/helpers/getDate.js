export default function getDateFromURL(params){

    const dateFull={
        year: +params.year || 2020,
        month: Math.min(12, params.month || 1),
        day: Math.min(31, params.day || 1),
    }
     
    dateFull.monthWord = new Date(dateFull.year, dateFull.month - 1, dateFull.day).toLocaleString('ru', {
        month: 'long'
    });

    dateFull.monthPrev={
        month: dateFull.month > 1 ? dateFull.month - 1 : 12,
        year: dateFull.month > 1 ? dateFull.year : dateFull.year - 1 
    };

    dateFull.monthNext={
        month: dateFull.month < 12 ? dateFull.month + 1 : 1,
        year: dateFull.month < 12 ? dateFull.year : dateFull.year + 1 
    }

    //TODO: следующего предыдущего дня
    dateFull.dayNext = {
        day: Math.min(31, dateFull.day + 1),
        month: dateFull.month,
        year: dateFull.year
    }
    
    //TODO: расчет предыдущего дня
    dateFull.dayPrev = {
        day: Math.max(1, dateFull.day - 1),
        month: dateFull.month,
        year: dateFull.year
    }
    
    return (dateFull)
}