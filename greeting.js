/**
 * ==============================================================================
 * GREETING NOTIFICATION SYSTEM - MINHTHANH.DEV
 * Chức năng: Tự động hiển thị lời chào theo thời gian thực dựa trên giờ hệ thống
 * ==============================================================================
 */

(function () {
    'use strict';

    /**
     * Xác định thông điệp chào mừng dựa trên giờ hệ thống
     * @returns {Object} Thông tin lời chào gồm tiêu đề, lời nhắn, biểu tượng và giờ hiện tại
     */
    function getGreetingData() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const formattedTime = `${String(hours).padStart(2, '0')}:${minutes}`;

        let title = '';
        let message = '';
        let icon = '';

        // Phân loại mốc thời gian bằng cấu trúc if...else if...else
        if (hours >= 5 && hours < 12) {
            // Khung giờ sáng: 05:00 -> 11:59
            title = 'Chào buổi sáng!';
            message = 'Chúc bạn một ngày mới tràn đầy năng lượng và làm việc hiệu quả!';
            icon = '🌅';
        } else if (hours >= 12 && hours < 18) {
            // Khung giờ chiều: 12:00 -> 17:59
            title = 'Chào buổi chiều!';
            message = 'Chúc bạn có một buổi chiều học tập và làm việc thật năng suất!';
            icon = '☀️';
        } else {
            // Khung giờ tối & đêm: 18:00 -> 04:59 sáng hôm sau
            title = 'Chào buổi tối!';
            message = 'Chúc bạn có những phút giây thư giãn và nghỉ ngơi thật thoải mái!';
            icon = '🌙';
        }

        return { title, message, icon, time: formattedTime };
    }

    /**
     * Tạo và hiển thị thông báo Toast Notification trên giao diện
     */
    function showGreetingToast() {
        const greeting = getGreetingData();

        // 1. Tạo container cho thông báo Toast
        const toast = document.createElement('div');
        toast.className = 'greeting-toast';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');

        // 2. Cấu trúc HTML bên trong Toast
        toast.innerHTML = `
            <div class="toast-icon">${greeting.icon}</div>
            <div class="toast-content">
                <div class="toast-header">
                    <strong class="toast-title">${greeting.title}</strong>
                    <span class="toast-time">${greeting.time}</span>
                </div>
                <p class="toast-message">${greeting.message}</p>
            </div>
            <button class="toast-close" type="button" aria-label="Đóng thông báo">&times;</button>
        `;

        // 3. Đưa thông báo vào DOM
        document.body.appendChild(toast);

        // Kích hoạt animation xuất hiện
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // 4. Xử lý đóng thông báo
        const closeToast = () => {
            toast.classList.remove('show');
            toast.classList.add('hide');
            toast.addEventListener('transitionend', () => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, { once: true });
        };

        // Gắn sự kiện nút đóng 'x'
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeToast);
        }

        // Tự động đóng sau 5 giây (tạm dừng nếu rê chuột vào)
        let autoCloseTimer = setTimeout(closeToast, 5000);

        toast.addEventListener('mouseenter', () => {
            clearTimeout(autoCloseTimer);
        });

        toast.addEventListener('mouseleave', () => {
            autoCloseTimer = setTimeout(closeToast, 3000);
        });
    }

    // Đảm bảo chạy script khi DOM đã sẵn sàng
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showGreetingToast);
    } else {
        showGreetingToast();
    }
})();
