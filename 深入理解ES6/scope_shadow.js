function getValue() {
    // var value = "blue3";
    let value = "blue1";
    if (true) {
        let value = "blue2";
        console.log('value2', value); // blue2
    }
    console.log('value1', value); // blue1
}

// getValue();
getValue();
