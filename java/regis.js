// chờ cho tới khi trang được tải xong hết thì mới thực hiện câu lệnh bên trong

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const googleLoginBtn = document.getElementById("googleLogin");

    // Google provider
    var provider = new firebase.auth.GoogleAuthProvider();

    // ================= GOOGLE LOGIN =================
    googleLoginBtn.addEventListener("click", async () => {
        try {
            const result = await firebase.auth().signInWithPopup(provider);

            // Signed-in user info
            var user = result.user;

            console.log("Google login success:", user);

            Swal.fire({
                title: "Đăng nhập Google thành công!",
                text: `Xin chào ${user.displayName}`,
                icon: "success",
            });
            window.location.href = "index.html";
        } catch (error) {
            console.error("Google login error:", error);

            Swal.fire({
                title: "Google Login Failed",
                text: error.message,
                icon: "error",
            });
        }
    });

    // ================= REGISTER =================
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;
        let repeatPassword = e.target.repeatPassword.value;

        console.log(email, password, repeatPassword);

        // regex chữ hoa, chữ thường, số
        const uppercaseRegex = /[A-Z]/;
        const lowerRegex = /[a-z]/;
        const numberRegex = /[0-9]/;

        // kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự.");
            return;
        }

        // kiểm tra chữ hoa
        if (!uppercaseRegex.test(password)) {
            alert("Mật khẩu phải chứa ít nhất một chữ cái viết hoa.");
            return;
        }

        // kiểm tra chữ thường
        if (!lowerRegex.test(password)) {
            alert("Mật khẩu phải chứa ít nhất một chữ cái viết thường.");
            return;
        }

        // kiểm tra số
        if (!numberRegex.test(password)) {
            alert("Mật khẩu phải chứa ít nhất một chữ số.");
            return;
        }

        // kiểm tra password khớp
        if (password !== repeatPassword) {
            alert("Mật khẩu không khớp.");
            return;
        }

        // loading
        Swal.fire({
            title: "Loading...",
            icon: "info",
            didOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false,
        });

        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

            var user = userCredential.user;

            console.log("Register success:", user);

            Swal.fire({
                title: "Đăng ký thành công",
                text: `Welcome ${user.email}`,
                icon: "success",
            });

            registerForm.reset();
            window.location.href = "log.html";
        } catch (error) {
            console.error("Register error:", error);

            Swal.fire({
                title: "ERROR",
                text: error.message,
                icon: "error",
            });
        }
    });
});
