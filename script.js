// Add to Calendar Functionality (All Week)
function addToCalendar() {
    const events = [
        { d: "07", name: "Rose Day 🌹", desc: "Start the journey with a beautiful rose." },
        { d: "08", name: "Propose Day 💍", desc: "A special moment to hear my heart." },
        { d: "09", name: "Chocolate Day 🍫", desc: "Sweetening our bond with treats." },
        { d: "10", name: "Teddy Day 🧸", desc: "Warmth and comfort for my favorite person." },
        { d: "11", name: "Promise Day 🤝", desc: "Keeping our beautiful promises forever." },
        { d: "12", name: "Hug Day 🤗", desc: "Feeling safe and loved in your arms." },
        { d: "13", name: "Kiss Day 💋", desc: "Sharing the magic of our love." },
        { d: "14", name: "Valentine's Day ❤️", desc: "Our official first Valentine's together!" }
    ];

    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Valentine Journey//EN
METHOD:PUBLISH`;

    events.forEach(event => {
        icsContent += `
BEGIN:VEVENT
UID:${Date.now()}-${event.d}@valentine.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:202602${event.d}T100000
DTEND:202602${event.d}T220000
SUMMARY:${event.name} | Valentine's Week
DESCRIPTION:${event.desc} - From Manahil with love.
LOCATION:Our Happy Place
END:VEVENT`;
    });

    icsContent += `
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'valentines_week_full.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Visual feedback
    const btn = document.querySelector('.calendar-btn');
    btn.innerHTML = '✅ All 8 Days Added to Calendar!';
    btn.classList.add('success');

    // Attempt to notify for all week
    requestNotification(true);
}

function requestNotification(allWeek = false) {
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
        return;
    }

    Notification.requestPermission().then(permission => {
        const statusText = document.getElementById('notifStatus');
        if (permission === "granted") {
            statusText.textContent = allWeek
                ? "Full week alerts enabled! You'll be notified every day from Feb 7-14. 🔔"
                : "Notifications enabled! You've got alerts for the big day. 🔔";
            statusText.style.color = "#4CAF50";

            // Send an immediate confirmation notification
            new Notification("Valentine's Week Tracked! ❤️", {
                body: "I'll remind you every day starting February 7th, Sannan!",
                icon: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/2764.png"
            });
        } else {
            statusText.textContent = "Notifications disabled. Don't forget the date! 😉";
        }
    });
}

// Transition from Intro Page to Main Journey
function startJourney() {
    const introPage = document.getElementById('introPage');
    const mainJourney = document.getElementById('mainJourney');

    // Hide Intro
    introPage.classList.add('hidden');

    // Show Journey
    mainJourney.classList.add('visible');

    // Allow scrolling again
    document.body.style.overflow = 'auto';

    // Trigger initial reveal
    setTimeout(handleScroll, 500);
}

// Initialize floating hearts background
function createFloatingHearts() {
    const heartBg = document.getElementById('heartBg');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '✨'];
    const heartCount = 20;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heartBg.appendChild(heart);
    }
}

// Scroll detection for revealing cards
function handleScroll() {
    const cards = document.querySelectorAll('.day-card');
    const finalQuestion = document.getElementById('final-question');
    const triggerBottom = window.innerHeight * 0.85;

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerBottom) {
            card.classList.add('visible');
        }
    });

    if (finalQuestion.getBoundingClientRect().top < triggerBottom) {
        finalQuestion.classList.add('visible');
    }
}

// Celebrate each day with effects
function celebrateDay(button, day) {
    button.innerHTML = '✨ Celebrated! ✨';
    button.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';
    button.disabled = true;

    // Create celebration hearts
    for (let i = 0; i < 15; i++) {
        createCelebrationHeart(button);
    }

    // Play subtle sound if we had one, but for now just visual
}

function createCelebrationHeart(element) {
    const heart = document.createElement('div');
    const hearts = ['❤️', '✨', '💖', '🌸'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.fontSize = (Math.random() * 10 + 20) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';

    const rect = element.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + 'px';
    heart.style.top = rect.top + 'px';

    document.body.appendChild(heart);

    const angle = (Math.random() * Math.PI) + Math.PI; // Upwards spread
    const velocity = 3 + Math.random() * 5;
    let x = rect.left + rect.width / 2;
    let y = rect.top;
    let opacity = 1;
    let rotation = Math.random() * 360;

    function animate() {
        x += Math.cos(angle) * (velocity * 0.5);
        y += Math.sin(angle) * velocity;
        velocity *= 0.98; // Gravity/friction
        opacity -= 0.015;
        rotation += 5;

        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.opacity = opacity;
        heart.style.transform = `rotate(${rotation}deg)`;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            document.body.removeChild(heart);
        }
    }

    animate();
}

// Handle Yes button click
function handleYes() {
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.classList.add('show');

    // Disable buttons
    document.getElementById('btn-yes').disabled = true;
    document.getElementById('btn-no').style.display = 'none';

    // Massive confetti explosion
    for (let i = 0; i < 150; i++) {
        setTimeout(createConfetti, i * 20);
    }

    // Smooth scroll to the celebration message
    setTimeout(() => {
        responseMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
}

// Interactive "No" button that runs away
function handleNo(button) {
    const padding = 50;
    const maxX = window.innerWidth - button.offsetWidth - padding;
    const maxY = window.innerHeight - button.offsetHeight - padding;

    // Move to a random position
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    button.style.position = 'fixed';
    button.style.left = Math.max(padding, randomX) + 'px';
    button.style.top = Math.max(padding, randomY) + 'px';
    button.style.zIndex = '2000';
    button.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';

    // Update text with cute discouraging messages
    const messages = [
        'Are you sure? 🥺',
        'Reconsider... 💔',
        'One more chance? 🙏',
        'Pretty please? 💕',
        'Wait, no! 😊',
        'Think again! ✨',
        'Try the other one! 😉',
        'Wrong button! 🛑'
    ];
    button.textContent = messages[Math.floor(Math.random() * messages.length)];

    // Make the YES button grow slightly larger each time NO is attempted
    const yesBtn = document.getElementById('btn-yes');
    const currentScale = yesBtn.style.transform ? parseFloat(yesBtn.style.transform.replace('scale(', '')) : 1;
    yesBtn.style.transform = `scale(${currentScale + 0.05})`;
}

// Confetti effect
function createConfetti() {
    const confetti = document.createElement('div');
    const colors = ['#ff4d8d', '#fab005', '#ff85c0', '#d6336c', '#ffd6e3'];
    const shapes = ['square', 'circle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    confetti.style.position = 'fixed';
    confetti.style.width = (Math.random() * 8 + 6) + 'px';
    confetti.style.height = (Math.random() * 8 + 6) + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-20px';
    confetti.style.opacity = '1';
    confetti.style.borderRadius = shape === 'circle' ? '50%' : '2px';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1500';

    document.body.appendChild(confetti);

    let y = -20;
    let x = parseFloat(confetti.style.left);
    let rotation = 0;
    const speed = 3 + Math.random() * 6;
    const drift = (Math.random() - 0.5) * 4;

    function fall() {
        y += speed;
        x += drift;
        rotation += 10;

        confetti.style.top = y + 'px';
        confetti.style.left = x + 'px';
        confetti.style.transform = `rotate(${rotation}deg)`;

        if (y < window.innerHeight) {
            requestAnimationFrame(fall);
        } else {
            document.body.removeChild(confetti);
        }
    }

    fall();
}

// Initialization and Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Prevent scrolling initially until journey starts
    document.body.style.overflow = 'hidden';
    createFloatingHearts();
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
});
