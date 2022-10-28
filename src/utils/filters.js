export default {
  currencyUSD(cents) {
    if (typeof cents !== 'number') {
      return cents;
    }
    const dollars = cents / 100;
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    return formatter.format(dollars);
  },
};
