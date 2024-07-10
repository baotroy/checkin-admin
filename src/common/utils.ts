import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export const dateFormat = (timestamp?: number, utc = false): string => {
    if (!timestamp) return "";
    return utc
      ? dayjs(parseInt(formatString(timestamp.toString())))
        .utc()
        .format("dddd, MMMM D, YYYY h:mm:ss A")
      : dayjs(parseInt(formatString(timestamp.toString()))).format("dddd, MMMM D, YYYY h:mm:ss A");
  };


  const formatString = (str: string): string => {
    if (str.length > 13) {
      return str.slice(0, 13);
    } else {
      return str.padEnd(13, "0");
    }
  };

  export const getTimezoneOffsetFormat = () => {
    const now = new Date();
    const offsetInMinutes = now.getTimezoneOffset();
  
    // Convert offset to hours and minutes
    const hoursOffset = Math.floor(Math.abs(offsetInMinutes) / 60);
    const minutesOffset = Math.abs(offsetInMinutes) % 60;
    const offsetSign = offsetInMinutes > 0 ? "-" : "+";
  
    return `GMT${offsetSign}${hoursOffset
      .toString()
      .padStart(2, "0")}:${minutesOffset.toString().padStart(2, "0")}`;
  };