const { DOCTOR } = require('../migrations/table_name');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(DOCTOR, [
            {
                doctorId: '9b902eb7-6ae9-4c9e-85c2-be4d11aa0366',
                rank: 'Bác sĩ',
                departmentId: '6c6e0cf7-084a-497e-9f47-30ac5ed93401',
                userId: '970f5535-a8e0-4c0c-98d2-182866d43d56'
            },
            {
                doctorId: '772cfb30-0039-4ed9-890a-9fe87beddfe1',
                rank: 'Bác sĩ',
                departmentId: '3ce80c11-9b18-4a4f-9784-1aca9c96200b',
                userId: '10041171-6e54-4305-a31b-1e8da04671cb'
            },
            {
                doctorId: 'a32fe5ff-d406-493a-a1ef-cf9e31e7e347',
                rank: 'Bác sĩ',
                departmentId: '3ce80c11-9b18-4a4f-9784-1aca9c96200b',
                userId: '0628a0cb-b291-4a7e-b9ad-8f0c9e697079'
            },
            {
                doctorId: 'e9a2623c-67dc-4f88-8215-48cbf01fc345',
                rank: 'Bác sĩ',
                departmentId: '3c79d3c7-d8c1-4a5c-aa78-131b451f49c1',
                userId: 'cbf0ca69-7459-4dcc-93b1-dfe0f1b1356b'
            },
            {
                doctorId: 'cfe5465c-5002-48a3-8798-aaf2ea9a57ae',
                rank: 'Bác sĩ',
                departmentId: '3c79d3c7-d8c1-4a5c-aa78-131b451f49c1',
                userId: 'd686b15e-4bbf-496e-a8fc-566bb279feff'
            },
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(DOCTOR, null, {});
    }
};