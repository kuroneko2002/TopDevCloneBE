const { CommandApplicationAggregate } = require("./instance");
const { DBTypeJob, DBTypeApplication } = require("../../../utils/const");
const { maskId, unmaskId } = require("../../../utils/mask");

const { ContainerBuilder, InMemoryEventStorage } = require('node-cqrs');

const ApplyJob = async (data) => {
    try {
        data.jobId = unmaskId(data.jobId, DBTypeJob);
        //const result = await repository.applyJob(data);

        const userAggregateId = undefined;
        const builder = new ContainerBuilder();
        builder.register(InMemoryEventStorage).as('storage');
        builder.registerAggregate(CommandApplicationAggregate);
        const container = builder.container();

        const payload = { data: data };
        const pre_result = await container.commandBus.send('createApplication', userAggregateId, { payload });
        const result = pre_result[0].payload.data;

        result.data.jobId = maskId(result.data.jobId, DBTypeJob);
        result.data.id = maskId(result.data.id, DBTypeApplication);

        return { status: result.status, data: result.data };
    } catch {
        throw new Error("JobId not found!");
    }
};

module.exports = ApplyJob;
