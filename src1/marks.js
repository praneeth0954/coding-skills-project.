/**
 * Marks & CGPA Page Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    loadMarksData();
    setupEventListeners();
    populateSemesterSelector();
});

function setupEventListeners() {
    const semesterSelect = document.getElementById('semesterSelect');
    const addSubjectBtn = document.getElementById('addSubjectBtn');
    const raiseMarksTicketBtn = document.getElementById('raiseMarksTicketBtn');
    const addSubjectForm = document.getElementById('addSubjectForm');
    const modal = document.getElementById('addSubjectModal');
    const closeBtn = modal?.querySelector('.close');
    const cancelBtn = document.getElementById('cancelAddSubject');

    if (semesterSelect) {
        semesterSelect.addEventListener('change', function() {
            loadMarksData(this.value);
        });
    }

    if (addSubjectBtn) {
        addSubjectBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'block';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
            if (addSubjectForm) addSubjectForm.reset();
        });
    }

    if (raiseMarksTicketBtn) {
        raiseMarksTicketBtn.addEventListener('click', () => {
            window.location.href = 'tickets.html?type=marks';
        });
    }

    if (addSubjectForm) {
        addSubjectForm.addEventListener('submit', handleAddSubject);
    }

    // Close modal when clicking outside
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

function populateSemesterSelector() {
    const select = document.getElementById('semesterSelect');
    if (!select) return;

    const semesters = Array.from(dataManager.semesters).sort();
    semesters.forEach(sem => {
        const option = document.createElement('option');
        option.value = sem;
        option.textContent = `Semester ${sem}`;
        select.appendChild(option);
    });
}

function loadMarksData(semester = 'all') {
    updateCGPADisplay(semester);
    displayMarksTable(semester);
}

function updateCGPADisplay(semester) {
    const cgpa = dataManager.calculateCGPA(semester);
    const subjects = dataManager.getSubjectsBySemester(semester);
    
    const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
    const completedCredits = subjects
        .filter(s => s.grade !== 'F')
        .reduce((sum, s) => sum + s.credits, 0);

    const cgpaEl = document.getElementById('overallCGPA');
    const totalCreditsEl = document.getElementById('totalCredits');
    const completedCreditsEl = document.getElementById('completedCredits');

    if (cgpaEl) cgpaEl.textContent = cgpa;
    if (totalCreditsEl) totalCreditsEl.textContent = totalCredits;
    if (completedCreditsEl) completedCreditsEl.textContent = completedCredits;
}

function displayMarksTable(semester) {
    const subjects = dataManager.getSubjectsBySemester(semester);
    const tbody = document.getElementById('marksTableBody');

    if (!tbody) return;

    if (subjects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="empty-state">No marks data available</td></tr>';
        return;
    }

    tbody.innerHTML = subjects.map(subject => {
        // Ensure all properties have default values to prevent undefined
        const internalMarks = subject.internalMarks !== undefined ? subject.internalMarks : 0;
        const grade = subject.grade || 'N/A';
        const gradePoints = subject.gradePoints !== undefined ? subject.gradePoints : 0;
        const status = subject.status || (subject.grade === 'F' ? 'Fail' : 'Pass');
        const statusClass = status === 'Pass' ? 'status-pass' : 'status-fail';
        
        return `
            <tr>
                <td>${subject.code || 'N/A'}</td>
                <td>${subject.name || 'N/A'}</td>
                <td>${subject.credits || 0}</td>
                <td>${internalMarks}%</td>
                <td><strong>${grade}</strong></td>
                <td>${gradePoints}</td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
                <td>
                    <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.875rem;" 
                            onclick="raiseTicketForSubject('${subject.code}')">
                        Raise Ticket
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function handleAddSubject(e) {
    e.preventDefault();

    const subjectData = {
        code: document.getElementById('subjectCode').value.toUpperCase(),
        name: document.getElementById('subjectName').value,
        credits: parseInt(document.getElementById('subjectCredits').value),
        semester: parseInt(document.getElementById('subjectSemester').value),
        internalMarks: parseInt(document.getElementById('internalMarks').value),
        grade: document.getElementById('grade').value
    };

    // Check if subject already exists
    if (dataManager.subjects.has(subjectData.code)) {
        if (!confirm('Subject with this code already exists. Do you want to update it?')) {
            return;
        }
    }

    dataManager.addSubject(subjectData);
    dataManager.addActivity(`Added/Updated subject: ${subjectData.name}`);

    // Reset form and close modal
    e.target.reset();
    document.getElementById('addSubjectModal').style.display = 'none';

    // Reload data
    const currentSemester = document.getElementById('semesterSelect').value;
    loadMarksData(currentSemester);
    populateSemesterSelector();

    alert('Subject added successfully!');
}

function raiseTicketForSubject(subjectCode) {
    window.location.href = `tickets.html?type=marks&subject=${subjectCode}`;
}

