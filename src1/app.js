/**
 * Student Management System - Main Application
 * Uses data structures: Maps, Sets, Arrays, Objects
 */

// ===== Data Structures =====
class StudentDataManager {
    constructor() {
        // Using Map for efficient key-value lookups
        this.students = new Map();
        this.subjects = new Map(); // subjectCode -> subjectData
        this.timetable = new Map(); // day -> time slots
        this.tickets = new Map(); // ticketId -> ticketData
        
        // Using Set for unique collections
        this.backlogSubjects = new Set();
        this.semesters = new Set();
        
        // Arrays for ordered data
        this.activityLog = [];
        
        this.currentStudentId = null;
        this.loadFromStorage();
    }

    // Initialize default student data
    initializeDefaultData() {
        const defaultStudentId = 'STU001';
        const defaultStudent = {
            studentId: defaultStudentId,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@university.edu',
            phone: '+1234567890',
            course: 'Computer Science',
            semester: 3,
            address: '123 University Street'
        };

        this.students.set(defaultStudentId, defaultStudent);
        this.currentStudentId = defaultStudentId;

        // Add some sample subjects
        const sampleSubjects = [
            {
                code: 'CS301',
                name: 'Data Structures',
                credits: 4,
                semester: 3,
                internalMarks: 85,
                grade: 'A',
                gradePoints: 9
            },
            {
                code: 'CS302',
                name: 'Algorithms',
                credits: 4,
                semester: 3,
                internalMarks: 78,
                grade: 'B',
                gradePoints: 8
            },
            {
                code: 'CS303',
                name: 'Database Systems',
                credits: 3,
                semester: 3,
                internalMarks: 92,
                grade: 'S',
                gradePoints: 10
            },
            {
                code: 'CS304',
                name: 'SD - Software Development',
                credits: 4,
                semester: 3,
                internalMarks: 88,
                grade: 'A',
                gradePoints: 9
            },
            {
                code: 'MA201',
                name: 'Descriptive Maths',
                credits: 3,
                semester: 2,
                internalMarks: 82,
                grade: 'A',
                gradePoints: 9
            },
            {
                code: 'CS201',
                name: 'Coding Skills',
                credits: 3,
                semester: 2,
                internalMarks: 90,
                grade: 'S',
                gradePoints: 10
            },
            {
                code: 'EC301',
                name: 'Digital Electronics',
                credits: 4,
                semester: 3,
                internalMarks: 75,
                grade: 'B',
                gradePoints: 8
            }
        ];

        sampleSubjects.forEach(subject => {
            this.subjects.set(subject.code, subject);
            this.semesters.add(subject.semester);
        });

        // Add sample timetable entries
        const sampleTimetable = [
            {
                subject: 'Data Structures',
                day: 'Monday',
                startTime: '09:00',
                endTime: '10:00',
                room: 'Lab 301',
                faculty: 'Dr. Smith'
            },
            {
                subject: 'Algorithms',
                day: 'Monday',
                startTime: '10:00',
                endTime: '11:00',
                room: 'Room 205',
                faculty: 'Prof. Johnson'
            },
            {
                subject: 'Database Systems',
                day: 'Tuesday',
                startTime: '09:00',
                endTime: '10:00',
                room: 'Lab 302',
                faculty: 'Dr. Williams'
            },
            {
                subject: 'SD - Software Development',
                day: 'Tuesday',
                startTime: '11:00',
                endTime: '12:00',
                room: 'Room 208',
                faculty: 'Prof. Brown'
            },
            {
                subject: 'Digital Electronics',
                day: 'Wednesday',
                startTime: '10:00',
                endTime: '11:00',
                room: 'Lab 401',
                faculty: 'Dr. Davis'
            },
            {
                subject: 'Data Structures',
                day: 'Wednesday',
                startTime: '14:00',
                endTime: '15:00',
                room: 'Lab 301',
                faculty: 'Dr. Smith'
            },
            {
                subject: 'Algorithms',
                day: 'Thursday',
                startTime: '09:00',
                endTime: '10:00',
                room: 'Room 205',
                faculty: 'Prof. Johnson'
            },
            {
                subject: 'Database Systems',
                day: 'Thursday',
                startTime: '14:00',
                endTime: '15:00',
                room: 'Lab 302',
                faculty: 'Dr. Williams'
            },
            {
                subject: 'SD - Software Development',
                day: 'Friday',
                startTime: '10:00',
                endTime: '11:00',
                room: 'Room 208',
                faculty: 'Prof. Brown'
            },
            {
                subject: 'Digital Electronics',
                day: 'Friday',
                startTime: '14:00',
                endTime: '15:00',
                room: 'Lab 401',
                faculty: 'Dr. Davis'
            }
        ];

        sampleTimetable.forEach(entry => {
            this.addTimetableEntry(entry);
        });

        this.saveToStorage();
    }

