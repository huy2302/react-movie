function togglePopover() {
    var popover = document.getElementById("popover");
    popover.style.display = popover.style.display === "block" ? "none" : "block";
}

function viewInfo() {
    alert("Xem thông tin người dùng");
    togglePopover(); // Đóng popover sau khi xem thông tin
}

function logout() {
    alert("Đăng xuất");
    togglePopover(); // Đóng popover sau khi đăng xuất
}
