const apiKey = '45fe3bae50f0f2a0fd4a366f';  // Your ExchangeRate-API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;  // Base API URL

async function getCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const currencies = Object.keys(data.conversion_rates);  // Extract currency codes
        const fromCurrencySelect = document.getElementById("fromCurrency");
        const toCurrencySelect = document.getElementById("toCurrency");

        // Populate the currency select dropdowns
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            fromCurrencySelect.appendChild(option);
            toCurrencySelect.appendChild(option.cloneNode(true));  // Add same options to both selects
        });
    } catch (error) {
        console.error('Error fetching the currency data:', error);
    }
}

// Fetch currency options when the page loads
getCurrencies();

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (!amount || !fromCurrency || !toCurrency) {
        alert("Please fill all fields");
        return;
    }

    // API request for currency conversion
    const conversionApiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;
    
    try {
        const response = await fetch(conversionApiUrl);
        const data = await response.json();

        const resultDiv = document.getElementById("result");
        if (data.result === "success") {
            resultDiv.innerHTML = `<h2>${amount} ${fromCurrency} = ${data.conversion_result} ${toCurrency}</h2>`;
        } else {
            resultDiv.innerHTML = `<h2>Conversion failed. Please try again.</h2>`;
        }
    } catch (error) {
        console.error('Error fetching the conversion data:', error);
        document.getElementById("result").innerHTML = `<h2>Conversion failed. Please try again.</h2>`;
    }
}
