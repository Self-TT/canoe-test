
module.exports.handleResponse = (res, isSuccessful, message, data,) => {
    res.json({
        status: isSuccessful ? 200 : -1,
        message: message || "Something went wrong...",
        data: data || null
    })
}