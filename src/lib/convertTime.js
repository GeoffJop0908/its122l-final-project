export function convertTime(time) {
  const date = new Date(time);

  // Define options for date and time formatting
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };

  // Convert to human-readable format
  const humanReadableDate = date.toLocaleDateString(undefined, dateOptions);
  const humanReadableTime = date.toLocaleTimeString(undefined, timeOptions);

  return `${humanReadableDate}, ${humanReadableTime}`;
}
