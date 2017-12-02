/**
 * Created by daniel on 02/12/2017.
 */

let express = require('express');
let router = express.Router();
let db = require('../DButils');




/* GET users listing. */
router.get('/', function (req, res) {
    res.send('the first page of users');
});

module.exports = router;