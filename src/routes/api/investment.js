var express = require('express');
const {handleResponse} = require("../../handlers/response");
const {APICreateInvestment, APIDeleteInvestment, APIGetInvestments} = require("../../handlers/investment");
var router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const rows = await APIGetInvestments();
        handleResponse(res, true, "Data Fetched", rows);
    } catch (e) {
        handleResponse(res, false, "There was an issue fetching investments");
    }
});


router.post('/', async function (req, res, next) {
    try {
        let fund_id = req.body.fund_id;
        let company_id = req.body.company_id;
        const result = await APICreateInvestment(fund_id, company_id);
        handleResponse(res, true, "Data Created", result);
    } catch (e) {
        handleResponse(res, false, "There was an issue creating investment");
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        const result = await APIDeleteInvestment(id);
        handleResponse(res, true, "Data Deleted", result);
    } catch (e) {
        handleResponse(res, false, "There was an issue deleting investment");
    }
});


module.exports = router;
