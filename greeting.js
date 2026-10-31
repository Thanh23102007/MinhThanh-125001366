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

// ==============================================================================
// 3. HOẠT ĐỘNG 2: "LIGHT SWITCH" - BẬT/TẮT BÓNG ĐÈN (45 PHÚT)
// ==============================================================================
/**
 * Hướng dẫn: Tạo một nút bấm và một hình ảnh cái đèn. Khi bấm nút, hình ảnh đổi từ
 * "đèn tắt" sang "đèn sáng" bằng cách thay đổi thuộc tính src.
 * 
 * Prompt mẫu: "Viết mã JS để khi tôi click vào một nút có id là 'toggle-btn', nó sẽ thay đổi
 * màu nền của body từ trắng sang đen và ngược lại (Dark mode đơn giản)."
 */
function initLightSwitch() {
    const toggleBtn = document.getElementById("toggle-btn");
    const lightBulb = document.getElementById("light-bulb");
    const bulbStatus = document.getElementById("bulb-status");
    const bulbRoom = document.getElementById("bulb-room");
    const darkModeBtn = document.getElementById("darkmode-toggle-btn");

    if (!toggleBtn || !lightBulb) return;

    // Biến trạng thái theo dõi bóng đèn đang Bật hay Tắt (boolean)
    let isBulbOn = false;

    // Lắng nghe sự kiện click trên nút có id 'toggle-btn'
    toggleBtn.addEventListener("click", () => {
        // Đảo ngược trạng thái
        isBulbOn = !isBulbOn;

        if (isBulbOn) {
            // Thay đổi thuộc tính src sang ảnh đèn sáng
            lightBulb.src = "bulb-on.svg";
            lightBulb.alt = "Bóng đèn đang bật sáng";
            toggleBtn.textContent = "Tắt đèn";
            toggleBtn.classList.add("btn-on");

            if (bulbStatus) {
                bulbStatus.textContent = "Trạng thái: Đèn đang BẬT";
                bulbStatus.classList.add("status-on");
            }
            if (bulbRoom) {
                bulbRoom.classList.add("lit");
            }
        } else {
            // Thay đổi thuộc tính src sang ảnh đèn tắt
            lightBulb.src = "bulb-off.svg";
            lightBulb.alt = "Bóng đèn đang tắt";
            toggleBtn.textContent = "Bật đèn";
            toggleBtn.classList.remove("btn-on");

            if (bulbStatus) {
                bulbStatus.textContent = "Trạng thái: Đèn đang TẮT";
                bulbStatus.classList.remove("status-on");
            }
            if (bulbRoom) {
                bulbRoom.classList.remove("lit");
            }
        }
    });

    // Bổ trợ thực thi theo Prompt mẫu: Đổi màu nền body từ trắng sang đen (Dark mode đơn giản)
    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            darkModeBtn.textContent = isDark ? "Chế độ Sáng (Light)" : "Chế độ Dark Mode";
        });
    }
}

// ==============================================================================
// 4. HOẠT ĐỘNG 3: "LIVE INPUT" - PHẢN HỒI TỨC THÌ (30 PHÚT)
// ==============================================================================
/**
 * Hướng dẫn: Tạo một ô <input>. Khi người dùng gõ chữ vào ô đó, nội dung ngay lập tức
 * xuất hiện ở một thẻ <span> bên cạnh.
 * 
 * Prompt mẫu: "Sử dụng sự kiện 'input' trong JavaScript để lấy giá trị từ một ô text và hiển
 * thị nó ngay lập tức vào một thẻ h2 bên dưới."
 */
function initLiveInput() {
    const liveInput = document.getElementById("live-input");
    const liveSpan = document.getElementById("live-span");
    const liveHeading = document.getElementById("live-heading");

    if (!liveInput) return;

    // Lắng nghe sự kiện 'input' kích hoạt tức thì mỗi khi giá trị ô nhập thay đổi
    liveInput.addEventListener("input", (event) => {
        // Lấy giá trị chuỗi văn bản từ ô text
        const value = event.target.value.trim();

        // 1. Hiển thị ngay lập tức vào thẻ <span> bên cạnh (theo Hướng dẫn)
        if (liveSpan) {
            liveSpan.textContent = value !== "" ? value : "(Chưa nhập gì...)";
        }

        // 2. Hiển thị ngay lập tức vào thẻ <h2> bên dưới (theo Prompt mẫu)
        if (liveHeading) {
            liveHeading.textContent = value !== "" ? value : "Tiêu đề trực tiếp sẽ hiển thị ở đây";
        }
    });
}

// Khởi chạy khi DOM đã sẵn sàng
window.addEventListener("DOMContentLoaded", () => {
    showGreeting();
    renderProducts();
    initLightSwitch();
    initLiveInput();
});
