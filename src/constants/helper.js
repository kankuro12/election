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


  const generateRandomColor=()=>{
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const generateColorScale=(data)=> {
    const colors = [];
    for (let i = 0; i < data.length; i++) {
      colors.push(generateRandomColor());
    }
    return colors;
  }
module.exports = { getLocalDate, posts ,NormalTime,isDateBetween,generateColorScale};