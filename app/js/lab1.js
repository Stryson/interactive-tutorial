export default function lab1Handler(dragObject, dropElem) {
	const colorPink = 'rgb(238, 187, 195)', colorBlue = 'rgb(212, 216, 240)';

	const info1 = document.getElementById("info1"),
		info2 = document.getElementById("info2"),
		calorimeterHalf = document.getElementById("calorimeterHalf"),
		calorimeterFull = document.getElementById("calorimeterFull"),
		glass = document.getElementById("glass");

	const svgDrop = dragObject.elem.classList.contains("svgDrop"),
		svgDropH = dragObject.elem.classList.contains("svgDropH"),
		svgDropC = dragObject.elem.classList.contains("svgDropC"),
		svgThermometer = dragObject.elem.classList.contains("svgThermometer"),
		svgCalorimeter = dropElem.classList.contains("svgCalorimeter"),
		svgGlass = dropElem.classList.contains("svgGlass");


	// калориметр
	if (svgCalorimeter) {
		if (svgDropH && calorimeterHalf.style.fill !== 'none') {
			dropElem.style.animation = 'fill-opacity 1s';
			calorimeterHalf.style.fill = colorPink;
			info1.innerText = '-';
		}

		if (svgDropC && calorimeterHalf.style.fill === colorPink) {
			dropElem.style.animation = 'fill-opacity2 1s';
			calorimeterHalf.style.fill = 'none';
			calorimeterFull.style.animation = 'cold-hot-cold 2s infinite';
			info1.innerText = '-';
		}

		if (svgThermometer) {
			if (calorimeterHalf.style.fill === colorPink) {
				info1.innerText = 'Начальная температура горячей воды: 70 °С';
			}

			if (calorimeterHalf.style.fill === 'none') {
				info1.innerText = 'Температура смеси: 43 °С';
			}
		}
	}

	// стакан
	if (svgGlass) {
		if (svgDropC) {
			dropElem.style.animation = 'fill-opacity 1s';
			glass.style.fill = colorBlue;
			info2.innerText = '-';
		}

		if (svgThermometer) {
			if (glass.style.fill === colorBlue) {
				info2.innerText = 'Начальная температура холодной воды: 20 °С';
			}
		}
	}
}