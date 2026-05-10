// ==========================
// DETAIL ROOM FIREBASE
// ==========================

const nameRoom = document.getElementById("name-room");
const personRoom = document.getElementById("person-room");
const descRoom = document.getElementById("desc-room");
const priceRoom = document.getElementById("price-room");
const imageRoom = document.getElementById("image-url");
const locationRoom = document.getElementById("location-room");

// lấy id từ URL
const queryString = window.location.search;
const id = new URLSearchParams(queryString).get("id");

console.log("Room ID:", id);

// ==========================
// LOAD ROOM DETAIL
// ==========================
async function loadRoomDetail() {
    try {
        // lấy document từ firestore
        const doc = await firebase.firestore().collection("rooms").doc(id).get();

        // kiểm tra room có tồn tại không
        if (!doc.exists) {
            Swal.fire({
                title: "ERROR",
                text: "Room not found",
                icon: "error",
            });

            return;
        }

        const room = doc.data();

        console.log(room);

        // hiển thị thông tin
        nameRoom.innerText = room.name;
        descRoom.innerText = room.description;
        locationRoom.innerText = room.location;
        personRoom.innerText = room.person;
        priceRoom.innerText = room.price;
        imageRoom.src = room.image;

        // edit link
        document.getElementById("editBtn").href = `edit-room.html?id=${id}`;
    } catch (error) {
        console.error(error);

        Swal.fire({
            title: "ERROR",
            text: error.message,
            icon: "error",
        });
    }
}

// gọi function
loadRoomDetail();

// ==========================
// DELETE ROOM
// ==========================
document.getElementById("deleteBtn").addEventListener("click", async () => {
    const result = await Swal.fire({
        title: "Bạn có chắc muốn xóa phòng này?",
        text: "Sau khi xóa sẽ không thể khôi phục!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
    });

    // nếu bấm xác nhận
    if (result.isConfirmed) {
        try {
            // xóa document firestore
            await firebase.firestore().collection("rooms").doc(id).delete();

            Swal.fire({
                title: "Deleted",
                text: "Room deleted successfully",
                icon: "success",
            });

            // quay lại trang trước
            setTimeout(() => {
                window.history.back();
            }, 1000);
        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "ERROR",
                text: error.message,
                icon: "error",
            });
        }
    }
});
