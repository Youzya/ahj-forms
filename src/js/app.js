function createPopover(trigger, options) {
    const popoverTemplate = document.querySelector(`[data-popover=${trigger.dataset.popoverTarget}]`)
    console.log(popoverTemplate)
    const popover = document.createElement("div")
    popover.innerHTML = popoverTemplate.innerHTML
    popover.style.position = "fixed"
    popover.classList.add(options.className)
    function handleWindowAvent() {
        if(isVisible()) {
            showPopover()
        }
    }
    function handleDocument(ivent) {
        if(isVisible() && ivent.target !== trigger && ivent.target !== popover) {
            popover.remove()
        }
    }
    function isVisible() {
        return document.body.contains(popover)
    }
    function showPopover() {
        document.addEventListener("click", handleDocument)
        window.addEventListener("scroll", handleWindowAvent)
        window.addEventListener("resize", handleWindowAvent)
        document.body.appendChild(popover)
        const {top: triggerTop, left: triggerLeft} = trigger.getBoundingClientRect()
        const {offsetWidth: triggerWidth} = trigger
        const {offsetHeight: popoverHeight, offsetWidth: popoverWidth} = popover
        const position = {name: "top", top: triggerTop - popoverHeight, left: triggerLeft - (popoverWidth - triggerWidth)/2}
        popover.style.top = `${position.top}px`
        popover.style.left = `${position.left}px`
        if(position) {
            popover.classList.add(`${options.className}-${position.name}`)
        }
    }
    function deletePopover() {
        popover.remove()
        document.removeEventListener("click", handleDocument)
        window.removeEventListener("scroll", handleWindowAvent)
        window.removeEventListener("resize", handleWindowAvent)
    }
    function togglePopover() {
        if(isVisible()) {
            deletePopover()
        } else {
            showPopover()
        }
    }
    return {toggle: togglePopover}
}

const triggerBtn = document.querySelector(".trigger");
let curentPopover = createPopover(triggerBtn, {position: "top", className: "popover"});

triggerBtn.addEventListener("click", () => {
  curentPopover.toggle()
})

