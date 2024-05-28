const { EventStoreDBClient, START, FORWARDS } = require("@eventstore/db-client");

const client = EventStoreDBClient.connectionString("esdb://eventstore:2113?tls=false");

async function checkConnection() {
    try {
        await client.readAll();
        console.log("Connection to EventStoreDB successful");
    } catch (error) {
        console.error("Connection to EventStoreDB failed:", error);
    }
}

checkConnection();

const streamName = "application-stream";

// Hàm đọc events
async function readEvents() {
    const events = client.readStream(streamName, {
        fromRevision: START,
        direction: FORWARDS,
    });

    for await (const { event } of events) {
        if (!event) continue;
        console.log(`Event type: ${event.type}`);
        console.log(`Event data: ${JSON.stringify(event.data)}`);
    }
}

readEvents().catch(console.error);

module.exports = client;
