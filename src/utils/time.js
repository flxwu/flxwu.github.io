// Create a new Date object
export const timeString = () => {
  const now = new Date();

  // Extract hours, minutes, and seconds
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Ensure two-digit format by padding with leading zeros if necessary
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  // Combine into hh:mm:ss format
  const timeString = `${hours}:${minutes}:${seconds}`;
  return timeString;
};
