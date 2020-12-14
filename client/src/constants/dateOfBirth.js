
function getDate() {
  const date=[];
  for(let i=0;i<31;i++){
    date.push({value:i, label: i+1});
  }
  return date;
}
function getMonth() {
  const month=[];
  for(let i=0;i<12;i++){
    month.push({value:i, label: i+1});
  }
  return month;
}
function getYear() {
  const year=[];
  for(let i=0;i<new Date().getFullYear()-15-1950;i++){
    year.push({value:i+1950, label: i+1950});
  }
  return year.reverse();
}

export const DATE = getDate();
export const MONTH = getMonth();
export const YEAR = getYear();
