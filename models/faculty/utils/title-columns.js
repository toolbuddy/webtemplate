const I18nUtils = require('../../common/utils/i18n.js');
const {defaultOption, i18n, map} = require('../maps/title-columns.js');

const titleColumnsUtils = new I18nUtils({
    defaultOption,
    i18n,
    map,
});

module.exports = titleColumnsUtils;
