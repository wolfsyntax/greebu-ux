const state = {
  amount: 0,
  plan: 'monthly',
  card_number: '',
  exp_month: '',
  exp_year: '',
  cvc: '',
  name: '',
  email: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: 'PH',
  payment_type: '',
  payment_intent: null,
  payment_method: null,
  tax: 0.12, // 12%,
  is_recurring: false,
  remember_billing: false
}

export default state
