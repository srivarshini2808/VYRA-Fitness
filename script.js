/* =========================================================
   VYRA FITNESS — COMPLETE JAVASCRIPT
   ========================================================= */


/* ================= PAGE NAVIGATION ================= */

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* ================= WORKOUT DATABASE ================= */

const workoutPlans = {

    STRENGTH: [
        "BODYWEIGHT SQUATS",
        "REVERSE LUNGES",
        "GLUTE BRIDGES",
        "PUSH UPS",
        "TRICEP DIPS",
        "WALL SIT",
        "PLANK"
    ],

    CARDIO: [
        "JUMPING JACKS",
        "HIGH KNEES",
        "BUTT KICKS",
        "MARCHING HIGH KNEES",
        "SKATER STEPS",
        "FAST FEET",
        "SHADOW BOXING"
    ],

    YOGA: [
        "CAT-COW",
        "DOWNWARD DOG",
        "LOW LUNGE",
        "WARRIOR II",
        "TREE POSE",
        "SEATED FORWARD FOLD",
        "CHILD'S POSE"
    ],

    PILATES: [
        "THE HUNDRED",
        "ROLL DOWN",
        "SINGLE LEG STRETCH",
        "GLUTE BRIDGE",
        "SIDE LEG LIFTS",
        "BICYCLE",
        "PLANK"
    ],

    HIIT: [
        "HIGH KNEES",
        "SQUAT TO REACH",
        "MOUNTAIN CLIMBERS",
        "BURPEES",
        "SKATER HOPS",
        "PLANK JACKS",
        "FAST FEET",
        "SQUAT PULSES"
    ],

    MOBILITY: [
        "NECK MOBILITY",
        "SHOULDER CIRCLES",
        "CAT-COW",
        "HIP CIRCLES",
        "WORLD'S GREATEST STRETCH",
        "HAMSTRING REACH",
        "ANKLE MOBILITY"
    ]

};


/* ================= WORKOUT VARIABLES ================= */

let currentWorkout = "";

let currentExercises = [];

let currentExerciseIndex = 0;

let timeLeft = 30;

let timerInterval = null;

let running = false;


/* ================= SELECT WORKOUT ================= */

function startWorkout(type) {

    const workout = type.toUpperCase();

    const exercises = workoutPlans[workout];

    if (!exercises) {

        joinNow();

        return;
    }


    currentWorkout = workout;

    currentExercises = exercises;

    currentExerciseIndex = 0;

    timeLeft = 30;

    running = false;

    clearInterval(timerInterval);


    /* Keep workout information on workouts page */

    showPage("workouts");


    const info =
        document.getElementById("workout-info");

    const title =
        document.getElementById("selected-workout");

    const list =
        document.getElementById("exercise-list");


    if (info && title && list) {

        title.textContent =
            workout + " WORKOUT";

        list.innerHTML = "";


        exercises.forEach(function(exercise, index) {

            const row =
                document.createElement("div");

            row.className = "exercise-row";


            row.innerHTML = `

                <span>
                    ${(index + 1)
                        .toString()
                        .padStart(2, "0")}
                </span>

                <strong>
                    ${exercise}
                </strong>

            `;

            list.appendChild(row);

        });


        info.classList.add("show");

    }


    /* Open workout player */

const player =
    document.getElementById("workout-player");

if (!player) {

    alert(
        "Workout player is missing from HTML."
    );

    return;
}


showPage("workout-player");

updateWorkoutScreen();
}


/* ================= UPDATE WORKOUT SCREEN ================= */

function updateWorkoutScreen() {

    const title =
        document.getElementById("workout-title");

    const timer =
        document.getElementById("timer");

    const exercise =
        document.getElementById("exercise-name");

    const progress =
        document.getElementById("progress");

    const button =
        document.getElementById("timer-button");


    if (!title ||
        !timer ||
        !exercise ||
        !progress ||
        !button) {

        return;
    }


    title.textContent =
        currentWorkout + " WORKOUT";


    timer.textContent =
        "00:" + timeLeft.toString().padStart(2, "0");


    exercise.textContent =
        currentExercises[currentExerciseIndex];


    const percentage =
        ((currentExerciseIndex) /
        currentExercises.length) * 100;


    progress.style.width =
        percentage + "%";


    button.textContent =
        running ? "PAUSE ❚❚" : "START →";


    updateExerciseList();

}


