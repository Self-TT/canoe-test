const {pool} = require("../services/database.js");

module.exports.APIGetCompanies = async () => {
    const conn = await pool.promise();
    const [rows] = await conn.query("SELECT * FROM company");

    return rows;
}



module.exports.APICreateCompany = async (name) => {
    const conn = await pool.promise();
    const [result] = await conn.query("INSERT into company (name) VALUES(?)", [name]);
    return result.affectedRows > 0;
}
module.exports.APIUpdateCompany = async (name, id) => {
    const conn = await pool.promise();
    const [result] = await conn.query("UPDATE company SET name = ? WHERE id = ? ", [name, id]);
    return result.affectedRows > 0;
}
module.exports.APIDeleteCompany = async (id) => {
    const conn = await pool.promise();
    const [result] = await conn.query("DELETE FROM company WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}