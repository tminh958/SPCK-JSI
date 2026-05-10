const name = document.getElementById("name-room");
const person = document.getElementById("person-room");
const desc = document.getElementById("desc-room");
const price = document.getElementById("price-room");
const image = document.getElementById("image-url");

const queryString = window.location.search;
const id = queryString.split("?")[1];

// lấy ra danh sác từ localStorage
const rooms = JSON.parse(localStorage.getItem("rooms")) || [];

// tìm id tương ứng
const room = rooms.find((r) => r.id == id);

//dele func
document.getElementById("deleteBtn").addEventListener("click", () => {
    Swal.fire({
        title: `Bạn có chắc chắn muốn xóa này không?`,
        text: "Sau khi xóa bạn sẽ không thể khôi phục lại!",
        icon: "info",
        willClose() {
            // tìm index cần xóa
            const roomIndex = rooms.findIndex((r) => r.id == id);
            console.log(roomIndex);
            // xóa khỏi mảng
            if (roomIndex !== -1) {
                rooms.splice(roomIndex, 1);
                // lưu lại mảng sau khi xóa vào localStorage
                localStorage.setItem("rooms", JSON.stringify(rooms));
                // làm mới lại trang
                window.history.back();
            }
        },
    });
});
// const handleDeleteRoom = (id) => {
//     Swal.fire({
//         title: `Bạn có chắc chắn muốn xóa này không?`,
//         text: "Sau khi xóa bạn sẽ không thể khôi phục lại!",
//         icon: "info",
//         willClose() {
//             // tìm index của món ăn cần xóa
//             const roomIndex = rooms.findIndex((r) => r.id === id);
//             // xóa món ăn khỏi mảng
//             if (roomIndex !== -1) {
//                 rooms.splice(roomIndex, 1);
//                 // lưu lại mảng sau khi xóa vào localStorage
//                 localStorage.setItem("rooms", JSON.stringify(rooms));
//                 // làm mới lại trang
//                 window.location.reload();
//             }
//         },
//     });
// };

// edit phòng khi bấm nút edit
document.getElementById("editBtn").href = `edit-room.html?${room.id}`;

// hiển thị thông tin lên trang
if (room) {
    name.innerText = room.name;
    desc.innerText = room.desc;
    location.innerText = room.location;
    person.innerText = room.person;
    price.innerText = room.price;
    image.src = room.image;
}
