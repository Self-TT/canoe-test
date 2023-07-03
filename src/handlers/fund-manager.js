const {pool} = require("../services/database.js");

module.exports.APIGetFundManagers = async () => {
    const conn = await pool.promise();
    const [rows] = await conn.query("SELECT * FROM fund_manager");

    return rows;
}



module.exports.APICreateFundManager = async (name) => {
    const conn = await pool.promise();
    const [result] = await conn.query("INSERT into fund_manager (name) VALUES(?)", [name]);
    return result.affectedRows > 0;
}

module.exports.APIUpdateFundManager = async (name, id) => {
    const conn = await pool.promise();
    const [result] = await conn.query("UPDATE fund_manager SET name = ? WHERE id = ? ", [name, id]);
    return result.affectedRows > 0;
}
module.exports.APIDeleteFundManager = async (id) => {
    const conn = await pool.promise();
    const [result] = await conn.query("DELETE FROM fund_manager WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}