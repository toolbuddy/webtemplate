const LanguageUtils = require('../../common/utils/language.js');
const {
    Profile,
    ProfileI18n,
} = require('./associations.js');

module.exports = async (opt) => {
    try {
        opt = opt || {};
        const {
            languageId = null,
            profileId = null,
        } = opt;

        /**
         * Invalid query parameter.
         * Handle with 400 bad request.
         */

        if (!LanguageUtils.isSupportedLanguageId(languageId)) {
            const error = new Error('invalid language id');
            error.status = 400;
            throw error;
        }
        if (typeof (profileId) !== 'number' || !Number.isInteger(profileId)) {
            const error = new Error('invalid profile id');
            error.status = 400;
            throw error;
        }

        const data = await Profile.findOne({
            attributes: [
                'profileId',
                'photo',
            ],
            where: {
                profileId,
            },
            include: [
                {
                    model: ProfileI18n,
                    as: 'profileI18n',
                    attributes: ['name'],
                    where: {
                        languageId,
                    },
                },
            ],
        });

        return {
            photo: data.photo,
            profileId: data.profileId,
            name: data.profileI18n[0].name,
        };
    }
    catch (err) {
        if (err.status)
            throw err;
        const error = new Error();
        error.status = 500;
        throw error;
    }
};
