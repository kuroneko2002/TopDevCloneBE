const { EventStoreDBClient, jsonEvent } = require("@eventstore/db-client");

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

module.exports = client;
