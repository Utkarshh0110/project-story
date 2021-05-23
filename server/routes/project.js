const express = require("express");
const router = express.Router();
const { uploadProject, getProjectCount, getProjectDetails, getAllProject } = require("../controllers/project");
const { isSignedIn } = require("../controllers/auth");
//Send token and check for is signed as well.

router.param("id", (req, res, next, id) => {
  req.id_user = id;
  next();
});

router.param("pid", (req, res, next, pid) => {
    req.pid = pid;
    next();
  });

 
router.param("userid", (req, res, next, userid) => {
    req.userid = userid;
    next();
  });


router.post("/project/add", isSignedIn, uploadProject);
router.get("/project/getcount/:id", getProjectCount);
router.get("/project/:pid", getProjectDetails);
router.get("/getallproject/:userid", getAllProject);

module.exports = router;
