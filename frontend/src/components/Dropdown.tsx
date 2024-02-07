import React, { useEffect, useState } from 'react';

interface dropDownProps {
    updateSymbol: (sym: string) => void
}

const Dropdown: React.FC<dropDownProps> = ({updateSymbol}) => {
  const [selectedOption, setSelectedOption] = useState<string>("NIFTY+50");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    updateSymbol(selectedOption)
  },[selectedOption])

  return (
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="NIFTY+50">NIFTY 50</option>
        <option value="NIFTY+BANK">NIFTY Bank</option>
      </select>
  );
};

export default Dropdown;