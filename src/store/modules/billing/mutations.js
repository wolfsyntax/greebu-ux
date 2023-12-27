export const setPaymentIntent = (state, payload) => {
  console.log('Setting up payment intent: ', payload)
  state.payment_intent = payload
}

export const setPaymentMethod = (state, payload) => {
  console.log('Setting up payment method: ', payload)
  state.payment_method = payload
}

export const setPaymentType = (state, payload = 'card') => {
  console.log('Setting up payment type (card,e-wallet): ', payload)
  state.payment_type = payload
}

export const setBillingInfo = (state, payload) => {
  console.log('Setting up billing details: ', payload)

  state.name = payload?.name
  state.email = payload?.email
  state.phone = payload?.phone
}

export const setBillingAddress = (state, payload) => {
  console.log('Setting up billing address: ', payload)

  state.line1 = payload?.line1
  state.line2 = payload?.line2
  state.city = payload?.city
  state.state = payload?.state
  state.postal_code = payload?.postal_code
  state.country = payload?.country || 'PH'
}

export const setCardDetail = (state, payload) => {
  console.log('Setting up card details: ', payload)
  state.card_number = payload?.card_number
  state.exp_month = payload?.exp_month
  state.exp_year = payload?.exp_year
  state.cvc = payload?.cvc
}

export const setSubscription = (state, payload) => {
  state.amount = payload?.amount
  state.plan = payload?.plan
}
