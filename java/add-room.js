const btnAddRoom = document.getElementById("btn-add-room");

btnAddRoom.addEventListener("click", () => {
    // lấy giá trị từ các input
    const name = document.getElementById("name-room").value;
    const location = document.getElementById("location-room").value;
    const person = document.getElementById("person-room").value;
    const desc = document.getElementById("desc-room").value;
    const price = document.getElementById("price-room").value;
    const image = document.getElementById("image-url").value;

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
    // tạo đối tượng mới
    const newRoom = {
        id: Date.now(),
        name: name,
        location: location,
        person: person,
        desc: desc,
        price: price,
        image: image,
    };
    // lấy danh sách món ăn từ localStorage
    const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
    // thêm đối tượng mới vào danh sách
    rooms.push(newRoom);
    // lưu danh sách đối tượng vào localStorage
    localStorage.setItem("rooms", JSON.stringify(rooms));
    // chuyển về trang
    window.location.href = "index.html";
});
