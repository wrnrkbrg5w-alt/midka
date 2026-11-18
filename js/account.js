const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const accountStatus = document.getElementById('account-status');
const profile = document.getElementById('reader-profile');
const authPanels = document.getElementById('auth-panels');
const emailPattern = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;
const namePattern = /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u;
function showAccountMessage(message, kind = 'danger') {
    accountStatus.className = `alert alert-${kind}`; accountStatus.textContent = message; accountStatus.hidden = false;
}
function renderProfile(user) {
    authPanels.hidden = true; profile.hidden = false;
    const list = document.getElementById('profile-details'); list.replaceChildren();
    [['Name', user.name], ['Email', user.email]].forEach(([label, value]) => {
        const dt = document.createElement('dt'); const dd = document.createElement('dd');
        dt.className = 'col-sm-3'; dd.className = 'col-sm-9'; dt.textContent = label; dd.textContent = value; list.append(dt, dd);
    });
}
signupForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim().toLowerCase();
    const password = document.getElementById('signup-password').value;
    const nameError = namePattern.test(name) && name.length >= 2 ? '' : 'Enter a full name using letters and spaces.';
    const emailError = emailPattern.test(email) ? '' : 'Enter a valid email such as name@example.com.';
    const passwordError = password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) ? '' : 'Use 8+ characters with uppercase, lowercase, and a number.';
    document.getElementById('signup-name-error').textContent = nameError;
    document.getElementById('signup-email-error').textContent = emailError;
    document.getElementById('signup-password-error').textContent = passwordError;
    if (nameError || emailError || passwordError) { showAccountMessage('Please fix the highlighted fields.'); return; }
    const users = BookVerse.read('users', {});
    if (users[email]) { showAccountMessage('An account with this email already exists. Log in instead.'); return; }
    users[email] = { name, email, password };
    BookVerse.write('users', users); BookVerse.write('active-user', email);
    showAccountMessage('Account created. Your demo profile is ready in this browser.', 'success'); renderProfile(users[email]);
});
loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    const user = BookVerse.read('users', {})[email];
    if (!emailPattern.test(email) || !user || user.password !== password) { showAccountMessage('Email or password is incorrect. Create a demo account first if needed.'); return; }
    BookVerse.write('active-user', email); showAccountMessage('Logged in successfully.', 'success'); renderProfile(user);
});
document.getElementById('logout-button').addEventListener('click', () => {
    BookVerse.write('active-user', null); profile.hidden = true; authPanels.hidden = false; showAccountMessage('You are logged out.', 'secondary');
});
const activeEmail = BookVerse.read('active-user', null);
const savedUsers = BookVerse.read('users', {});
if (activeEmail && savedUsers[activeEmail]) renderProfile(savedUsers[activeEmail]);
