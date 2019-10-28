
//  extend1.
function Animal() {

}

Animal.prototype.speak = function () {
    console.log('speak...');
}

function Cat() {

}


// 使用一个对象的实例作为另外一个对象的原型
Cat.prototype = new Animal();

hek = new Cat();
console.log(hek instanceof Object);
console.log(hek instanceof Cat);
console.log(hek instanceof Animal);

// extend1 end
