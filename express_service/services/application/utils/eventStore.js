const client = require("./eventStoreClient");
const { jsonEvent } = require("@eventstore/db-client");

async function appendEvent(streamName, event) {
    const jsonEventInstance = jsonEvent({
        type: event.type,
        data: event.data,
    });

    try {
        await client.appendToStream(streamName, [jsonEventInstance]);
        console.log('Event sent successfully');
    } catch (error) {
        console.error('Error sending event:', error);
    }
}

async function readEvents(streamName) {
    const events = [];
    for await (const { event } of client.readStream(streamName)) {
        events.push(event);
    }
    return events;
}

module.exports = { appendEvent, readEvents };
