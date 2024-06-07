const { repository } = require('./instance');
const { COMPANY_STATUS, DBTypeCompany } = require('../../utils/const');
const { maskId } = require('../../utils/mask');

const GetCompaniesStatusGrpc = async (call, callback) => {
  try {
    const { hrIds } = call.request;
    console.log('hrIds<<<', hrIds);
    const result = [];

    for (let hrId of hrIds) {
      try {
        const company = await repository.findCompanyByHrId(hrId);
        result.push({
          hrId,
          companyId: maskId(company.id, DBTypeCompany),
          status: company.status,
          logo: company.logo || '',
          name: company.name || '',
          website: company.website || '',
          phoneNumber: company.phoneNumber || '',
        });
      } catch (error) {
        console.log('error.message', error.message);
      }
    }

    console.log(result[0]);
    callback(null, {
      result: result,
    });
  } catch (error) {
    callback(null, {
      result: [],
    });
    console.log(error.message);
  }
};

module.exports = { GetCompaniesStatusGrpc };
