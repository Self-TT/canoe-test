var express = require('express');
const {handleResponse} = require("../../handlers/response");
const {APIGetFundManagers, APICreateFundManager, APIUpdateFundManager, APIDeleteFundManager} = require("../../handlers/fund-manager");
var router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const rows = await APIGetFundManagers();
        handleResponse(res, true, "Data Fetched", rows);
    } catch (e) {
        handleResponse(res, false, "There was an issue fetching fund managers");
    }
});


router.post('/', async function (req, res, next) {
    try {
        let name = req.body.name;
        if(name.trim().length === 0)
            throw new Error('Name cannot be blank');
        const result = await APICreateFundManager(name);
        handleResponse(res, true, "Data Created", result);
    } catch (e) {
        console.log(e);

        handleResponse(res, false, "There was an issue creating fund manager");
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let name = req.body.name;
        if(name.trim().length === 0)
            throw new Error('Name cannot be blank');

        if(isNaN(parseInt(id)))
            throw new Error('Not a valid resource');

        const result = await APIUpdateFundManager(name, id);
        handleResponse(res, true, "Data Updated", result);
    } catch (e) {
        handleResponse(res, false, "There was an issue updating fund manager");
    }
});
router.delete('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        const result = await APIDeleteFundManager(id);
        handleResponse(res, true, "Data Deleted", result);
    } catch (e) {
        const message = e.code === "ER_ROW_IS_REFERENCED_2" ? "Unable to delete a company with active funds" : e.message;
        handleResponse(res, false, message);
    }
});


module.exports = router;
