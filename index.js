const key = "3MSWK1YGQLNL5NXZ";
const functionName = "FX_DAILY";
const fromCurrency = "USD";
const toCurrency = "EUR"
const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&apikey=${key}`;

axios
  .get(apiUrl)
  .then(responseFromAPI => {
      //const dailyData = responseFromAPI.data;
      //const stockDates = Object.keys(dailyData);
      console.log( "The response from API: ",  responseFromAPI );
      printTheChart(responseFromAPI.data);   
    })
  .catch(err => console.log("Error while getting the data: ", err));

// this function is gonna receive the response from the API (stockData)
function printTheChart(stockData) {

    // We are gonna store the in dailyData the object storing the daily information
    // We are using [] notation to get date store at "Time Series (Daily)" key
    const dailyData = stockData["Time Series FX (Daily)"];

    // using Object.keys to get all the keys (date) from the daily information
    const stockDates = Object.keys(dailyData);
    console.log(stockDates)
    // mapping through the dates to retrieve the closing value ("4. close"), from the daily info
    const stockPrices = stockDates.map( date => dailyData[date]["4. close"] );

    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: stockDates,
        datasets: [
          {
            label: "Stock Chart",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: stockPrices
          }
        ]
      }
  }); // closes chart = new Chart()
} // closes printTheChart()