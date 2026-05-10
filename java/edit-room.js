// ==========================
// EDIT ROOM FIREBASE
// ==========================

const btnAddRoom = document.getElementById("btn-add-room");

const nameRoom = document.getElementById("name-room");
const locationRoom = document.getElementById("location-room");
const personRoom = document.getElementById("person-room");
const descRoom = document.getElementById("desc-room");
const priceRoom = document.getElementById("price-room");
const imageRoom = document.getElementById("image-url");
const imagePreview = document.getElementById("image-preview");

// lấy id từ URL
const queryString = window.location.search;
const roomId = new URLSearchParams(queryString).get("id");

console.log("Room ID:", roomId);

// ==========================
// LOAD ROOM DATA
// ==========================
async function loadRoom() {
    try {
        const doc = await firebase.firestore().collection("rooms").doc(roomId).get();

        // kiểm tra tồn tại
        if (!doc.exists) {
            Swal.fire({
                title: "ERROR",
                text: "Room not found",
                icon: "error",
            });

            return;
        }

        const room = doc.data();

        // hiển thị dữ liệu lên input
        nameRoom.value = room.name;
        locationRoom.value = room.location;
        personRoom.value = room.person;
        descRoom.value = room.description;
        priceRoom.value = room.price;
        imageRoom.value = room.image;
        imagePreview.src = room.image;
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
loadRoom();

// ==========================
// IMAGE PREVIEW
// ==========================
imageRoom.addEventListener("input", () => {
    imagePreview.src = imageRoom.value;
});

// ==========================
// UPDATE ROOM
// ==========================
btnAddRoom.addEventListener("click", async () => {
    // lấy value
    const name = nameRoom.value;
    const location = locationRoom.value;
    const person = personRoom.value;
    const description = descRoom.value;
    const price = priceRoom.value;
    const image = imageRoom.value;

    // validation
    if (!name || !location || !person || !description || !price || !image) {
        Swal.fire({
            title: "ERROR",
            text: "Please fill all fields",
            icon: "error",
        });

        return;
    }

    try {
        Swal.fire({
            title: "Updating...",
            didOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false,
        });

        // update firestore
        await firebase.firestore().collection("rooms").doc(roomId).update({
            name: name,
            location: location,
            person: person,
            description: description,
            price: price,
            image: image,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        Swal.fire({
            title: "Success",
            text: "Room updated successfully",
            icon: "success",
        });

        // chuyển trang
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } catch (error) {
        console.error(error);

        Swal.fire({
            title: "ERROR",
            text: error.message,
            icon: "error",
        });
    }
});
