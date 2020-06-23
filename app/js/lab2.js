export default function lab2Handler(dragObject, dropElem) {
    const info1 = document.getElementById("info1"),
        info2 = document.getElementById("info2"),
        calorimeterHalf = document.getElementById("calorimeterHalf"),
        calorimeterFull = document.getElementById("calorimeterFull"),
        vessel = document.getElementById("vessel");

    const svgDrop = dragObject.elem.classList.contains("svgDrop"),
        svgDropH = dragObject.elem.classList.contains("svgDropH"),
        svgThermometer = dragObject.elem.classList.contains("svgThermometer"),
        svgCalorimeter = dropElem.classList.contains("svgCalorimeter"),
        svgVessel = dropElem.classList.contains("svgVessel"),
        svgLibra = dropElem.classList.contains("svgLibra");

    // калориметр
    if (svgCalorimeter) {
        if (svgDrop) {
            dropElem.style.animation = 'fill-opacity 1s';
            calorimeterHalf.style.fill = 'none';
            calorimeterFull.style.fill = '#b8c1ec';
            info1.innerText = '-';
        }

        if (svgThermometer) {
            if (calorimeterFull.style.fill === 'rgb(184, 193, 236)') {
                info1.innerText = 'Начальная температура  воды: 23 °С';
            }
        }
    }

    // сосуд
    if (svgVessel) {
        if (svgDropH) {
            dropElem.style.animation = 'fill-opacity 1s';
            vessel.style.fill = '#eebbc3';
            info2.innerText = '-';
        }

        if (svgThermometer) {
            if (vessel.style.fill === 'rgb(238, 187, 195)') {
                info2.innerText = 'Начальная температура горячей воды: 70 °С';
            }
        }
    }

    // libra
    if (svgLibra) {

    }
}