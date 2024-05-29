//const ApplyJob = require("./apply");
const ApplyJob = require("./cqrs/apply");

const ListApply = require("./listApply");

//const DetailApply = require("./detail");
const DetailApply = require("./cqrs/detail");

const UpdateProcessApplication = require("./update-process")
class ApplicationController {
  //POST
  applyJob = ApplyJob;

  //GET
  listApply = ListApply;

  updateProcessApplication = UpdateProcessApplication

  detailApply = DetailApply;
}

module.exports = ApplicationController;
