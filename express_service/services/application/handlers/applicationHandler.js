const { appendEvent } = require("../utils/eventStore");
const { applicationCreatedEvent, applicationUpdatedEvent } = require("../events");

async function handleApplicationCreated(application) {
    const event = applicationCreatedEvent.data(application);
    await appendEvent("application-stream", { type: applicationCreatedEvent.type, data: event });
}

async function handleApplicationUpdated(application) {
    const event = applicationUpdatedEvent.data(application);
    await appendEvent("application-stream", { type: applicationUpdatedEvent.type, data: event });
}

module.exports = {
    handleApplicationCreated,
    handleApplicationUpdated,
};
