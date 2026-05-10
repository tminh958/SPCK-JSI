const btnAddRoom = document.getElementById("btn-add-room");
const name = document.getElementById("name-room");
const person = document.getElementById("person-room");
const desc = document.getElementById("desc-room");
const price = document.getElementById("price-room");
const image = document.getElementById("image-url");
let imagePreview = document.getElementById("image-preview");

const queryString = window.location.search;
// lấy ra danh sách từ localStorage
const rooms = JSON.parse(localStorage.getItem("rooms")) || [];

// lấy id từ URL
const roomId = Number(queryString.split("?")[1]);

// tìm id tương ứng
const room = rooms.find((r) => r.id === roomId);
// hiển thị thông tin lên các input để chỉnh sửa
if (room) {
    name.value = room.name;
    location.value = room.location;
    person.value = room.person;
    desc.value = room.desc;
    price.value = room.price;
    image.value = room.image;
    imagePreview.src = room.image;
}

btnAddRoom.addEventListener("click", () => {
    // kiểm tra dữ liệu hợp lệ
    if (!name) {
        alert("Vui lòng nhập tên món ăn");
        return;
    }
    if (!location) {
        alert("Vui lòng nhập tên món ăn");
        return;
    }
    if (!person) {
        alert("Vui lòng nhập tên món ăn");
        return;
    }
    if (!desc) {
        alert("Vui lòng nhập mô tả món ăn");
        return;
    }
    if (!image) {
        alert("Vui lòng nhập URL hình ảnh món ăn");
        return;
    }
    if (!price) {
        alert("Vui lòng nhập tên món ăn");
        return;
    }

    // tìm index cần cập nhật
    const roomIndex = rooms.findIndex((r) => r.id === roomId);

    // cập nhật thông tin
    if (roomIndex !== -1) {
        rooms[roomIndex] = {
            id: roomId, // giữ nguyên id
            name: name.value,
            location: location.value,
            person: person.value,
            desc: desc.value,
            price: price.value,
            image: image.value,
        };

        // lưu danh sách vào localStorage
        localStorage.setItem("rooms", JSON.stringify(rooms));

        // chuyển về trang danh sách
        window.location.href = "index.html";
    }
});
