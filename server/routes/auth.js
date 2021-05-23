const express = require("express");
const router = express.Router();
const {signin, signout, signup, isSignedIn} = require("../controllers/auth")

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/signout", signout);

router.get("/test", isSignedIn, (req,res) => {
    res.json(req.auth)
});


module.exports = router;
