import Alpine from 'alpinejs'
import { getCookie, setCookie } from '../helper/cookie'

const useCookies = () => {
  Alpine.store('cookies', {
    show: true,
    init(){
      Alpine.effect(() => {
        const isCookie = getCookie('cookie_accept')
        if (isCookie !== null) {
          this.show = false
          if (isCookie === 'accept'){
            this.accept()
          }
        }
      })
    },
    accept() {
      const date = new Date()
      date.setHours(date.getHours() + 168)
      const isSecure = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
      setCookie('cookie_accept', 'accept', date.toUTCString(), '/', window.location.hostname, isSecure)
      this.show = false
    },
    reject() {
      const date = new Date()
      date.setHours(date.getHours() + 1)
      const isSecure = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
      setCookie('cookie_accept', 'reject', date.toUTCString(), '/', window.location.hostname, isSecure)
      this.show = false
    }
  } as any)
} 

export default useCookies