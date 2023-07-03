var express = require('express');
const {handleResponse} = require("../../handlers/response");
const {APICreateFund, APIDeleteAlias, APIUpdateAlias, APIUpdateFund, APIDeleteFund, APIGetFunds, APIGetFundsAliases,
    APIGetAllFundsAliases
} = require("../../handlers/fund");

var common = require('../../services/events');
const {EVENTS} = require("../../services/events");
var commonEmitter = common.commonEmitter;
var router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const rows = await APIGetFunds();
        handleResponse(res, true, "Data Fetched", rows);
    } catch (e) {
        handleResponse(res, false, "There was an issue fetching fund");
    }
});


router.post('/', async function (req, res, next) {
    try {

        let manager_id = req.body.fund_manager_id;
        let startYear = req.body.start;
        let name = req.body.name;

        if(name.trim().length === 0)
            throw new Error('Name cannot be blank');

        if(startYear.trim().length === 0)
            throw new Error('Year cannot be blank');

        if(isNaN(parseInt(manager_id)))
            throw new Error('Not a valid Manager');

        const result = await APICreateFund(manager_id, name, startYear);
        if(!result)
            throw new Error("There was an error creating the fund.")

        handleResponse(res, true, "Data Created", null);
    } catch (e) {

        handleResponse(res, false, e.message);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;

        let name = req.body.name;
        let startYear = req.body.start;

        if(name.trim().length === 0)
            throw new Error('Name cannot be blank');

        if(startYear.trim().length === 0)
            throw new Error('Year cannot be blank');

        if(isNaN(parseInt(id)))
            throw new Error('Not a valid resource');

        const result = await APIUpdateFund(name, startYear, id);
        handleResponse(res, true, "Data Updated", result);
    } catch (e) {
        handleResponse(res, false, e.message);
    }
});


router.get('/:fundId/alias', async function (req, res, next) {
    try {
        let id = req.params.fundId;
        const rows = await APIGetFundsAliases(id);
        handleResponse(res, true, "Data Fetched", rows);
    } catch (e) {
        handleResponse(res, false, "There was an issue fetching fund");
    }
});

router.post('/alias/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let name = req.body.name;

        let rows = await APIGetAllFundsAliases();
        if(rows.find(x => x.name === name)){
            commonEmitter.emit(EVENTS.DUPLICATE_FUND_WARNING);
        }

        if(name.trim().length === 0)
            throw new Error('Name cannot be blank');

        const result = await APIUpdateAlias(name, id);
        handleResponse(res, true, "Data Updated", result);
    } catch (e) {
        handleResponse(res, false, "There was an issue updating fund");
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        const result = await APIDeleteFund(id);
        handleResponse(res, true, "Data Deleted", result);
    } catch (e) {
        handleResponse(res, false, e.message);
    }
});

router.delete('/alias/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        const result = await APIDeleteAlias(id);
        handleResponse(res, true, "Data Deleted", result);
    } catch (e) {
        handleResponse(res, false, "There was an issue deleting fund");
    }
});


module.exports = router;
