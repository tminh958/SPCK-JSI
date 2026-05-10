// ==========================
// ADD ROOM TO FIREBASE
// ==========================

document.addEventListener("DOMContentLoaded", () => {
    const btnAddRoom = document.getElementById("btn-add-room");

    const roomName = document.getElementById("name-room");
    const roomLocation = document.getElementById("location-room");
    const roomPerson = document.getElementById("person-room");
    const roomDesc = document.getElementById("desc-room");
    const roomPrice = document.getElementById("price-room");
    const imageUrl = document.getElementById("image-url");
    const imagePreview = document.getElementById("image-preview");

    // ==========================
    // IMAGE PREVIEW
    // ==========================
    imageUrl.addEventListener("input", () => {
        imagePreview.src = imageUrl.value;
    });

    // ==========================
    // ADD ROOM
    // ==========================
    btnAddRoom.addEventListener("click", async () => {
        const name = roomName.value;
        const location = roomLocation.value;
        const person = roomPerson.value;
        const description = roomDesc.value;
        const price = roomPrice.value;
        const image = imageUrl.value;

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
                title: "Adding Room...",
                didOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false,
            });

            // save to firestore
            await firebase.firestore().collection("rooms").add({
                name: name,
                location: location,
                person: person,
                description: description,
                price: price,
                image: image,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });

            Swal.fire({
                title: "Success",
                text: "Room added successfully",
                icon: "success",
            });

            // reset form
            roomName.value = "";
            roomLocation.value = "";
            roomPerson.value = "";
            roomDesc.value = "";
            roomPrice.value = "";
            imageUrl.value = "";
            imagePreview.src = "";
        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "ERROR",
                text: error.message,
                icon: "error",
            });
        }
    });
});
