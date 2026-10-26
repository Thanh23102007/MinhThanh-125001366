# Giải Thích Chi Tiết Logic Thông Báo Chào Mừng Theo Thời Gian Thực

Tài liệu này giải thích chi tiết về nguyên lý hoạt động, cấu trúc mã nguồn và logic thuật toán được sử dụng để hiển thị thông báo chào mừng người dùng dựa trên thời gian thực trong trang web `thanh3.html`.

---

## 1. Tổng Quan Mục Tiêu & Cơ Chế Hoạt Động

Khi người dùng truy cập vào trang web, hệ thống tự động:
1. Đọc thời gian hiện tại từ thiết bị của người dùng (Client-side System Time).
2. Trích xuất chỉ số giờ (`0` đến `23`).
3. Dùng câu lệnh điều kiện (`if...else if...else`) để đối chiếu giờ với các khung thời gian tương ứng trong ngày.
4. Hiển thị thông điệp chào mừng phù hợp (Chào buổi sáng, Chào buổi chiều, hoặc Chào buổi tối) kèm biểu tượng và thời gian chi tiết.

---

## 2. Tìm Hiểu Hàm `new Date().getHours()`

### 2.1. Đối tượng `Date` trong JavaScript
Trong JavaScript, đối tượng `Date` đại diện cho một mốc thời điểm duy nhất trên trục thời gian. Khi ta khởi tạo:

```javascript
const now = new Date();
```

Trình duyệt sẽ tạo ra một thể hiện (`instance`) chứa toàn bộ thông tin ngày, tháng, năm, giờ, phút, giây tại thời điểm câu lệnh được thực thi. Thông tin này được lấy từ **đồng hồ hệ thống của thiết bị người dùng**.

### 2.2. Phương thức `.getHours()`
Phương thức `.getHours()` là một phương thức tích hợp sẵn của đối tượng `Date`. 

* **Cú pháp:** `now.getHours()`
* **Giá trị trả về:** Một số nguyên (integer) nằm trong khoảng từ `0` đến `23`, tương ứng với chuẩn thời gian 24 giờ.

| Giá trị trả về | Mốc thời gian thực tế |
| :--- | :--- |
| `0` | 00:00 - 00:59 (Nửa đêm / 12 AM) |
| `1` - `4` | 01:00 - 04:59 (Đêm muộn / Rạng sáng) |
| `5` - `11` | 05:00 - 11:59 (Buổi sáng) |
| `12` - `17` | 12:00 - 17:59 (Buổi chiều) |
| `18` - `23` | 18:00 - 23:59 (Buổi tối) |

> **Lưu ý chuyên môn:** `.getHours()` trả về giờ theo múi giờ cục bộ (Local Time) của máy người dùng, giúp thông điệp luôn chính xác với ngữ cảnh vị trí địa lý của họ mà không cần xử lý qua máy chủ.

---

## 3. Cấu Trúc Câu Lệnh Điều Kiện (`if...else if...else`)

Để phân loại lời chào theo 3 khung giờ yêu cầu:
1. **05:00 - 11:59**: Chào buổi sáng!
2. **12:00 - 17:59**: Chào buổi chiều!
3. **18:00 - 04:59**: Chào buổi tối!

Chúng ta xây dựng cấu trúc rẽ nhánh như sau:

```javascript
let greeting = "";

if (currentHour >= 5 && currentHour < 12) {
    // Nhánh 1: Từ 5h00 đến 11h59 (currentHour: 5, 6, 7, 8, 9, 10, 11)
    greeting = "Chào buổi sáng!";
} else if (currentHour >= 12 && currentHour < 18) {
    // Nhánh 2: Từ 12h00 đến 17h59 (currentHour: 12, 13, 14, 15, 16, 17)
    greeting = "Chào buổi chiều!";
} else {
    // Nhánh 3: Các giờ còn lại: từ 18h00 tối đến 04h59 sáng hôm sau
    // (currentHour: 18..23 hoặc 0..4)
    greeting = "Chào buổi tối!";
}
```

### 3.1. Phân tích chi tiết từng nhánh điều kiện

