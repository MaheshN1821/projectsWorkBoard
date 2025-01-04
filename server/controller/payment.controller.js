import crypto from "crypto";
import axios from "axios";

const salt_key = "96434309-7796-489d-8924-ab56988a6076";
const merchant_id = "PGTESTPAYUAT86";

const handleStudentPayment = async (req, res) => {
  try {
    console.log(req.body);

    const merchantTransactionId = req.body.transactionId;
    const data = {
      merchantId: merchant_id,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: req.body.MUID,
      name: req.body.name,
      amount: req.body.amount * 100,
      redirectUrl: `https://projects-work-board.vercel.app/payment/status/?id=${merchantTransactionId}`,
      redirectMode: "POST",
      mobileNumber: req.body.number,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    // const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
    const prod_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    const options = {
      method: "POST",
      url: prod_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);

        return res.json(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

const handleStatus = async (req, res) => {
  const merchantTransactionId = req.query.id;
  const merchantId = merchant_id;

  const keyIndex = 1;
  const string =
    `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;

  const options = {
    method: "GET",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };

  // CHECK PAYMENT TATUS
  axios
    .request(options)
    .then(async (response) => {
      if (response.data.success === true) {
        const url = `https://projectsworkboard.vercel.app/student`;
        return res.redirect(url);
      } else {
        const url = `https://projectsworkboard.vercel.app/`;
        return res.redirect(url);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export { handleStudentPayment, handleStatus };
