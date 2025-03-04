let questions = [
    { q: "How much do you love me?", options: ["A little", "A lot", "Infinity", "No words"], answer: "Infinity" },
    { q: "What is my favorite thing about you?", options: ["Your smile", "Your kindness", "Your eyes", "Everything"], answer: "Everything" },
    { q: "Will you marry me?", options: ["Yes", "Of course", "Definitely", "Forever"], answer: "Forever" }
];

let currentQuestion = 0;

function startSurprise() {
    document.querySelector(".container").classList.add("hidden");
    document.getElementById("letter").classList.remove("hidden");
    document.getElementById("bg-music").play();
}

function startQuiz() {
    document.getElementById("letter").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById("question").innerText = questions[currentQuestion].q;
        let optionsHtml = "";
        questions[currentQuestion].options.forEach(option => {
            optionsHtml += `<button onclick="checkAnswer('${option}')">${option}</button>`;
        });
        document.getElementById("options").innerHTML = optionsHtml;
    } else {
        startFireworks();
    }
}

function checkAnswer(answer) {
    if (answer === questions[currentQuestion].answer) {
        currentQuestion++;
        showQuestion();
    } else {
        alert("Try again! ❤️");
    }
}

function startFireworks() {
    document.getElementById("quiz").classList.add("hidden");
    let canvas = document.getElementById("fireworks");
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];

    function createParticle(x, y) {
        let colors = ["red", "yellow", "blue", "green", "pink"];
        particles.push({ x, y, color: colors[Math.floor(Math.random() * colors.length)], size: Math.random() * 5 + 2, speedX: Math.random() * 4 - 2, speedY: Math.random() * 4 - 2 });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            p.size *= 0.95;
            if (p.size < 0.5) particles.splice(index, 1);
        });

        requestAnimationFrame(animate);
    }

    for (let i = 0; i < 100; i++) {
        createParticle(canvas.width / 2, canvas.height / 2);
    }

    animate();
}