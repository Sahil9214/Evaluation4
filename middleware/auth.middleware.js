var jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      let decoded = jwt.verify(token, "eval");
  
      if (decoded) {
        (req.body.authorId = decoded.authorID),
          (req.body.authorName = decoded.authorName);
        next();
      } 
      else{
res.status(200).send("something is wrong")
      }
    } 
    
  
  catch (err) {
    res.status(400).send("You are not an authorized person");
  }
};
}

module.exports = { auth };