    // Initialize timetable with sample data if empty
    initializeTimetableIfEmpty() {
        const allTimetable = this.getAllTimetable();
        const hasEntries = Object.keys(allTimetable).some(day => 
            allTimetable[day] && allTimetable[day].length > 0
        );

        if (!hasEntries) {
            const sampleTimetable = [
                {
                    subject: 'Data Structures',
                    day: 'Monday',
                    startTime: '09:00',
                    endTime: '10:00',
                    room: 'Lab 301',
                    faculty: 'Dr. Smith'
                },
                {
                    subject: 'Algorithms',
                    day: 'Monday',
                    startTime: '10:00',
                    endTime: '11:00',
                    room: 'Room 205',
                    faculty: 'Prof. Johnson'
                },
                {
                    subject: 'Database Systems',
                    day: 'Tuesday',
                    startTime: '09:00',
                    endTime: '10:00',
                    room: 'Lab 302',
                    faculty: 'Dr. Williams'
                },
                {
                    subject: 'SD - Software Development',
                    day: 'Tuesday',
                    startTime: '11:00',
                    endTime: '12:00',
                    room: 'Room 208',
                    faculty: 'Prof. Brown'
                },
                {
                    subject: 'Digital Electronics',
                    day: 'Wednesday',
                    startTime: '10:00',
                    endTime: '11:00',
                    room: 'Lab 401',
                    faculty: 'Dr. Davis'
                },
                {
                    subject: 'Data Structures',
                    day: 'Wednesday',
                    startTime: '14:00',
                    endTime: '15:00',
                    room: 'Lab 301',
                    faculty: 'Dr. Smith'
                },
                {
                    subject: 'Algorithms',
                    day: 'Thursday',
                    startTime: '09:00',
                    endTime: '10:00',
                    room: 'Room 205',
                    faculty: 'Prof. Johnson'
                },
                {
                    subject: 'Database Systems',
                    day: 'Thursday',
                    startTime: '14:00',
                    endTime: '15:00',
                    room: 'Lab 302',
                    faculty: 'Dr. Williams'
                },
                {
                    subject: 'SD - Software Development',
                    day: 'Friday',
                    startTime: '10:00',
                    endTime: '11:00',
                    room: 'Room 208',
                    faculty: 'Prof. Brown'
                },
                {
                    subject: 'Digital Electronics',
                    day: 'Friday',
                    startTime: '14:00',
                    endTime: '15:00',
                    room: 'Lab 401',
                    faculty: 'Dr. Davis'
                }
            ];

            sampleTimetable.forEach(entry => {
                this.addTimetableEntry(entry);
            });
        }
    }

    // Get current student
    getCurrentStudent() {
        if (!this.currentStudentId) {
            this.initializeDefaultData();
        }
        return this.students.get(this.currentStudentId);
    }

