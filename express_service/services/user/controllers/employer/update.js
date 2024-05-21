const { unmaskId, maskId } = require("../../utils/mask");
const { DBTypeUser, DBTypeCompany } = require("../../utils/const");
const { repository } = require("./instance");

const UpdateEmployer = async (employerId, data) => {
    try {
        const notValidField = ["id", "createdAt", "updatedAt"];
        if (Object.keys(data).some((key) => notValidField.includes(key))) {
            throw new Error("Invalid field to update");
        }
        const decodedId = unmaskId(employerId, DBTypeUser);
        let employer = await repository.updateEmployer(decodedId, data);
        employer = {
            ...employer,
            id: employerId,
            company_id: maskId(employer.company_id, DBTypeCompany),
        }
        return employer;
    } catch (error) {
        throw error;
    }
};

module.exports = UpdateEmployer;
