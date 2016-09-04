function findLastOccurence(s, a, b) {
    if (s.length === 0) {
        return -1;
    }

    return Math.max(s.lastIndexOf(a), s.lastIndexOf(b));
}

try {
    test(findLastOccurence, ['asdasdasd', 'a', 's'], 7);
    test(findLastOccurence, ['asdasdasd', 'd', 's'], 8);
    test(findLastOccurence, ['', 'c', 'd'], -1);
    test(findLastOccurence, ['asdasdasd', 'x', 'y'], -1);
    test(findLastOccurence, ['abcde', 'b', 'c'], 2);
    test(findLastOccurence, ['abcde', 'a', 'b'], 1);
    test(findLastOccurence, ['abcde', 'x', 'c'], 2);

    console.info("Congratulations! All tests success passed.");
} catch(e) {
    console.error(e);
}


// Простая функция тестирования
function test(call, args, count, n) {
    let r = (call.apply(n, args) === count);
    if (!r) throw "Test failed!";
}
