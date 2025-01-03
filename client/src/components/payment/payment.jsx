import { useForm } from "react-hook-form";
import "./payment.css";
import api from "../../utils/api";

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
    const MUID = "MUID" + Date.now();
    const transactionId = "T" + Date.now();
    const newData = { ...data, MUID: MUID, transactionId: transactionId };
    console.log(newData);

    let res = await api
      .post("/payment/order", { ...newData })
      .then((res) => {
        console.log(res);
        if (res.data && res.data.data.instrumentResponse.redirectInfo.url) {
          window.location.href =
            res.data.data.instrumentResponse.redirectInfo.url;
        }
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(res);
  };

  return (
    <div className="payment-container">
      <form onSubmit={handleSubmit(handlePayment)}>
        <div className="pay-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder=" "
            required
            {...register("name", paymentOptions.name)}
          ></input>
        </div>
        <div className="pay-input">
          <label htmlFor="number">Number</label>
          <input
            type="text"
            name="number"
            id="number"
            placeholder=" "
            required
            {...register("number", paymentOptions.number)}
          ></input>
        </div>
        <div className="pay-input">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder=" "
            required
            {...register("amount", paymentOptions.amount)}
          ></input>
        </div>
        <div className="pay-btn">
          <button type="submit">Pay Now</button>
        </div>
      </form>
    </div>
  );
}

export default Payment;
