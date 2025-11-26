const date = new Date().toLocaleString('en-US', {
  year: '2-digit',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}).toLowerCase();

const formattedDate = date.replace(',', ' |').replace(',', ' |');

const creationDate = formattedDate;

export default creationDate

