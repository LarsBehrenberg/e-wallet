export const getCurrencySymbol = (currency) => {
  switch (currency) {
    case 'JPY':
      return '¥';
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    default:
      return currency;
  }
};
