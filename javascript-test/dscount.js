'use strict';

var dscount = function (word, s1, s2) {
    word = word.toLowerCase();
    var index = word.indexOf((s1 + s2).toLowerCase());

    if (index === -1) {
        return 0;
    }

    return 1 + dscount(word.substr(index + 1), s1, s2);
};

// Для удобства можно использовать эти тесты:
try {
    test(dscount, ['', 'a', 'b'], 0);
    test(dscount, ['ab___ab__', 'a', 'b'], 2);
    test(dscount, ['___cd____', 'c', 'd'], 1);
    test(dscount, ['de_______', 'd', 'e'], 1);
    test(dscount, ['12_12__12', '1', '2'], 3);
    test(dscount, ['_ba______', 'a', 'b'], 0);
    test(dscount, ['_a__b____', 'a', 'b'], 0);
    test(dscount, ['-ab-аb-ab', 'a', 'b'], 2);
    test(dscount, ['aAa', 'a', 'a'], 2);

    console.info("Congratulations! All tests success passed.");
} catch(e) {
    console.error(e);
}


// Простая функция тестирования
function test(call, args, count, n) {
    let r = (call.apply(n, args) === count);
    console.assert(r, `Finded items count: ${count}`);
    if (!r) throw "Test failed!";
}
