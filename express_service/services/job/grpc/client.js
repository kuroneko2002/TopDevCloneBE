const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const GRPC_AUTH_HOST = '0.0.0.0';
const GRPC_AUTH_PORT = 8004;

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../../proto/auth-service.proto'));
const proto = grpc.loadPackageDefinition(packageDefinition);

const authStub = new proto.AuthService(`${GRPC_AUTH_HOST}:${GRPC_AUTH_PORT}`, grpc.credentials.createInsecure());

const isValidToken = (token) => {
  return new Promise((resolve, reject) => {
    authStub.isValid({ token }, (err, response) => {
      //   console.log('Token:', token);
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

module.exports = isValidToken;
