'use strict';

var selectors = ['ul[class*="page"] li', '.pagination > *'];

function init(nodes) {
	var links = Array.from(nodes).map(function (node, index) {
		var link = node.href ? node : node.querySelector('a');
		var text = node.textContent.trim();
		var numberMatch = text.match(/^\d+/);

		if (!numberMatch || numberMatch && numberMatch.length < 1) {
			return;
		}

		return {
			link: link,
			current: !link
		};
	}).filter(function (node) {
		return node;
	});

	var currentIndex = links.findIndex(function (link) {
		return link.current;
	});
	var previous = links[currentIndex - 1];
	var next = links[currentIndex + 1];

	if (currentIndex > -1 && (previous || next)) {
		addEventListener('keydown', function (event) {
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
		});
	}
}

for (var i = 0; i < selectors.length; i++) {
	var nodes = document.querySelectorAll(selectors[i]);

	if (nodes.length > 1) {
		init(nodes);
	}
};