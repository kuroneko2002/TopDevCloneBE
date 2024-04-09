const ListCandidates = require("./list");
const CandidateInfo = require("./info");

class CandidateController {
  // [GET] /admin/candidates
  listCandidates = ListCandidates;

  // [GET] /admin/candidates/:id
  candidateInfo = CandidateInfo;
}

module.exports = CandidateController;