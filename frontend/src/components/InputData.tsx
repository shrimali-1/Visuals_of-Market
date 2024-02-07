import React, { SetStateAction } from "react";
import { useState } from "react";
import Dropdown from "./Dropdown";
import DateInput from "./DateInput";
interface inputDataProps {
    toChangeSymbol: (symbol: string) => void
    toChangeFromDate: (newDate: string) => void
    toChangeToDate: (newDate: string) => void
}

const InputData: React.FC<inputDataProps> = ({ toChangeSymbol, toChangeFromDate, toChangeToDate }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <h5>Change Symbol</h5>
                <Dropdown updateSymbol={toChangeSymbol} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <h5>From Date</h5>
                <DateInput updateDate={toChangeFromDate} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <h5>To Date</h5>
                    <DateInput updateDate={toChangeToDate} />
            </div>
        </div>
    )
}

export default InputData;