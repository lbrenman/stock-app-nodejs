document.addEventListener('DOMContentLoaded', () => {
    const quoteTab = document.getElementById('quoteTab');
    const watchlistTab = document.getElementById('watchlistTab');
    const quoteContent = document.getElementById('quoteContent');
    const watchlistContent = document.getElementById('watchlistContent');
    const getQuoteButton = document.getElementById('getQuoteButton');
    const getWatchlistButton = document.getElementById('getWatchlistButton');
    const stockInfo = document.getElementById('stockInfo');
    const watchlistInfo = document.getElementById('watchlistInfo');

    // Tab switching logic
    quoteTab.addEventListener('click', () => {
        quoteContent.classList.add('active-tab');
        watchlistContent.classList.remove('active-tab');
    });

    watchlistTab.addEventListener('click', () => {
        watchlistContent.classList.add('active-tab');
        quoteContent.classList.remove('active-tab');
    });

    // Fetch stock quote
    getQuoteButton.addEventListener('click', () => {
        const stockSymbol = document.getElementById('stockSymbol').value.trim();

        if (stockSymbol) {
            fetch(`/api/quote?symbol=${stockSymbol}`)
                .then(response => response.json())
                .then(data => {
                    stockInfo.innerHTML = `
                        <p><strong>Symbol:</strong> ${data.Symbol}</p>
                        <p><strong>Name:</strong> ${data.Name}</p>
                        <p><strong>Price:</strong> $${data.Price}</p>
                        <p><strong>Change:</strong> ${data.Change} (${data.ChangePercent}%)</p>
                        <p><strong>Day High:</strong> $${data.DayHigh}</p>
                        <p><strong>Day Low:</strong> $${data.DayLow}</p>
                        <p><strong>Open Price:</strong> $${data.OpenPrice}</p>
                        <p><strong>Previous Close:</strong> $${data.PreviousClose}</p>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching stock quote:', error);
                    stockInfo.innerHTML = '<p>An error occurred while fetching the stock quote.</p>';
                });
        } else {
            alert('Please enter a stock symbol.');
        }
    });

    // Fetch watch list
    getWatchlistButton.addEventListener('click', () => {
        const stockSymbols = document.getElementById('stockSymbols').value.trim();

        if (stockSymbols) {
            fetch(`/api/watchlist?symbols=${encodeURIComponent(stockSymbols)}`)
                .then(response => response.json())
                .then(data => {
                    let tableContent = `
                        <table>
                            <tr>
                                <th>Symbol</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change</th>
                                <th>Change Percent</th>
                            </tr>
                    `;

                    data.forEach(stock => {
                        tableContent += `
                            <tr>
                                <td>${stock.Symbol}</td>
                                <td>${stock.Name}</td>
                                <td>$${stock.Price}</td>
                                <td>${stock.Change}</td>
                                <td>${stock.ChangePercent}%</td>
                            </tr>
                        `;
                    });

                    tableContent += '</table>';
                    watchlistInfo.innerHTML = tableContent;
                })
                .catch(error => {
                    console.error('Error fetching watch list:', error);
                    watchlistInfo.innerHTML = '<p>An error occurred while fetching the watch list.</p>';
                });
        } else {
            alert('Please enter stock symbols.');
        }
    });

    // Initialize the default active tab
    quoteTab.click();
});
