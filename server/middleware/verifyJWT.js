import jwt from "jsonwebtoken";

async function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Login Again!" });
  }

  try {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SEC_ACC, (err, user) => {
      if (err) {
        console.log("im in verifyJWT in jwt verifying going wrong");
        return res.status(403).json({ error: "Login Again!" });
      }
      req.users = user;
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Login Again!" });
  }
}

export default verifyJWT;