    // Update student profile
    updateStudentProfile(data) {
        const student = this.getCurrentStudent();
        if (student) {
            Object.assign(student, data);
            this.students.set(this.currentStudentId, student);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    // Add subject
    addSubject(subjectData) {
        const subject = {
            code: subjectData.code,
            name: subjectData.name,
            credits: subjectData.credits,
            semester: subjectData.semester,
            internalMarks: subjectData.internalMarks,
            grade: subjectData.grade,
            gradePoints: this.getGradePoints(subjectData.grade),
            status: subjectData.grade === 'F' ? 'Fail' : 'Pass'
        };

        this.subjects.set(subject.code, subject);
        this.semesters.add(subject.semester);
        
        // Check for backlogs
        if (subject.grade === 'F') {
            this.backlogSubjects.add(subject.code);
        } else {
            this.backlogSubjects.delete(subject.code);
        }

        this.saveToStorage();
        return subject;
    }

    // Get all subjects
    getAllSubjects() {
        return Array.from(this.subjects.values());
    }

    // Get subjects by semester
    getSubjectsBySemester(semester) {
        if (semester === 'all') {
            return this.getAllSubjects();
        }
        return this.getAllSubjects().filter(s => s.semester === parseInt(semester));
    }

    // Calculate CGPA
    calculateCGPA(semester = 'all') {
        const subjects = this.getSubjectsBySemester(semester);
        if (subjects.length === 0) return 0;

        let totalPoints = 0;
        let totalCredits = 0;

        subjects.forEach(subject => {
            if (subject.grade !== 'F') {
                totalPoints += subject.gradePoints * subject.credits;
                totalCredits += subject.credits;
            }
        });

        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    }

    // Get average internal marks
    getAverageInternalMarks(semester = 'all') {
        const subjects = this.getSubjectsBySemester(semester);
        if (subjects.length === 0) return 0;

        const sum = subjects.reduce((acc, subject) => acc + subject.internalMarks, 0);
        return Math.round(sum / subjects.length);
    }

    // Get grade points from grade
    getGradePoints(grade) {
        const gradeMap = {
            'S': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5, 'F': 0
        };
        return gradeMap[grade] || 0;
    }

    // Get backlogs
    getBacklogs() {
        return Array.from(this.backlogSubjects).map(code => {
            const subject = this.subjects.get(code);
            return {
                ...subject,
                status: 'pending'
            };
        });
    }

    // Add timetable entry
    addTimetableEntry(entry) {
        const key = `${entry.day}-${entry.startTime}`;
        if (!this.timetable.has(entry.day)) {
            this.timetable.set(entry.day, []);
        }
        
        const dayEntries = this.timetable.get(entry.day);
        dayEntries.push({
            subject: entry.subject,
            startTime: entry.startTime,
            endTime: entry.endTime,
            room: entry.room || '',
            faculty: entry.faculty || ''
        });

        // Sort by start time
        dayEntries.sort((a, b) => a.startTime.localeCompare(b.startTime));
        this.saveToStorage();
    }

    // Get timetable for a day
    getTimetableForDay(day) {
        return this.timetable.get(day) || [];
    }

    // Get all timetable
    getAllTimetable() {
        const allTimetable = {};
        this.timetable.forEach((entries, day) => {
            allTimetable[day] = entries;
        });
        return allTimetable;
    }

    // Create ticket
    createTicket(ticketData) {
        const ticketId = `TKT${Date.now()}`;
        const ticket = {
            id: ticketId,
            type: ticketData.type,
            subject: ticketData.subject || null,
            title: ticketData.title,
            description: ticketData.description,
            priority: ticketData.priority,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.tickets.set(ticketId, ticket);
        this.addActivity(`Ticket #${ticketId} created: ${ticket.title}`);
        this.saveToStorage();
        return ticket;
    }

    // Get all tickets
    getAllTickets() {
        return Array.from(this.tickets.values());
    }

    // Get tickets by status
    getTicketsByStatus(status) {
        if (status === 'all') {
            return this.getAllTickets();
        }
        return this.getAllTickets().filter(t => t.status === status);
    }

    // Update ticket status
    updateTicketStatus(ticketId, status) {
        const ticket = this.tickets.get(ticketId);
        if (ticket) {
            ticket.status = status;
            ticket.updatedAt = new Date().toISOString();
            this.tickets.set(ticketId, ticket);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    // Update ticket
    updateTicket(ticketId, ticketData) {
        const ticket = this.tickets.get(ticketId);
        if (ticket) {
            ticket.type = ticketData.type;
            ticket.subject = ticketData.subject || null;
            ticket.title = ticketData.title;
            ticket.description = ticketData.description;
            ticket.priority = ticketData.priority;
            ticket.updatedAt = new Date().toISOString();
            this.tickets.set(ticketId, ticket);
            this.addActivity(`Ticket #${ticketId} updated: ${ticket.title}`);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    // Delete ticket (only if resolved)
    deleteTicket(ticketId) {
        const ticket = this.tickets.get(ticketId);
        if (ticket && ticket.status === 'resolved') {
            this.tickets.delete(ticketId);
            this.addActivity(`Ticket #${ticketId} deleted`);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    // Process and analyze ticket - automatically resolves and updates data
    processTicket(ticketId) {
        const ticket = this.tickets.get(ticketId);
        if (!ticket || ticket.status !== 'pending') {
            return false;
        }

        let updated = false;
        let updateMessage = '';

        // Analyze ticket based on type
        if (ticket.type === 'marks') {
            updated = this.processMarksTicket(ticket);
            if (updated) {
                updateMessage = `Marks updated for ${ticket.subject}`;
            }
        } else if (ticket.type === 'profile') {
            updated = this.processProfileTicket(ticket);
            if (updated) {
                updateMessage = 'Profile information updated';
            }
        }

        // Mark ticket as resolved
        if (updated) {
            this.updateTicketStatus(ticketId, 'resolved');
            this.addActivity(`Ticket #${ticketId} resolved: ${updateMessage}`);
            return { success: true, message: updateMessage };
        } else {
            // If couldn't auto-resolve, mark as needs review
            this.updateTicketStatus(ticketId, 'pending');
            return { success: false, message: 'Ticket requires manual review' };
        }
    }

    // Process marks correction ticket
    processMarksTicket(ticket) {
        if (!ticket.subject) return false;

        const subject = this.subjects.get(ticket.subject);
        if (!subject) return false;

        // Extract correction information from description
        const description = ticket.description.toLowerCase();
        let updated = false;
        
        // Look for patterns like "should be 85", "correct to 90", "marks: 88", "my marks are 92", etc.
        const markPatterns = [
            /(?:marks?|score|internal).*?(?:should be|is|are|correct to|update to|change to|must be).*?(\d{1,3})/i,
            /(?:should be|correct to|update to|change to|must be).*?(\d{1,3}).*?(?:marks?|score|internal)/i,
            /(?:marks?|score|internal).*?(\d{1,3})/i,
            /(\d{1,3}).*?(?:marks?|score|internal)/i,
            /(\d{1,3})/i  // Last resort: any number
        ];

        let newMarks = null;
        for (const pattern of markPatterns) {
            const match = description.match(pattern);
            if (match) {
                const num = parseInt(match[1]);
                if (num >= 0 && num <= 100) {
                    newMarks = num;
                    break;
                }
            }
        }

        if (newMarks !== null) {
            subject.internalMarks = newMarks;
            
            // Update grade based on new marks
            if (newMarks >= 90) {
                subject.grade = 'S';
                subject.gradePoints = 10;
            } else if (newMarks >= 80) {
                subject.grade = 'A';
                subject.gradePoints = 9;
            } else if (newMarks >= 70) {
                subject.grade = 'B';
                subject.gradePoints = 8;
            } else if (newMarks >= 60) {
                subject.grade = 'C';
                subject.gradePoints = 7;
            } else if (newMarks >= 50) {
                subject.grade = 'D';
                subject.gradePoints = 6;
            } else if (newMarks >= 40) {
                subject.grade = 'E';
                subject.gradePoints = 5;
            } else {
                subject.grade = 'F';
                subject.gradePoints = 0;
            }

            subject.status = subject.grade === 'F' ? 'Fail' : 'Pass';
            
            // Update backlogs
            if (subject.grade === 'F') {
                this.backlogSubjects.add(subject.code);
            } else {
                this.backlogSubjects.delete(subject.code);
            }

            this.subjects.set(ticket.subject, subject);
            this.saveToStorage();
            updated = true;
        }

        // Look for grade corrections (if marks weren't found)
        if (!updated) {
            const gradePatterns = [
                /(?:grade|should be|correct to|update to|change to).*?([sabcdef])/i,
                /([sabcdef]).*?(?:grade)/i
            ];

            for (const pattern of gradePatterns) {
                const gradeMatch = description.match(pattern);
                if (gradeMatch) {
                    const newGrade = gradeMatch[1].toUpperCase();
                    if (['S', 'A', 'B', 'C', 'D', 'E', 'F'].includes(newGrade)) {
                        subject.grade = newGrade;
                        subject.gradePoints = this.getGradePoints(newGrade);
                        subject.status = newGrade === 'F' ? 'Fail' : 'Pass';
                        
                        // Estimate internal marks based on grade (mid-range)
                        if (!updated) {
                            const gradeMarksMap = {
                                'S': 95, 'A': 85, 'B': 75, 'C': 65, 'D': 55, 'E': 45, 'F': 35
                            };
                            subject.internalMarks = gradeMarksMap[newGrade];
                        }
                        
                        // Update backlogs
                        if (newGrade === 'F') {
                            this.backlogSubjects.add(subject.code);
                        } else {
                            this.backlogSubjects.delete(subject.code);
                        }

                        this.subjects.set(ticket.subject, subject);
                        this.saveToStorage();
                        updated = true;
                        break;
                    }
                }
            }
        }

        return updated;
    }

    // Process profile correction ticket
    processProfileTicket(ticket) {
        const student = this.getCurrentStudent();
        if (!student) return false;

        const description = ticket.description.toLowerCase();
        let updated = false;

        // Extract email
        const emailMatch = description.match(/(?:email|e-mail).*?([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/i);
        if (emailMatch) {
            student.email = emailMatch[1];
            updated = true;
        }

        // Extract phone
        const phoneMatch = description.match(/(?:phone|mobile|contact).*?(\+?\d{10,15})/i) ||
                          description.match(/(\+?\d{10,15})/);
        if (phoneMatch) {
            student.phone = phoneMatch[1];
            updated = true;
        }

        // Extract address
        const addressMatch = description.match(/(?:address|location).*?([a-z0-9\s,.-]{10,})/i);
        if (addressMatch) {
            student.address = addressMatch[1].trim();
            updated = true;
        }

        // Extract course
        const courseMatch = description.match(/(?:course|program).*?([a-z\s]{5,})/i);
        if (courseMatch && !courseMatch[1].includes('should') && !courseMatch[1].includes('correct')) {
            student.course = courseMatch[1].trim();
            updated = true;
        }

        // Extract semester
        const semesterMatch = description.match(/(?:semester|sem).*?(\d{1})/i);
        if (semesterMatch) {
            const sem = parseInt(semesterMatch[1]);
            if (sem >= 1 && sem <= 8) {
                student.semester = sem;
                updated = true;
            }
        }

        if (updated) {
            this.students.set(this.currentStudentId, student);
            this.saveToStorage();
            return true;
        }

        return false;
    }

    // Add activity log
    addActivity(message) {
        this.activityLog.unshift({
            message,
            timestamp: new Date().toISOString()
        });
        // Keep only last 10 activities
        if (this.activityLog.length > 10) {
            this.activityLog = this.activityLog.slice(0, 10);
        }
        this.saveToStorage();
    }

    // Get recent activities
    getRecentActivities(limit = 5) {
        return this.activityLog.slice(0, limit);
    }

    // Save to localStorage
    saveToStorage() {
        try {
            const data = {
                students: Array.from(this.students.entries()),
                subjects: Array.from(this.subjects.entries()),
                timetable: Array.from(this.timetable.entries()),
                tickets: Array.from(this.tickets.entries()),
                backlogSubjects: Array.from(this.backlogSubjects),
                semesters: Array.from(this.semesters),
                activityLog: this.activityLog,
                currentStudentId: this.currentStudentId
            };
            localStorage.setItem('studentManagementData', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }

    // Validate and fix subject data
    validateSubject(subject) {
        if (!subject) return null;
        
        // Ensure all required properties exist
        const validated = {
            code: subject.code || '',
            name: subject.name || '',
            credits: subject.credits || 0,
            semester: subject.semester || 1,
            internalMarks: subject.internalMarks !== undefined ? subject.internalMarks : 0,
            grade: subject.grade || 'F',
            gradePoints: subject.gradePoints !== undefined ? subject.gradePoints : this.getGradePoints(subject.grade || 'F'),
            status: subject.status || (subject.grade === 'F' ? 'Fail' : 'Pass')
        };
        
        // Recalculate gradePoints if grade exists but gradePoints is wrong
        if (subject.grade && validated.gradePoints === 0 && subject.grade !== 'F') {
            validated.gradePoints = this.getGradePoints(subject.grade);
        }
        
        return validated;
    }

    // Load from localStorage
    loadFromStorage() {
        try {
            const data = localStorage.getItem('studentManagementData');
            if (data) {
                const parsed = JSON.parse(data);
                
                // Restore Maps
                this.students = new Map(parsed.students || []);
                
                // Restore and validate subjects
                this.subjects = new Map();
                if (parsed.subjects) {
                    parsed.subjects.forEach(([code, subject]) => {
                        const validated = this.validateSubject(subject);
                        if (validated && validated.code) {
                            this.subjects.set(validated.code, validated);
                        }
                    });
                }
                
                this.timetable = new Map(parsed.timetable || []);
                
                // Clear old tickets (created before auto-processing feature)
                this.tickets = new Map();
                
                // Restore Sets
                this.backlogSubjects = new Set(parsed.backlogSubjects || []);
                this.semesters = new Set(parsed.semesters || []);
                
                // Clear activity log history
                this.activityLog = [];
                this.currentStudentId = parsed.currentStudentId;
                
                // Initialize timetable if empty
                this.initializeTimetableIfEmpty();
                
                // Save without old tickets and activity log
                this.saveToStorage();
            } else {
                this.initializeDefaultData();
            }
        } catch (error) {
            console.error('Error loading from storage:', error);
            this.initializeDefaultData();
        }
    }
}

// Initialize global data manager
const dataManager = new StudentDataManager();

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${minutes} ${period}`;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { dataManager, formatDate, formatTime };
}

