var switcher = document.querySelector('.btn')

var lastTheme = localStorage.getItem('theme')// Letzte Einstellung bezüglich Dark-/LightTheme abrufen und anwenden
if (lastTheme) {
    switchTheme(lastTheme)
} else if (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) {// Falls Gerät DarkMode eingestellt hat, auf DarkTheme switchen
    switchTheme('dark-theme')
}

switcher.addEventListener('click', function () {
    switchTheme()
})

function switchTheme (theme = null) {// Switcher für Dark-/LightTheme
    if (!theme) {
        document.body.classList.toggle('dark-theme')
        document.body.classList.toggle('light-theme')

        theme = document.body.className

    } else {
        document.body.className = ''
        document.body.classList.add(theme)
    }

    if (theme === 'dark-theme') {
        switcher.textContent = 'Hell'// Button-Text ändern je nach ausgewähltem Theme
    } else {
        switcher.textContent = 'Dunkel'
    }

    console.log('setting theme', theme)
    localStorage.setItem('theme', theme)// Theme im localStorage speichern
}
