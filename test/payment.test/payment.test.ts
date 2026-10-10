import { PaymentService } from '../../src/payment/payment'

describe('PaymentService', () => {
  let payment: PaymentService

  beforeEach(() => {
    payment = new PaymentService(100)
  })

  describe('applyDiscount', () => {
    test('reduces amount by the specified discount', () => {
      payment.applyDiscount(20)
      expect(payment.getAmount()).toBe(80)
    })

    test('applies each discount to the current amount', () => {
      payment.applyDiscount(20)
      payment.applyDiscount(20)

      expect(payment.getAmount()).toBe(64)
    })

    test('accepts a discount of zero', () => {
      payment.applyDiscount(0)
      expect(payment.getAmount()).toBe(100)
    })

    test('accepts a discount of 100 percent', () => {
      payment.applyDiscount(100)
      expect(payment.getAmount()).toBe(0)
    })

    test('does nothing for a negative discount', () => {
      payment.applyDiscount(-10)
      expect(payment.getAmount()).toBe(100)
    })

    test('does nothing for a discount above 100', () => {
      payment.applyDiscount(101)
      expect(payment.getAmount()).toBe(100)
    })

    test('does nothing after payment is completed', () => {
      payment.pay()
      payment.applyDiscount(20)

      expect(payment.getAmount()).toBe(100)
    })
  })

  describe('pay', () => {
    test('returns true when payment is completed', () => {
      expect(payment.pay()).toBe(true)
    })

    test('returns false when payment is already completed', () => {
      payment.pay()

      expect(payment.pay()).toBe(false)
    })
  })
})
