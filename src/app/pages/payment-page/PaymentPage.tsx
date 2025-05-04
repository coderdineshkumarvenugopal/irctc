import { Ban as Bank, CreditCard, Smartphone, Wallet } from "lucide-react";
import React from "react";
import { PaymentMethod } from "../../types";
import { useBooking } from "../../../context/BookingContext";
import { Button } from "antd";

const PaymentPage = () => {
  const { bookingState, updateBooking, completeBooking } = useBooking();

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    updateBooking({ paymentMethod: method });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeBooking();
  };

  // Calculate a random fare between 500 and 2000 rupees based on class and distance
  const estimatedFare = (() => {
    const baseFare =
      {
        "1A": 1500,
        "2A": 1000,
        "3A": 800,
        SL: 500,
        CC: 700,
        "2S": 400,
      }[bookingState.class] || 800;

    // Add a slight random factor
    return Math.floor(baseFare + Math.random() * 300);
  })();

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 bg-blue-50 border-b">
        <h2 className="text-lg font-medium text-blue-800">Payment</h2>
      </div>

      <div className="p-6">
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Booking Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">From:</span>
              <span className="font-medium">{bookingState.fromStation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">To:</span>
              <span className="font-medium">{bookingState.toStation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date(bookingState.date).toDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Passengers:</span>
              <span className="font-medium">{bookingState.passengers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Class:</span>
              <span className="font-medium">{bookingState.class}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total Fare:</span>
                <span className="font-bold text-blue-700">
                  ₹{estimatedFare * bookingState.passengers}
                </span>
              </div>
              <div className="text-xs text-gray-500 text-right">
                Including all taxes and charges
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handlePaymentSubmit}>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Select Payment Method
          </h3>

          <div className="space-y-3">
            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                checked={bookingState.paymentMethod === "wallet"}
                onChange={() => handlePaymentMethodChange("wallet")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <Wallet className="ml-2 mr-3 h-5 w-5 text-blue-500" />
              <div>
                <div className="font-medium">IRCTC Wallet</div>
                <div className="text-xs text-gray-500">
                  Quick and secure payment
                </div>
              </div>
            </label>

            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                checked={bookingState.paymentMethod === "upi"}
                onChange={() => handlePaymentMethodChange("upi")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <Smartphone className="ml-2 mr-3 h-5 w-5 text-green-500" />
              <div>
                <div className="font-medium">UPI</div>
                <div className="text-xs text-gray-500">
                  Pay using any UPI app
                </div>
              </div>
            </label>

            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                checked={bookingState.paymentMethod === "card"}
                onChange={() => handlePaymentMethodChange("card")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <CreditCard className="ml-2 mr-3 h-5 w-5 text-purple-500" />
              <div>
                <div className="font-medium">Debit/Credit Card</div>
                <div className="text-xs text-gray-500">
                  All major cards accepted
                </div>
              </div>
            </label>

            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                checked={bookingState.paymentMethod === "netbanking"}
                onChange={() => handlePaymentMethodChange("netbanking")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <Bank className="ml-2 mr-3 h-5 w-5 text-blue-700" />
              <div>
                <div className="font-medium">Net Banking</div>
                <div className="text-xs text-gray-500">
                  All major banks supported
                </div>
              </div>
            </label>
          </div>

          <div className="mt-6">
            <Button
              type="primary"
              className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              
            >
              Pay ₹{estimatedFare * bookingState.passengers}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
