const { HOSPITAL } = require('../migrations/table_name');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(HOSPITAL, [
      {
        hospitalId: "f7fdfaf0-7f60-44b6-8d37-69c47c2c21cd",
        description: `Bệnh viện Đại học Y Hà Nội được thành lập theo Quyết định số 137/QĐ-BYT ngày 16/01/2007 của Bộ trưởng Bộ Y tế và chính thức đi vào hoạt động ngày 19/9/2007.
        Bệnh viện Đại học Y Hà Nội thành lập là niềm mong muốn, ước mơ của nhiều thế hệ thầy và trò Trường Đại học Y Hà Nội.
        Quá trình xây dựng và trưởng thành, Bệnh viện đã có những bước phát triển vượt bậc, đạt được nhiều thành tựu to lớn, toàn diện về mọi mặt, tạo sự tín nhiệm trong lòng người bệnh và nhân dân cả nước cũng như bạn bè quốc tế, củng cố thêm niềm tự hào và ý chí quyết tâm vững bước tương lai.
        Bệnh viện những ngày đầu thành lập còn rất sơ khai, thiếu nhân lực, thiếu trang thiết bị, chưa có nguồn bệnh nhân, không có kinh phí của Nhà nước, khó khăn trăm bề. Bệnh viện đã vượt khó: từ chỗ chỉ có 150 giường bệnh với hơn 150 CBVC; chỉ có 4 phòng chức năng, 02 khoa lâm sàng, 05 khoa cận lâm sàng; số bệnh nhân nhân đến khám bệnh chỉ có 50.000 người/năm.
        Đến nay, Bệnh viện đã có 500 giường bệnh với hơn 1000 CBVC là các thầy thuốc là GS, PGS, TS, ThS… gồm trên 600 CB cơ hữu, hơn 100 CB kiêm nhiệm và trên 300 CB của Trường Đại học Y Hà Nội tham gia công tác chuyên môn; 43 đơn vị gồm 10 phòng chức năng, 08 trung tâm, 18 khoa lâm sàng, 07 khoa cận lâm sàng; số bệnh nhân đến khám bệnh hơn 500.000 người/năm, có những ngày có gần 3.000 người đến khám bệnh tại Bệnh viện.`,
        userId: '7b42a0e5-4d75-42c1-9c39-1852a9a7b2ae'
      },
      {
        hospitalId: "8e8e67e0-b971-4efc-b563-587d6e5675d3",
        description: 'Bệnh Viện Đa Khoa Hồng Đức ra đời vào tháng 9 năm 2000 có thể nói là một trong những nơi khám chữa bệnh uy tín. Hàng năm, bệnh viện Hồng Đức khám và điều trị cho hàng trăm ngàn bệnh nhân, hơn 5.000 bệnh nhân nội trú và phẫu thuật nội soi hơn 2.000 ca. Bệnh Viện Đa Khoa Hồng Đức đã hợp tác và ký kết cùng với những đối tác hàng đầu, được chuyển giao nhiều công nghệ chính thức và chuyên môn nhằm hỗ trợ khả năng chẩn đoán và thực hành cho đội ngũ y bác sĩ.',
        userId: '3c07be87-1c23-4d91-9fcd-6186c61f258a'
      },
      {
        hospitalId: "cca2c6dc-f9dc-4560-ab75-154fcfeb529c",
        description: 'Phòng khám Đa khoa Quốc Tế Hà Nội số 152 Xã Đàn là cơ sở y tế chuyên khoa bệnh phụ khoa trực thuộc sự quản lý của Sở Y Tế, tiền thân của Trung tâm Chăm Sóc Sức Khỏe Sinh Sản Hà Nội hiện là Bệnh Viện Phụ Sản Hà Nội Cơ Sở 2, nhận được nhiều bằng khen, giấy khen vì những đóng góp trong ngành Y tế.',
        userId: '72f24184-2d30-4f2b-b996-81e0e17d964f'
      },
      {
        hospitalId: "4ef9c725-d451-473a-b9bd-b0b6e05db155",
        description: 'Bệnh viện phụ sản hà nội uy tín là nơi khám định kỳ cũng như khám chữa bệnh ngay khi có bạn triệu chứng bất thường.Theo số liệu thống kê, 90% chị em phụ nữ mắc bệnh phụ khoa ít nhất một lần trong đời. Trong đó, có rất nhiều trường hợp tái nhiễm nhiều lần. Mặc dù bệnh phụ khoa không nguy hiểm tới tính mạng người bệnh. Nhưng nếu như bệnh kéo dài, tái phát nhiều lần có nguy cơ vô sinh, thậm chí ung thư là rất lớn.',
        userId: '0e712f2e-6180-40e4-81ce-5e0d33c6e25b'
      },
      {
        hospitalId: "4fab9aca-acd3-4956-8e83-cabf6213559f",
        description: 'Bệnh viện Quân y 354 thuộc Cục Quân y - Tổng cục Hậu cần - Bộ quốc phòng. Bệnh viên gồm 8 khoa nội, 7 khoa ngoại, 8 khối cận lâm sàng. Bệnh viện Quân y 354 có nhiệm vụ là thu dung, cấp cứu và điều trị cho hơn 100 đầu mối tuyến, với quy mô hơn 250 giường bệnh, đối tượng phục vụ đa dạng, bao gồm: Cán bộ cấp tướng, cấp tá, cấp uý, QNCN, HSQ-CS, CNVQP, các đối tượng chính sách của cơ quan Bộ Quốc phòng, các quân binh chủng, các Tổng cục, bảo hiểm y tế và dịch vụ y tế (trong đó phần đông cán bộ quân đội và cán bộ nhà nước nghỉ hưu). Đồng thời sẵn sàng tham gia làm các nhiệm vụ khác khi có yêu cầu của cấp trên. Bệnh viện tọa lạc tại địa chỉ số 120 Đốc Ngữ, Vĩnh Phú, Ba Đình, Hà Nội, Việt Nam',
        userId: '1d9a48e9-759b-4fb4-9b9c-1a75e0d5f2b3'
      },
      {
        hospitalId: "35dd30c7-41f0-436d-8c3e-56089d2d03f1",
        description: 'Là bệnh viện tư nhân đầu tiên của Việt Nam, được thành lập năm 1997 bởi bác sĩ Vũ Thị Tư Hằng. Bệnh viện có quy mô 100 giường nội trú, khám chữa bệnh đa khoa. Mũi nhọn chuyên sâu là điều trị bướu cổ - Basedow. ',
        userId: 'ea17d0b7-d333-4d72-9aef-d6df94a19fa2'
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(HOSPITAL, null, {});
  }
};