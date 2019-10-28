// 模拟bind实现
Function.prototype.testbind = function (thisargs) {
    const that = this;
    const restargs = Array.prototype.slice.call(arguments, 1);// 获取bind除了this之后的其它参数
    return function () { that.apply(thisargs, restargs.concat(...arguments)) }
}


function print(p1, p2, p3) {
    console.log(this.name, p1, p2, p3);
}

print.bind({ name: '原生bind' }, 1, 2)(3);
print.testbind({ name: 'testbindbind' }, 1, 2)(3);