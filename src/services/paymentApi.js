import { apiRequest } from './Api'

export async function initiateMpesaPayment(payload) {
  const data = await apiRequest('/api/payments/mpesa/stk-push', {
    method: 'POST',
    body: payload,
  })
  return data
}

export async function queryMpesaPayment(checkoutRequestId) {
  return apiRequest(`/api/payments/mpesa/query/${encodeURIComponent(checkoutRequestId)}`)
}

export async function getPaymentByDonation(donationId) {
  return apiRequest(`/api/payments/donation/${donationId}`)
}
