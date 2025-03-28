document.addEventListener("DOMContentLoaded", function () {
    // 1. Fetch Today's Verse (API)
    fetch("https://api.alquran.cloud/v1/ayah/1:1/en.sahih") // Example API
        .then(response => response.json())
        .then(data => {
            document.getElementById("todays-verse").innerHTML = `
                <p class="arabic">${data.data.text}</p>
                <p class="translation">${data.data.translation}</p>
                <p class="surah">(Surah ${data.data.surah.englishName}, ${data.data.numberInSurah}:${data.data.surah.number})</p>
            `;
        })
        .catch(() => {
            console.log("Using fallback verse.");
        });

    // 2. Calculate Islamic Date
    function getIslamicDate() {
        const islamicMonths = [
            "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
            "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
            "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
        ];
        const today = new Date();
        // Simple approximation (for real dates, use a library like Hijri.js)
        const islamicDate = new Intl.DateTimeFormat('en-u-ca-islamic', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(today);
        document.getElementById("islamic-date").innerHTML = `<p>${islamicDate}</p>`;
    }
    getIslamicDate();

    // 3. Mobile Menu Toggle (from original code)
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    document.querySelector('header').appendChild(hamburger);
    hamburger.addEventListener('click', function () {
        document.querySelector('nav').classList.toggle('show');
    });
});