import {getCookie} from 'utils/cookie';


export const dateString = (date)=> new Date(date).toLocaleDateString(undefined, {  
  day:   'numeric',
  month: 'short',
  year: 'numeric',
  hour:   '2-digit',
  minute: '2-digit',
  second: '2-digit',
});
