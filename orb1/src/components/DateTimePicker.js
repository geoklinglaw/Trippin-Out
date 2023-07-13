import React, { useState, useEffect } from 'react';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

const DateTimePicker = ({ onChange, checkInDate, pickerType, className }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (date && time) {
      const dateTime = moment(`${date.format('YYYY-MM-DD')} ${time.format('HH:mm')}`, 'YYYY-MM-DD HH:mm');
      onChange(dateTime);
    }
  }, [date, time]);

  const handleDateChange = (value) => {
    setDate(value);
  };

  const handleTimeChange = (value) => {
    setTime(value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <DatePicker 
        className={className} 
        onChange={handleDateChange} 
        value={date} 
        style={{ width: '60%' }} 
        disabledDate={current => {
          if (pickerType === 'checkin') {
            return current && current < moment().startOf('day');
          } else if (pickerType === 'checkout') {
            return checkInDate && current < moment(checkInDate).endOf('day');
          }
        }}
      />
      <TimePicker 
        className={className}
        onChange={handleTimeChange} 
        value={time} 
        format="HH:mm" 
        style={{ width: '35%' }} 
      />
    </div>
  );
};

export default DateTimePicker;
