1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer: 
# getElementById("#some-id-from-html") let us to get and modify a single element from the html document. we can do all the DOM actions with it. we can manipulate or update data dynamically through it. 

# getElementsByClassName: Grabs all the elements sharing a specific class name in the html document. Returns a live array like html collection

# querySelector: grabs only the first element that matches a given CSS selector like ("#id", ".class", "tagname")

# querySelectorAll: grabs all the elements from the html that match a CSS selector. Returns a static NodeList. which we can utilize through forEach() loop. 

const getid = document.getElementById("#id");
const getClass = document.getElementsByClassName(".className");
const getQuery = document.querySelector('#id', ".class", "tag");
const queryList = document.querySelectorAll("#id",".class","tag");




2. How do you create and insert a new element into the DOM?
3. What is Event Bubbling? And how does it work?
4. What is Event Delegation in JavaScript? Why is it useful?
5. What is the difference between preventDefault() and stopPropagation() methods?