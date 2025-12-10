/**
 * Timetable Page Functionality
 */

const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

document.addEventListener('DOMContentLoaded', function() {
    // Ensure timetable is initialized if empty
    if (dataManager && typeof dataManager.initializeTimetableIfEmpty === 'function') {
        dataManager.initializeTimetableIfEmpty();
    }
    generateTimetable();
    setupEventListeners();
});

function setupEventListeners() {
    const addClassBtn = document.getElementById('addClassBtn');
    const addClassForm = document.getElementById('addClassForm');
    const modal = document.getElementById('addClassModal');
    const closeBtn = modal?.querySelector('.close');
    const cancelBtn = document.getElementById('cancelAddClass');

    if (addClassBtn) {
        addClassBtn.addEventListener('click', () => {
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
            if (addClassForm) addClassForm.reset();
        });
    }

    if (addClassForm) {
        addClassForm.addEventListener('submit', handleAddClass);
    }

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

function generateTimetable() {
    const tbody = document.getElementById('timetableBody');
    if (!tbody) return;

    const allTimetable = dataManager.getAllTimetable();

    tbody.innerHTML = timeSlots.map((time, index) => {
        const row = document.createElement('tr');
        
        // Time column
        const timeCell = document.createElement('td');
        timeCell.textContent = formatTime(time);
        timeCell.style.fontWeight = '600';
        row.appendChild(timeCell);

        // Day columns
        days.forEach(day => {
            const cell = document.createElement('td');
            const classes = allTimetable[day] || [];
            const classAtTime = classes.filter(c => {
                return c.startTime <= time && c.endTime > time;
            });

            if (classAtTime.length > 0) {
                classAtTime.forEach(classItem => {
                    const classSlot = document.createElement('div');
                    classSlot.className = 'class-slot';
                    classSlot.innerHTML = `
                        <strong>${classItem.subject}</strong>
                        ${classItem.room ? `<br><small>${classItem.room}</small>` : ''}
                        ${classItem.faculty ? `<br><small>${classItem.faculty}</small>` : ''}
                    `;
                    cell.appendChild(classSlot);
                });
            }

            row.appendChild(cell);
        });

        return row.outerHTML;
    }).join('');
}

function handleAddClass(e) {
    e.preventDefault();

    const entry = {
        subject: document.getElementById('classSubject').value,
        day: document.getElementById('classDay').value,
        startTime: document.getElementById('classStartTime').value,
        endTime: document.getElementById('classEndTime').value,
        room: document.getElementById('classRoom').value,
        faculty: document.getElementById('classFaculty').value
    };

    dataManager.addTimetableEntry(entry);
    dataManager.addActivity(`Added class: ${entry.subject} on ${entry.day}`);

    e.target.reset();
    document.getElementById('addClassModal').style.display = 'none';
    
    generateTimetable();
    alert('Class added successfully!');
}

