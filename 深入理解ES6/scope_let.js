function getValue(condition) {
    if (condition) {
        // console.log('value1', value);
        let value = "blue";
        console.log('value1', value);
    } else {
        console.log('value2', value); // value is not defined
    }
    // console.log('value3', value);
    // value 在此处可访问，值为 undefined
}

// getValue();
getValue(true);
