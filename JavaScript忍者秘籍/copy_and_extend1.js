
// copy
function Animal() {

}

Animal.prototype.speak = function () {
    console.log('speak...');
}

function Cat() {

}

Cat.prototype = {
    speak: Animal.prototype.speak
}

hek = new Cat();
console.log(hek instanceof Object);
console.log(hek instanceof Cat);
console.log(hek instanceof Animal);

// copy end
