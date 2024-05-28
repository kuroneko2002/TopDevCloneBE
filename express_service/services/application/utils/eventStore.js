const client = require("./eventStoreClient");
const { jsonEvent } = require("@eventstore/db-client");

async function appendEvent(streamName, event) {
    const jsonEventInstance = jsonEvent({
        type: event.type,
        data: event.data,
    });

    await client.appendToStream(streamName, jsonEventInstance);
}

async function readEvents(streamName) {
    const events = [];
    for await (const { event } of client.readStream(streamName)) {
        events.push(event);
    }
    return events;
}

module.exports = { appendEvent, readEvents };
