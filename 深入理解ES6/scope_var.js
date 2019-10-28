function getValue(condition) {
    if (condition) {
        var value = "blue";
        // 其他代码
        // return value;
        console.log('value1', value);
    } else {
        // value 在此处可访问，值为 undefined
        // return null;
        console.log('value2', value);
    }
    console.log('value3', value);
    // value 在此处可访问，值为 undefined
}

getValue();
