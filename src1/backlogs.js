/**
 * Backlogs Page Functionality
 */

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    loadBacklogs();
    setupEventListeners();
});

function setupEventListeners() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            currentFilter = this.getAttribute('data-filter');
            loadBacklogs();
        });
    });
}

function loadBacklogs() {
    const backlogs = dataManager.getBacklogs();
    updateSummary(backlogs);
    displayBacklogs(backlogs);
}

function updateSummary(backlogs) {
    const total = backlogs.length;
    const pending = backlogs.filter(b => b.status === 'pending').length;
    const cleared = backlogs.filter(b => b.status === 'cleared').length;

    const totalEl = document.getElementById('totalBacklogs');
    const pendingEl = document.getElementById('pendingBacklogs');
    const clearedEl = document.getElementById('clearedBacklogs');

    if (totalEl) totalEl.textContent = total;
    if (pendingEl) pendingEl.textContent = pending;
    if (clearedEl) clearedEl.textContent = cleared;
}

function displayBacklogs(backlogs) {
    const listEl = document.getElementById('backlogList');
    if (!listEl) return;

    // Filter backlogs based on current filter
    let filteredBacklogs = backlogs;
    if (currentFilter === 'pending') {
        filteredBacklogs = backlogs.filter(b => b.status === 'pending');
    } else if (currentFilter === 'cleared') {
        filteredBacklogs = backlogs.filter(b => b.status === 'cleared');
    }

    if (filteredBacklogs.length === 0) {
        listEl.innerHTML = '<div class="empty-state"><p>🎉 No backlogs found!</p></div>';
        return;
    }

    listEl.innerHTML = filteredBacklogs.map(backlog => {
        const statusClass = backlog.status === 'cleared' ? 'status-pass' : 'status-fail';
        return `
            <div class="backlog-item">
                <div class="backlog-info">
                    <h4>${backlog.name} (${backlog.code})</h4>
                    <p>Semester ${backlog.semester} • ${backlog.credits} Credits</p>
                    <p style="margin-top: 0.5rem;">
                        <span class="status-badge ${statusClass}">${backlog.status}</span>
                    </p>
                </div>
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">
                        Grade: <strong>${backlog.grade}</strong>
                    </p>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">
                        Internal: <strong>${backlog.internalMarks}%</strong>
                    </p>
                </div>
            </div>
        `;
    }).join('');
}

