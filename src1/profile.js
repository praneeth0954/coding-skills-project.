/**
 * Profile Page Functionality
 */

let isEditMode = false;

document.addEventListener('DOMContentLoaded', function() {
    loadProfileData();
    setupEventListeners();
});

function loadProfileData() {
    const student = dataManager.getCurrentStudent();
    if (!student) return;

    // Update avatar initial
    const avatarEl = document.getElementById('avatarInitial');
    if (avatarEl) {
        avatarEl.textContent = student.firstName.charAt(0).toUpperCase();
    }

    // Populate form fields
    document.getElementById('studentId').value = student.studentId || '';
    document.getElementById('firstName').value = student.firstName || '';
    document.getElementById('lastName').value = student.lastName || '';
    document.getElementById('email').value = student.email || '';
    document.getElementById('phone').value = student.phone || '';
    document.getElementById('course').value = student.course || '';
    document.getElementById('semester').value = student.semester || '';
    document.getElementById('address').value = student.address || '';

    // Disable form fields initially
    setFormEditable(false);
}

function setupEventListeners() {
    const editBtn = document.getElementById('editProfileBtn');
    const saveBtn = document.getElementById('saveProfileBtn');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const raiseTicketBtn = document.getElementById('raiseTicketBtn');
    const profileForm = document.getElementById('profileForm');

    if (editBtn) {
        editBtn.addEventListener('click', enableEditMode);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', cancelEdit);
    }

    if (raiseTicketBtn) {
        raiseTicketBtn.addEventListener('click', () => {
            window.location.href = 'tickets.html?type=profile';
        });
    }

    if (profileForm) {
        profileForm.addEventListener('submit', saveProfile);
    }
}

function enableEditMode() {
    isEditMode = true;
    setFormEditable(true);
    
    document.getElementById('editProfileBtn').style.display = 'none';
    document.getElementById('saveProfileBtn').style.display = 'inline-block';
    document.getElementById('cancelEditBtn').style.display = 'inline-block';
}

function cancelEdit() {
    isEditMode = false;
    loadProfileData(); // Reload original data
    setFormEditable(false);
    
    document.getElementById('editProfileBtn').style.display = 'inline-block';
    document.getElementById('saveProfileBtn').style.display = 'none';
    document.getElementById('cancelEditBtn').style.display = 'none';
}

function setFormEditable(editable) {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'course', 'semester', 'address'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.readOnly = !editable;
            field.disabled = !editable;
        }
    });
}

function saveProfile(e) {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        course: document.getElementById('course').value,
        semester: parseInt(document.getElementById('semester').value),
        address: document.getElementById('address').value
    };

    if (dataManager.updateStudentProfile(formData)) {
        // Update avatar initial
        const avatarEl = document.getElementById('avatarInitial');
        if (avatarEl) {
            avatarEl.textContent = formData.firstName.charAt(0).toUpperCase();
        }

        dataManager.addActivity('Profile updated successfully');
        alert('Profile updated successfully!');
        cancelEdit();
    } else {
        alert('Error updating profile. Please try again.');
    }
}

