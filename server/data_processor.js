const FSUtils = require('../shared/FSUtils')
const {queryByUserId, upsertUser} = require("./database/database");
const eventsPath = './server/events/serverEvents.jsonl';

async function calculateUserRevenue() {
    const eventsData = FSUtils.readFile(eventsPath).trim().split("\r\n");
    for (const eventData of eventsData) {
        const parsedData = JSON.parse(eventData);
        const {userId, name, value} = parsedData;
        if (!userId && !name && !value) continue;
        let user = await queryByUserId(userId);
        if (!user) {
            user = {user_id: userId, revenue: 0};
        }
        console.log("user before modify", user);
        modifyUserRevenue(user, name, value);
        console.log("user after modify", user);
        await upsertUser(user);
    }
}

function modifyUserRevenue(user, name, value) {
    switch (name) {
        case "add_revenue": {
            user.revenue += parseInt(value);
            break;
        }
        case "subtract_revenue": {
            user.revenue -= parseInt(value);
            break;
        }
    }
}

module.exports = {
    calculateUserRevenue
}