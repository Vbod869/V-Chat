let role;

function initChat(userRole) {
    role = userRole;
    loadMessages();
    setInterval(loadMessages, 1000); // Perbarui chat setiap 1 detik

    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');

    // Event listener untuk tombol kirim
    sendButton.addEventListener('click', sendMessage);

    // Event listener untuk mengirim pesan dengan menekan tombol Enter
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
}

function loadMessages() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = ''; // Bersihkan chat box sebelum memuat pesan

    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

    messages.forEach((messageObj, index) => {
        const { sender, message, time } = messageObj;

        // Membuat elemen pesan
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.innerHTML = `
            <div class="message-text">${message}</div>
            <div class="message-time">${formatTime(time)}</div>
        `;
        messageElement.setAttribute('data-index', index);

        // Event listener untuk klik dua kali pada pesan
        messageElement.addEventListener('dblclick', showDeleteButton);

        chatBox.appendChild(messageElement);
    });

    chatBox.scrollTop = chatBox.scrollHeight; // Scroll otomatis ke bawah
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message !== "") {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        const time = new Date().toISOString(); // Menyimpan waktu pengiriman pesan
        messages.push({ sender: role, message: message, time: time });
        localStorage.setItem('chatMessages', JSON.stringify(messages));
        
        loadMessages(); // Perbarui chat setelah mengirim pesan
        messageInput.value = ''; // Kosongkan input setelah mengirim
    }
}

let pressTimer;
const LONG_PRESS_DELAY = 999999; // Durasi tekan lama dalam milidetik
const DELETE_BUTTON_VISIBLE_TIME = 999999; // Durasi tampilnya tombol hapus dalam milidetik

function startPressTimer(event) {
    pressTimer = setTimeout(() => {
        showDeleteButton(event);
    }, LONG_PRESS_DELAY);
}

function clearPressTimer() {
    clearTimeout(pressTimer);
}

function showDeleteButton(event) {
    const messageElement = event.currentTarget;
    const index = messageElement.getAttribute('data-index');

    // Cek jika tombol hapus sudah ada, jika belum tambahkan
    if (!messageElement.querySelector('.delete-button')) {
        const deleteButton = document.createElement('button');
        deleteButton.innerText = '✖';
        deleteButton.classList.add('delete-button');
        deleteButton.setAttribute('data-index', index);

        // Event listener untuk menghapus pesan setelah konfirmasi
        deleteButton.addEventListener('click', confirmDeleteMessage);

        messageElement.appendChild(deleteButton);

        // Mengatur waktu untuk menghapus tombol hapus setelah beberapa detik
        setTimeout(() => {
            if (messageElement.contains(deleteButton)) {
                messageElement.removeChild(deleteButton);
            }
        }, DELETE_BUTTON_VISIBLE_TIME);
    }
}

function confirmDeleteMessage(event) {
    const index = event.target.getAttribute('data-index'); // Ambil indeks pesan

    // Tampilkan konfirmasi sebelum menghapus pesan
    if (confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
        deleteMessage(index);
    }
}

function deleteMessage(index) {
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

    // Hapus pesan berdasarkan indeks
    messages.splice(index, 1);

    // Perbarui pesan di localStorage
    localStorage.setItem('chatMessages', JSON.stringify(messages));

    // Muat ulang pesan setelah dihapus
    loadMessages();
}

// Fungsi untuk memformat waktu
function formatTime(timeString) {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const time = new Date(timeString);
    return time.toLocaleTimeString([], options);
}
