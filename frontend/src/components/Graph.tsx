import React, { useEffect, useState } from 'react';
import LineGraph from './LineGraph';
import InputData from './InputData';

interface myData {
    id: number;
    date: string;
    price: number;
}
interface LineGraphPoint {
    x: string,
    y: Number,
}

const Graph: React.FC = () => {
    const [data, setData] = useState<myData[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [fromDate, setFromDate] = useState<string>("2017-01-02")
    const [toDate, setToDate] = useState<string>("2017-01-10")
    const [symbol, setSymbol] = useState<string>("NIFTY+50")
    const api_URI = `http://127.0.0.1:9090/historical_data?symbol=${symbol}&from_date=${fromDate}&to_date=${toDate}`
    const [graphData,setGraphData] = useState<LineGraphPoint[]>([])



    useEffect(() => {
        const gData = data.map((item) => ({
            x: item.date,
            y: item.price,
        }));
        console.log(gData)
        setGraphData(gData);
    },[data])

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("I am here")
                console.log(api_URI)
                const response = await fetch(api_URI,
                    {
                        method: "GET",
                        // headers: {
                        //     "Content-Type": "application/json",
                        // },
                    });
                const jsonData = await response.json()
                console.log(jsonData)
                setData(jsonData)
                setIsLoading(false);
            } catch (error: any) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [api_URI])

    const changeSymbol = (newSymbol: string): void => {
        setSymbol(newSymbol)
    }
    const changeFromDate = (newDate: string): void => {
        setFromDate(newDate)
    }
    const changeToDate = (newDate: string): void => {
        setToDate(newDate)
    }
    if (isLoading) {
        return <div>Loading....</div>;
    }
    if (error) {
        return <div>Error.... {error}</div>;
    }


    return (
        <div style={{width:'100%',display:"flex",flexDirection:'column',justifyContent:'center',alignItems:"center"}}>
            <LineGraph graphData={graphData} />
            <InputData toChangeSymbol={changeSymbol} toChangeFromDate={changeFromDate} toChangeToDate={changeToDate} />
        </div>
    )
}


export default Graph;