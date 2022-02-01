//creating a class
class Currency {
  constructor(symbol, askPrice, bidPrice, priceChangePercent) {
    this.symbol = symbol;
    this.askPrice = askPrice;
    this.bidPrice = bidPrice;
    this.priceChangePercent = priceChangePercent;
    this.refreshElement();
  }

  refreshElement() {
    const container = document.querySelector(".container");
    container.innerHTML = `<h3>${this.symbol}</h3><p>Ask price: ${this.askPrice}</p><p>Bid price: ${this.bidPrice}</p><p>Price change: ${this.priceChangePercent}%</p>`;
  }
}

//waiting for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  //fetching the data for the first time
  loadingData();
  //fetching new data every 5 seconds
  setInterval(() => {
    loadingData();
  }, 5000);
});

//function that creates the data
const loadingData = async () => {
  try {
    //fetching data
    const response = await fetch("https://api2.binance.com/api/v3/ticker/24hr");
    const responseData = await response.json();

    console.log(responseData);
    //initializing an object under the class of Currency
    const eth = new Currency(
      responseData[0].symbol,
      responseData[0].askPrice,
      responseData[0].bidPrice,
      responseData[0].priceChangePercent
    );
    eth.refreshElement();
  } catch (e) {
    console.log(e);
  } finally {
  }
};
