// --- 1. SETTINGS & GLOBALS ---
let isMuted = false;
let audioCtx;

// --- 2. STARFIELD ENGINE (Optimized Full-Screen) ---
window.addEventListener('load', () => {
    const starCanvas = document.getElementById('starfield');
    if (!starCanvas) return;
    const ctx = starCanvas.getContext('2d');
    let stars = [];

    function initCanvas() {
        // Match internal drawing resolution to the real window size
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;
        
        stars = [];
        for(let i=0; i<150; i++) {
            stars.push({
                x: Math.random() * starCanvas.width,
                y: Math.random() * starCanvas.height,
                size: Math.random() * 1.5,
                speed: Math.random() * 0.4
            });
        }
    }

    window.addEventListener('resize', initCanvas);
    initCanvas(); 

    function animate() {
        ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
        ctx.fillStyle = "white";
        stars.forEach(s => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
            s.y -= s.speed;
            if(s.y < 0) s.y = starCanvas.height;
        });
        requestAnimationFrame(animate);
    }
    animate();
});

// --- 3. COSMIC AUDIO ENGINE (Browser-Safe) ---
function playChime() {
    if (isMuted) return;

    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Resume is required for Chrome/Safari to unlock audio after a user click
    audioCtx.resume().then(() => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // High A
        osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 1);

        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1.5);
    });
}

// --- 4. CAMERA SYSTEM ---
async function openCamera() {
    const video = document.getElementById('camera');
    const status = document.getElementById('status-text');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (video) video.srcObject = stream;
        if (status) status.innerText = "SENSORS ONLINE";
    } catch (err) {
        if (status) status.innerText = "ERROR: NO CAMERA FOUND";
        alert("Please enable camera access to use the Oracle.");
    }
}

// --- 5. THE ANALYSIS ENGINE ---
function startAnalysis() {
    const video = document.getElementById('camera');
    const output = document.getElementById('reading-output');
    const scanner = document.getElementById('scanner');
    const loading = document.getElementById('loading-container');
    const fill = document.getElementById('progress-fill');
    const percent = document.getElementById('percent-count');
    const zodiacSelect = document.getElementById('zodiac-select');
    const btn = document.querySelector('.btn-primary');
    const camContainer = document.querySelector('.camera-container');

    // 1. Safety Check
    if (!video || !video.srcObject) {
        alert("Please INITIALIZE SENSORS before beginning analysis.");
        return;
    }

    // 2. Lock UI & Prep Scan
    const zodiac = zodiacSelect ? zodiacSelect.value : "Aries";
    btn.disabled = true;
    btn.style.opacity = "0.5";
    btn.innerText = "SCANNING...";
    
    if(output) output.innerHTML = "";
    if(scanner) scanner.style.display = "block";
    if(loading) loading.style.display = "block";
    if(camContainer) camContainer.style.boxShadow = "0 0 50px var(--primary)";

    // 3. The Scanning Loop
    let count = 0;
    const interval = setInterval(() => {
        count++;
        if(percent) percent.innerText = count + "%";
        if(fill) fill.style.width = count + "%";

        if (count >= 100) {
            clearInterval(interval);
            
            // 4. Reveal Results with Effects
            if(scanner) scanner.style.display = "none";
            btn.disabled = false;
            btn.style.opacity = "1";
            btn.innerText = "BEGIN ANALYSIS";
            
            playChime();

            const readings = {
                "Aries": "Your fiery energy radiates. A bold move will pay off soon.",
                "Taurus": "Strength and stability define your gaze. Wealth is approaching.",
                "Gemini": "Adaptability is your gift. Your voice will guide you today.",
                "Cancer": "Deep intuition flows from you. The moon favors your path.",
                "Leo": "Your solar aura is strong. Lead with your natural heart.",
                "Virgo": "Precision is your power. Success is hidden in the details.",
                "Libra": "Harmony is returning. Balance is your cosmic destiny.",
                "Scorpio": "Magnetic mystery surrounds you. A secret will soon surface.",
                "Sagittarius": "Adventure is in your eyes. A new land is calling you.",
                "Capricorn": "Your soul is built for legacy. You are nearing the peak.",
                "Aquarius": "A visionary frequency is yours. You will change the world.",
                "Pisces": "Dream deep, Pisces. Your intuition is a cosmic map."
            };

            typeWriter(readings[zodiac] || "Destiny is manifesting...", output);
        }
    }, 40);
}

// --- 6. TYPEWRITER EFFECT ---
function typeWriter(text, element) {
    if(!element) return;
    let i = 0;
    element.innerHTML = ""; 
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();
}

// --- 7. UTILITIES ---
function toggleMute() {
    isMuted = !isMuted;
    const btn = document.getElementById('mute-btn');
    if(btn) {
        btn.innerText = isMuted ? "🔇 MUTED" : "🔊 SOUND ON";
        btn.classList.toggle('muted', isMuted);
    }
}