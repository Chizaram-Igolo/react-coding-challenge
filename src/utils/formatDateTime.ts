export const formatAMPM = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  let minutesStr = minutes.toString().padStart(2, "0");
  let strTime = hours + ":" + minutesStr + " " + ampm;
  return strTime;
};
