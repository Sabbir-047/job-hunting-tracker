1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer: 
# getElementById("#some-id-from-html") let us to get and modify a single element from the html document. we can do all the DOM actions with it. we can manipulate or update data dynamically through it. 

# getElementsByClassName: Grabs all the elements sharing a specific class name in the html document. Returns a live array like html collection

# querySelector: grabs only the first element that matches a given CSS selector like ("#id", ".class", "tagname")

# querySelectorAll: grabs all the elements from the html that match a CSS selector. Returns a static NodeList. which we can utilize through forEach() loop. 

example:
const getid = document.getElementById("#id");
const getClass = document.getElementsByClassName(".className");
const getQuery = document.querySelector('#id', ".class", "tag");
const queryList = document.querySelectorAll("#id",".class","tag");




2. How do you create and insert a new element into the DOM?

Answer: 
To add new elements to the page dynamically, we have to go through a phase -> 
* Create : we have to use document.createElement('tagName');
* Add or customize: add text, classes, attributes through innterText, innerHTML
* Insert: We have to use methods appendChild(), append() to an existing parent element.


example ->
const newPara = document.createElement('p');
newPara.innerText = "Hello, my new paragraph";
newPara.classList.add("text-gray-500");
document.body.appendChild(newPara);



3. What is Event Bubbling? And how does it work?

Answer:
Event bubble is the default behavior of events in the DOM. When an event like(click, keyup) or anything arises, it first triggeres the listener on that element, then it goes up to the parent and so on to it's upper parent. Finally to the document object.

example:
<div id="parent" onclick="alert('Parent Clicked!')">
    <button id="child" onlcick="alert('You clicked me to')">Click Me mate</button>
</div>

4. What is Event Delegation in JavaScript? Why is it useful?
5. What is the difference between preventDefault() and stopPropagation() methods?