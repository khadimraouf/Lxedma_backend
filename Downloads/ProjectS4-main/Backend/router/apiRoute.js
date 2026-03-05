const express = require("express");
const { Register, Login } = require("../controller/userAuth");
const uploadPDP = require("../controller/uploadPdp");
const upload = require("../middleware/pdpMulter");
const authMiddleware = require("../middleware/authVerification");
const JobUpload = require("../controller/postJob") ;
const delJob = require("../controller/delJob");
const { changePassword } = require("../controller/changePassword"); 
const router = express.Router();


router.post("/register", upload.single('pdp') , Register);
router.post("/uploadPDP", upload.single('pdp'), uploadPDP);
router.post("/login", Login);
router.post("/postJob" , authMiddleware , JobUpload ) ;
router.delete("/delJob/:id" , authMiddleware , delJob);
router.put("/changePassword", authMiddleware, changePassword);

module.exports = router; 
