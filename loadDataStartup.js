const alertsDb = require("./models/alerts");

loadData = async (req, res) => {
    await alertsDb.find({}, null, {sort: {timestamp: -1}}, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!data.length) {
            return { success: false, error: `Alerts not found` };
        }
        arrayOfData = data.map(function(item) {
            return item;
        });
        return res.status(200).json({ success: true, data: arrayOfData })
    }).catch(err => console.log(err))
}

module.exports = {loadData};