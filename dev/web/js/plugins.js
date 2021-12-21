let $plugins = {}
window.$plugins = $plugins

Element.prototype.appendAfter = function (element) {
	element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() { }

function _createModalFooter(buttons = []) {
	if (buttons.length === 0) {
		return document.createElement('div')
	}
	const wrap = document.createElement('div')
	wrap.classList.add('vmodal__footer')

	buttons.forEach(btn => {
		const $btn = document.createElement(btn.tag || 'button')
		if (btn.tag === 'a') {
			$btn.setAttribute('href', btn.link)
		}
		$btn.innerHTML = btn.text
		$btn.classList.add(`${btn.class || 'g-btn'}`)
		$btn.onclick = btn.handler || noop
		wrap.appendChild($btn)
	})

	return wrap
}

function _createModal(options) {
	const DEFAULT_WIDTH = '600px'
	const modal = document.createElement('div')
	modal.classList.add('vmodal')

	modal.insertAdjacentHTML('afterbegin', `
		<div class="vmodal__overlay">
			<div class="vmodal__window" style="max-width: ${options.width || DEFAULT_WIDTH}">
				<div class="vmodal__header">
					<span class="vmodal__title" data-title='true'>${options.title || 'Модальное окно'}</span>
					${options.closable ? `<span class="vmodal__close" data-close="true">&times;</span>` : ''}
				</div>
				<div class="vmodal__body" data-content="true">
					${options.content || ''}
				</div>
			</div>
		</div>
	`)
	const footer = _createModalFooter(options.footerButtons)
	footer.appendAfter(modal.querySelector('[data-content]'))

	document.body.appendChild(modal)
	return modal
}

$plugins.modal = function (options) {
	const ANIMATION_SPEED = 200
	let $modal = _createModal(options)

	let closing = false
	let destroyed = false



	const modal = {
		open() {
			if (destroyed) {
				return console.log('destroyed true')
			}

			!closing && $modal.classList.add('open')
			!closing && (document.body.classList.add('show-modal'))

			let vmodal = document.querySelectorAll('.vmodal')

			vmodal.forEach(el => {
				el.classList.remove('open')
			})

			!closing && $modal.classList.add('open')
			!closing && (document.body.classList.add('show-modal'))

		},
		close() {
			closing = true
			$modal.classList.remove('open')
			$modal.classList.add('hide')
			document.body.classList.remove('show-modal')

			let vmodal = document.querySelectorAll('.vmodal')
			vmodal.forEach(el => {
				el.classList.remove('open')
			})

			setTimeout(() => {
				$modal.classList.remove('hide')
				closing = false
			}, ANIMATION_SPEED)
		}
	}

	const listener = (e) => {
		if (e.target.dataset.close) {
			modal.close()
			setTimeout(() => modal.destroy(), 1000)
		}
		else if (e.target.classList.contains('vmodal__overlay')) {
			modal.close()
			setTimeout(() => modal.destroy(), 1000)
		}
	}

	const keyPressEvent = (e) => {
		if (e.key == 'Escape') {
			modal.close()
			setTimeout(() => modal.destroy(), 1000)
		}
	}

	$modal.addEventListener('click', listener)
	document.addEventListener('keydown', keyPressEvent)

	return Object.assign(modal, {
		destroy() {
			$modal.parentNode.removeChild($modal)
			$modal.removeEventListener('click', listener)
			$modal.removeEventListener('click', keyPressEvent)
			destroyed = true
		},
		setContent(title = 'Модальное окно', content) {
			$modal.querySelector('[data-title]').innerHTML = title
			$modal.querySelector('[data-content]').innerHTML = content
		}
	})
}
