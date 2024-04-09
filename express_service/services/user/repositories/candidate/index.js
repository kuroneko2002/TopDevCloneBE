const ListCandidates = require("./list");
const CandidateInfo = require("./info");

class AdminRepository {
    // [GET] /admin/candidates
    listCandidates = ListCandidates;
  
    // [GET] /admin/candidates/:id
    candidateInfo = CandidateInfo;
}

module.exports = AdminRepository;
