const projectCategoryUtils = require('../../utils/project-category.js');

const ProjectValidationConstraints = {
    from: {
        presence: false,
        type: 'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    to: {
        presence: false,
        type: 'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    category: {
        presence: false,
        type: {
            type: value => projectCategoryUtils.isSupportedId(value),
        },
    },
};

module.exports = ProjectValidationConstraints;
