// LOGIN PAGE

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const googleLoginBtn = document.getElementById("googleLogin");

    // Google Provider
    const provider = new firebase.auth.GoogleAuthProvider();

    // =========================
    // LOGIN WITH EMAIL
    // =========================
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;

        // kiểm tra dữ liệu rỗng
        if (!email || !password) {
            Swal.fire({
                title: "ERROR",
                text: "Vui lòng nhập đầy đủ thông tin",
                icon: "error",
            });
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
            // đăng nhập firebase
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

            const user = userCredential.user;

            console.log("Login success:", user);

            Swal.fire({
                title: "Đăng nhập thành công",
                text: `Welcome ${user.email}`,
                icon: "success",
            });

            // reset form
            loginForm.reset();

            // chuyển trang
            window.location.href = "index.html";
        } catch (error) {
            console.error("Login error:", error);

            Swal.fire({
                title: "Login Failed",
                text: error.message,
                icon: "error",
            });
        }
    });

    // =========================
    // LOGIN WITH GOOGLE
    // =========================
    googleLoginBtn.addEventListener("click", async () => {
        try {
            const result = await firebase.auth().signInWithPopup(provider);

            const user = result.user;

            console.log("Google login success:", user);

            Swal.fire({
                title: "Google Login Success",
                text: `Xin chào ${user.displayName}`,
                icon: "success",
            });

            // chuyển trang
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
});
