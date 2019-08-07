import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';

const TechnologyTransfer = faculty.define( 'technologyTransfer', {
    technologyTransferId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
    },
    profileId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
    },
    from: {
        type:      Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
    },
    to: {
        type:      Sequelize.SMALLINT.UNSIGNED,
        allowNull: true,
    },
} );

export default TechnologyTransfer;
