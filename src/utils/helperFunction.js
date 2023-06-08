export const resizeTextarea = (el) => {
    el.addEventListener("input", e => {
        const scrollHeight = e.target.scrollHeight;
        console.log(scrollHeight)
        el.style.overflow = "hidden";
        el.style.height = "23px";
        el.style.height = `${scrollHeight}px`;
    })
}