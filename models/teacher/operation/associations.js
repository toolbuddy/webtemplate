const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const connect = require( `${ projectRoot }/settings/database/connect` );

module.exports = async () => {
    const teacherDatabase = await connect( 'teacher' );
    const table = {
        conferenceI18n:         teacherDatabase.import( `${ projectRoot }/models/teacher/tables/conference_i18n` ),
        conference:             teacherDatabase.import( `${ projectRoot }/models/teacher/tables/conference` ),
        departmentI18n:         teacherDatabase.import( `${ projectRoot }/models/teacher/tables/department_i18n` ),
        department:             teacherDatabase.import( `${ projectRoot }/models/teacher/tables/department` ),
        educationI18n:          teacherDatabase.import( `${ projectRoot }/models/teacher/tables/education_i18n` ),
        education:              teacherDatabase.import( `${ projectRoot }/models/teacher/tables/education` ),
        experienceI18n:         teacherDatabase.import( `${ projectRoot }/models/teacher/tables/experience_i18n` ),
        experience:             teacherDatabase.import( `${ projectRoot }/models/teacher/tables/experience` ),
        honorI18n:              teacherDatabase.import( `${ projectRoot }/models/teacher/tables/honor_i18n` ),
        honor:                  teacherDatabase.import( `${ projectRoot }/models/teacher/tables/honor` ),
        labI18n:                teacherDatabase.import( `${ projectRoot }/models/teacher/tables/lab_i18n` ),
        lab:                    teacherDatabase.import( `${ projectRoot }/models/teacher/tables/lab` ),
        officeI18n:             teacherDatabase.import( `${ projectRoot }/models/teacher/tables/office_i18n` ),
        office:                 teacherDatabase.import( `${ projectRoot }/models/teacher/tables/office` ),
        patentI18n:             teacherDatabase.import( `${ projectRoot }/models/teacher/tables/patent_i18n` ),
        patent:                 teacherDatabase.import( `${ projectRoot }/models/teacher/tables/patent` ),
        profileI18n:            teacherDatabase.import( `${ projectRoot }/models/teacher/tables/profile_i18n` ),
        profile:                teacherDatabase.import( `${ projectRoot }/models/teacher/tables/profile` ),
        projectI18n:            teacherDatabase.import( `${ projectRoot }/models/teacher/tables/project_i18n` ),
        project:                teacherDatabase.import( `${ projectRoot }/models/teacher/tables/project` ),
        publicationI18n:        teacherDatabase.import( `${ projectRoot }/models/teacher/tables/publication_i18n` ),
        publication:            teacherDatabase.import( `${ projectRoot }/models/teacher/tables/publication` ),
        specialty:              teacherDatabase.import( `${ projectRoot }/models/teacher/tables/specialty` ),
        technologyTransfer:     teacherDatabase.import( `${ projectRoot }/models/teacher/tables/technology_transfer` ),
        technologyTransferI18n: teacherDatabase.import( `${ projectRoot }/models/teacher/tables/technology_transfer_i18n` ),
        titleI18n:              teacherDatabase.import( `${ projectRoot }/models/teacher/tables/title_i18n` ),
        title:                  teacherDatabase.import( `${ projectRoot }/models/teacher/tables/title` ),
    };

    // Translation relationship.
    // `conference` has many translations.
    table.conference.hasMany( table.conferenceI18n, {
        as:         'conferenceI18n',
        foreignKey: 'conferenceId',
        targetKey:  'conferenceId',
    } );

    // `department` has many translations.
    table.department.hasMany( table.departmentI18n, {
        as:         'departmentI18n',
        foreignKey: 'departmentId',
        targetKey:  'departmentId',
    } );

    // `education` has many translations.
    table.education.hasMany( table.educationI18n, {
        as:         'educationI18n',
        foreignKey: 'educationId',
        targetKey:  'educationId',
    } );

    // `experience` has many translations.
    table.experience.hasMany( table.experienceI18n, {
        as:         'experienceI18n',
        foreignKey: 'experienceId',
        targetKey:  'experienceId',
    } );

    // `honor` has many translations.
    table.honor.hasMany( table.honorI18n, {
        as:         'honorI18n',
        foreignKey: 'honorId',
        targetKey:  'honorId',
    } );

    // `lab` has many translations.
    table.lab.hasMany( table.labI18n, {
        as:         'labI18n',
        foreignKey: 'labId',
        targetKey:  'labId',
    } );

    // `office` has many translations.
    table.office.hasMany( table.officeI18n, {
        as:         'officeI18n',
        foreignKey: 'officeId',
        targetKey:  'officeId',
    } );

    // `patent` has many translations.
    table.patent.hasMany( table.patentI18n, {
        as:         'patentI18n',
        foreignKey: 'patentId',
        targetKey:  'patentId',
    } );

    // `profile` has many translations.
    table.profile.hasMany( table.profileI18n, {
        as:         'profileI18n',
        foreignKey: 'profileId',
        targetKey:  'profileId',
    } );

    // `project` has many translations.
    table.project.hasMany( table.projectI18n, {
        as:         'projectI18n',
        foreignKey: 'projectId',
        targetKey:  'projectId',
    } );

    // `publication` has many translations.
    table.publication.hasMany( table.publicationI18n, {
        as:         'publicationI18n',
        foreignKey: 'publicationId',
        targetKey:  'publicationId',
    } );

    // `technologyTransfer` has many translations.
    table.technologyTransfer.hasMany( table.technologyTransferI18n, {
        as:         'technologyTransferI18n',
        foreignKey: 'technologyTransferId',
        targetKey:  'technologyTransferId',
    } );

    // `title` has many translations.
    table.title.hasMany( table.titleI18n, {
        as:         'titleI18n',
        foreignKey: 'titleId',
        targetKey:  'titleId',
    } );

    // Profile relationship.
<<<<<<< HEAD
=======
    // `profile` has many `conference`.
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
    table.profile.hasMany( table.conference, {
        as:         'conference',
        foreignKey: 'conferenceId',
        targetKey:  'profileId',
    } );

<<<<<<< HEAD
=======
    // `profile` has many `department`.
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
    table.profile.hasMany( table.department, {
        as:         'department',
        foreignKey: 'departmentId',
        targetKey:  'profileId',
    } );

<<<<<<< HEAD
=======
    // `profile` has many `education`.
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
    table.profile.hasMany( table.education, {
        as:         'education',
        foreignKey: 'educationId',
        targetKey:  'profileId',
    } );

<<<<<<< HEAD
=======
    // `profile` has many `experience`.
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
    table.profile.hasMany( table.experience, {
        as:         'experience',
        foreignKey: 'experienceId',
        targetKey:  'profileId',
    } );

<<<<<<< HEAD
=======
    // `profile` has many `honor`.
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
    table.profile.hasMany( table.honor, {
        as:         'honor',
        foreignKey: 'honorId',
        targetKey:  'profileId',
    } );

<<<<<<< HEAD
=======
    // `profile` has many `lab`.
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
    table.profile.hasMany( table.lab, {
        as:         'lab',
        foreignKey: 'labId',
        targetKey:  'profileId',
    } );

<<<<<<< HEAD
=======
    // `profile` has many `office`.
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
    table.profile.hasMany( table.office, {
        as:         'office',
        foreignKey: 'officeId',
        targetKey:  'profileId',
    } );

<<<<<<< HEAD
=======
    // `profile` has many `patent`.
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
    table.profile.hasMany( table.patent, {
        as:         'patent',
        foreignKey: 'patentId',
        targetKey:  'profileId',
    } );

<<<<<<< HEAD
=======
    // `profile` has many `project`.
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
    table.profile.hasMany( table.project, {
        as:         'project',
        foreignKey: 'projectId',
        targetKey:  'profileId',
    } );

<<<<<<< HEAD
=======
    // `profile` has many `publication`.
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
    table.profile.hasMany( table.publication, {
        as:         'publication',
        foreignKey: 'publicationId',
        targetKey:  'profileId',
    } );

<<<<<<< HEAD
=======
    // `profile` has many `specialty`.
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
    table.profile.hasMany( table.specialty, {
        as:         'specialty',
        foreignKey: 'specialtyId',
        targetKey:  'profileId',
    } );

<<<<<<< HEAD
=======
    // `profile` has many `technologyTransfer`.
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
    table.profile.hasMany( table.technologyTransfer, {
        as:         'technologyTransfer',
        foreignKey: 'technologyTransferId',
        targetKey:  'profileId',
    } );

<<<<<<< HEAD
=======
    // `profile` has many `title`.
>>>>>>> 5db0391fbb5c84ae402ca328a7c174bb3b95654e
    table.profile.hasMany( table.title, {
        as:         'title',
        foreignKey: 'titleId',
        targetKey:  'profileId',
    } );

    // Any one who use this module should remember to close connection,
    // like `table.database.close()`.
    table.database = teacherDatabase;

    return table;
};
