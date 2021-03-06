const LanguageUtils = require('../../common/utils/language.js');
const ValidateUtils = require('../../common/utils/validate.js');
const {
    AwardI18n,
    Award,
    ConferenceI18n,
    Conference,
    Department,
    EducationI18n,
    Education,
    ExperienceI18n,
    Experience,
    PatentI18n,
    Patent,
    ProfileI18n,
    Profile,
    ProjectI18n,
    Project,
    PublicationI18n,
    Publication,
    ResearchGroup,
    Specialty,
    SpecialtyI18n,
    StudentAwardI18n,
    StudentAward,
    StudentI18n,
    Student,
    TechnologyTransferPatentI18n,
    TechnologyTransferPatent,
    TechnologyTransferI18n,
    TechnologyTransfer,
    Title,
    TitleI18n,
} = require('./associations.js');

module.exports = async (opt) => {
    try {
        opt = opt || {};
        const {
            profileId = null,
            languageId = null,
        } = opt;

        if (!LanguageUtils.isSupportedLanguageId(languageId)) {
            const error = new Error('invalid language id');
            error.status = 400;
            throw error;
        }
        if (!ValidateUtils.isValidId(profileId)) {
            const error = new Error('invalid profile id');
            error.status = 400;
            throw error;
        }

        const [
            awards,
            conferences,
            departments,
            educations,
            experiences,
            patents,
            profile,
            profileI18n,
            projects,
            publications,
            researchGroups,
            specialtys,
            studentAwards,
            technologyTransfers,
            titles,
        ] = await Promise.all([
            Award.findAll({
                attributes: [
                    'receivedYear',
                    'awardId',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: AwardI18n,
                        as: 'awardI18n',
                        attributes: ['award'],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Conference.findAll({
                attributes: [
                    'hostYear',
                    'conferenceId',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: ConferenceI18n,
                        as: 'conferenceI18n',
                        attributes: [
                            'conference',
                            'title',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Department.findAll({
                attributes: ['type'],
                where: {
                    profileId,
                },
            }),
            Education.findAll({
                attributes: [
                    'educationId',
                    'degree',
                    'from',
                    'nation',
                    'to',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: EducationI18n,
                        as: 'educationI18n',
                        attributes: [
                            'major',
                            'school',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Experience.findAll({
                attributes: [
                    'experienceId',
                    'from',
                    'to',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: ExperienceI18n,
                        as: 'experienceI18n',
                        attributes: [
                            'department',
                            'organization',
                            'title',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Patent.findAll({
                attributes: [
                    'patentId',
                    'applicationDate',
                    'certificationNumber',
                    'expireDate',
                    'issueDate',
                    'nation',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: PatentI18n,
                        as: 'patentI18n',
                        attributes: [
                            'inventor',
                            'patent',
                            'patentOwner',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Profile.findOne({
                attributes: [
                    'profileId',
                    'email',
                    'fax',
                    'labTel',
                    'labWeb',
                    'nation',
                    'officeTel',
                    'personalWeb',
                    'photo',
                ],
                where: {
                    profileId,
                },
            }),
            ProfileI18n.findOne({
                attributes: [
                    'labAddress',
                    'labName',
                    'name',
                    'officeAddress',
                ],
                where: {
                    languageId,
                    profileId,
                },
            }),
            Project.findAll({
                attributes: [
                    'projectId',
                    'category',
                    'from',
                    'to',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: ProjectI18n,
                        as: 'projectI18n',
                        attributes: [
                            'name',
                            'support',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Publication.findAll({
                attributes: [
                    'publicationId',
                    'category',
                    'issueMonth',
                    'issueYear',
                    'international',
                    'refereed',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: PublicationI18n,
                        as: 'publicationI18n',
                        attributes: [
                            'authors',
                            'title',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            ResearchGroup.findAll({
                attributes: ['type'],
                where: {
                    profileId,
                },
            }),
            Specialty.findAll({
                attributes: ['specialtyId'],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: SpecialtyI18n,
                        as: 'specialtyI18n',
                        attributes: ['specialty'],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            StudentAward.findAll({
                attributes: [
                    'studentAwardId',
                    'receivedYear',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: Student,
                        as: 'student',
                        attributes: [
                            'studentId',
                            'degree',
                        ],
                        include: [
                            {
                                model: StudentI18n,
                                as: 'studentI18n',
                                attributes: ['name'],
                                where: {
                                    languageId,
                                },
                            },
                        ],
                    },
                    {
                        model: StudentAwardI18n,
                        as: 'studentAwardI18n',
                        attributes: ['award'],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            TechnologyTransfer.findAll({
                attributes: [
                    'technologyTransferId',
                    'from',
                    'to',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: TechnologyTransferPatent,
                        as: 'technologyTransferPatent',
                        attributes: ['technologyTransferPatentId'],
                        include: [
                            {
                                model: TechnologyTransferPatentI18n,
                                as: 'technologyTransferPatentI18n',
                                attributes: ['patent'],
                                where: {
                                    languageId,
                                },
                            },
                        ],
                    },
                    {
                        model: TechnologyTransferI18n,
                        as: 'technologyTransferI18n',
                        attributes: [
                            'technologyTransferId',
                            'authorizedParty',
                            'authorizingParty',
                            'technology',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
            Title.findAll({
                attributes: [
                    'titleId',
                    'from',
                    'to',
                ],
                where: {
                    profileId,
                },
                include: [
                    {
                        model: TitleI18n,
                        as: 'titleI18n',
                        attributes: [
                            'titleId',
                            'title',
                        ],
                        where: {
                            languageId,
                        },
                    },
                ],
            }),
        ]);

        /**
         * Profile not found.
         * Handle with 404 not found.
         */

        if (!profile) {
            const error = new Error('profile not found');
            error.status = 404;
            throw error;
        }

        return {
            award: awards.map(award => ({
                awardId: award.awardId,
                award: award.awardI18n[0].award,
                receivedYear: award.receivedYear,
            })),
            conference: conferences.map(conference => ({
                conferenceId: conference.conferenceId,
                conference: conference.conferenceI18n[0].conference,
                hostYear: conference.hostYear,
                title: conference.conferenceI18n[0].title,
            })),
            department: departments.map(department => ({
                type: department.type,
            })),
            education: educations.map(education => ({
                educationId: education.educationId,
                degree: education.degree,
                from: education.from,
                major: education.educationI18n[0].major,
                nation: education.nation,
                school: education.educationI18n[0].school,
                to: education.to,
            })),
            experience: experiences.map(experience => ({
                experienceId: experience.experienceId,
                department: experience.experienceI18n[0].department,
                from: experience.from,
                organization: experience.experienceI18n[0].organization,
                title: experience.experienceI18n[0].title,
                to: experience.to,
            })),
            patent: patents.map(patent => ({
                patentId: patent.patentId,
                applicationDate: patent.applicationDate,
                certificationNumber: patent.certificationNumber,
                expireDate: patent.expireDate,
                inventor: patent.patentI18n[0].inventor,
                issueDate: patent.issueDate,
                nation: patent.nation,
                patent: patent.patentI18n[0].patent,
                patentOwner: patent.patentI18n[0].patentOwner,
            })),
            profile: {
                email: profile.email,
                fax: profile.fax,
                labAddress: profileI18n.labAddress,
                labName: profileI18n.labName,
                labTel: profile.labTel,
                labWeb: profile.labWeb,
                name: profileI18n.name,
                nation: profile.nation,
                officeAddress: profileI18n.officeAddress,
                officeTel: profile.officeTel,
                personalWeb: profile.personalWeb,
                photo: profile.photo,
                profileId,
            },
            project: projects.map(project => ({
                projectId: project.projectId,
                category: project.category,
                from: project.from,
                name: project.projectI18n[0].name,
                support: project.projectI18n[0].support,
                to: project.to,
            })),
            publication: publications.map(publication => ({
                publicationId: publication.publicationId,
                authors: publication.publicationI18n[0].authors,
                category: publication.category,
                international: publication.international,
                issueMonth: publication.issueMonth,
                issueYear: publication.issueYear,
                refereed: publication.refereed,
                title: publication.publicationI18n[0].title,
            })),
            researchGroup: researchGroups.map(researchGroup => ({
                type: researchGroup.type,
            })),
            specialty: specialtys.map(specialty => ({
                specialtyId: specialty.specialtyId,
                specialty: specialty.specialtyI18n[0].specialty,
            })),
            studentAward: studentAwards.map(studentAward => ({
                awardId: studentAward.studentAwardId,
                award: studentAward.studentAwardI18n[0].award,
                receivedYear: studentAward.receivedYear,
                student: studentAward.student.map(student => ({
                    studentId: student.studentId,
                    degree: student.degree,
                    name: student.studentI18n[0].name,
                })),
            })),
            technologyTransfer: technologyTransfers.map(technologyTransfer => ({
                technologyTransferId: technologyTransfer.technologyTransferId,
                authorizingParty: technologyTransfer.technologyTransferI18n[0].authorizingParty,
                authorizedParty: technologyTransfer.technologyTransferI18n[0].authorizedParty,
                from: technologyTransfer.from,
                technologyTransferPatent: technologyTransfer.technologyTransferPatent.map(technologyTransferPatent => ({
                    patent: technologyTransferPatent.technologyTransferPatentI18n[0].patent,
                    technologyTransferPatentId: technologyTransferPatent.technologyTransferPatentId,
                })),
                to: technologyTransfer.to,
                technology: technologyTransfer.technologyTransferI18n[0].technology,
            })),
            title: titles.map(title => ({
                titleId: title.titleId,
                from: title.from,
                title: title.titleI18n[0].title,
                to: title.to,
            })),
        };
    }
    catch (err) {
        console.error(err);
        if (err.status)
            throw err;
        const error = new Error();
        error.status = 500;
        throw error;
    }
};
