require("dotenv").config();

const PORT = 5004;
const GRPC_COMPANY_SERVER = "0.0.0.0:50051";

module.exports = {
  PORT,
  GRPC_COMPANY_SERVER,
};
