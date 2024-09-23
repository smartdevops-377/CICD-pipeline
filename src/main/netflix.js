const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');
// The .querySelectorAll method is a JavaScript function used to select multiple elements from the HTML document based on a given CSS selector. 
// It returns a NodeList, which is a collection of DOM elements that match the provided selector. 
// Each element in the NodeList can then be accessed and manipulated individually.

// Select tab content item
function selectItem(e) {
	// Remove all show and border classes
	removeBorder();
	removeShow();
	// Add border to current tab item
	this.classList.add('tab-border');
	// Grab content item from DOM
	const tabContentItem = document.querySelector(`#${this.id}-content`);
	// The expression ${this.id} appears to be a placeholder in a context where template literals are used in JavaScript. 
	// Template literals are enclosed by backticks ( ) and allow you to embed expressions or variables within a string. 
	// The ${} syntax is used to interpolate the value of the enclosed expression or variable into the string.
    // In the context of your question, ${this.id} is likely used to dynamically insert the id property of an element into a string. 
	// Add show class
	tabContentItem.classList.add('show');
}

// Remove bottom borders from all tab items
function removeBorder() {
	tabItems.forEach(item => {
		item.classList.remove('tab-border');
	});
}

// Remove show class from all content items
function removeShow() {
	tabContentItems.forEach(item => {
		item.classList.remove('show');
	});
}

// Listen for tab item click
tabItems.forEach(item => {
	item.addEventListener('click', selectItem);
});


function myFunction(tabOfI) {

	const tab1 = document.getElementById('tab-1');
	const tab2 = document.getElementById('tab-2');
	const tab3 = document.getElementById('tab-3');

	const tab1content = document.getElementById('tab-1-content');
	const tab2content = document.getElementById('tab-2-content');
	const tab3content = document.getElementById('tab-3-content');

	
	if (tabOfI == 'tab-1') {
		tab2content.classList.remove('show');
		tab3content.classList.remove('show');
		tab1content.classList.add('show');
		tab1.classList.add('tab-border');
		tab2.classList.remove('tab-border');
		tab3.classList.remove('tab-border');
	} else if (tabOfI == 'tab-2') {
		tab3content.classList.remove('show');
		tab1content.classList.remove('show');
		tab2content.classList.add('show');
		tab1.classList.remove('tab-border');
		tab2.classList.add('tab-border');
		tab3.classList.remove('tab-border');
	} else {
		tab2content.classList.remove('show');
		tab1content.classList.remove('show');
		tab3content.classList.add('show');
		tab1.classList.remove('tab-border');
		tab2.classList.remove('tab-border');
		tab3.classList.add('tab-border');
	}
}
