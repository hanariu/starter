import "../assets/output.css"
import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import focus from '@alpinejs/focus'
import useAnchor from './plugins/anchor.ts'
import popover from './data/popover.ts'
import useThemeSwitcher from './stores/themeSwitcher'
import useMobile from './stores/mobile'
import useOverlay from './stores/overlay'
import useCookies from './stores/cookies'

Alpine.plugin(focus)
Alpine.plugin(persist)
Alpine.prefix('data-x-')
useOverlay()
useThemeSwitcher('default')
useMobile()
useAnchor()
useCookies()
Alpine.data("popover", popover)
Alpine.start()
window.Alpine = Alpine