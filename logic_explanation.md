# Giải Thích Logic Mã Nguồn JavaScript: Buổi 9 - Lập Trình Tương Tác & DOM Events

Tài liệu này giải thích chi tiết, mạch lạc và chuyên sâu toàn bộ các chức năng JavaScript được xây dựng và tích hợp vào trang web `thanh3.html`, bao gồm:
1. **Phần 1**: Thông báo chào mừng theo thời gian thực (`new Date()`, `if...else`).
2. **Phần 2**: Tự động sinh danh sách sản phẩm / dịch vụ (`Array of Objects`, vòng lặp `for` / `while`).
3. **Phần 3 (Hoạt động 2)**: "Light Switch" - Bật/Tắt bóng đèn & Dark Mode (`click`, đổi thuộc tính `src`, toggle class).
4. **Phần 4 (Hoạt động 3)**: "Live Input" - Phản hồi tức thì (`input` event, `event.target.value`, thẻ `<span>` bên cạnh & `<h2>` bên dưới).

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

#### Cách 2: Sử dụng vòng lặp `while`
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

## PHẦN 3: HOẠT ĐỘNG 2 - "LIGHT SWITCH" - BẬT/TẮT BÓNG ĐÈN (45 PHÚT)

### 1. Mục tiêu và Yêu cầu hoạt động
* **Hướng dẫn**: Tạo một nút bấm và một hình ảnh cái đèn. Khi bấm nút, hình ảnh đổi từ "đèn tắt" sang "đèn sáng" bằng cách thay đổi thuộc tính `src`.
* **Prompt mẫu**: *"Viết mã JS để khi tôi click vào một nút có id là 'toggle-btn', nó sẽ thay đổi màu nền của body từ trắng sang đen và ngược lại (Dark mode đơn giản)."*

### 2. Mã nguồn thực thi
```javascript
function initLightSwitch() {
    const toggleBtn = document.getElementById("toggle-btn");
    const lightBulb = document.getElementById("light-bulb");
    const bulbStatus = document.getElementById("bulb-status");
    const bulbRoom = document.getElementById("bulb-room");
    const darkModeBtn = document.getElementById("darkmode-toggle-btn");

    if (!toggleBtn || !lightBulb) return;

    // Biến trạng thái cờ (boolean flag) theo dõi bóng đèn
    let isBulbOn = false;

    // Lắng nghe sự kiện click trên nút có id 'toggle-btn'
    toggleBtn.addEventListener("click", () => {
        isBulbOn = !isBulbOn; // Đảo cờ trạng thái: false <-> true

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

    // Mở rộng thực thi theo Prompt mẫu: Đổi màu nền body từ trắng sang đen (Dark mode đơn giản)
    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            darkModeBtn.textContent = isDark ? "Chế độ Sáng (Light)" : "Chế độ Dark Mode";
        });
    }
}
```

### 3. Chi tiết hoạt động và Kiến thức cốt lõi
* **Truy xuất phần tử qua DOM**:
  * `document.getElementById("toggle-btn")`: Tìm nút bấm theo `id` duy nhất (trùng khớp với prompt mẫu).
  * `document.getElementById("light-bulb")`: Tìm thẻ `<img>` của bóng đèn.
* **Cơ chế thay đổi thuộc tính `src` (Image Source Manipulation)**:
  * Thuộc tính `src` (Source) của thẻ `<img>` quyết định file hình ảnh nào sẽ được nạp và hiển thị.
  * Trong JavaScript, ta có thể gán giá trị mới trực tiếp bằng cú pháp: `imageElement.src = "đường_dẫn_mới"`.
  * Khi người dùng click nút:
    - Nếu đèn đang tắt: `lightBulb.src = "bulb-on.svg"`, trình duyệt ngay lập tức chuyển sang hiển thị bóng đèn màu vàng rực rỡ với quầng sáng.
    - Nếu đèn đang sáng: `lightBulb.src = "bulb-off.svg"`, trình duyệt chuyển về ảnh bóng đèn xám tắt.
* **Kỹ thuật biến cờ trạng thái (`isBulbOn = !isBulbOn`)**:
  * Sử dụng một biến boolean `isBulbOn` khởi tạo ban đầu là `false`.
  * Toán tử NOT logic (`!`) giúp lật giá trị giữa `true` và `false` sau mỗi lần click, giải pháp này sạch sẽ, dễ bảo trì hơn rất nhiều so với việc kiểm tra chuỗi URL `src.includes(...)`.
* **Thực thi Prompt Mẫu (Dark Mode đơn giản)**:
  * Để đáp ứng chính xác prompt mẫu: *"thay đổi màu nền của body từ trắng sang đen và ngược lại"*, ta sử dụng `document.body.classList.toggle("dark-mode")`.
  * Trong file `thanh3.css`, lớp `body.dark-mode` định nghĩa lại biến nền `--bg-color: #121820;` và màu chữ `--text-color: #f1f5f9;`, giúp chuyển toàn bộ giao diện sang nền đen/tối một cách mượt mà và tương thích với CSS Tokens.

---

## PHẦN 4: HOẠT ĐỘNG 3 - "LIVE INPUT" - PHẢN HỒI TỨC THÌ (30 PHÚT)

### 1. Mục tiêu và Yêu cầu hoạt động
* **Hướng dẫn**: Tạo một ô `<input>`. Khi người dùng gõ chữ vào ô đó, nội dung ngay lập tức xuất hiện ở một thẻ `<span>` bên cạnh.
* **Prompt mẫu**: *"Sử dụng sự kiện 'input' trong JavaScript để lấy giá trị từ một ô text và hiển thị nó ngay lập tức vào một thẻ h2 bên dưới."*

