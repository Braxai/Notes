let price = 0;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.10],
  ['QUARTER', 4.25],
  ['ONE', 90.00],
  ['FIVE', 55.00],
  ['TEN', 20.00],
  ['TWENTY', 60.00],
  ['ONE HUNDRED', 100.00]
];

function getTotalCid(cid) {
    return cid.reduce((total, [_, amount]) => total + amount, 0);
}

function calculateChange(due, cid) {
    let change = [];
    let totalCid = getTotalCid(cid);
    let remainingChange = due;

    if (totalCid < due) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (totalCid === due) {
        return { status: "CLOSED", change: cid.filter(([_, amount]) => amount > 0) };
    } else {
        for (let i = cid.length - 1; i >= 0; i--) {
            let [name, amount] = cid[i];
            let coinValue = 0;

            switch (name) {
                case 'PENNY':
                    coinValue = 0.01;
                    break;
                case 'NICKEL':
                    coinValue = 0.05;
                    break;
                case 'DIME':
                    coinValue = 0.10;
                    break;
                case 'QUARTER':
                    coinValue = 0.25;
                    break;
                case 'ONE':
                    coinValue = 1.00;
                    break;
                case 'FIVE':
                    coinValue = 5.00;
                    break;
                case 'TEN':
                    coinValue = 10.00;
                    break;
                case 'TWENTY':
                    coinValue = 20.00;
                    break;
                case 'ONE HUNDRED':
                    coinValue = 100.00;
                    break;
            }

            let coinAmount = 0;
            while (remainingChange >= coinValue && amount > 0) {
                remainingChange -= coinValue;
                amount -= coinValue;
                coinAmount += coinValue;
                remainingChange = Math.round(remainingChange * 100) / 100; 
            }

            if (coinAmount > 0) {
                change.push([name, coinAmount]);
                cid[i][1] -= coinAmount;
            }
        }

        if (remainingChange > 0) {
            return { status: "INSUFFICIENT_FUNDS", change: [] };
        } else {
            return { status: "OPEN", change: change };
        }
    }
}

function addCashToDrawer(amount, cid) {
    let remainingAmount = amount;

    const denominations = [
        { name: 'ONE HUNDRED', value: 100.00 },
        { name: 'TWENTY', value: 20.00 },
        { name: 'TEN', value: 10.00 },
        { name: 'FIVE', value: 5.00 },
        { name: 'ONE', value: 1.00 },
        { name: 'QUARTER', value: 0.25 },
        { name: 'DIME', value: 0.10 },
        { name: 'NICKEL', value: 0.05 },
        { name: 'PENNY', value: 0.01 },
    ];

    denominations.forEach(denomination => {
        let amountToAdd = 0;
        while (remainingAmount >= denomination.value) {
            amountToAdd += denomination.value;
            remainingAmount -= denomination.value;
            remainingAmount = Math.round(remainingAmount * 100) / 100;
        }

        if (amountToAdd > 0) {
            let cidEntry = cid.find(([name]) => name === denomination.name);
            if (cidEntry) {
                cidEntry[1] += amountToAdd;
            }
        }
    });
}

document.getElementById('purchase-btn').addEventListener('click', () => {
    let cashInput = parseFloat(document.getElementById('cash').value);

    if (price === 0) {
        alert("There is no current customer");
        document.getElementById('cash').value = '';
        return;
    }

    if (isNaN(cashInput)) {
        alert("Please enter a valid amount.");
        return;
    }

    if (cashInput < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    let changeDue = cashInput - price;
    let { status, change } = calculateChange(changeDue, cid);

    const changeDueElement = document.getElementById('change-due');
    const changeAmountsDiv = document.getElementById('change-amounts');

    if (cashInput === parseFloat(price)) {
        changeDueElement.textContent = "No change due - customer paid with exact cash";
        changeAmountsDiv.innerHTML = "";
    } else {
        switch (status) {
            case "INSUFFICIENT_FUNDS":
                changeDueElement.textContent = "";
                changeAmountsDiv.innerHTML = "";
                changeDueElement.textContent = `Status: INSUFFICIENT_FUNDS`;
                break;
            case "CLOSED":
                const sortedChange = change
                    .filter(([_, amount]) => amount > 0)
                    .sort((a, b) => {
                        const values = {
                            'ONE HUNDRED': 100.00,
                            'TWENTY': 20.00,
                            'TEN': 10.00,
                            'FIVE': 5.00,
                            'ONE': 1.00,
                            'QUARTER': 0.25,
                            'DIME': 0.10,
                            'NICKEL': 0.05,
                            'PENNY': 0.01
                        };
                        return values[b[0]] - values[a[0]]; 
                    });

                const closedChangeText = sortedChange
                    .map(([name, amount]) => `${name}: $${amount.toFixed(2)}`)
                    .join(', ');

                changeDueElement.textContent = `Status: CLOSED ${closedChangeText}`;
                changeAmountsDiv.innerHTML = "";
                break;
            case "OPEN":
                changeDueElement.textContent = `Status: OPEN. Change given: ${change.map(([name, amount]) => `${name}: $${amount.toFixed(2)}`).join(', ')}.`;
                changeAmountsDiv.innerHTML = change.map(([name, amount]) => 
                    `<div class="change-item"><span>${name}:</span><span>$${amount.toFixed(2)}</span></div>`
                ).join('');
                break;
        }
    }

    if (status !== "INSUFFICIENT_FUNDS") {
        addCashToDrawer(cashInput, cid);
    }

    price = 0;
    document.getElementById('cash').value = '';
    updatePriceDisplay();
    displayChange();
});

document.getElementById('next-customer-btn').addEventListener('click', () => {
    price = (Math.random() * (100 - 0.01) + 0.01).toFixed(2);
    updatePriceDisplay();
    document.getElementById('cash').value = '';
    document.getElementById('change-due').textContent = '';
    document.getElementById('change-amounts').innerHTML = '';
    displayChange();
});

function displayChange() {
    const changeAmountsDiv = document.getElementById('change-amounts');
    let changeHTML = '';

    cid.forEach(item => {
        const [name, amount] = item;
        changeHTML += `<div class="change-item"><span>${name}:</span><span>$${amount.toFixed(2)}</span></div>`;
    });

    changeAmountsDiv.innerHTML = changeHTML;
}

function updatePriceDisplay() {
    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: $${price}`;
}

updatePriceDisplay();
displayChange();
