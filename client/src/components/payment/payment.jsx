import { useForm } from "react-hook-form";
import "./payment.css";
import axios from "axios";
import { CreditCard, DollarSign, Phone, User } from "lucide-react";

function Payment() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const paymentOptions = {
    name: {
      required: "Name is required",
    },
    number: {
      required: "Number is required",
    },
    amount: {
      required: "Amount is required",
    },
  };

  const handlePayment = async (data) => {
    try {
      const response = await axios.post(
        "https://projects-work-board.vercel.app/api/stripe/create-checkout-session",
        data
      );
      if (response.data.url) {
        window.location.href = response.data.url; // Stripe hosted checkout
      }
    } catch (error) {
      console.error("Stripe checkout initiation failed", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-800 via-blue-600 to-blue-900 relative overflow-hidden w-120 rounded-2xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>
      <div className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-100 to-blue-200 bg-clip-text text-transparent">
            Payment
          </h1>
          <p className="text-white -mb-4 text-end">
            Note: Once the Project is Complete, do the payment!
          </p>
        </div>

        {/* Payment Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl">
            <form onSubmit={handleSubmit(handlePayment)}>
              <div className="space-y-4">
                {/* Name Input */}
                <div className="space-y-3">
                  <label
                    htmlFor="name"
                    className="flex items-center text-white font-semibold text-lg"
                  >
                    <User className="w-5 h-5 mr-2 text-white-400" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder=" "
                    required
                    {...register("name", paymentOptions.name)}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-2 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Number Input */}
                <div className="space-y-3">
                  <label
                    htmlFor="number"
                    className="flex items-center text-white font-semibold text-lg"
                  >
                    <Phone className="w-5 h-5 mr-2 text-white-400" />
                    Number
                  </label>
                  <input
                    type="text"
                    name="number"
                    id="number"
                    placeholder=" "
                    required
                    {...register("number", paymentOptions.number)}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-2 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Amount Input */}
                <div className="space-y-3">
                  <label
                    htmlFor="amount"
                    className="flex items-center text-white font-semibold text-lg"
                  >
                    <DollarSign className="w-5 h-5 mr-2 text-white-400" />
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder=" "
                    required
                    {...register("amount", paymentOptions.amount)}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-2 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg py-4 px-8 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

// <div className="payment-container">
//   <form onSubmit={handleSubmit(handlePayment)}>
//     <div className="pay-input">
//       <label htmlFor="name">Name</label>
//       <input
//         type="text"
//         name="name"
//         id="name"
//         placeholder=" "
//         required
//         {...register("name", paymentOptions.name)}
//       ></input>
//     </div>
//     <div className="pay-input">
//       <label htmlFor="number">Number</label>
//       <input
//         type="text"
//         name="number"
//         id="number"
//         placeholder=" "
//         required
//         {...register("number", paymentOptions.number)}
//       ></input>
//     </div>
//     <div className="pay-input">
//       <label htmlFor="amount">Amount</label>
//       <input
//         type="number"
//         name="amount"
//         id="amount"
//         placeholder=" "
//         required
//         {...register("amount", paymentOptions.amount)}
//       ></input>
//     </div>
//     <div className="pay-btn">
//       <button type="submit">Pay Now</button>
//     </div>
//   </form>
// </div>
