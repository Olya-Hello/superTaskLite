const date = new Date().toLocaleString('en-US', {
  year: '2-digit',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit'
}).toLowerCase();

const formattedDate = 
date.replace(',', ' |').replace(',', ' ~').replace(':', '•');

const creationDate = formattedDate;

export default creationDate

