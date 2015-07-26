var selectors = [
	'ul[class*="page"] li',
	'.pagination > *'
];

function init(nodes) {
	let links = Array.from(nodes).map((node, index) => {
		let link = (node.href) ? node : node.querySelector('a');
		let text = node.textContent.trim();
		let numberMatch = text.match(/^\d+/);

		if (!numberMatch || numberMatch && numberMatch.length < 1) {
			return;
		}

		return {
			link,
			current: !link
		}
	}).filter(node => node);

	let currentIndex = links.findIndex(link => link.current);
	let previous = links[currentIndex-1];
	let next = links[currentIndex+1];

	if (currentIndex > -1 && (previous || next)) {
		addEventListener('keydown', event => {
			switch (event.keyIdentifier) {
				case 'Left':
					if (previous) {
						event.preventDefault();

						window.location = previous.link.href;
					}

					break;
				case 'Right':
					if (next) {
						event.preventDefault();

						window.location = next.link.href;
					}

					break;
				default:
					break;
			}
		})
	}
}

for (var i = 0; i < selectors.length; i++) {
	let nodes = document.querySelectorAll(selectors[i]);

	if (nodes.length > 1) {
		init(nodes);
	}
};
