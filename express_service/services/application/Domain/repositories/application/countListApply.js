const { DBError } = require("../.././utils/app-errors");
const { ApplicationModal } = require("./instance");

const CountListApply = async (id) => {
    try {
        const applications = await ApplicationModal.findAll({
            where: {
                jobId: id,
            }
        });
        return applications.length;

    } catch (error) {
        throw new DBError(error.message, "Something went wrong with count list apply");
    }
};

module.exports = CountListApply;
