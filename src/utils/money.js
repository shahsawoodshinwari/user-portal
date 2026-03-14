export function money(amount, currency = 'PKR', locale = 'en-PK') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount)
}
