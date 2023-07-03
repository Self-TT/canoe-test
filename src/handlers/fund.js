const {pool} = require("../services/database.js");

module.exports.APIGetFunds = async () => {
    const conn = await pool.promise();
    const [rows] = await conn.query("SELECT fund.*, " +
        "                               fund_manager.id AS fund_manager_id," +
        "                               fund_manager.name AS fund_manager_name " +
        "                           FROM fund " +
        "                               JOIN fund_manager ON fund.fund_manager_id = fund_manager.id");
    return rows;
}


module.exports.APIGetFundsAliases = async (id) => {
    const conn = await pool.promise();
    const [rows] = await conn.query("SELECT * FROM alias WHERE fund_id = ?", [id]);
    return rows;
}

module.exports.APIGetAllFundsAliases = async (id) => {
    const conn = await pool.promise();
    const [rows] = await conn.query("SELECT * FROM alias");
    return rows;
}



module.exports.APICreateFund = async (managerId, name, startYear) => {
    const conn = await pool.promise();
    let [result] = await conn.query("INSERT INTO fund (fund_manager_id, name, start_year) VALUES(?, ? ,?)", [managerId, name, startYear]);
    let alResult

    return result.affectedRows > 0;
}

module.exports.APIUpdateFund = async (name, start, id) => {
    const conn = await pool.promise();
    const [result] = await conn.query("UPDATE fund SET name = ?, start_year = ? WHERE id = ? ", [name, start, id]);
    return result.affectedRows > 0;
}

module.exports.APIUpdateAlias = async (name, id) => {
    const conn = await pool.promise();
    const [result] = await conn.query("INSERT INTO alias (fund_id, name) VALUES(? , ?) ", [id, name]);
    return result.affectedRows > 0;
}


module.exports.APIDeleteFund = async (id) => {
    const conn = await pool.promise();
    const [result] = await conn.query("DELETE FROM fund WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}

module.exports.APIDeleteAlias = async (id) => {
    const conn = await pool.promise();
    const [result] = await conn.query("DELETE FROM alias WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}