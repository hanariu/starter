import Alpine from 'alpinejs'
import { getCookie, setCookie } from '../helper/cookie'

const changeDarkClass = (on: string) => {
  on === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
}
const useThemeSwitcher = (mode: string) => {
  let on = ''
  if (mode === 'default') {
    on = (localStorage.getItem('darkMode_on') === 'dark' || getCookie('darkMode_on') === 'dark' || ((localStorage.getItem('darkMode_on') === null) && window.matchMedia('(prefers-color-scheme: dark)').matches)) ? 'dark' : 'light'
    changeDarkClass(on)
  } else {
    on = mode
    changeDarkClass(on)
  }
  Alpine.store('darkMode', {
    on: on,
    toggle() {
      this.on = this.on === 'dark' ? 'light' : 'dark'
      changeDarkClass(this.on)
      localStorage.setItem('darkMode_on', this.on)
      const date = new Date();
      date.setHours(date.getHours() + 168);
      const isSecure = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
      setCookie('darkMode_on', this.on, date.toUTCString(), '/', window.location.hostname, isSecure)
    },
    system() {
      this.on = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' 
      changeDarkClass(this.on)
      localStorage.removeItem('darkMode_on')
    }
  } as any)
}

const darkmode = window.matchMedia('(prefers-color-scheme: dark)')
function screenDarkmode(e: any) {
  const darkmode = localStorage.getItem('darkMode_on')
  if (e.matches) {
    if (darkmode !== 'light') {
      useThemeSwitcher('dark')
    }
  } else {
    if (darkmode !== 'dark') {
      useThemeSwitcher('light')
    }
  }
}
darkmode.addEventListener('change', screenDarkmode)



export default useThemeSwitcher