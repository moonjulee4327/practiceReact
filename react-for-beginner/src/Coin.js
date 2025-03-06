import { useEffect, useState } from "react";

function Coin() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [budget, setBudget] = useState(0);
    const [selectValue, setSelectValue] = useState();
    const [selectSymbol, setSelectSymbol] = useState("");
    const [disable, setDisable] = useState(true);
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
        .then((response) => response.json())
        .then((json) => {
            setCoins(json);
            setLoading(false);
        });
    }, []);
    const changeSelectValue = (e) => {
        if(e.target.selectedOptions[0].dataset.symbol === "") {
            setBudget(0);
            setDisable(true);
            setSelectValue(0);
            setSelectSymbol("");
        }else {
            setDisable(false);
            setBudget(0);
            setSelectSymbol(e.target.selectedOptions[0].dataset.symbol);
            setSelectValue(e.target.value);
        }
    };
    const onChange = (e) => {
        setBudget(e.target.value);
    };
    return (
        <div>
            <h1>The Coins! ({coins.length})</h1>
            {loading ? <strong>Loading...</strong> : null}
            <select onChange={changeSelectValue}>
                <option key={-1} data-symbol={""}>Select Coins</option>
                {coins.map((coin, i) => {
                    return (
                        <option 
                            key={i}
                            value={coin.quotes.USD.price}
                            data-symbol={coin.symbol}
                        >
                        {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
                        </option>
                    )
                })}
            </select>
            <div>
            <br/>
                My Budgt : $
                <input 
                    value={budget} 
                    onChange={onChange} 
                    type="number" 
                    disabled={disable}/>
            </div>
            <hr />
            <h1>
                You Can Buy{" : "}
                <span style={{ color: "red" }}>
                    {budget === 0 ? 0 : budget / selectValue}
                </span>
                {selectSymbol === "" ? "" : ` (${selectSymbol})`}!
            </h1>
        </div>
    );
}

export default Coin;