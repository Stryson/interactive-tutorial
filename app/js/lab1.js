export default function lab1Handler(dragObject, dropElem) {
	const info1 = document.getElementById("info1"),
		info2 = document.getElementById("info2"),
		glass = document.getElementById("glass"),
		calorimeterHalf = document.getElementById("calorimeterHalf"),
		calorimeterFull = document.getElementById("calorimeterFull"),
		vessel = document.getElementById("vessel");

	const svgDrop = dragObject.elem.classList.contains("svgDrop"),
		svgDropH = dragObject.elem.classList.contains("svgDropH"),
		svgDropC = dragObject.elem.classList.contains("svgDropC"),
		svgThermometer = dragObject.elem.classList.contains("svgThermometer"),
		svgGlass = dropElem.classList.contains("svgGlass"),
		svgLibra = dropElem.classList.contains("svgLibra"),
		svgVessel = dropElem.classList.contains("svgVessel"),
		svgCalorimeter = dropElem.classList.contains("svgCalorimeter");


	// калориметр
	if (svgCalorimeter) {

		if (svgDrop && calorimeterHalf.style.fill !== 'none') {
			dropElem.style.animation = 'fill-opacity 1s';
			calorimeterHalf.style.fill = '#b8c1ec';
			info1.innerText = '-';
		}

		if (svgDropH && calorimeterHalf.style.fill !== 'none') {
			dropElem.style.animation = 'fill-opacity 1s';
			calorimeterHalf.style.fill = '#eebbc3';
			info1.innerText = '-';
		}

		if (svgDropC && calorimeterHalf.style.fill === 'rgb(238, 187, 195)') {
			dropElem.style.animation = 'fill-opacity2 1s';
			calorimeterHalf.style.fill = 'none';
			calorimeterFull.style.animation = 'cold-hot 2s infinite';
			info1.innerText = '-';
		}

		if (svgThermometer) {
			if (calorimeterHalf.style.fill === 'rgb(238, 187, 195)') {
				info1.innerText = 'Начальная температура горячей воды: 70 °С';
			}

			if (calorimeterHalf.style.fill === 'rgb(184, 193, 236)') {
				info1.innerText = 'Начальная температура  воды: 23 °С';
			}

			if (calorimeterHalf.style.fill === 'none') {
				info1.innerText = 'Температура смеси: 43 °С';
			}
		}
	}

	// стакан
	if (svgGlass) {

		// холодная вода
		if (svgDropC) {
			dropElem.style.animation = 'fill-opacity 1s';
			glass.style.fill = '#b8c1ec';
			info2.innerText = '-';
		}

		// вывод температуры
		if (svgThermometer) {
			if (glass.style.fill === 'rgb(184, 193, 236)') {
				info2.innerText = 'Начальная температура холодной воды: 20 °С';
			}
		}
	}

	// vessel
	if (svgVessel) {

		// горячая вода
		if (svgDropH) {
			dropElem.style.animation = 'fill-opacity 1s';
			vessel.style.fill = '#eebbc3';
			info2.innerText = '-';
		}

		// вывод температуры
		if (svgThermometer) {
			if (vessel.style.fill === 'rgb(238, 187, 195)') {
				info2.innerText = 'Начальная температура горячей воды: 70 °С';
			}
		}
	}

	// libra
	if (svgLibra) {

		// горячая вода
		if (svgDropH) {
			dropElem.style.animation = 'fill-opacity 1s';
			vessel.style.fill = '#eebbc3';
			info2.innerText = '-';
		}

		// вывод температуры
		if (svgThermometer) {
			if (vessel.style.fill === 'rgb(238, 187, 195)') {
				info1.innerText = 'Начальная температура горячей воды: 70 °С';
			}
		}
	}

}