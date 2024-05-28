module.exports = {
    type: "ApplicationCreated",
    data: (application) => ({
        id: application.id,
        jobId: application.jobId,
        fullName: application.fullName,
        email: application.email,
        phone: application.phone,
        cvUrl: application.cvUrl,
        description: application.description,
        status: application.status,
    }),
};
