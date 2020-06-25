export default function lab2Handler(dragObject, dropElem) {
    const slideRange = document.getElementById("myRange"),
        value = slideRange.value;

    const colorPink = 'rgb(238, 187, 195)', colorBlue = 'rgb(184, 193, 236)';

    const info1 = document.getElementById("info1"),
        info2 = document.getElementById("info2"),
        calorimeterHalf = document.getElementById("calorimeterHalf"),
        calorimeterFull = document.getElementById("calorimeterFull"),
        vessel = document.getElementById("vessel"),
        cylinder1 = document.getElementById("cylinder1"),
        cylinder2 = document.getElementById("cylinder2"),
        weightHidden = document.getElementById("weightHidden"),
        cylinderHidden = document.getElementById("cylinderHidden"),
        rotateLibra = document.getElementById("rotateLibra");

    const svgDrop = dragObject.elem.classList.contains("svgDrop"),
        svgDropH = dragObject.elem.classList.contains("svgDropH"),
        svgThermometer = dragObject.elem.classList.contains("svgThermometer"),
        svgWeight = dragObject.elem.classList.contains("svgWeight"),
        svgCylinder = dragObject.elem.classList.contains("svgCylinder"),
        svgCalorimeter = dropElem.classList.contains("svgCalorimeter"),
        svgVessel = dropElem.classList.contains("svgVessel"),
        svgLibra = dropElem.classList.contains("svgLibra");

    // калориметр
    if (svgCalorimeter) {
        if (svgDrop && calorimeterFull.style.fill !== colorPink) {
            dropElem.style.animation = 'fill-opacity 1s';
            calorimeterHalf.style.fill = 'none';
            calorimeterFull.style.fill = colorBlue;
            info1.innerText = '-';
        }

        if (svgThermometer) {
            if (calorimeterFull.style.fill === colorBlue) {
                info1.innerText = 'Начальная температура  воды: 23 °С';
            }

            if (calorimeterFull.style.fill === colorPink) {
                info1.innerText = 'Общая температура  воды цилиндра: 38 °С';
            }
        }

        if (svgCylinder && calorimeterFull.style.fill === colorBlue && vessel.style.fill === colorPink && cylinder1.style.fill === colorPink) {
            calorimeterFull.style.animation = 'cold-hot 1s';
            calorimeterFull.style.fill = colorPink;
            cylinder1.style.fill = colorBlue;
            cylinder2.style.fill = colorBlue;
            info1.innerText = '-';
        }
    }

    // сосуд
    if (svgVessel) {
        if (svgDropH && cylinder1.style.fill !== colorPink && calorimeterFull.style.fill !== colorPink) {
            dropElem.style.animation = 'fill-opacity 1s';
            vessel.style.fill = colorPink;
            info2.innerText = '-';
        }

        if (svgThermometer) {
            if (vessel.style.fill === colorPink && calorimeterFull.style.fill !== colorPink) {
                info2.innerText = 'Начальная температура горячей воды: 70 °С';
            }

            if (vessel.style.fill === colorPink && cylinder1.style.fill === colorPink) {
                info2.innerText = 'Начальная температура цилиндра: 81 °С';
            }
        }

        if (svgCylinder && vessel.style.fill === colorPink && calorimeterFull.style.fill !== colorPink) {
            cylinder1.style.fill = colorPink;
            cylinder2.style.fill = colorPink;
            info2.innerText = '-';
        }
    }

    // libra *&& calorimeterFull.style.fill === colorPink*
    if (svgLibra) {
        if (svgWeight && !weightHidden.classList.contains("active")) {

            // гири
            weightHidden.classList.add("active");
            rotateLibra.style.animation = 'rotateRight 1s';
            rotateLibra.style.transform = "rotate(5deg)";
            weightHidden.style.animation = 'rotateRight 1s';
            weightHidden.style.transform = "rotate(5deg)";

            // + цилиндр
            if (cylinderHidden.classList.contains("active")) {
                rotateLibra.style.animation = 'rotateLibraLeft 1s';
                rotateLibra.style.transform = "rotate(-5deg)";
                cylinderHidden.style.animation = 'rotateLibraLeft 1s';
                cylinderHidden.style.transform = "rotate(-5deg)";
                weightHidden.style.animation = 'rotateLibraLeft 1s';
                weightHidden.style.transform = "rotate(-5deg)";
            }
        }

        if (svgCylinder && !cylinderHidden.classList.contains("active")) {

            // цилиндр
            cylinderHidden.classList.add("active");
            rotateLibra.style.animation = 'rotateLeft 1s';
            rotateLibra.style.transform = "rotate(-10deg)";
            cylinderHidden.style.animation = 'rotateLeft 1s';
            cylinderHidden.style.transform = "rotate(-10deg)";

            // + гири
            if (weightHidden.classList.contains("active")) {
                rotateLibra.style.animation = 'rotateLibraRight 1s';
                rotateLibra.style.transform = "rotate(-5deg)";
                cylinderHidden.style.animation = 'rotateLibraRight 1s';
                cylinderHidden.style.transform = "rotate(-5deg)";
                weightHidden.style.animation = 'rotateLibraRight 1s';
                weightHidden.style.transform = "rotate(-5deg)";
            }
        }
    }

    if (slideRange.onchange) {
        if (weightHidden.classList.contains("active") && cylinderHidden.classList.contains("active")) {
            slideInfo.innerText = value + " грамм";
        }
    }
}