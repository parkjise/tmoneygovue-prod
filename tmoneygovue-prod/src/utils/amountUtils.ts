export function formatAmount(amt: string | number) {
  if (amt) {
    const number = typeof amt === 'number' ? amt.toString() : amt;
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '0';
}

export function truncateAmount(amt: string | number) {
  if (amt) {
    const number = typeof amt === 'number' ? amt : Number(amt);
    return Math.floor(number / 10) * 10;
  }
  return 0;
}
