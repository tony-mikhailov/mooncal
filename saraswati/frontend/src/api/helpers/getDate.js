export default function getDateFromURL(params){

    const year = Math.max(2020, params.year);
    const month = Math.min(12, params.month || 0);
    const day = Math.min(31, params.day || 1);
    const monthWord = new Date(year, month - 1, day).toLocaleString('ru', {
        month: 'long'
    });

    return ({ 
        year,
        month,
        monthWord,
        day
    })
}