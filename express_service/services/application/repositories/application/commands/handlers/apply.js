const { DBError } = require("../../../../utils/app-errors");
const { CommandApplicationModal } = require("..//instance");
const grpcJobClient = require("../../../../grpc-job-client")
const { handleApplicationCreated, handleApplicationUpdated } = require("../../../../handlers");


// Implement create application information here and export
const ApplyJob = async (data) => {
  try {
    let application = await CommandApplicationModal.findOne({
      where: {
        jobId: data.jobId,
        email: data.email
      }
    });

    if (application) {
      application.update(data)
      return { status: "update", data: application.dataValues }
    } else {
      const newApply = await CommandApplicationModal.create(data);
      await handleApplicationCreated(newApply);
      const infoJob = await new Promise((resolve, reject) => {
        grpcJobClient.UpdateApplyCountGrpc({ id: data.jobId }, (error, result) => {
          if (error) {
            console.log(error.message);
            resolve(null);
          } else {
            resolve(result);
          }
        });
      });

      return { status: "create", data: newApply.dataValues }
    }
  } catch (error) {
    // If an error occurs, throw a DBError
    throw new DBError(error.message, "Something went wrong with apply job");
  }
};

module.exports = ApplyJob;