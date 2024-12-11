import Alpine from 'alpinejs'

const useMobile= () => {
  Alpine.store('mobile', {
    init() {
      var br = new ResizeObserver(entries => {
        for (let entry of entries) {
          const cr = entry.contentRect;
          this.on = cr.width < 1024
          console.log(this.on)
        }
      })
      br.observe(document.querySelector('body') as Element)
    },
    on: false,
    change() {
      this.on = this.on !== true
    },
    setMobile() {
      this.on = true
    },
    setDesktop() {
      this.on = false
    },
  } as any)
} 

export default useMobile