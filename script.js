

let balance = 0; 
const balanceDisplay = document.getElementById('balance');
const historyList = document.getElementById('history-list');


let transactions = [];


function addTransaction() {
    const name = document.getElementById('transaction-name').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    const type = document.getElementById('transaction-type').value;

    if (name === "" || isNaN(amount)) {
        alert("Please fill all fields correctly!");
        return;
    }

    let transaction = {};
    if (type === "credit") {
        balance += amount;
        transaction = {
            id: new Date().getTime(),
            name: name,
            amount: amount,
            type: 'Credit',
            balance: balance
        };
    } else {
        balance -= amount;
        transaction = {
            id: new Date().getTime(),
            name: name,
            amount: amount,
            type: 'Debit',
            balance: balance
        };
    }

    
    balanceDisplay.textContent = balance;

    
    transactions.push(transaction);
    renderTransactions();

    
    document.getElementById('transaction-name').value = "";
    document.getElementById('transaction-amount').value = "";
}


function renderTransactions() {
    historyList.innerHTML = '';
    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.type}: ${transaction.name} - ₹${transaction.amount} | Balance: ₹${transaction.balance}`;
        
        
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.onclick = () => editTransaction(transaction.id);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteTransaction(transaction.id);

       
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        historyList.appendChild(listItem);
    });
}

function deleteTransaction(transactionId) {
    
    transactions = transactions.filter(transaction => transaction.id !== transactionId);

    
    balance = 0;
    transactions.forEach(transaction => {
        if (transaction.type === 'credit') {
            balance += transaction.amount;
        } else {
            balance -= transaction.amount;
        }
    });

   
    balanceDisplay.textContent = balance;
    renderTransactions();
}


function editTransaction(transactionId) {

    const transaction = transactions.find(t => t.id === transactionId);
  
    document.getElementById('transaction-name').value = transaction.name;
    document.getElementById('transaction-amount').value = transaction.amount;
    document.getElementById('transaction-type').value = transaction.type;

    
    const addButton = document.querySelector('.transaction-form button');
    addButton.textContent = "Update Transaction";
    addButton.onclick = () => updateTransaction(transactionId);
}


function updateTransaction(transactionId) {
    const name = document.getElementById('transaction-name').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    const type = document.getElementById('transaction-type').value;

    if (name === "" || isNaN(amount)) {
        alert("Please fill all fields correctly!");
        return;
    }

    
    const transactionIndex = transactions.findIndex(t => t.id === transactionId);
    const transaction = transactions[transactionIndex];

    balance -= transaction.amount;
    if (type === "credit") {
        balance += amount;
        transaction.type = "Credit";
    } else {
        balance -= amount;
        transaction.type = "Debit";
    }

    transaction.name = name;
    transaction.amount = amount;
    transaction.balance = balance;

    
    renderTransactions();
    document.getElementById('transaction-name').value = "";
    document.getElementById('transaction-amount').value = "";
    document.querySelector('.transaction-form button').textContent = "Add Transaction";
    document.querySelector('.transaction-form button').onclick = addTransaction;

    
    balanceDisplay.textContent = balance;
}
