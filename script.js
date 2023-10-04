let use12HourFormat = false;

function toggleTimeFormat() {
    use12HourFormat = !use12HourFormat;
    updateTimetable();
}

function updateTimetable() {
    const currentTimeElement = document.getElementById('current-time');
    const currentLessonElement = document.getElementById('current-lesson');
    const timeLeftElement = document.getElementById('time-left');
    const nextLessonElement = document.getElementById('next-lesson'); // Update the reference
    const now = new Date();
    const currentDayOfWeek = now.getDay(); // 0 for Sunday, 1 for Monday, ...

    // Define your school timetable here
    const timetable = [
        // Sunday schedule
        [],
        // Monday schedule
        [
            { startHour: 8, startMinute: 0, endHour: 8, endMinute: 45, subject: 'Tikyba' },
            { startHour: 8, startMinute: 55, endHour: 9, endMinute: 40, subject: 'Informatika' },
            { startHour: 9, startMinute: 50, endHour: 10, endMinute: 35, subject: 'Lietuvių' },
            { startHour: 10, startMinute: 55, endHour: 11, endMinute: 40, subject: 'Muzika' },
            { startHour: 11, startMinute: 50, endHour: 12, endMinute: 35, subject: 'Technologijos' },
            { startHour: 12, startMinute: 55, endHour: 13, endMinute: 40, subject: 'Technologijos' },
            { startHour: 13, startMinute: 50, endHour: 14, endMinute: 35, subject: 'Etika' }
        ],
        // Tuesday schedule
        [
            { startHour: 8, startMinute: 0, endHour: 8, endMinute: 45, subject: 'Biologija' },
            { startHour: 8, startMinute: 55, endHour: 9, endMinute: 40, subject: 'Istorija' },
            { startHour: 9, startMinute: 50, endHour: 10, endMinute: 35, subject: 'Anglų k.' },
            { startHour: 10, startMinute: 55, endHour: 11, endMinute: 40, subject: 'KMU' },
            { startHour: 11, startMinute: 50, endHour: 12, endMinute: 35, subject: 'Matematika' },
            { startHour: 12, startMinute: 55, endHour: 13, endMinute: 40, subject: 'Lietuvių k.' },
            { startHour: 13, startMinute: 50, endHour: 14, endMinute: 35, subject: 'Lietuvių k.' },
            { startHour: 14, startMinute: 45, endHour: 15, endMinute: 30, subject: 'Rusų k.' }
        ],
        // Wednesday schedule
        [
            { startHour: 7, startMinute: 30, endHour: 8, endMinute: 0, subject: 'Klasės valandėlė' },
            { startHour: 8, startMinute: 0, endHour: 8, endMinute: 45, subject: 'Lietuvių k.' },
            { startHour: 8, startMinute: 55, endHour: 9, endMinute: 40, subject: 'Fizika' },
            { startHour: 9, startMinute: 50, endHour: 10, endMinute: 35, subject: 'Anglų k.' },
            { startHour: 10, startMinute: 55, endHour: 11, endMinute: 40, subject: 'Geografija' },
            { startHour: 11, startMinute: 50, endHour: 12, endMinute: 35, subject: 'Gyvenimo įgūdžiai' },
            { startHour: 12, startMinute: 55, endHour: 13, endMinute: 40, subject: 'Matematika' }
        ],
        // Thursday schedule
        [
            { startHour: 8, startMinute: 0, endHour: 8, endMinute: 45, subject: 'Lietuvių k.' },
            { startHour: 8, startMinute: 55, endHour: 9, endMinute: 40, subject: 'Matematika' },
            { startHour: 9, startMinute: 50, endHour: 10, endMinute: 35, subject: 'Fizinis' },
            { startHour: 10, startMinute: 55, endHour: 11, endMinute: 40, subject: 'Biologija' },
            { startHour: 11, startMinute: 50, endHour: 12, endMinute: 35, subject: 'KMU' },
            { startHour: 12, startMinute: 55, endHour: 13, endMinute: 40, subject: 'Istorija' },
            { startHour: 13, startMinute: 50, endHour: 14, endMinute: 35, subject: 'Dailė' }
        ],
        // Friday schedule
        [
            { startHour: 8, startMinute: 0, endHour: 8, endMinute: 45, subject: 'Rusų k.' },
            { startHour: 8, startMinute: 55, endHour: 9, endMinute: 40, subject: 'Matematika' },
            { startHour: 9, startMinute: 50, endHour: 10, endMinute: 35, subject: 'Geografija' },
            { startHour: 10, startMinute: 55, endHour: 11, endMinute: 40, subject: 'Fizinis' },
            { startHour: 11, startMinute: 50, endHour: 12, endMinute: 35, subject: 'Fizinis' },
            { startHour: 12, startMinute: 55, endHour: 13, endMinute: 40, subject: 'Anglų k.' },
            { startHour: 13, startMinute: 50, endHour: 14, endMinute: 35, subject: 'Vokiečių k.' }
        ],
        // Saturday schedule
        []
    ];
    
    let currentLesson = null;
    let timeLeftForCurrentLesson = 'NERA PAMOKU ŠENDIEN';
    let nextLesson = null;

    if (currentDayOfWeek >= 0 && currentDayOfWeek < timetable.length) {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        for (const event of timetable[currentDayOfWeek]) {
            if (
                (event.startHour === currentHour && event.startMinute <= currentMinute && event.endHour > currentHour) ||
                (event.startHour === currentHour && event.startMinute <= currentMinute && event.endHour === currentHour && event.endMinute >= currentMinute) ||
                (event.startHour < currentHour && event.endHour > currentHour) ||
                (event.startHour < currentHour && event.endHour === currentHour && event.endMinute >= currentMinute)
            ) {
                currentLesson = event;
                const lessonEndTime = new Date();
                lessonEndTime.setHours(event.endHour, event.endMinute, 0);
                const timeLeftMs = lessonEndTime - now;
                const minutesLeft = Math.floor((timeLeftMs / (1000 * 60)) % 60);
                const hoursLeft = Math.floor((timeLeftMs / (1000 * 60 * 60)) % 24);
                timeLeftForCurrentLesson = `${hoursLeft}h ${minutesLeft}m`;
            } else if (event.startHour > currentHour || (event.startHour === currentHour && event.startMinute > currentMinute)) {
                if (!nextLesson || event.startHour < nextLesson.startHour || (event.startHour === nextLesson.startHour && event.startMinute < nextLesson.startMinute)) {
                    nextLesson = event;
                }
            }
        }
    }

    if (currentLesson) {
        const currentTime = use12HourFormat
            ? now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            : `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        currentTimeElement.innerHTML = `Dabartinis laikas: ${currentTime}`;
        currentLessonElement.textContent = `Dabartine pamoka: ${currentLesson.subject}`;
        timeLeftElement.textContent = `Kiek laiko liko iki pabaigos: ${timeLeftForCurrentLesson}`;
    } else {
        currentTimeElement.innerHTML = `Dabartinis laikas: ${use12HourFormat ? now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`}`;
        currentLessonElement.textContent = '';
        timeLeftElement.textContent = '';
    }

    if (nextLesson) {
        nextLessonElement.textContent = `Kita Pamoka : ${nextLesson.subject}`;
    } else {
        nextLessonElement.textContent = 'Viskas baigesi pamokos .';
    }
}

updateTimetable();
setInterval(updateTimetable, 1000); // Update every minute
