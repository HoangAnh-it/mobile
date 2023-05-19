const { USER } = require('../migrations/table_name');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(USER, [
            {
                "userId": "970f5535-a8e0-4c0c-98d2-182866d43d56",
                "email": "dr.hung@gmail.com",
                "password": "$2b$10$7zg5qOrdOuFGDUSgrUP0I.3zMOfFwWv7hSLAgdOW9guxd4gSR082y",
                "name": "Vu Manh Hung",
                "birthDay": "1996-05-05",
                "avatar": "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
                "phone": "0912329742",
                "role": "DOCTOR",
                "address": "Ha Noi"
            },
            {
                "userId": "10041171-6e54-4305-a31b-1e8da04671cb",
                "email": "dr.ha@gmail.com",
                "password": "$2b$10$7zg5qOrdOuFGDUSgrUP0I.3zMOfFwWv7hSLAgdOW9guxd4gSR082y",
                "name": "Tran Hai Ha",
                "birthDay": "1996-11-11",
                "avatar": "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
                "phone": "0924357580",
                "role": "DOCTOR",
                "address": "Da Nang"
            },
            {
                "userId": "0628a0cb-b291-4a7e-b9ad-8f0c9e697079",
                "email": "dr.minh@gmail.com",
                "password": "$2b$10$7zg5qOrdOuFGDUSgrUP0I.3zMOfFwWv7hSLAgdOW9guxd4gSR082y",
                "name": "Quach Van Minh",
                "birthDay": "989-02-11",
                "avatar": "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/287084998_1683327488671501_4510915075990411134_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=AtLj97ZMMRQAX-ysl4g&_nc_ht=scontent.fhan14-2.fna&oh=00_AfBWZX_0IoSL_swl0G-F7h4eZirgYtvP_MU7Pn7Vh97svg&oe=64691255",
                "phone": "0996547580",
                "role": "DOCTOR",
                "address": "TP. Ho Chi Minh"
            },
            {
                "userId": "cbf0ca69-7459-4dcc-93b1-dfe0f1b1356b",
                "email": "dr.hoang@gmail.com",
                "password": "$2b$10$7zg5qOrdOuFGDUSgrUP0I.3zMOfFwWv7hSLAgdOW9guxd4gSR082y",
                "name": "Nguyen Viet Hoang",
                "birthDay": "2003-01-30",
                "avatar": "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/313073190_1710675175970303_4591391736121357277_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=ad2b24&_nc_ohc=lsZMDmNF_b4AX-SMxMj&_nc_ht=scontent.fhan14-2.fna&oh=00_AfBkt8qm0aDPlv6wTPzvbNqM67NFjMdQ4D_RYr-Y47EAwA&oe=64684C5B",
                "phone": "0966066770",
                "role": "DOCTOR",
                "address": "Ha Noi"
            },
            {
                "userId": "d686b15e-4bbf-496e-a8fc-566bb279feff",
                "email": "dr.soi@gmail.com",
                "password": "$2b$10$7zg5qOrdOuFGDUSgrUP0I.3zMOfFwWv7hSLAgdOW9guxd4gSR082y",
                "name": "Nguyen Thi Soi",
                "birthDay": "1973-02-08",
                "avatar": "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
                "phone": "0915577698",
                "role": "DOCTOR",
                "address": "Ha Noi"
            },
            {
                "userId": "2d683fbb-39aa-4428-8b44-c09394f8641d",
                "email": "patient@gmail.com",
                "password": "$2b$10$7zg5qOrdOuFGDUSgrUP0I.3zMOfFwWv7hSLAgdOW9guxd4gSR082y",
                "name": "Vu Hoang Anh",
                "birthDay": "2002-10-31",
                "avatar": "https://scontent.fhan14-3.fna.fbcdn.net/v/t1.6435-9/126175158_669374687280923_2953435101670281053_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=7uBwzopJBVgAX8kyIss&_nc_ht=scontent.fhan14-3.fna&oh=00_AfDrZy8rk3puOwbn6R1zEmlxst1KbqVbx2WqRKYl559f-A&oe=648B2971",
                "phone": "0981066360",
                "role": "PATIENT",
                "address": "Nam Dinh"
            },
            {
                "userId": "7b42a0e5-4d75-42c1-9c39-1852a9a7b2ae",
                "email": "yHanoi@gmail.com",
                "password": "$2b$10$7zg5qOrdOuFGDUSgrUP0I.3zMOfFwWv7hSLAgdOW9guxd4gSR082y",
                "name": "Bệnh viện Đại học Y Hà Nội",
                "birthDay": "1970-01-01",
                "avatar": "https://lh3.googleusercontent.com/p/AF1QipPzQ_lnLLYhqu8IshVWHmDtdDUJx2H1IsoFGph-=s680-w680-h510",
                "phone": "0987654321",
                "role": "HOSPITAL",
                "address": "Hà Nội, Việt Nam"
            },
            {
                "userId": "3c07be87-1c23-4d91-9fcd-6186c61f258a",
                "email": "hongduc3@gmail.com",
                "password": "$2b$10$7zg5qOrdOuFGDUSgrUP0I.3zMOfFwWv7hSLAgdOW9guxd4gSR082y",
                "name": "Bệnh viện Hồng Đức 3",
                "birthDay": "1990-05-01",
                "avatar": "https://lh3.googleusercontent.com/p/AF1QipOUi4mC_pyPfQzmpoe8r3HeNs-vkRqcv_8wd68n=s680-w680-h510",
                "phone": "0987654321",
                "role": "HOSPITAL",
                "address": "Thành phố Hồ Chí Minh"
            },
            {
                "userId": "72f24184-2d30-4f2b-b996-81e0e17d964f",
                "email": "quoc_tiep@gmail.com",
                "password": "$2b$10$7zg5qOrdOuFGDUSgrUP0I.3zMOfFwWv7hSLAgdOW9guxd4gSR082y",
                "name": "Phòng khám Bệnh Viện Quốc Tế Hà Nội",
                "birthDay": "1985-09-15",
                "avatar": "https://isofhcare-backup.s3-ap-southeast-1.amazonaws.com/images/phong-kham-da-khoa-quoc-te-ha-noi-152-xa-dan-co-tot-khong-1200x840-jpg_c63a689f_157c_447c_8742_089c901960ea.png",
                "phone": "0987654321",
                "role": "HOSPITAL",
                "address": "Hà Nội, Việt Nam"
            },
            {
                "userId": "0e712f2e-6180-40e4-81ce-5e0d33c6e25b",
                "email": "phusanhanoi@gmail.com",
                "password": "$2b$10$7zg5qOrdOuFGDUSgrUP0I.3zMOfFwWv7hSLAgdOW9guxd4gSR082y",
                "name": "Bệnh viện phụ sản Hà Nội",
                "birthDay": "1978-03-10",
                "avatar": "https://cdn.concung.com/storage/data/2021/SWEET%20BABY%20-%20GCO/b%E1%BB%87nh%20vi%E1%BB%87n%20ph%E1%BB%A5%20s%E1%BA%A3n%20H%C3%A0%20N%E1%BB%99i/benh-vien-phu-san-ha-noi%20(2).jpg",
                "phone": "0987654321",
                "role": "HOSPITAL",
                "address": "Hà Nội, Việt Nam"
            },
            {
                "userId": "1d9a48e9-759b-4fb4-9b9c-1a75e0d5f2b3",
                "email": "quany354@gmail.com",
                "password": "$2b$10$7zg5qOrdOuFGDUSgrUP0I.3zMOfFwWv7hSLAgdOW9guxd4gSR082y",
                "name": "Bệnh viện Quân Y 354",
                "birthDay": "1995-12-20",
                "avatar": "https://isofhcare-backup.s3-ap-southeast-1.amazonaws.com/images/benh-vien-quan-y-354-ivie_de44a624_c661_4876_aeff_301de8e5f6e4.jpg",
                "phone": "0987654321",
                "role": "HOSPITAL",
                "address": "Hà Nội, Việt Nam"
            },
            {
                "userId": "ea17d0b7-d333-4d72-9aef-d6df94a19fa2",
                "email": "binhdan_danang@gmail.com",
                "password": "$2b$10$7zg5qOrdOuFGDUSgrUP0I.3zMOfFwWv7hSLAgdOW9guxd4gSR082y",
                "name": "Bệnh viện Bình Dân Đà Nẵng",
                "birthDay": "1982-07-05",
                "avatar": "https://lh3.googleusercontent.com/p/AF1QipPVYgcvcls82uOPEnxcCaBqYDWX-ME3rmbFwygR=s680-w680-h510",
                "phone": "0987654321",
                "role": "HOSPITAL",
                "address": "Đà Nẵng, Việt Nam"
              }
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete(USER, null, {});
    }
};