    const fs = require('fs');
    const readline = require('readline');

    const USERS_FILE = 'users.json';
    const TRANSACTIONS_FILE = 'transactions.json';
    const CATEGORIES_FILE = 'categories.json';

    let users = [];
    let transactions = [];
    let categories = ["Food", "Transportation", "Bills", "Shopping", "Entertainment"];

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function loadData() {
        try {
            // Load users
            const usersData = fs.readFileSync(USERS_FILE, 'utf8');
            users = usersData ? JSON.parse(usersData) : [];
            if (!Array.isArray(users)) {
                users = [];
            }
        } catch (err) {
            users = [];
        }

        try {
            // Load transactions
            const transactionsData = fs.readFileSync(TRANSACTIONS_FILE, 'utf8');
            transactions = transactionsData ? JSON.parse(transactionsData) : [];
            if (!Array.isArray(transactions)) {
                transactions = [];
            }
        } catch (err) {
            transactions = [];
        }

        try {
            // Load custom categories
            const categoriesData = fs.readFileSync(CATEGORIES_FILE, 'utf8');
            const customCategories = categoriesData ? JSON.parse(categoriesData) : [];

            // Combine default categories with custom ones
            const defaultCategories = ["Food", "Transportation", "Bills", "Shopping", "Entertainment"];
            categories = [...defaultCategories, ...customCategories.filter(c => !defaultCategories.includes(c))];

            if (!Array.isArray(categories)) {
                categories = defaultCategories;
            }
        } catch (err) {
            // If error, just use default categories
            categories = ["Food", "Transportation", "Bills", "Shopping", "Entertainment"];
        }
    }

    function saveData() {
        // Save users directly (not users.users)
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify(transactions, null, 2));

        const defaultCategories = new Set(['Food', 'Transportation', 'Bills', 'Shopping', 'Entertainment', 'Other']);
        const customCategories = categories.filter(c => !defaultCategories.has(c));
        fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(customCategories, null, 2));
    }

    function getCurrentDateTime() {
        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = days[now.getDay()];

        const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        return `${dayOfWeek}, ${date} ${time}`;
    }

    function showMainMenu() {
        console.log('\n--- Personal Finance Management System ---');
        console.log('1. User Management');
        console.log('2. Transaction Management');
        console.log('3. Category Management');
        console.log('4. Exit');

        rl.question('Please select an option: ', (answer) => {
            switch (answer) {
                case '1':
                    showUserManagementMenu();
                    break;
                case '2':
                    showTransactionManagementMenu();
                    break;
                case '3':
                    showCategoryManagementMenu();
                    break;
                case '4':
                    rl.close();
                    break;
                default:
                    console.log('Invalid option! Please enter a number between 1 and 4.');
                    showMainMenu();
            }
        });
    }

    // User Management 
    function showUserManagementMenu() {
        console.log('\n--- User Management ---');
        console.log('1. Add new user');
        console.log('2. View users');
        console.log('3. Return to main menu');

        rl.question('Please select an option: ', (answer) => {
            switch (answer) {
                case '1':
                    addNewUser();
                    break;
                case '2':
                    listOfUsers();
                    break;
                case '3':
                    showMainMenu();
                    break;
                default:
                    console.log('\n\nInvalid option!');
                    showUserManagementMenu();
            }
        });
    }

    function addNewUser() {
        rl.question('Username: ', (username) => {
            rl.question('Email: ', (email) => {
                const newUser = {
                    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                    username,
                    email,
                    createdAt: getCurrentDateTime()
                };

                users.push(newUser); // Push directly to users array
                saveData();
                console.log('User Added Successfully.');
                showUserManagementMenu();
            });
        });
    }

    function listOfUsers() {
        if (users.length === 0) {
            console.log('No users!');
        } else {
            console.log('\nUser List');
            users.forEach(user => {
                console.log(`ID: ${user.id} | Username: ${user.username} | Email: ${user.email} | Created: ${user.createdAt}`);
            });
        }
        showUserManagementMenu();
    }

    function listOfUsers() {
        if (users.length === 0) {
            console.log('No users!');
        } else {
            console.log('\nUser List');
            users.forEach(user => {
                console.log(`ID: ${user.id} | Username: ${user.username} | Email: ${user.email} | Created: ${user.createdAt}`);
            });
        }
        showUserManagementMenu();
    }

    // Transaction Management
    function showTransactionManagementMenu() {
        console.log('\n--- Transaction Management ---');
        console.log('1. Add income');
        console.log('2. Add expense');
        console.log('3. Edit/Delete transaction');
        console.log('4. View transaction list');
        console.log('5. Return to main menu');

        rl.question('Please select an option: ', (answer) => {
            switch (answer) {
                case '1':
                    addIncome();
                    break;
                case '2':
                    addExpense();
                    break;
                case '3':
                    editOrDeleteTransaction();
                    break;
                case '4':
                    listTransactions();
                    break;
                case '5':
                    showMainMenu();
                    break;
                default:
                    console.log('Invalid option!');
                    showTransactionManagementMenu();
            }
        });
    }

    function addIncome() {
        rl.question('Income amount: ', (amount) => {
            rl.question('Income source: ', (source) => {
                rl.question('Description (optional): ', (description) => {
                    const newTransaction = {
                        id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1,
                        type: 'income',
                        amount: parseFloat(amount),
                        source,
                        description: description || '',
                        date: getCurrentDateTime()
                    };

                    transactions.push(newTransaction);
                    saveData();
                    console.log('Income recorded successfully.');
                    showTransactionManagementMenu();
                });
            });
        });
    }

    function addExpense() {
        console.log('\nAvailable categories:');
        categories.forEach((cat, index) => console.log(`${index + 1}. ${cat}`));

        rl.question('Category number: ', (categoryIndex) => {
            const selectedCategory = categories[+(categoryIndex) - 1];

            if (!selectedCategory) {
                console.log('Invalid category!');
                showTransactionManagementMenu();
                return;
            }

            rl.question('Expense amount: ', (amount) => {
                rl.question('Description (optional): ', (description) => {
                    const newTransaction = {
                        id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1,
                        type: 'expense',
                        amount: parseFloat(amount),
                        category: selectedCategory,
                        description: description || '',
                        date: getCurrentDateTime()
                    };

                    transactions.push(newTransaction);
                    saveData();
                    console.log('Expense recorded successfully.');
                    showTransactionManagementMenu();
                });
            });
        });
    }

    function listTransactions() {
        if (transactions.length === 0) {
            console.log('No transactions recorded.');
        } else {
            console.log('\n--- Transaction List ---');
            transactions.forEach(trans => {
                if (trans.type === 'income') {
                    console.log(`[Income] ID: ${trans.id} | Amount: ${trans.amount} | Source: ${trans.source} | Date: ${trans.date} | Desc: ${trans.description}`);
                } else {
                    console.log(`[Expense] ID: ${trans.id} | Amount: ${trans.amount} | Category: ${trans.category} | Date: ${trans.date} | Desc: ${trans.description}`);
                }
            });
        }
        showTransactionManagementMenu();
    }

    function editOrDeleteTransaction() {
        // First show transactions
        if (transactions.length === 0) {
            console.log('No transactions to edit or delete.');
            showTransactionManagementMenu();
            return;
        }

        // Display transactions
        console.log('\n--- Transaction List ---');
        transactions.forEach(trans => {
            if (trans.type === 'income') {
                console.log(`[Income] ID: ${trans.id} | Amount: ${trans.amount} | Source: ${trans.source} | Date: ${trans.date} | Desc: ${trans.description}`);
            } else {
                console.log(`[Expense] ID: ${trans.id} | Amount: ${trans.amount} | Category: ${trans.category} | Date: ${trans.date} | Desc: ${trans.description}`);
            }
        });

        // Then ask for input
        rl.question('\nTransaction ID to edit/delete (or 0 to cancel): ', (id) => {
            if (id === '0') {
                showTransactionManagementMenu();
                return;
            }

            const transaction = transactions.find(t => t.id === parseInt(id));
            if (!transaction) {
                console.log('Transaction not found!');
                editOrDeleteTransaction(); // Show list again
                return;
            }

            console.log('\n1. Edit transaction');
            console.log('2. Delete transaction');
            console.log('3. Cancel');

            rl.question('Please select an option: ', (choice) => {
                switch (choice) {
                    case '1':
                        editTransaction(transaction);
                        break;
                    case '2':
                        deleteTransaction(parseInt(id));
                        break;
                    case '3':
                        showTransactionManagementMenu();
                        break;
                    default:
                        console.log('Invalid option!');
                        editOrDeleteTransaction();
                }
            });
        });
    }

    // Move these functions outside of editOrDeleteTransaction
    function editTransaction(transaction) {
        if (transaction.type === 'income') {
            rl.question(`Income amount (current: ${transaction.amount}): `, (amount) => {
                rl.question(`Income source (current: ${transaction.source}): `, (source) => {
                    rl.question(`Description (current: ${transaction.description}): `, (description) => {
                        if (amount && !isNaN(amount)) transaction.amount = parseFloat(amount);
                        if (source) transaction.source = source;
                        if (description) transaction.description = description;
                        transaction.date = getCurrentDateTime(); // Update modification time
                        saveData();
                        console.log('Income transaction updated successfully.');
                        showTransactionManagementMenu();
                    });
                });
            });
        } else {
            console.log('\nAvailable categories:');
            categories.forEach((cat, index) => console.log(`${index + 1}. ${cat}`));

            rl.question(`Category (current: ${transaction.category} - enter number to change or press Enter): `, (categoryIndex) => {
                if (categoryIndex) {
                    const index = parseInt(categoryIndex) - 1;
                    if (index >= 0 && index < categories.length) {
                        transaction.category = categories[index];
                    } else {
                        console.log('Invalid category number! Keeping current category.');
                    }
                }

                rl.question(`Expense amount (current: ${transaction.amount}): `, (amount) => {
                    rl.question(`Description (current: ${transaction.description}): `, (description) => {
                        if (amount && !isNaN(amount)) transaction.amount = parseFloat(amount);
                        if (description) transaction.description = description;
                        transaction.date = getCurrentDateTime(); // Update modification time
                        saveData();
                        console.log('Expense transaction updated successfully.');
                        showTransactionManagementMenu();
                    });
                });
            });
        }
    }

    function deleteTransaction(id) {
        transactions = transactions.filter(t => t.id !== id);
        saveData();
        console.log('Transaction deleted successfully.');
        showTransactionManagementMenu();
    }


    // --- Category Management ---
    function showCategoryManagementMenu() {
        console.log('\n--- Category Management ---');
        console.log('1. View categories');
        console.log('2. Add custom category');
        console.log('3. Return to main menu');

        rl.question('Please select an option: ', (answer) => {
            switch (answer) {
                case '1':
                    listCategories();
                    break;
                case '2':
                    addCustomCategory();
                    break;
                case '3':
                    showMainMenu();
                    break;
                default:
                    console.log('Invalid option!');
                    showCategoryManagementMenu();
            }
        });
    }

    function listCategories() {
        console.log('\n--- Category List ---');
        categories.forEach((cat, index) => console.log(`${index + 1}. ${cat}`));
        showCategoryManagementMenu();
    }

    function addCustomCategory() {
        rl.question('New category name: ', (categoryName) => {
            if (!categoryName.trim()) {
                console.log('Category name cannot be empty!');
                addCustomCategory();
                return;
            }

            if (categories.includes(categoryName)) {
                console.log('This category already exists!');
                showCategoryManagementMenu();
                return;
            }

            categories.push(categoryName);
            saveData();
            console.log('Category added successfully.');
            showCategoryManagementMenu();
        });
    }

    // --- Start Program ---
    function init() {
        loadData();
        console.log('=== Personal Finance Management System ===');
        showMainMenu();
    }

    init();


    // Program close event
    rl.on('close', () => {
        console.log('\nProgram closed successfully. Goodbye!');
        process.exit(0);
    });