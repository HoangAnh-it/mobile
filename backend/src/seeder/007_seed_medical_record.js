const { MEDICAL_RECORD } = require('../migrations/table_name');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(MEDICAL_RECORD, [
            {
                medicalRecordId: '7aaeac57-d5d7-459f-8a5e-0dad115106cc',
                name: 'Vũ Hoàng Anh',
                gender: 'Nam',
                birthDay: '2002-10-31',
                relationShip: 'Tôi',
                phone: '0981066360',
                address: 'Xuân Thủy, Cầu Giấy, Hà Nội',
                patientId: 'f22a934a-3855-4799-bfed-7499be8d1b53',
            }
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(MEDICAL_RECORD, null, {});
    }
};