# Student Management System

A comprehensive web-based student management system with modern UI/UX, built with HTML, CSS, and JavaScript. This application allows students to track their academic progress, manage their profile, view timetables, track backlogs, and raise support tickets.

## Features

### 📊 Dashboard
- Quick overview of academic performance
- Current CGPA display
- Average internal marks
- Backlog count
- Active tickets count
- Recent activity feed

### 👤 Profile Management
- View and edit personal information
- Student ID, name, email, phone, course, semester, address
- Raise tickets for profile corrections

### 📝 Marks & CGPA Tracking
- Track internal marks for each subject
- Calculate and display CGPA
- View subjects by semester
- Add/update subjects with grades
- Automatic backlog detection for failed subjects
- Raise tickets for marks corrections

### 📅 Timetable
- Weekly class schedule view
- Add custom class entries
- View classes by day and time
- Room and faculty information

### ⚠️ Backlogs Management
- Track failed subjects
- Filter by status (pending/cleared)
- Summary statistics
- Detailed backlog information

### 🎫 Ticket System
- Raise tickets for:
  - Marks corrections
  - Profile corrections
  - Other issues
- Priority levels (Low, Medium, High)
- Status tracking (Pending, Resolved, Closed)
- Filter tickets by status
- **Automatic Processing**: Tickets are automatically analyzed and processed after 7 seconds
  - Marks tickets: Automatically updates marks and grades based on ticket description
  - Profile tickets: Automatically updates profile information (email, phone, address, etc.)
  - Real-time notifications show processing status
  - Data is automatically updated in the portal

## Data Structures Used

The application uses efficient data structures for optimal performance:

1. **Maps** (`Map`): For O(1) lookups
   - Student data
   - Subject data (by code)
   - Timetable entries
   - Tickets

2. **Sets** (`Set`): For unique collections
   - Backlog subjects
   - Semesters

3. **Arrays**: For ordered data
   - Activity logs
   - Timetable entries per day
   - Subject lists

4. **Objects**: For structured data
   - Student profiles
   - Subject information
   - Ticket details

## File Structure

```
├── index.html          # Dashboard page
├── profile.html        # Profile management
├── marks.html          # Marks and CGPA tracking
├── timetable.html      # Class timetable
├── backlogs.html       # Backlogs tracking
├── tickets.html        # Support tickets
├── styles.css          # All styling
├── app.js              # Main data management (data structures)
├── dashboard.js        # Dashboard functionality
├── profile.js          # Profile management
├── marks.js            # Marks functionality
├── timetable.js        # Timetable functionality
├── backlogs.js         # Backlogs functionality
└── tickets.js          # Ticket system
```

## How to Use

1. **Open the Application**
   - Simply open `index.html` in a modern web browser
   - No server or installation required

2. **Dashboard**
   - View your academic overview
   - Quick access to all features

3. **Profile**
   - Click "Edit Profile" to modify your information
   - Click "Raise Ticket for Correction" if you find errors

4. **Marks**
   - View all subjects and grades
   - Add new subjects using "Add Subject" button
   - Filter by semester
   - Raise tickets for marks corrections

5. **Timetable**
   - View your weekly schedule
   - Add classes using "Add Class" button

6. **Backlogs**
   - View all failed subjects
   - Filter by status

7. **Tickets**
   - Raise new tickets for any issues
   - View all your tickets
   - Filter by status
   - **Automatic Processing**: After raising a ticket, wait 7 seconds
   - The system automatically analyzes the ticket description
   - Marks/Profile data is automatically updated based on the ticket
   - You'll receive notifications about the processing status
   - Resolved tickets show what was updated

## Data Persistence

All data is stored in the browser's `localStorage`, so your information persists between sessions. The data includes:
- Student profile
- All subjects and marks
- Timetable entries
- Tickets
- Activity logs

## Technical Details

- **Pure JavaScript**: No frameworks, easy to understand
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern CSS**: Uses CSS variables, flexbox, and grid
- **Clean Code**: Well-commented and organized
- **Efficient Algorithms**: Uses appropriate data structures for performance

## Grade System

- **S**: 10 points (90-100%)
- **A**: 9 points (80-89%)
- **B**: 8 points (70-79%)
- **C**: 7 points (60-69%)
- **D**: 6 points (50-59%)
- **E**: 5 points (40-49%)
- **F**: 0 points (Below 40%) - Fail/Backlog

## CGPA Calculation

CGPA is calculated using the formula:
```
CGPA = Σ(Grade Points × Credits) / Σ(Credits)
```
Only passed subjects (non-F grades) are included in the calculation.

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Automatic Ticket Processing

The system includes intelligent ticket processing that automatically resolves tickets and updates data:

### How It Works:
1. **Raise a Ticket**: Create a ticket with details about the correction needed
2. **7-Second Countdown**: A countdown notification appears showing when processing will start
3. **Automatic Analysis**: The system analyzes the ticket description using pattern matching
4. **Data Update**: Relevant data (marks or profile) is automatically updated
5. **Notification**: You receive a notification about what was updated

### Marks Correction Examples:
- "My marks should be 85" → Updates internal marks to 85 and recalculates grade
- "Correct grade to A" → Updates grade to A
- "Internal marks are 92" → Updates marks to 92
- The system automatically updates CGPA and backlog status

### Profile Correction Examples:
- "Email should be newemail@university.edu" → Updates email
- "Phone number is +1234567890" → Updates phone
- "Address: 456 New Street" → Updates address
- "Semester 4" → Updates semester

### Ticket Status:
- **Pending**: Just created, waiting for processing
- **Resolved**: Automatically processed and data updated
- **Closed**: Manually closed (for tickets that couldn't be auto-resolved)

## Notes for Developers

- All data structures are implemented in `app.js`
- Each page has its own JavaScript file for modularity
- CSS uses custom properties for easy theming
- Code is well-commented for team collaboration
- Follows clean code principles
- Ticket processing uses regex pattern matching for intelligent data extraction

## Future Enhancements

Potential improvements:
- Export marks as PDF
- Email notifications for tickets
- Multiple student accounts
- Admin panel
- Data export/import

---

**Built with ❤️ for students to manage their academic journey**

