const axios = require('axios');
const shared = require('../shared/FSUtils')
const eventsPath = './client/events/clientEvents.jsonl';

async function getUser(userId) {
    try {
        const response = await axios.get(`http://localhost:8000/userEvents/${userId}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

async function postEvents() {
    const eventsFile = shared.readFile(eventsPath);
    const events = eventsFile.split("\r\n");
    try {
        for (const event of events) {
            const response = await axios.post('http://localhost:8000/liveEvent', JSON.parse(event));
            console.log(response.data);
        }
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    // await getUser('user1');
    await postEvents();
})();

