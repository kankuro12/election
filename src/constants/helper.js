const getLocalDate = (isoDate) => {
    const localDate = new Date(isoDate);
    const formattedDate = localDate.toISOString().slice(0, 16).replace('T', 'T');
    console.log(formattedDate);
    return formattedDate;
}

const posts=[
        'mayor',
        'deputyMayor',
        'wardChairperson',
        'wardMember1',
        'wardMember2',
        'wardMember3',
        'wardMember4',
]

module.exports={getLocalDate,posts};