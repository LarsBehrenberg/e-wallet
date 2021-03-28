import React from 'react';

// Redux
import { useSelector } from 'react-redux';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: '#eaf6ff'
    }
  });

const locales = {
  'en-US': require('date-fns/locale/en-US')
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

export default function LivePreviewExample() {
  const { transactions } = useSelector((state) => state.auth);

  // {
  //   id: 0,
  //   title: 'All Day Event very long title',
  //   allDay: true,
  //   start: new Date(2021, 3, 0),
  //   end: new Date(2021, 3, 0)
  // },

  const events =
    transactions &&
    transactions.map(({ transactionsID, description, date, type, amount }) => {
      const itemDate = new Date(1970, 0, 1);
      itemDate.setSeconds(date.seconds);

      return {
        id: transactionsID,
        title: description,
        type,
        allDay: true,
        start: itemDate,
        end: itemDate,
        amount
      };
    });

  function Event({ event }) {
    return (
      <>
        <p className="m-0">{event.title}</p>
        <p className="m-0">
          ¥ {event.amount['JPY'].toLocaleString()}{' '}
          {event.type === 'Income' ? (
            <span className="text-success">&uarr;</span>
          ) : (
            <span className="text-danger">&darr;</span>
          )}
        </p>
      </>
    );
  }

  return (
    <>
      <Calendar
        localizer={localizer}
        views={{
          month: true,
          agenda: true
        }}
        showMultiDayTimes
        tooltipAccessor="start"
        defaultDate={new Date()}
        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
          event: Event
        }}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="pt-4"
        style={{ minHeight: 650 }}
      />
    </>
  );
}