#### Nhánh 1: `currentHour >= 5 && currentHour < 12`
* **Toán tử so sánh:**
  * `currentHour >= 5`: Đảm bảo mốc thời gian bắt đầu từ 5:00.
  * `currentHour < 12`: Giờ nhỏ hơn 12, nghĩa là giá trị giờ tối đa của nhánh này là 11 (tương ứng với 11:59:59).
* **Toán tử logic `&&` (AND):** Bắt buộc cả hai vế so sánh phải cùng trả về `true`. Khi đồng hồ điểm từ `5` đến `11`, khối lệnh này sẽ thực thi.

#### Nhánh 2: `currentHour >= 12 && currentHour < 18`
* Do nhánh 1 đã loại trừ các giá trị nhỏ hơn 12, nhánh này tiếp tục kiểm tra xem giờ có nằm trong đoạn từ 12 đến trước 18 hay không.
* `currentHour < 18` bao phủ tất cả thời gian đến hết 17:59:59.
* Khi thỏa mãn, hệ thống gán lời chào buổi chiều.

#### Nhánh 3: Khối `else` (Mệnh đề mặc định)
* Mốc thời gian ban đêm bắc qua ranh giới nửa đêm: từ 18h tối hôm nay đến 4h59 sáng hôm sau (`currentHour` nhận các giá trị `18, 19, 20, 21, 22, 23` hoặc `0, 1, 2, 3, 4`).
* Nhờ vào tính chất loại trừ tuần tự của chuỗi `if...else if`, bất kỳ giá trị nào không rơi vào khoảng `[5..11]` và `[12..17]` đều tự động rơi vào khối `else`.
* Cách viết này giúp mã nguồn ngắn gọn, tối ưu hiệu năng và tránh phải viết điều kiện ghép phức tạp `(currentHour >= 18 || currentHour < 5)`.

---

## 4. Cơ Chế Hiển Thị Giao Diện (UI/UX)

Thay vì chỉ sử dụng hàm `alert()` (gây gián đoạn luồng người dùng và giao diện thô ráp), mã nguồn được thiết kế theo tiêu chuẩn công nghiệp với **Toast Notification**:

1. **Khởi chạy an toàn với `DOMContentLoaded`:** 
   Đảm bảo toàn bộ cây DOM của trang web đã tải xong trước khi mã script tiến hành tạo hoặc chèn phần tử giao diện, loại bỏ hoàn toàn rủi ro lỗi `null element`.
2. **Tạo phần tử động (Dynamic DOM Creation):** 
   JavaScript tự tạo khối `div.greeting-toast` và chèn vào trang, không làm ảnh hưởng đến cấu trúc HTML gốc.
3. **Hiệu ứng mượt mà (Smooth Animation):**
   * Sử dụng `@keyframes slideInDown` để trượt từ trên xuống.
   * Tự động biến mất sau một khoảng thời gian nhất định (ví dụ: 5 giây) hoặc cho phép người dùng chủ động đóng bằng nút bấm `×`.
4. **Tương thích hoàn toàn với hệ thống CSS Tokens:**
   Sử dụng biến CSS có sẵn trong `thanh3.css` như `--card-bg`, `--primary-color`, `--shadow-lg`, `--radius-md` để đồng bộ giao diện.

---

## 5. Tóm Tắt Luồng Chạy (Flowchart)

```text
[Người dùng mở trang web thanh3.html]
                  │
                  ▼
         [Sự kiện DOMContentLoaded]
                  │
                  ▼
         [Khởi tạo: new Date()]
                  │
                  ▼
       [Lấy giờ: now.getHours()]
                  │
         ┌────────┴────────┐
         │                 │
    (5 <= h < 12)    (12 <= h < 18)
         │                 │
      [ĐÚNG]            [ĐÚNG]
         │                 │
         ▼                 ▼
["Chào buổi sáng!"] ["Chào buổi chiều!"]
         │                 │
         └────────┬────────┘
                  │ [SAI Ở CẢ 2 ĐIỀU KIỆN]
                  ▼
         ["Chào buổi tối!"]
                  │
                  ▼
[Hiển thị Toast Notification lên màn hình]
                  │
                  ▼
[Tự động mờ dần & biến mất sau 5 giây]
```
