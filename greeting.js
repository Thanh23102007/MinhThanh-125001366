// ==============================================================================
// 1. CHỨC NĂNG CHÀO MỪNG THEO THỜI GIAN THỰC (DÙNG IF...ELSE)
// ==============================================================================
function showGreeting() {
    const hour = new Date().getHours();
    let message = "";

    // Phân loại mốc thời gian bằng if...else
    if (hour >= 5 && hour < 12) {
        message = "Chào buổi sáng! Chúc bạn một ngày mới tràn đầy năng lượng!";
    } else if (hour >= 12 && hour < 18) {
        message = "Chào buổi chiều! Chúc bạn làm việc thật hiệu quả!";
    } else {
        message = "Chào buổi tối! Chúc bạn có thời gian nghỉ ngơi thư giãn!";
    }

    // Hiển thị thông báo Toast lên giao diện (liên kết với thanh3.css)
    const toast = document.createElement("div");
    toast.className = "greeting-toast show";
    toast.textContent = message;
    document.body.appendChild(toast);

    // Tự biến mất sau 4 giây
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// ==============================================================================
// 2. CHỨC NĂNG HIỂN THỊ DANH SÁCH SẢN PHẨM / DỊCH VỤ (DÙNG VÒNG LẶP FOR / WHILE)
// ==============================================================================

// Mảng chứa danh sách dữ liệu mẫu sản phẩm / dịch vụ
const productList = [
    {
        name: "Smart Color Palette App",
        time: "Tháng 2 / 2026",
        desc: "Ứng dụng web giúp nhà thiết kế quản lý mã màu, tùy chỉnh biến CSS trực tiếp trên trình duyệt.",
        image: "trg.webp",
        linkText: "Xem Source Code"
    },
    {
        name: "E-commerce Landing Page",
        time: "Tháng 1 / 2026",
        desc: "Trang thương mại điện tử mẫu tương thích đa thiết bị (Mobile, Tablet, Desktop) với CSS Grid.",
        image: "cau.webp",
        linkText: "Xem Trang Trực Tuyến"
    },
    {
        name: "Dịch Vụ Thiết Kế UI/UX & Web",
        time: "Tháng 3 / 2026",
        desc: "Dịch vụ phát triển website chuẩn SEO, tối ưu tốc độ tải trang và trải nghiệm người dùng hiện đại.",
        image: "banner.webp",
        linkText: "Xem Chi Tiết"
    }
];

/**
 * Hàm tự động sinh giao diện HTML từ mảng dữ liệu bằng vòng lặp
 */
function renderProducts() {
    const container = document.getElementById("product-list");
    if (!container) return;

    let htmlContent = "";

    // SỬ DỤNG VÒNG LẶP FOR:
    for (let i = 0; i < productList.length; i++) {
        const item = productList[i];
        htmlContent += `
            <div class="project-card">
                <img src="${item.image}" alt="${item.name}" class="project-img" loading="lazy">
                <div class="item-title">${item.name}</div>
                <div class="item-time">${item.time}</div>
                <p>${item.desc}</p>
                <a href="#" class="btn">${item.linkText}</a>
            </div>
        `;
    }

    /* 
    // HOẶC NẾU MUỐN DÙNG VÒNG LẶP WHILE:
    let i = 0;
    while (i < productList.length) {
        const item = productList[i];
        htmlContent += `
            <div class="project-card">
                <img src="${item.image}" alt="${item.name}" class="project-img" loading="lazy">
                <div class="item-title">${item.name}</div>
                <div class="item-time">${item.time}</div>
                <p>${item.desc}</p>
                <a href="#" class="btn">${item.linkText}</a>
            </div>
        `;
        i++;
    }
    */

    // Đổ toàn bộ HTML vừa sinh tự động vào container
    container.innerHTML = htmlContent;
}

// Khởi chạy khi DOM đã sẵn sàng
window.addEventListener("DOMContentLoaded", () => {
    showGreeting();
    renderProducts();
});
