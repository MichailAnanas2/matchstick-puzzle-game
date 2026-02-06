// 1. Check URL param (Yandex Games priority)
const urlParams = new URLSearchParams(window.location.search);
let langParam = urlParams.get('lang');

// Функция инициализации языка из SDK (вызывается из y.js)
function initLanguage(sdkLang) {
    if (langParam) {
        currentLang = langParam.startsWith('ru') ? 'ru' : 'en';
    } else if (sdkLang) {
        currentLang = sdkLang.startsWith('ru') ? 'ru' : 'en';
    } else {
        // Fallback
        currentLang = localStorage.getItem('match_lang') || (navigator.language.startsWith('ru') ? 'ru' : 'en');
    }
    
    localStorage.setItem('match_lang', currentLang);
    document.documentElement.lang = currentLang; // Важно для SEO/браузера
    updateUILabels();
}

// Initial check (before SDK)
if (langParam) {
    currentLang = langParam.startsWith('ru') ? 'ru' : 'en';
} else {
    currentLang = localStorage.getItem('match_lang') || (navigator.language.startsWith('ru') ? 'ru' : 'en');
}

const I18N = {
    ru: {
        title: "Тренировка мозга спички",
        play: "Играть",
        continue: "Продолжить",
        check: "Проверить",
        hint: "Подсказка",
        instruction: "Переставь одну спичку",
        task: "Задача",
        wellDone: "Отлично!",
        next: "Дальше",
        best: "Мой рекорд",
        worldBest: "Мировой",
        errorMove: "Нужно переложить ровно 1 спичку!",
        errorMath: "Равенство неверно!",
        menu: "Меню",
        time: "Время",
        yourBest: "Ваш лучший"
    },
    en: {
        title: "Brain training: matchsticks",
        play: "Play",
        continue: "Continue",
        check: "Check",
        hint: "Hint",
        instruction: "Move exactly ONE matchstick",
        task: "Puzzle",
        wellDone: "Well Done!",
        next: "Next",
        best: "My Best",
        worldBest: "World Best",
        errorMove: "Move exactly 1 matchstick!",
        errorMath: "Equation is incorrect!",
        menu: "Menu",
        time: "Time",
        yourBest: "Your best"
    }
};


function t(key) {
    const langData = I18N[currentLang] || I18N.en;
    return langData[key] || key;
}

function toggleLang() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('match_lang', currentLang);
    location.reload();
}

function updateUILabels() {
    const ids = {
        'game-title': 'title',
        'btn-play': 'play',
        'btn-continue': 'continue',
        'btn-check': 'check',
        'btn-hint': 'hint',
        'instruction': 'instruction',
        'msg-success': 'wellDone',
        'btn-next': 'next',
        'btn-back': 'menu'
    };

    for (const [id, key] of Object.entries(ids)) {
        const el = document.getElementById(id);
        if (el) {
            if (key === 'hint') {
                el.innerText = `💡 ${t(key)}`;
            } else {
                el.innerText = t(key);
            }
        }
    }
}
