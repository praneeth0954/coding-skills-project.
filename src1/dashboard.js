/**
 * Dashboard Page Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    const student = dataManager.getCurrentStudent();
    
    // Update student name
    if (student) {
        const studentNameEl = document.getElementById('studentName');
        if (studentNameEl) {
            studentNameEl.textContent = `${student.firstName} ${student.lastName}`;
        }
    }

    // Update statistics
    updateDashboardStats();
    
    // Update recent activity
    updateRecentActivity();
});

function updateDashboardStats() {
    // Update CGPA
    const cgpa = dataManager.calculateCGPA();
    const cgpaEl = document.getElementById('currentCGPA');
    if (cgpaEl) {
        cgpaEl.textContent = cgpa;
    }

    // Update average internal marks
    const avgInternal = dataManager.getAverageInternalMarks();
    const avgInternalEl = document.getElementById('avgInternal');
    if (avgInternalEl) {
        avgInternalEl.textContent = `${avgInternal}%`;
    }

    // Update backlog count
    const backlogs = dataManager.getBacklogs();
    const backlogCountEl = document.getElementById('backlogCount');
    if (backlogCountEl) {
        backlogCountEl.textContent = backlogs.length;
    }

    // Update active tickets
    const tickets = dataManager.getTicketsByStatus('pending');
    const activeTicketsEl = document.getElementById('activeTickets');
    if (activeTicketsEl) {
        activeTicketsEl.textContent = tickets.length;
    }
}

function updateRecentActivity() {
    const activities = dataManager.getRecentActivities(5);
    const activityListEl = document.getElementById('recentActivity');
    
    if (!activityListEl) return;

    if (activities.length === 0) {
        activityListEl.innerHTML = '<p class="empty-state">No recent activity</p>';
        return;
    }

    activityListEl.innerHTML = activities.map(activity => {
        const time = formatDate(activity.timestamp);
        return `
            <div style="padding: 0.75rem; border-bottom: 1px solid var(--border-color);">
                <p style="margin-bottom: 0.25rem;">${activity.message}</p>
                <small style="color: var(--text-secondary);">${time}</small>
            </div>
        `;
    }).join('');
}

