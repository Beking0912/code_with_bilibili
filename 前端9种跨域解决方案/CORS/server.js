let express = require("express"),
  app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length,Authorization,Accept,X-Requested-WITH"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT,POST,GET,DELETE,HEAD,OPTIONS"
  );
  if (req.method === "OPTIONS") {
    res.send("okk");
    return;
  }
  next();
});
