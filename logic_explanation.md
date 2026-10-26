# Giải Thích Logic Mã Nguồn JavaScript: Lời Chào Thời Gian Thực & Sinh Giao Diện Bằng Vòng Lặp

Tài liệu này giải thích chi tiết và mạch lạc hai chức năng JavaScript quan trọng được tích hợp vào trang web `thanh3.html`.

---

## PHẦN 1: THÔNG BÁO CHÀO MỪNG THEO THỜI GIAN THỰC (IF...ELSE)

### 1. Mã nguồn thực thi
```javascript
function showGreeting() {
    // 1. Lấy giờ hệ thống của thiết bị (từ 0 đến 23)
    const hour = new Date().getHours();
    let message = "";

    // 2. Cấu trúc if...else phân loại lời chào
    if (hour >= 5 && hour < 12) {
        message = "Chào buổi sáng! Chúc bạn một ngày mới tràn đầy năng lượng!";
    } else if (hour >= 12 && hour < 18) {
        message = "Chào buổi chiều! Chúc bạn làm việc thật hiệu quả!";
    } else {
        message = "Chào buổi tối! Chúc bạn có thời gian nghỉ ngơi thư giãn!";
    }

    // 3. Hiển thị Toast
    const toast = document.createElement("div");
    toast.className = "greeting-toast show";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 4000);
}
```

### 2. Chi tiết hoạt động
* **`new Date().getHours()`**:
  * `new Date()` khởi tạo đối tượng thời gian tại đúng thời điểm người dùng vào trang web.
  * `.getHours()` trích xuất phần giờ dưới dạng số nguyên từ `0` đến `23`.
* **Cấu trúc rẽ nhánh `if...else if...else`**:
  * `hour >= 5 && hour < 12`: Đoạn giờ từ 5:00 đến trước 12:00 (tối đa 11:59:59) -> Chào buổi sáng.
  * `hour >= 12 && hour < 18`: Đoạn giờ từ 12:00 đến trước 18:00 (tối đa 17:59:59) -> Chào buổi chiều.
  * `else`: Các giờ còn lại (`18..23` và `0..4`) bắc qua ranh giới nửa đêm -> Chào buổi tối.

---

## PHẦN 2: TỰ ĐỘNG SINH DANH SÁCH SẢN PHẨM / DỊCH VỤ (VÒNG LẶP FOR / WHILE)

### 1. Tại sao không nên viết HTML tĩnh cho từng sản phẩm?
* Khi có nhiều sản phẩm, nếu viết HTML thủ công cho từng mục sẽ khiến mã nguồn bị trùng lặp, cồng kềnh và rất khó bảo trì.
* Trong thực tế, dữ liệu thường được lấy từ API hoặc cơ sở dữ liệu dưới dạng mảng các đối tượng (`Array of Objects`). Sử dụng vòng lặp trong JavaScript giúp **tách bạch giữa dữ liệu (Data) và giao diện (View)**.

### 2. Dữ liệu mẫu (Data Model)
```javascript
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
```

### 3. Cơ chế hoạt động của hàm `renderProducts()`

#### Cách 1: Sử dụng vòng lặp `for` (Khuyên dùng)
```javascript
function renderProducts() {
    const container = document.getElementById("product-list");
    if (!container) return;

    let htmlContent = "";

    // Vòng lặp for duyệt từ phần tử đầu tiên (index = 0) đến phần tử cuối cùng
    for (let i = 0; i < productList.length; i++) {
        const item = productList[i];
        
        // Nối chuỗi HTML sử dụng Template Literals (`...`)
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

    // Đổ toàn bộ cây giao diện vừa sinh vào container trên trang
    container.innerHTML = htmlContent;
}
```

* **Khởi tạo (`let i = 0`)**: Bắt đầu duyệt từ vị trí chỉ mục `0` của mảng `productList`.
* **Điều kiện dừng (`i < productList.length`)**: Vòng lặp tiếp tục chạy chừng nào `i` còn nhỏ hơn tổng số lượng phần tử của mảng.
* **Bước nhảy (`i++`)**: Tăng chỉ số `i` lên 1 sau mỗi lần lặp để chuyển sang phần tử tiếp theo.
* **Truy xuất phần tử (`productList[i]`)**: Lấy ra từng đối tượng sản phẩm và đưa các thuộc tính (`name`, `desc`, `image`, v.v.) vào khuôn mẫu HTML thông qua cú pháp Template Literals (dấu backtick `` ` `` và biểu thức `${...}`).

---

#### Cách 2: Sử dụng vòng lặp `while`
Nếu muốn sử dụng vòng lặp `while`, logic xử lý hoàn toàn tương đương:

```javascript
function renderProductsWhile() {
    const container = document.getElementById("product-list");
    if (!container) return;

    let htmlContent = "";
    let i = 0; // Bước 1: Khởi tạo biến đếm

    // Bước 2: Kiểm tra điều kiện lặp
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

        i++; // Bước 3: Tăng biến đếm (Bắt buộc để tránh vòng lặp vô tận)
    }

    container.innerHTML = htmlContent;
}
```

---

## 4. Tổng Kết Luồng Thực Thi
1. Trình duyệt tải trang web `thanh3.html`.
2. Khi sự kiện `DOMContentLoaded` phát ra:
   * Hàm `showGreeting()` chạy -> lấy giờ qua `new Date().getHours()` -> dùng `if...else` chọn lời chào -> hiển thị Toast.
   * Hàm `renderProducts()` chạy -> duyệt mảng `productList` bằng vòng lặp `for`/`while` -> tự động sinh các thẻ `.project-card` và chèn vào `<div id="product-list"></div>`.
