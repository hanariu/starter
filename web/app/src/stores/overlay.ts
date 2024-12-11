import Alpine from 'alpinejs'

const useOverlay = () => {
  Alpine.store('overlay', {
    template: 'default',
    isOverlay: false,
    isModal: false,
    toggleShow() {
      this.isOverlay = !this.isOverlay
    },
    showTemplate(val: string){
      this.template = val
    },
    show(val: string) {
      this.template = val
      this.isModal = true
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.position = 'fixed'
      this.isOverlay = true
    },
    close() {
      const scrollY1 = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY1 || '0') * -1)
      this.isModal = false
      this.template = 'default'
      this.isOverlay = false
    },
    closeTop() {
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, 0)
      this.isModal = false
      this.template = 'default'
      this.isOverlay = false
    }
  } as any)
} 

export default useOverlay