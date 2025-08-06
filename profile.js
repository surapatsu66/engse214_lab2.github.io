document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get('id');

    if (!loggedInUser) {
        window.location.href = '/login.html';
        return;
    }

    if (loggedInUser.id.toString() !== requestedId) {
        document.body.innerHTML = '<h1>Access Denied</h1>';
        return;
    }

    fetchUserProfile(requestedId);
});

async function fetchUserProfile(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    const user = await response.json();

    document.getElementById('email').textContent = user.email;
    document.getElementById('userId').textContent = user.id;
}
