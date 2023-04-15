export const getDateAndTime = (timeString, option) => {
  const date = new Date(timeString);
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth()}`.padStart(2, 0);
  const year = `${date.getFullYear()}`.padStart(2, 0);
  timeString = date.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" });
  // console.log(timeString)

  const time = timeString.slice(0, -2).trim().slice(0, -3);
  // console.log(time)
  const ampm = timeString.slice(-2).trim(); // AM or PM
  // console.log(ampm)

  //   console.log(`${day}/${month}/${year} ${time} ${ampm}`);
  if (option === "dateAndTime")
    return `${day}/${month}/${year} ${time} ${ampm}`;
  else if (option === "time") return `${time} ${ampm}`;
  else return `${day}/${month}/${year}`;
};
