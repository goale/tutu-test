var checkSyntax = function (stmt) {
    var brackets = ['{', '}', '[', ']', '(', ')', '<', '>'];

    var openingBracketsStack = [];

    for (var i = 0; i < stmt.length; i++) {
        var bracketIndex = brackets.indexOf(stmt.charAt(i));
        if (bracketIndex !== -1) {
            // if index is even than bracket is opening
            if (bracketIndex % 2 === 0) {
                openingBracketsStack.push(stmt.charAt(i));
            } else {
                // closing bracket comes first
                if (openingBracketsStack.length === 0) {
                    return 1;
                }

                // opening bracket doesn't match
                if (brackets[bracketIndex - 1] !== openingBracketsStack.pop()) {
                    return 1;
                }
            }
        }
    }

    return 0;
};

try {
    test(checkSyntax, ['---(++++)----'], 0);
    test(checkSyntax, [''], 0);
    test(checkSyntax, ['before ( middle []) after '], 0);
    test(checkSyntax, [') ('], 1);
    test(checkSyntax, ['} {'], 1);
    test(checkSyntax, ['<(   >)'], 1);
    test(checkSyntax, ['(  [  <>  ()  ]  <>  )'], 0);
    test(checkSyntax, ['   (      [)'], 1);

    console.info("Congratulations! All tests success passed.");
} catch(e) {
    console.error(e);
}


// Простая функция тестирования
function test(call, args, count, n) {
    let r = (call.apply(n, args) === count);
    if (!r) throw "Test failed!";
}
