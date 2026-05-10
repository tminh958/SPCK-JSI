// ==========================
// CHECK LOGIN FIREBASE
// ==========================

const btnLogin = document.getElementById("btnLogin");
const btnRegis = document.getElementById("btnRegis");
const profile = document.getElementById("profile");
const greeting = document.getElementById("greeting");
const btnLogout = document.getElementById("btn-logout");

// lắng nghe trạng thái đăng nhập
firebase.auth().onAuthStateChanged((user) => {
    // nếu đã đăng nhập
    if (user) {
        console.log("Logged in:", user);

        // ẩn nút login/register
        btnLogin.classList.add("hidden");
        btnRegis.classList.add("hidden");

        // hiện profile
        profile.classList.remove("hidden");

        // hiển thị tên user
        greeting.innerText = `Xin chào, ${user.displayName || user.email}`;
    } else {
        console.log("No user");

        // hiện login/register
        btnLogin.classList.remove("hidden");
        btnRegis.classList.remove("hidden");

        // ẩn profile
        profile.classList.add("hidden");
    }
});

// ==========================
// LOGOUT
// ==========================
btnLogout.addEventListener("click", async () => {
    try {
        await firebase.auth().signOut();

        Swal.fire({
            title: "Đăng xuất thành công",
            icon: "success",
        });

        // reload page
        setTimeout(() => {
            window.location.reload();
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