/* ================= EXERCISE LIST ================= */

function updateExerciseList() {

    const list =
        document.getElementById("vyra-exercise-list");


    if (!list) {
        return;
    }


    list.innerHTML = "";


    currentExercises.forEach(function(exercise, index) {

        const row =
            document.createElement("div");


        row.className =
            "vyra-exercise-item";


        if (index === currentExerciseIndex) {

            row.classList.add("current-exercise");

        }


        row.innerHTML = `

            <span>
                ${(index + 1)
                    .toString()
                    .padStart(2, "0")}
            </span>

            <strong>
                ${exercise}
            </strong>

            <small>
                ${
                    index < currentExerciseIndex
                    ? "DONE"
                    : index === currentExerciseIndex
                    ? "NOW"
                    : "NEXT"
                }
            </small>

        `;


        row.onclick = function() {

            currentExerciseIndex = index;

            timeLeft = 30;

            running = false;

            clearInterval(timerInterval);

            updateWorkoutScreen();

        };


        list.appendChild(row);

    });

}


/* ================= START / PAUSE TIMER ================= */

function toggleTimer() {

    if (running) {

        pauseTimer();

        return;

    }


    running = true;

    updateWorkoutScreen();


    timerInterval =
        setInterval(function() {

            timeLeft--;

            updateWorkoutScreen();


            if (timeLeft <= 0) {

                nextExercise();

            }

        }, 1000);

}


/* ================= PAUSE ================= */

function pauseTimer() {

    running = false;

    clearInterval(timerInterval);

    updateWorkoutScreen();

}


/* ================= SKIP ================= */

function skipExercise() {

    clearInterval(timerInterval);

    running = false;

    nextExercise();

}


/* ================= REDO ================= */

function redoExercise() {

    clearInterval(timerInterval);

    running = false;

    timeLeft = 30;

    updateWorkoutScreen();

}


/* ================= NEXT EXERCISE ================= */

function nextExercise() {

    clearInterval(timerInterval);

    running = false;

    timeLeft = 30;


    currentExerciseIndex++;


    if (
        currentExerciseIndex >=
        currentExercises.length
    ) {

        finishWorkout();

        return;

    }


    updateWorkoutScreen();

}


/* ================= FINISH WORKOUT ================= */

function finishWorkout() {

    clearInterval(timerInterval);

    running = false;


    const title =
        document.getElementById("workout-title");

    const timer =
        document.getElementById("timer");

    const exercise =
        document.getElementById("exercise-name");

    const progress =
        document.getElementById("progress");

    const button =
        document.getElementById("timer-button");


    if (title) {
        title.textContent =
            "WORKOUT COMPLETE";
    }


    if (timer) {
        timer.textContent =
            "✓";
    }


    if (exercise) {
        exercise.textContent =
            "AMAZING WORK. YOU DID IT.";
    }


    if (progress) {
        progress.style.width =
            "100%";
    }


    if (button) {
        button.textContent =
            "START AGAIN →";

        button.onclick =
            function() {

                currentExerciseIndex = 0;

                timeLeft = 30;

                running = false;

                updateWorkoutScreen();

            };

    }


    updateExerciseList();

}


/* ================= CLOSE WORKOUT ================= */

function closeWorkout() {

    clearInterval(timerInterval);

    running = false;

    showPage("workouts");

}


/* ================= JOIN ================= */

function joinNow() {

    alert(
        "WELCOME TO VYRA!\n\n" +
        "Your fitness journey starts now."
    );

}


/* ================= INITIAL PAGE ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showPage("home");

    }
);