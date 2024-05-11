const { DBTypeJob, DBTypeCompany } = require('../../utils/const');
const { FormatCompany } = require('../../utils/format-result');
const { unmaskId, maskId } = require('../../utils/mask');
const { repository } = require('./instance');

const FilterCompanyByConditions = async (conditions, ordering, limit, page, cursor) => {
  try {
    limit = limit || null;
    page = page || null;

    const offset = limit && page ? (page - 1) * limit : 0;

    conditions.keywords = conditions.keywords !== '' ? conditions.keywords.split('-') : [];

    // generate search conditions query from conditions
    const searchConditions = repository.getSearchCondition(conditions);

    const total = await repository.countCompanyByConditions(searchConditions);

    let companies = await repository.filterCompanyByConditions(searchConditions, limit, offset);

    return {
      data: companies.map((company) => {
        company.id = maskId(company.id, DBTypeJob);
        return FormatCompany(company);
      }),
      paging: {
        limit: limit,
        page: page,
        total: total,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = FilterCompanyByConditions;
