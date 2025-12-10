/**
 * Tickets Page Functionality
 */

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    loadTickets();
    setupEventListeners();
    checkURLParams();
});

function setupEventListeners() {
    const raiseTicketBtn = document.getElementById('raiseTicketBtn');
    const ticketForm = document.getElementById('ticketForm');
    const modal = document.getElementById('raiseTicketModal');
    const closeBtn = modal?.querySelector('.close');
    const cancelBtn = document.getElementById('cancelTicket');
    const ticketType = document.getElementById('ticketType');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (raiseTicketBtn) {
        raiseTicketBtn.addEventListener('click', () => {
            if (modal) {
                // Reset form for new ticket
                document.getElementById('ticketForm').reset();
                document.getElementById('editingTicketId').value = '';
                document.getElementById('ticketModalTitle').textContent = 'Raise New Ticket';
                document.getElementById('subjectGroup').style.display = 'none';
                modal.style.display = 'block';
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) {
                modal.style.display = 'none';
                if (ticketForm) {
                    ticketForm.reset();
                    document.getElementById('editingTicketId').value = '';
                    document.getElementById('ticketModalTitle').textContent = 'Raise New Ticket';
                }
                document.getElementById('subjectGroup').style.display = 'none';
            }
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
            if (ticketForm) {
                ticketForm.reset();
                document.getElementById('editingTicketId').value = '';
                document.getElementById('ticketModalTitle').textContent = 'Raise New Ticket';
            }
            document.getElementById('subjectGroup').style.display = 'none';
        });
    }

    if (ticketType) {
        ticketType.addEventListener('change', function() {
            const subjectGroup = document.getElementById('subjectGroup');
            if (this.value === 'marks') {
                subjectGroup.style.display = 'block';
                populateSubjectDropdown();
            } else {
                subjectGroup.style.display = 'none';
            }
        });
    }

    if (ticketForm) {
        ticketForm.addEventListener('submit', handleCreateTicket);
    }

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                if (ticketForm) {
                    ticketForm.reset();
                    document.getElementById('editingTicketId').value = '';
                    document.getElementById('ticketModalTitle').textContent = 'Raise New Ticket';
                }
                document.getElementById('subjectGroup').style.display = 'none';
            }
        });
    }

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            loadTickets();
        });
    });
}

function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const subject = urlParams.get('subject');

    if (type) {
        const modal = document.getElementById('raiseTicketModal');
        const ticketType = document.getElementById('ticketType');
        
        if (modal && ticketType) {
            ticketType.value = type;
            ticketType.dispatchEvent(new Event('change'));
            
            if (type === 'marks' && subject) {
                const subjectSelect = document.getElementById('ticketSubject');
                if (subjectSelect) {
                    setTimeout(() => {
                        subjectSelect.value = subject;
                    }, 100);
                }
            }
            
            modal.style.display = 'block';
        }
    }
}

function populateSubjectDropdown() {
    const select = document.getElementById('ticketSubject');
    if (!select) return;

    const subjects = dataManager.getAllSubjects();
    select.innerHTML = '<option value="">Select Subject</option>';
    
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.code;
        option.textContent = `${subject.code} - ${subject.name}`;
        select.appendChild(option);
    });
}

function loadTickets() {
    const tickets = dataManager.getTicketsByStatus(currentFilter);
    displayTickets(tickets);
}