### 2. Mã nguồn thực thi
```javascript
function initLiveInput() {
    const liveInput = document.getElementById("live-input");
    const liveSpan = document.getElementById("live-span");
    const liveHeading = document.getElementById("live-heading");

    if (!liveInput) return;

    // Lắng nghe sự kiện 'input'
    liveInput.addEventListener("input", (event) => {
        // Lấy giá trị chuỗi văn bản người dùng đang nhập
        const value = event.target.value.trim();

        // 1. Hiển thị tức thì vào thẻ <span> bên cạnh (theo Hướng dẫn)
        if (liveSpan) {
            liveSpan.textContent = value !== "" ? value : "(Chưa nhập gì...)";
        }

        // 2. Hiển thị tức thì vào thẻ <h2> bên dưới (theo Prompt mẫu)
        if (liveHeading) {
            liveHeading.textContent = value !== "" ? value : "Tiêu đề trực tiếp sẽ hiển thị ở đây";
        }
    });
}
```

### 3. Chi tiết hoạt động và Kiến thức cốt lõi
* **Sự kiện `input` (Real-time Input Event)**:
  * Sự kiện `input` được kích hoạt ngay lập tức tại thời điểm người dùng gõ thêm ký tự, xóa ký tự (Backspace/Delete), dán văn bản (Paste) hoặc cắt văn bản (Cut) trong ô `<input>`.
  * **Khác biệt quan trọng với sự kiện `change`**: Sự kiện `change` chỉ kích hoạt khi người dùng nhấn phím `Enter` hoặc click chuột ra ngoài ô nhập (mất focus - blur). Sự kiện `input` là chìa khóa để tạo ra trải nghiệm phản hồi tức thì (Live Preview / Reactive Feedback).
* **Trích xuất dữ liệu qua `event.target.value`**:
  * Tham số `event` đại diện cho đối tượng sự kiện được truyền vào hàm xử lý.
  * `event.target` tham chiếu đến chính phần tử HTML phát sinh sự kiện (ô `<input id="live-input">`).
  * `.value` trích xuất chuỗi ký tự đang có trong ô nhập liệu.
* **Cập nhật nội dung hiển thị an toàn bằng `.textContent`**:
  * Dùng `liveSpan.textContent = value` và `liveHeading.textContent = value` an toàn hơn `innerHTML` vì nó ngăn chặn hoàn toàn nguy cơ tấn công XSS (Cross-Site Scripting), không bị phân tích nhầm cú pháp HTML khi người dùng gõ các ký tự đặc biệt như `<`, `>`.
  * Cung cấp chuỗi dự phòng (Fallback text) khi người dùng xóa rỗng ô input (`value !== "" ? value : "(Chưa nhập gì...)"`) giúp giao diện luôn giữ được bố cục chỉn chu và thân thiện.

---

## PHẦN 5: BẢNG TỔNG KẾT VÀ SO SÁNH CÁC SỰ KIỆN DOM

| Sự kiện | Đối tượng lắng nghe | Thời điểm kích hoạt | Thuộc tính / Phương thức trọng tâm | Ứng dụng thực tế |
| :--- | :--- | :--- | :--- | :--- |
| **`DOMContentLoaded`** | `window` / `document` | Khi cây DOM HTML đã tải xong hoàn toàn | `addEventListener(...)` | Khởi chạy các hàm JS an toàn, không bị lỗi `null` |
| **`click`** | `button`, `a`, `div`,... | Khi người dùng click chuột hoặc chạm ngón tay | `element.src`, `classList.toggle()` | Bật/tắt bóng đèn, Dark mode, đóng/mở Modal, Menu |
| **`input`** | `input`, `textarea` | Tức thì ngay khi giá trị văn bản thay đổi | `event.target.value`, `element.textContent` | Live Search, xem trước tiêu đề, kiểm tra độ mạnh mật khẩu |
| **`change`** | `input`, `select`,... | Khi mất focus (blur) hoặc sau khi chọn option | `event.target.value` | Chọn tỉnh/thành phố, lọc sản phẩm theo dropdown |

---

## 6. Tổng Kết Luồng Thực Thi Hoàn Chỉnh
1. Trình duyệt tải trang web `thanh3.html` và file liên kết `greeting.js`.
2. Khi sự kiện `DOMContentLoaded` phát ra:
   * **`showGreeting()`**: Đọc giờ thiết bị bằng `new Date().getHours()` -> Dùng cấu trúc `if...else` xác định buổi sáng/chiều/tối -> Hiển thị Toast thông báo tự động.
   * **`renderProducts()`**: Duyệt mảng đối tượng `productList` bằng vòng lặp `for` -> Sinh mã HTML động và chèn vào thẻ `#product-list`.
   * **`initLightSwitch()`**: Gắn sự kiện `click` cho nút `#toggle-btn` -> Thay đổi thuộc tính `src` giữa `bulb-off.svg` và `bulb-on.svg`, đồng thời hỗ trợ Dark mode chuyển đổi màu nền `body`.
   * **`initLiveInput()`**: Gắn sự kiện `input` cho ô `#live-input` -> Lấy `event.target.value` và cập nhật tức thì vào thẻ `<span>` bên cạnh và thẻ `<h2>` bên dưới.
