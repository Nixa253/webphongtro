// src/PaymentStrategies.js
class PaymentStrategy {
    pay() {
      throw new Error('This method must be overridden');
    }
  }

  class MomoPayment extends PaymentStrategy {
    pay() {
      console.log("Đã chọn thanh toán qua Momo");
      // Thực hiện logic thanh toán qua Momo ở đây
    }
  }

  class BankPayment extends PaymentStrategy {
    pay() {
      console.log("Đã chọn thanh toán qua Momo");
      // Thực hiện logic thanh toán qua BankPayment ở đây
    }
  }

  class VNPayPayment extends PaymentStrategy {
    pay() {
      console.log("Đã chọn thanh toán qua Momo");
      // Thực hiện logic thanh toán qua VNPay ở đây
    }
  }