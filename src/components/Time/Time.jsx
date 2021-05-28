import React from 'react';
import distanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';

const Time = ({date}) => (
  <>
    {distanceToNow(new Date(date), {addSuffix: true, locale: ruLocale})}
  </>
);


// Time.propTypes = {
//   // date: PropTypes.string
// }

export default Time;