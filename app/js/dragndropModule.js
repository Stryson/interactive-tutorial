import lab1Handler from './lab1.js'
import lab2Handler from './lab2.js'
import lab3Handler from './lab3.js'

document.addEventListener("DOMContentLoaded", function () {

	// DRAG'N'DROP
	const DragManager = new function () {

		/**
		 * составной объект для хранения информации о переносе:
		 * {
		 *   elem - элемент, на котором была зажата мышь
		 *   avatar - аватар
		 *   downX/downY - координаты, на которых был mousedown
		 *   shiftX/shiftY - относительный сдвиг курсора от угла элемента
		 * }
		 */
		let dragObject = {},
			self = this;

		function onMouseDown(e) {
			if (e.which != 1) return;

			const elem = e.target.closest('.draggable');

			if (!elem) return;

			dragObject.elem = elem;

			// запомним, что элемент нажат на текущих координатах pageX/pageY
			dragObject.downX = e.pageX;
			dragObject.downY = e.pageY;

			return false;
		}

		function onMouseMove(e) {
			if (!dragObject.elem) return; // элемент не зажат

			if (!dragObject.avatar) { // если перенос не начат...
				const moveX = e.pageX - dragObject.downX,
					moveY = e.pageY - dragObject.downY;

				// если мышь передвинулась в нажатом состоянии недостаточно далеко
				if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
					return;
				}

				// начинаем перенос
				dragObject.avatar = createAvatar(e); // создать аватар

				if (!dragObject.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
					dragObject = {};
					return;
				}

				// аватар создан успешно
				// создать вспомогательные свойства shiftX/shiftY
				const coords = getCoords(dragObject.avatar);

				dragObject.shiftX = dragObject.downX - coords.left;
				dragObject.shiftY = dragObject.downY - coords.top;

				startDrag(e); // отобразить начало переноса
			}

			// отобразить перенос объекта при каждом движении мыши
			dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
			dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

			return false;
		}

		function onMouseUp(e) {
			if (dragObject.avatar) { // если перенос идет
				finishDrag(e);
			}

			// перенос либо не начинался, либо завершился
			// в любом случае очистим "состояние переноса" dragObject
			dragObject = {};
		}

		function finishDrag(e) {
			const dropElem = findDroppable(e);

			if (!dropElem) {
				self.onDragCancel(dragObject);
			} else {
				self.onDragEnd(dragObject, dropElem);
			}
		}

		function createAvatar(e) {

			// запомнить старые свойства, чтобы вернуться к ним при отмене переноса
			const avatar = dragObject.elem,
				old = {
					parent: avatar.parentNode,
					nextSibling: avatar.nextSibling,
					position: avatar.position || '',
					left: avatar.left || '',
					top: avatar.top || '',
					zIndex: avatar.zIndex || '',
					cursor: avatar.cursor || '',
					animation: avatar.animation || ''
				};

			// функция для отмены переноса
			avatar.rollback = function () {
				old.parent.insertBefore(avatar, old.nextSibling);
				avatar.style.position = old.position;
				avatar.style.left = old.left;
				avatar.style.top = old.top;
				avatar.style.zIndex = old.zIndex;
				avatar.style.cursor = old.cursor;
				avatar.style.animation = old.animation;

				// новые свойства при отмене переноса
				avatar.style.animation = 'scale 1s';
			};

			return avatar;
		}

		function startDrag(e) {
			const avatar = dragObject.avatar;

			// инициировать начало переноса
			document.body.appendChild(avatar);
			avatar.style.zIndex = 9999;
			avatar.style.position = 'absolute';
			avatar.style.cursor = 'pointer';
			avatar.style.animation = '';
		}

		function findDroppable(event) {

			// спрячем переносимый элемент
			dragObject.avatar.hidden = true;

			// получить самый вложенный элемент под курсором мыши
			const elem = document.elementFromPoint(event.clientX, event.clientY);

			// показать переносимый элемент обратно
			dragObject.avatar.hidden = false;

			if (elem == null) {

				// такое возможно, если курсор мыши "вылетел" за границу окна
				return null;
			}

			return elem.closest('.droppable');
		}

		document.onmousemove = onMouseMove;
		document.onmouseup = onMouseUp;
		document.onmousedown = onMouseDown;

		this.onDragEnd = function (dragObject, dropElem) { };
		this.onDragCancel = function (dragObject) { };

	};

	function getCoords(elem) { // кроме IE8-
		const box = elem.getBoundingClientRect();

		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
		};

	}

	DragManager.onDragCancel = function (dragObject) {
		dragObject.avatar.rollback();
	};

	DragManager.onDragEnd = (dragObject, dropElem) => {
		// dragObject.elem.style.display = 'none';

		const labName = document.getElementsByClassName("tab-pane")[0].classList[1];

		switch (labName) {
			case 'lab1':
				lab1Handler(dragObject, dropElem)
				break;
			case 'lab2':
				lab2Handler(dragObject, dropElem)
				break;
			case 'lab3':
				lab3Handler(dragObject, dropElem)
				break;
		}

		dragObject.avatar.rollback();
	};
});
