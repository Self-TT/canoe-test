var express = require('express');
const {APIGetCompanies, APICreateCompany, APIUpdateCompany, APIDeleteCompany} = require("../../handlers/company");
const {handleResponse} = require("../../handlers/response");
var router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const rows = await APIGetCompanies();
        handleResponse(res, true, "Data Fetched", rows);
    } catch (e) {
        handleResponse(res, false, "There was an issue fetching companies");
    }
});


router.post('/', async function (req, res, next) {
    try {
        let companyName = req.body.name;
        if(companyName.trim().length === 0)
            throw new Error('Company Name cannot be blank');

        const result = await APICreateCompany(companyName);
        handleResponse(res, true, "Data Created", result);
    } catch (e) {
        handleResponse(res, false, e.message);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let companyName = req.body.name;
        if(companyName.trim().length === 0)
            throw new Error('Company Name cannot be blank');

        if(isNaN(parseInt(id)))
            throw new Error('Not a valid resource');

        const result = await APIUpdateCompany(companyName, id);
        handleResponse(res, true, "Data Updated", result);
    } catch (e) {
        handleResponse(res, false, e.message);
    }
});
router.delete('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        const result = await APIDeleteCompany(id);
        handleResponse(res, true, "Data Deleted", result);
    } catch (e) {
        const message = e.code === "ER_ROW_IS_REFERENCED_2" ? "Unable to delete a company with active investment" : e.message;
        handleResponse(res, false, message);
    }
});


module.exports = router;
