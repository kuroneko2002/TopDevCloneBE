const ListCandidates = require('./listCandidates');
const CandidateInfo = require('./candidateInfo');
const ListEmployers = require("./listEmployers");
const EmployerInfo = require("./employerInfo");
const updateEmployer = require('./updateEmployer');

class AdminTransport {
  // [GET] /admin/candidates
  listCandidates = ListCandidates;

  // [GET] /admin/candidates/:id
  candidateInfo = CandidateInfo;

  // [GET] /admin/employers
  listEmployers = ListEmployers;

  // [GET] /admin/employers/:id
  employerInfo = EmployerInfo;

  // [PATCH] /admin/employers/:id
  updateEmployer = updateEmployer;

}

module.exports = AdminTransport;
