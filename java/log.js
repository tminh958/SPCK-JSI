// chờ cho tới khi trang được tải xong hết thì mới thực hiện câu lệnh bên trong

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    console.log(loginForm);

    // lắng nghe sự kiện submit trên form đăng ký
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // ngăn chặn hành vi mặc định của form
        let phoneNumber = e.target.phoneNumber.value;
        let password = e.target.password.value;

        if (!phoneNumber || !password) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        //lấy ra dữ liệu trong localStorage
        // chuyển đổi chuỗi JSON thành mảng đối tượng
        let users = JSON.parse(localStorage.getItem("users")) || [];

        //kiểm tra email đã tồn tại chưa
        let userExists = users.find((user) => user.phoneNumber === phoneNumber && user.password === password);
        console.log(userExists);
        // nếu không tìm thấy thì báo lỗi
        if (!userExists) {
            Swal.fire({
                title: "Đăng nhập thất bại",
                text: " sdt hoặc mật khẩu không đúng.",
                icon: "error",
            });
            return;
        }
        // tạo người dùng mới
        let newUser = {
            phoneNumber: userExists.phoneNumber,
            password: userExists.password,
        };
        // lưu người dùng hiện tại vào localStorage
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        Swal.fire({
            title: "Đăng nhập thành công",
            icon: "success",
            // nếu bấm vào nút ok thì di chuyển về trang chủ
            willClose: () => {
                window.location.href = "index.html";
            },
        });
    });
});
