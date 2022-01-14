import {PretendZero} from '../Utils'

function dateNow() {
    const dateNow = new Date(Date.now());
  
    let date;
    date = dateNow.getFullYear();
    date += "-" + PretendZero(dateNow.getMonth() + 1);
    date += "-" + PretendZero(dateNow.getDay() + 2);
    date += "T" + PretendZero(dateNow.getHours());
    date += ":" + PretendZero(dateNow.getMinutes());
    return date;
  }

export default dateNow