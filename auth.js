const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

// ฟังก์ชัน Hash จำลอง (ใช้เพื่อการศึกษาเท่านั้น)
function simpleHash(password) {
    let hash = "hashed_";
    for (let i = 0; i < password.length; i++) {
        hash += (password.charCodeAt(i) % 10);
    }
    return hash + "_end";
}

// ✅ Register
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = registerForm.email.value;
        const password = registerForm.password.value;
        const hashedPassword = simpleHash(password);

        // เพิ่ม user ลง fakeDB
        const newUser = {
            id: window.fakeDB.users.length + 1,
            email,
            password: hashedPassword
        };
        window.fakeDB.users.push(newUser);

        alert("Register Success");
        window.location.href = '/login.html';
    });
}

// ✅ Login
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        // ค้นหา user ใน fakeDB
        const user = window.fakeDB.users.find(u => u.email === email);

        if (user) {
            if (simpleHash(password) === user.password) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = `/profile.html?id=${user.id}`;
            } else {
                alert("Incorrect password");
            }
        } else {
            alert("User not found");
        }
    });
}