function displayTickets(tickets) {
    const listEl = document.getElementById('ticketsList');
    if (!listEl) return;

    if (tickets.length === 0) {
        listEl.innerHTML = '<div class="empty-state"><p>No tickets found.</p></div>';
        return;
    }

    // Sort tickets by creation date (newest first)
    tickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    listEl.innerHTML = tickets.map(ticket => {
        const statusClass = `status-${ticket.status}`;
        const priorityClass = ticket.priority === 'high' ? 'status-fail' : 
                            ticket.priority === 'medium' ? 'status-pending' : 'status-pass';
        
        // Check if ticket is being processed (created less than 8 seconds ago and still pending)
        const ticketAge = (Date.now() - new Date(ticket.createdAt).getTime()) / 1000;
        const isProcessing = ticket.status === 'pending' && ticketAge < 8;
        
        return `
            <div class="ticket-item ${isProcessing ? 'processing' : ''}">
                <div class="ticket-header">
                    <div>
                        <div class="ticket-title">${ticket.title} ${isProcessing ? '<span class="processing-badge">⏳ Processing...</span>' : ''}</div>
                        <div class="ticket-meta">
                            <span>Type: ${ticket.type}</span>
                            <span>Priority: <span class="status-badge ${priorityClass}">${ticket.priority}</span></span>
                            <span>Created: ${formatDate(ticket.createdAt)}</span>
                            ${ticket.status === 'resolved' ? `<span>Resolved: ${formatDate(ticket.updatedAt)}</span>` : ''}
                        </div>
                    </div>
                    <span class="ticket-status status-badge ${statusClass}">${ticket.status}</span>
                </div>
                <div class="ticket-description">
                    ${ticket.description}
                </div>
                ${ticket.subject ? `<div style="margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.9rem;">
                    Subject: <strong>${ticket.subject}</strong>
                </div>` : ''}
                ${ticket.status === 'resolved' ? `<div style="margin-top: 1rem; padding: 0.75rem; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; color: #10b981;">
                    <strong>✅ Auto-resolved:</strong> This ticket was automatically processed and the data has been updated.
                </div>` : ''}
                <div class="ticket-actions" style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${ticket.status === 'pending' ? `
                        <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.875rem;" 
                                onclick="editTicket('${ticket.id}')">
                            ✏️ Edit
                        </button>
                    ` : ''}
                    ${ticket.status === 'resolved' ? `
                        <button class="btn btn-danger" style="padding: 0.5rem 1rem; font-size: 0.875rem;" 
                                onclick="deleteTicket('${ticket.id}')">
                            🗑️ Delete
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    // Auto-refresh if any tickets are processing
    const hasProcessing = tickets.some(t => {
        const age = (Date.now() - new Date(t.createdAt).getTime()) / 1000;
        return t.status === 'pending' && age < 8;
    });
    
    if (hasProcessing) {
        setTimeout(() => {
            loadTickets();
        }, 2000);
    }
}

function handleCreateTicket(e) {
    e.preventDefault();

    const editingTicketId = document.getElementById('editingTicketId').value;
    const ticketData = {
        type: document.getElementById('ticketType').value,
        subject: document.getElementById('ticketSubject')?.value || null,
        title: document.getElementById('ticketTitle').value,
        description: document.getElementById('ticketDescription').value,
        priority: document.getElementById('ticketPriority').value
    };

    // If editing, update existing ticket
    if (editingTicketId) {
        if (dataManager.updateTicket(editingTicketId, ticketData)) {
            showNotification('✅ Ticket updated successfully!', 'success');
            loadTickets();
        } else {
            showNotification('❌ Error updating ticket', 'warning');
        }
    } else {
        // Create new ticket
        const ticket = dataManager.createTicket(ticketData);
        
        // Show notification with countdown
        showCountdownNotification(ticket.id);
        
        // Auto-process ticket after 7 seconds
        setTimeout(() => {
            processTicketAutomatically(ticket.id);
        }, 7000);
    }
    
    // Reset form and close modal
    e.target.reset();
    document.getElementById('editingTicketId').value = '';
    document.getElementById('raiseTicketModal').style.display = 'none';
    document.getElementById('subjectGroup').style.display = 'none';
    document.getElementById('ticketModalTitle').textContent = 'Raise New Ticket';
    
    loadTickets();
}

// Process ticket automatically after 7 seconds
function processTicketAutomatically(ticketId) {
    showNotification('Analyzing ticket and updating data...', 'processing');
    
    // Simulate processing delay
    setTimeout(() => {
        const result = dataManager.processTicket(ticketId);
        
        if (result.success) {
            showNotification(`✅ Ticket resolved! ${result.message}`, 'success');
            loadTickets();
            
            // Refresh relevant pages if open
            refreshRelevantPages(ticketId);
        } else {
            showNotification('⚠️ Ticket requires manual review', 'warning');
        }
        
        // Update dashboard if on dashboard page
        if (typeof updateDashboardStats === 'function') {
            updateDashboardStats();
        }
    }, 1000);
}

// Refresh relevant pages based on ticket type
function refreshRelevantPages(ticketId) {
    const ticket = dataManager.tickets.get(ticketId);
    if (!ticket) return;

    // If on marks page and ticket is for marks, reload
    if (window.location.pathname.includes('marks.html') && ticket.type === 'marks') {
        if (typeof loadMarksData === 'function') {
            const currentSemester = document.getElementById('semesterSelect')?.value || 'all';
            loadMarksData(currentSemester);
        }
    }
    
    // If on profile page and ticket is for profile, reload
    if (window.location.pathname.includes('profile.html') && ticket.type === 'profile') {
        if (typeof loadProfileData === 'function') {
            loadProfileData();
        }
    }
    
    // If on backlogs page, reload
    if (window.location.pathname.includes('backlogs.html')) {
        if (typeof loadBacklogs === 'function') {
            loadBacklogs();
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.querySelector('.ticket-notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `ticket-notification ticket-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return '✅';
        case 'warning': return '⚠️';
        case 'processing': return '⏳';
        default: return 'ℹ️';
    }
}

// Show countdown notification
function showCountdownNotification(ticketId) {
    let countdown = 7;
    const notification = document.createElement('div');
    notification.className = 'ticket-notification ticket-notification-info';
    notification.id = 'countdown-notification';
    
    const updateCountdown = () => {
        if (countdown > 0) {
            notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-icon">⏳</span>
                    <span class="notification-message">
                        Ticket #${ticketId} created! Auto-processing in <strong>${countdown}</strong> seconds...
                    </span>
                </div>
            `;
            countdown--;
        } else {
            notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-icon">⏳</span>
                    <span class="notification-message">Analyzing ticket and updating data...</span>
                </div>
            `;
        }
    };
    
    updateCountdown();
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    const countdownInterval = setInterval(() => {
        updateCountdown();
        if (countdown < 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
    
    // Remove notification after processing
    setTimeout(() => {
        const notif = document.getElementById('countdown-notification');
        if (notif) {
            notif.classList.remove('show');
            setTimeout(() => {
                notif.remove();
            }, 300);
        }
    }, 8500);
}

// Edit ticket function
function editTicket(ticketId) {
    const ticket = dataManager.tickets.get(ticketId);
    if (!ticket) return;

    // Only allow editing pending tickets
    if (ticket.status !== 'pending') {
        showNotification('⚠️ Only pending tickets can be edited', 'warning');
        return;
    }

    const modal = document.getElementById('raiseTicketModal');
    const form = document.getElementById('ticketForm');
    
    // Populate form with ticket data
    document.getElementById('editingTicketId').value = ticketId;
    document.getElementById('ticketType').value = ticket.type;
    document.getElementById('ticketTitle').value = ticket.title;
    document.getElementById('ticketDescription').value = ticket.description;
    document.getElementById('ticketPriority').value = ticket.priority;
    document.getElementById('ticketModalTitle').textContent = 'Edit Ticket';

    // Handle subject dropdown
    if (ticket.type === 'marks') {
        document.getElementById('subjectGroup').style.display = 'block';
        populateSubjectDropdown();
        if (ticket.subject) {
            setTimeout(() => {
                document.getElementById('ticketSubject').value = ticket.subject;
            }, 100);
        }
    } else {
        document.getElementById('subjectGroup').style.display = 'none';
    }

    // Trigger change event for ticket type to update UI
    document.getElementById('ticketType').dispatchEvent(new Event('change'));

    if (modal) modal.style.display = 'block';
}

// Delete ticket function
function deleteTicket(ticketId) {
    const ticket = dataManager.tickets.get(ticketId);
    if (!ticket) return;

    // Only allow deleting resolved tickets
    if (ticket.status !== 'resolved') {
        showNotification('⚠️ Only resolved tickets can be deleted', 'warning');
        return;
    }

    // Confirm deletion
    if (confirm(`Are you sure you want to delete ticket #${ticketId}?\n\nTitle: ${ticket.title}\n\nThis action cannot be undone.`)) {
        if (dataManager.deleteTicket(ticketId)) {
            showNotification('✅ Ticket deleted successfully', 'success');
            loadTickets();
            
            // Update dashboard if on dashboard page
            if (typeof updateDashboardStats === 'function') {
                updateDashboardStats();
            }
        } else {
            showNotification('❌ Error deleting ticket. Only resolved tickets can be deleted.', 'warning');
        }
    }
}

