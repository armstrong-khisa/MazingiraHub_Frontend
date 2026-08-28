import { apiRequest } from './Api'

export async function initiateMpesaPayment(payload) {
  const data = await apiRequest('/api/payments/mpesa/stk-push', {
    method: 'POST',
    body: payload,
  })
  return data
}

export async function createPaypalCheckout(payload) {
  return apiRequest('/api/payments/paypal/create-order', {
    method: 'POST',
    body: payload,
  })
}

export async function createStripeCheckout(payload) {
  return apiRequest('/api/payments/stripe/create-checkout-session', {
    method: 'POST',
    body: payload,
  })
}

export async function queryMpesaPayment(checkoutRequestId) {
  return apiRequest(`/api/payments/mpesa/query/${encodeURIComponent(checkoutRequestId)}`)
}

export async function getPaymentByDonation(donationId) {
  return apiRequest(`/api/payments/donation/${donationId}`)
}
