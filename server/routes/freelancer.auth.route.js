import express from "express";
import {
  handleFreelancerLogin,
  handleFreelancerLogout,
  handleFreelancerRegister,
  handleFreelancerEmail,
  handleFreelancerPassswordReset,
} from "../controller/freelancer.auth.controller.js";
// import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/register", handleFreelancerRegister);

router.post("/email-verification", handleFreelancerEmail);

router.post("/password-reset", handleFreelancerPassswordReset);

router.post("/login", handleFreelancerLogin);

router.get("/logout", handleFreelancerLogout);

export default router;
