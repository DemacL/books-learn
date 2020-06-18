function maxSub(str) {
    let maxlength = 0;
    let currStr = '';
    let maxStr = '';
    for (let i = 0; i < str.length; i++) {
        const element = str[i];
        let index = currStr.indexOf(element);
        if (index >= 0) {
            currStr = currStr.substring(index + 1) + element;
        } else {
            currStr += element
        }
        console.log(currStr);
        maxStr = maxStr.length > currStr.length ? maxStr : currStr;
        console.log(maxStr);
    }
    return maxStr.length
}

maxSub('abcabcdabcdefasadjfskljhfkshftutqwezzcasdwczcqwexfg')