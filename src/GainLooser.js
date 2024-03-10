import React, { useEffect, useState } from "react";
import "./GainLoose.css";
function GainLooser() {
    const [GainData, SetGainData] = useState([]);
    const [LoseData, SetLoseData] = useState([]);
    const GainUrl = 'https://real-time-finance-data.p.rapidapi.com/market-trends?trend_type=GAINERS&country=IN&language=en';
    const LoseUrl = 'https://real-time-finance-data.p.rapidapi.com/market-trends?trend_type=LOSERS&country=IN&language=en';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f8291c67admsh0f86d252f35a9a3p1dd96ajsnb8daba0c0b90',
            'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
        }
    };

    useEffect(() => {
        async function marketData() {
            try {
                const Gainresponse = await fetch(GainUrl, options);                
                const Loseresponse = await fetch(GainUrl, options);                
                const Gainerdata = await Gainresponse.json();
                const Looserdata = await Loseresponse.json();
                SetGainData(Gainerdata.data.trends);
                SetLoseData(Looserdata.data.trends);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

        }

        marketData();

        const intervalId = setInterval(() => {
            marketData();
        }, 3600000);

        return () => clearInterval(intervalId);
    }, []);

    const GaintopNames = [];
    for (let i = 0; i < Math.min(10, GainData.length); i++) {
        if (GainData[i]) {
            GaintopNames.push(GainData[i].name);
        }
    }
    const LoosetopNames = [];
    for (let i = 0; i < Math.min(10, LoseData.length); i++) {
        if (LoseData[i]) {
            LoosetopNames.push(LoseData[i].name);
        }
    }
    return (
        <div className="container GainLooseMainWrap">
            <h2 className="text-bg-success p-2">Top 10 Gainers</h2>
            <div className="row AsideStyle">
                {GaintopNames.map((name, index) => (
                    <div className="col-5 m-1 border border-success DataWrap" key={index}>
                        <p className="text-start my-2">{name}</p>
                    </div>
                ))}
                </div>
            <h2 className="text-bg-danger p-2 m-2">Top 10 Loosers</h2>
            <div className="row AsideStyle">
                {LoosetopNames.map((name, index) => (
                    <div className="col-5 border border-danger m-1 DataWrap" key={index}>
                        <p className="text-start my-2">{name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GainLooser;
