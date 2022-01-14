function parseDateTimeInput(dataTime) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    const dayNames = ["Sun", "Tue", "Wed", "Thu", "Fri", "Sat", "Mon"];
  
    const dateDataTime = new Date(dataTime);
  
    let date = monthNames[dateDataTime.getMonth()];
    date += " " + dateDataTime.getDay();
    date += " " + dayNames[dateDataTime.getDay()];
    date += " " + dateDataTime.getHours();
    date += ":" + dateDataTime.getMinutes();
  
    return date;
  }

  export default parseDateTimeInput