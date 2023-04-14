const getLocalDate = (isoDate) => {
    const localDate = new Date(isoDate);
    const formattedDate = localDate.toISOString().slice(0, 16).replace('T', 'T');
    console.log(formattedDate);
    return formattedDate;
}

const posts = [
    'mayor',
    'deputyMayor',
    'wardChairperson',
    'wardMember1',
    'wardMember2',
    'wardMember3',
    'wardMember4',
]

const NormalTime = ({dateStr}) => {
    const dateObj = new Date(dateStr);

    console.log(dateObj);
    // Convert to local date and time
    const localDateStr = dateObj.toLocaleDateString();
    const localTimeStr = dateObj.toLocaleTimeString();

    // Convert to AM/PM format

    return localDateStr + " " + localTimeStr;
}


const isDateBetween=(dateToCheck, startDate, endDate)=>{
    const dateToCheckMs = new Date(dateToCheck).getTime();
    const startDateMs = new Date(startDate).getTime();
    const endDateMs = new Date(endDate).getTime();
    return (dateToCheckMs >= startDateMs && dateToCheckMs <= endDateMs);
  };


  const generateColorScale=(data)=> {
    const minValue = Math.min(...data.map(item => item.count));
    const maxValue = Math.max(...data.map(item => item.count));
    
    return data.map(item => {
    const value = item.count;
    if(value==maxValue){
        return "rgb(0,255,0)";
    }else{
        
        const r = Math.round(255 * ((value - minValue) / (maxValue - minValue)));
        const g = Math.round(255 * (1 - (value - minValue) / (maxValue - minValue)));
        const b = 0;
        return `rgb(${r}, ${g}, ${b})`;
    }
    });
  }
module.exports = { getLocalDate, posts ,NormalTime,isDateBetween,generateColorScale};