const { CommandApplicationAggregate, QueryApplicationRepository } = require("../../../repositories");

const queryApplicationRepository = new QueryApplicationRepository();

module.exports = { CommandApplicationAggregate, queryApplicationRepository };
