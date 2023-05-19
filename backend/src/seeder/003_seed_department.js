const { DEPARTMENT } = require('../migrations/table_name');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(DEPARTMENT, [
      {
        departmentId: "6c6e0cf7-084a-497e-9f47-30ac5ed93401",
        name: "Khoa Nhi",
        hospitalId: "f7fdfaf0-7f60-44b6-8d37-69c47c2c21cd",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/kid.png?alt=media&token=bed74b05-e4b7-4f37-b54b-762415aea851'
      },
      {
        departmentId: "0fa142b3-d580-475f-95b4-9375fddb4a8b",
        name: "Khoa ngoại tổng quát",
        hospitalId: "f7fdfaf0-7f60-44b6-8d37-69c47c2c21cd",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/external.png?alt=media&token=0d0e98ee-7dfb-4234-b15e-ce8b39958965',
      },
      {
        departmentId: "3ce80c11-9b18-4a4f-9784-1aca9c96200b",
        name: "Khoa thần kinh",
        hospitalId: "f7fdfaf0-7f60-44b6-8d37-69c47c2c21cd",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/mental.png?alt=media&token=a9ca9f11-de18-4374-8c62-aa4469314ff6',

      },
      {
        departmentId: "a0d26a52-8fd6-4dfa-aee2-e4650cece265",
        name: "Khoa mắt",
        hospitalId: "f7fdfaf0-7f60-44b6-8d37-69c47c2c21cd",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/eye.png?alt=media&token=bb32716e-5bd8-4200-aca3-f7062019d681',

      },
      {
        departmentId: "5f25d519-de54-4b16-8778-62dde348b5d1",
        name: "Khoa nội tổng quát",
        hospitalId: "f7fdfaf0-7f60-44b6-8d37-69c47c2c21cd",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/internal.png?alt=media&token=8b5a5a15-1d71-49df-817c-b8e0ae15363d',

      },
      {
        departmentId: "3c79d3c7-d8c1-4a5c-aa78-131b451f49c1",
        name: "Khoa thẩm mỹ",
        hospitalId: "f7fdfaf0-7f60-44b6-8d37-69c47c2c21cd",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/beauty.png?alt=media&token=1baf5541-2e64-4f9c-bed5-064a62a4289e',
      },
      {
        departmentId: "b94e363a-aa89-4be9-afcb-7cc80c58134f",
        name: "Khoa vật lý trị liệu",
        hospitalId: "f7fdfaf0-7f60-44b6-8d37-69c47c2c21cd",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/physical.png?alt=media&token=55a6ba2d-88a6-4f1d-99a3-76e35d76f408',

      },
      {
        departmentId: "d98ee3b7-ac18-46a6-9c43-853f901ee85b",
        name: "Khoa sản",
        hospitalId: "f7fdfaf0-7f60-44b6-8d37-69c47c2c21cd",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/obstetrics.png?alt=media&token=62131666-81df-4244-bde2-cc52517ce23f',

      },
      {
        departmentId: "ff178ddb-c6ef-4025-a4f5-e9a5a9b2b67e",
        name: "Khoa tai mũi họng",
        hospitalId: "8e8e67e0-b971-4efc-b563-587d6e5675d3",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/ear.png?alt=media&token=85aaf524-93ed-4552-921c-78d3fa4d60d7',

      },
      {
        departmentId: "9be0338e-154e-4f79-ae65-65fbca76f3f2",
        name: "Hóa răng hàm mặt",
        hospitalId: "8e8e67e0-b971-4efc-b563-587d6e5675d3",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/tooth.png?alt=media&token=04e1a5b4-1ff6-4403-832a-a86a747b641f',

      },
      {
        departmentId: "8ed53b76-22d1-4526-b38e-d72690bc8dac",
        name: "Khoa dược",
        hospitalId: "8e8e67e0-b971-4efc-b563-587d6e5675d3",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/medicine.png?alt=media&token=0ea96daa-092d-4461-be71-9ddc02838153',

      },
      {
        departmentId: "a42276bd-db63-4124-8cab-07c952f669d5",
        name: "Khoa cấp cứu",
        hospitalId: "8e8e67e0-b971-4efc-b563-587d6e5675d3",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/emergency.png?alt=media&token=bd8e3b39-0193-45e8-a7e7-54da27142e55',
      },
      {
        departmentId: "d5c55e41-c785-4eb2-898e-5a66860d4bb6",
        name: "Khoa da liễu",
        hospitalId: "8e8e67e0-b971-4efc-b563-587d6e5675d3",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/skin.png?alt=media&token=d5408a0f-510a-4608-ac9c-a7669dfc072a',
      },
      {
        departmentId: "cd0d304a-bb0b-44f1-8121-3d38fa87c2ed",
        name: "Khoa tâm lý",
        hospitalId: "8e8e67e0-b971-4efc-b563-587d6e5675d3",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/mental.png?alt=media&token=a9ca9f11-de18-4374-8c62-aa4469314ff6',
      },
      {
        departmentId: "00da8250-86ee-4444-a6cc-34f7a6953a81",
        name: "Khoa Nhi",
        hospitalId: "8e8e67e0-b971-4efc-b563-587d6e5675d3",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/kid.png?alt=media&token=bed74b05-e4b7-4f37-b54b-762415aea851',
      },
      {
        departmentId: "a6fffe00-9b75-4676-acfe-585d8947c814",
        name: "Khoa ngoại tổng quát",
        hospitalId: "8e8e67e0-b971-4efc-b563-587d6e5675d3",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/external.png?alt=media&token=0d0e98ee-7dfb-4234-b15e-ce8b39958965',
      },
      {
        departmentId: "0690d992-e0e1-4315-9262-b76e4a1829fa",
        name: "Khoa thần kinh",
        hospitalId: "8e8e67e0-b971-4efc-b563-587d6e5675d3",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/mental.png?alt=media&token=a9ca9f11-de18-4374-8c62-aa4469314ff6',
      },
      {
        departmentId: "8e19412a-1643-42f1-bd61-ff312c4ca560",
        name: "Khoa mắt",
        hospitalId: "8e8e67e0-b971-4efc-b563-587d6e5675d3",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/eye.png?alt=media&token=bb32716e-5bd8-4200-aca3-f7062019d681',

      },
      {
        departmentId: "7c9deee2-6ba0-40ad-b066-4baa1954a2bc",
        name: "Khoa nội tổng quát",
        hospitalId: "8e8e67e0-b971-4efc-b563-587d6e5675d3",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/internal.png?alt=media&token=8b5a5a15-1d71-49df-817c-b8e0ae15363d',

      },

      {
        departmentId: "d5fc42af-58b8-425f-9402-b9be2b163d83",
        name: "Khoa nội tổng quát",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/internal.png?alt=media&token=8b5a5a15-1d71-49df-817c-b8e0ae15363d',

      },
      {
        departmentId: "0f20fec9-6d62-4ebd-9020-74f44416bcb5",
        name: "Khoa thẩm mỹ",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/beauty.png?alt=media&token=1baf5541-2e64-4f9c-bed5-064a62a4289e',

      },
      {
        departmentId: "a8c62057-ae37-4480-bb26-813ce70c8854",
        name: "Khoa vật lý trị liệu",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/physical.png?alt=media&token=55a6ba2d-88a6-4f1d-99a3-76e35d76f408',

      },
      {
        departmentId: "fe214c8a-b65b-44ee-bdc7-7b06dbcbfa53",
        name: "Khoa sản",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/obstetrics.png?alt=media&token=62131666-81df-4244-bde2-cc52517ce23f',

      },
      {
        departmentId: "918b7b6a-39ec-488a-a0dc-42472fd41b03",
        name: "Khoa tai mũi họng",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/ear.png?alt=media&token=85aaf524-93ed-4552-921c-78d3fa4d60d7',

      },
      {
        departmentId: "87f53e6d-610f-4a62-b3c9-2c88c424e5b8",
        name: "Hóa răng hàm mặt",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/tooth.png?alt=media&token=04e1a5b4-1ff6-4403-832a-a86a747b641f',

      },
      {
        departmentId: "f59c002a-2a50-40a2-be02-f1985af14655",
        name: "Khoa dược",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/medicine.png?alt=media&token=0ea96daa-092d-4461-be71-9ddc02838153',

      },
      {
        departmentId: "5ab81068-d900-41f8-9b5c-1ff7936b1d23",
        name: "Khoa cấp cứu",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/emergency.png?alt=media&token=bd8e3b39-0193-45e8-a7e7-54da27142e55',
      },
      {
        departmentId: "fce660bd-8293-4a06-a4b0-693494e0cf79",
        name: "Khoa da liễu",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/skin.png?alt=media&token=d5408a0f-510a-4608-ac9c-a7669dfc072a',
      },
      {
        departmentId: "92d2456c-2cc9-4ad6-8e1e-bbb6074755d7",
        name: "Khoa tâm lý",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/mental.png?alt=media&token=a9ca9f11-de18-4374-8c62-aa4469314ff6',
      },
      {
        departmentId: "e553a3fd-40a8-43d4-be1b-7b8ffb7e4486",
        name: "Khoa Nhi",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/kid.png?alt=media&token=bed74b05-e4b7-4f37-b54b-762415aea851',

      },
      {
        departmentId: "7f3a894c-29d7-4347-b15c-7fea71bcc9ab",
        name: "Khoa ngoại tổng quát",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/external.png?alt=media&token=0d0e98ee-7dfb-4234-b15e-ce8b39958965',

      },
      {
        departmentId: "9108105f-0ed9-4cb3-b7f9-6d8285ebe8ec",
        name: "Khoa thần kinh",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/mental.png?alt=media&token=a9ca9f11-de18-4374-8c62-aa4469314ff6',

      },
      {
        departmentId: "8e8d3ed1-f49c-4ada-9905-218c5b6b32c1",
        name: "Khoa mắt",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/eye.png?alt=media&token=bb32716e-5bd8-4200-aca3-f7062019d681',

      },
      {
        departmentId: "172d799c-919c-456a-ba4d-3b0d47d15bd7",
        name: "Khoa nội tổng quát",
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/internal.png?alt=media&token=8b5a5a15-1d71-49df-817c-b8e0ae15363d',

      },

      // ////////////

      {
        departmentId: "11ceaf3c-4cb2-46d2-824a-3ead3d45f1b9",
        name: "Khoa ngoại tổng quát",
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/external.png?alt=media&token=0d0e98ee-7dfb-4234-b15e-ce8b39958965',

      },
      {
        departmentId: "3dede18e-a24a-4484-9005-a69a4bcad580",
        name: "Khoa thần kinh",
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/mental.png?alt=media&token=a9ca9f11-de18-4374-8c62-aa4469314ff6',

      },
      {
        departmentId: "74967bc9-e282-40d2-a2b2-69902103a267",
        name: "Khoa mắt",
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/eye.png?alt=media&token=bb32716e-5bd8-4200-aca3-f7062019d681',

      },
      {
        departmentId: "3214481e-bd09-449f-b9f7-cda26cfe105c",
        name: "Khoa sản",
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/obstetrics.png?alt=media&token=62131666-81df-4244-bde2-cc52517ce23f',

      },
      {
        departmentId: "e1ab24c5-da3c-46d2-8f23-c3eef6d98a00",
        name: "Khoa tai mũi họng",
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/ear.png?alt=media&token=85aaf524-93ed-4552-921c-78d3fa4d60d7',

      },
      {
        departmentId: "f4252b8b-3a17-4f97-ac02-cd27669df2b3",
        name: "Hóa răng hàm mặt",
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/tooth.png?alt=media&token=04e1a5b4-1ff6-4403-832a-a86a747b641f',

      },
      {
        departmentId: "4f8f61c6-7863-4595-abfe-349d31eccca1",
        name: "Khoa dược",
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/medicine.png?alt=media&token=0ea96daa-092d-4461-be71-9ddc02838153',

      },
      {
        departmentId: "b01ce8dc-caad-46e0-a0ae-f53be6e240fe",
        name: "Khoa cấp cứu",
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/emergency.png?alt=media&token=bd8e3b39-0193-45e8-a7e7-54da27142e55',
      },
      {
        departmentId: "d7fdcc24-849f-47b3-924e-7147916fc1d1",
        name: "Khoa da liễu",
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/skin.png?alt=media&token=d5408a0f-510a-4608-ac9c-a7669dfc072a',
      },
      {
        departmentId: "e6f0e231-5922-46a8-b9aa-0c631cb00062",
        name: "Khoa tâm lý",
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/mental.png?alt=media&token=a9ca9f11-de18-4374-8c62-aa4469314ff6',
      },
      {
        departmentId: "3519fa92-5526-4eda-9e76-cf9c1b50ec0c",
        name: "Khoa Nhi",
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/kid.png?alt=media&token=bed74b05-e4b7-4f37-b54b-762415aea851',

      },
      {
        departmentId: "c35d89e4-b5c4-4ed0-9601-f5cd441948da",
        name: "Khoa nội tổng quát",
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/internal.png?alt=media&token=8b5a5a15-1d71-49df-817c-b8e0ae15363d',

      },
      {
        departmentId: "9dd6b9d1-74f7-4e1d-a0a9-75522a26ae85",
        name: "Khoa thẩm mỹ",
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/beauty.png?alt=media&token=1baf5541-2e64-4f9c-bed5-064a62a4289e',

      },
      {
        departmentId: "4b6c5533-5b86-4576-84ac-07b223e13097",
        name: "Khoa vật lý trị liệu",
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/physical.png?alt=media&token=55a6ba2d-88a6-4f1d-99a3-76e35d76f408',

      },

      //////////////
      
      {
        departmentId: "2dd4620b-815e-456d-8a21-9f67863795af",
        name: "Khoa ngoại tổng quát",
        hospitalId: "35dd30c7-41f0-436d-8c3e-56089d2d03f1",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/external.png?alt=media&token=0d0e98ee-7dfb-4234-b15e-ce8b39958965',

      },
      {
        departmentId: "ea002b3b-7cf8-4f61-b10a-350cf99fcd42",
        name: "Khoa thần kinh",
        hospitalId: "35dd30c7-41f0-436d-8c3e-56089d2d03f1",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/mental.png?alt=media&token=a9ca9f11-de18-4374-8c62-aa4469314ff6',

      },
      {
        departmentId: "3157e990-17a1-4988-8a09-715c969b5b62",
        name: "Khoa mắt",
        hospitalId: "35dd30c7-41f0-436d-8c3e-56089d2d03f1",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/eye.png?alt=media&token=bb32716e-5bd8-4200-aca3-f7062019d681',

      },
      {
        departmentId: "2103985c-db66-42b7-ae0a-1973857b8cc2",
        name: "Khoa nội tổng quát",
        hospitalId: "35dd30c7-41f0-436d-8c3e-56089d2d03f1",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/internal.png?alt=media&token=8b5a5a15-1d71-49df-817c-b8e0ae15363d',

      },
      {
        departmentId: "3dfa2226-e880-46de-bb17-432987da8455",
        name: "Khoa thẩm mỹ",
        hospitalId: "35dd30c7-41f0-436d-8c3e-56089d2d03f1",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/beauty.png?alt=media&token=1baf5541-2e64-4f9c-bed5-064a62a4289e',

      },
      {
        departmentId: "201a05ea-7f0b-4fec-b13f-d7bd7d0e266f",
        name: "Khoa vật lý trị liệu",
        hospitalId: "35dd30c7-41f0-436d-8c3e-56089d2d03f1",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/physical.png?alt=media&token=55a6ba2d-88a6-4f1d-99a3-76e35d76f408',

      },
      {
        departmentId: "0513a180-af2f-4ebc-93bc-42b4c109e107",
        name: "Khoa sản",
        hospitalId: "35dd30c7-41f0-436d-8c3e-56089d2d03f1",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/obstetrics.png?alt=media&token=62131666-81df-4244-bde2-cc52517ce23f',

      },
      {
        departmentId: "d6201999-6f25-4487-a056-756e666128cc",
        name: "Khoa tai mũi họng",
        hospitalId: "35dd30c7-41f0-436d-8c3e-56089d2d03f1",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/ear.png?alt=media&token=85aaf524-93ed-4552-921c-78d3fa4d60d7',

      },
      {
        departmentId: "fd9ca11f-a5e9-48af-9712-72ecbf6fc120",
        name: "Hóa răng hàm mặt",
        hospitalId: "35dd30c7-41f0-436d-8c3e-56089d2d03f1",
        avatar: 'https://firebasestorage.googleapis.com/v0/b/myhealth-3d3d4.appspot.com/o/tooth.png?alt=media&token=04e1a5b4-1ff6-4403-832a-a86a747b641f',

      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(DEPARTMENT, null, {});
  }
};