var btnLogin = document.getElementById("btnLogin");
var btnRegis = document.getElementById("btnRegis");
var profile = document.getElementById("profile");
var greeting = document.getElementById("greeting");
var btnLogout = document.getElementById("btn-logout");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
console.log(currentUser);

// nếu đã đăng nhập thì ẩn nút đăng nhập và hiện thị thông tin người dùng
if (currentUser) {
    btnLogin.classList.add("hidden");
    btnRegis.classList.add("hidden");
    profile.classList.remove("hidden");
    greeting.innerText = `Xin chào, ${currentUser.phoneNumber}`;
} else {
    btnLogin.classList.remove("hidden");
    btnRegis.classList.remove("hidden");
    profile.classList.add("hidden");
}

// đăng xuất
btnLogout.addEventListener("click", () => {
    console.log("dsfsd");
    localStorage.removeItem("currentUser");
    window.location.reload();
});
