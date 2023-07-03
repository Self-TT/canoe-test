const {pool} = require("../services/database.js");

module.exports.APIGetInvestments = async () => {
    const conn = await pool.promise();
    const [rows] = await conn.query("SELECT investment.id, fund.name AS fund_name, company.name AS company_name FROM investment " +
        "                               JOIN fund ON investment.fund_id = fund.id" +
        "                               JOIN company ON investment.company_id = company.id");

    return rows;
}



module.exports.APICreateInvestment = async (fundId, companyId) => {
    const conn = await pool.promise();
    const [result] = await conn.query("INSERT into investment (fund_id, company_id) VALUES(?, ?)", [fundId, companyId]);
    return result.affectedRows > 0;
}

module.exports.APIDeleteInvestment = async (id) => {
    const conn = await pool.promise();
    const [result] = await conn.query("DELETE FROM investment WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}