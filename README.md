# Job Application Tracker

## Answer to question 1
### Difference Between getElementById() and getElementsByClassName
1. By getElementById we get the html element by an ID and by getElementsByClassName we get the elements by a class
2. By getElementById we can get only one element but by the getElementsByClassName we can get multiple elements.
3. getElementById returns a single element and getElementsByClassName returns an html collection

### Difference Between querySelector and querySelectorAll
1. querySelector returns the first matching element while querySelectorAll returns all matching elements
2. querySelector returns a single element while querySelectorAll returns a node list
3. querySelector does not need a loop but querySelectorAll needs a loop to access multiple elements.

## Answer to question 2:
Step 1: I will use document.createElement() to create a new element 
Step 2: Use the the innerHtml to add content into the new element
Step 3: Use appendChild() to insert the element in the parent element.

## Answer to question 3:
Event bubbling is a process in the DOM where an event starts from the innermost element and propagates up to its parent element.

* When we click an element it first triggers the event listener on the target element.
* Then the event bubbles up to its parent element and triggers every parent's event listener

## Answer to question 4:
Event delegation is a system where instead of attaching event listener to multiple child elements we attach a single event listener to their parent. The parent listens for events from the child using event bubbling.

### It is useful for:
1. Fewer event listeners 
2. Works for elements added later to the DOM
3. Optimised and clean code

## Answer to question 5:
#Difference between preventDefault() and stopPropagation() methods

1. preventDefault method prevents the default browser behavior of an element and stopPropagation method stop the event from bubbling to the parent element.
2. preventDefault does not stop the propagating while stopPropagation stops the event from moving up or down the DOM.
3. preventDefault is used for clicking a link, submitting a form or pressing a key and stopPropagation is used for nested elements with multiple listeners.
