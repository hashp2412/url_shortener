const URL = require("../models/urls")
const shortid = require("shortid")
async function handleGenerateNewShortUrl(req, res) {
    const shortId = shortid()
    const body = req.body
    if (!body.url) {
        return res.status(400).json({ error: "url is required" })
    }
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistiory: []
    })
    return res.json({ id: shortId })
}

const handleAnalytics = async(req,res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({totalClicks:result.visitHistiory.length,analytics:result.visitHistiory})
}
module.exports = {
    handleGenerateNewShortUrl,
    handleAnalytics
}