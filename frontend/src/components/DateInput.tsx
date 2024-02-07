import React, { useEffect, useState } from 'react';

interface dateInputProps {
  updateDate: (a: string) => void
}

const DateInput: React.FC<dateInputProps> = ({ updateDate }) => {

  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    updateDate(selectedDate)
  }, [selectedDate])
  return (
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
  );
};

export default DateInput;