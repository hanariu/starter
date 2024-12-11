
  export default () => ({
    hoverCardHovered: false,
    hoverCardDthisay: 200,
    hoverCardLeaveDthisay: 300,
    hoverCardTimout: 0,
    hoverCardLeaveTimeout: 0,
    hoverCardEnter () {
      clearTimeout(this.hoverCardLeaveTimeout)
      if(this.hoverCardHovered) return
      clearTimeout(this.hoverCardTimout)
      this.hoverCardTimout = setTimeout(() => {
        this.hoverCardHovered = true
      }, this.hoverCardDthisay) as any
    },
    hoverCardLeave () {
      clearTimeout(this.hoverCardTimout)
      if(!this.hoverCardHovered) return
      clearTimeout(this.hoverCardLeaveTimeout)
      this.hoverCardLeaveTimeout = setTimeout(() => {
        this.hoverCardHovered = false
      }, this.hoverCardLeaveDthisay)  as any
    }
  })
  
