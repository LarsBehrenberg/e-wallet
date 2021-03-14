// Filters all transactions and returns only all income or expense transactions
export const income = (arr) => arr.filter((item) => item.type === 'Income');
export const expense = (arr) => arr.filter((item) => item.type === 'Expense');

const currentDate = new Date();

// Reduce array of transactions to a total amount of JPY
const calculateTotal = (arr) =>
  arr.length > 0
    ? arr.reduce((a, b) => {
        if (typeof a != 'number') {
          return 0;
        }

        return a + b.amount['JPY'];
      })
    : 0;

// Filter functions to get transaction from this and last month
const getCurrentMonthTransactions = (arr) =>
  arr.filter((item) => {
    var t = new Date(1970, 0, 1).setSeconds(item.date.seconds);

    return (
      t > new Date(currentDate.getFullYear(), currentDate.getMonth(), -1, 0, 0)
    );
  });

const getLastMonthTransactions = (arr) =>
  arr.filter((item) => {
    var t = new Date(1970, 0, 1).setSeconds(item.date.seconds);

    return (
      t >
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, -1, 0, 0)
    );
  });

// Get transactions of this and last months income and expenses
export const incomeLastMonth = (arr) => getLastMonthTransactions(income(arr));
export const incomeCurrentMonth = (arr) =>
  getCurrentMonthTransactions(income(arr));

export const expenseLastMonth = (arr) => getLastMonthTransactions(expense(arr));
export const expenseCurrentMonth = (arr) =>
  getCurrentMonthTransactions(expense(arr));

// Get Totals of this and last months income and expenses
export const totalIncomeCurrentMonth = (arr) =>
  calculateTotal(incomeCurrentMonth(arr));
export const totalIncomeLastMonth = (arr) =>
  calculateTotal(incomeLastMonth(arr));

export const totalExpenseLastMonth = (arr) =>
  calculateTotal(expenseLastMonth(arr));
export const totalExpenseCurrentMonth = (arr) =>
  calculateTotal(expenseCurrentMonth(arr));

// Shows increase/decrease between income this month and last month
export const relationIncomeLastCurrentMonth = (arr) => {
  const currentMonthTotal = totalIncomeCurrentMonth(arr);
  const lastMonthTotal = totalIncomeLastMonth(arr);

  return currentMonthTotal !== 0 && lastMonthTotal !== 0
    ? (
        ((currentMonthTotal - lastMonthTotal) / currentMonthTotal) *
        100
      ).toLocaleString()
    : null;
};
