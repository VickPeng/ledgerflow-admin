export const formatCurrency = (value, currency = '$') => {
  if (value === null || value === undefined || isNaN(value)) return '-'
  const num = Number(value)
  return `${currency}${num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
}

export const formatDate = (value) => {
  if (!value) return '-'
  const date = new Date(value)
  if (isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })
}

export const statusLabel = (status) => {
  const map = {
    pending: 'Pending',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  }
  return map[status] || status
}

export const statusType = (status) => {
  const map = {
    pending: 'warning',
    shipped: 'primary',
    delivered: 'success',
    cancelled: 'danger'
  }
  return map[status] || 'info'
}
