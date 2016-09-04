var checkSyntax = function (stmt) {
    var brackets = {
        '{' : '}',
        '[' : ']',
        '<' : '>',
        '(' : ')',
    };

    var openingBracketsStack = [];
    // 1. use regex to delete all except brackets
    stmt = stmt.replace(/([^\(\)<>\{\}\[\]]+)/g, '');
    console.log(stmt);
    // 2. check brackets, if bracket is opening, add it to a stack
    for (var i = 0; i < stmt.length; i++) {
        if (Object.keys(brackets).indexOf(stmt.charAt(i)) !== -1) {
            openingBracketsStack.push(stmt.charAt(i));
            console.log(openingBracketsStack);
        } else {
            if (openingBracketsStack.length === 0) {
                return 1;
            }

            if (stmt.charAt(i) !== brackets[openingBracketsStack.pop()]) {
                return 1;
            }
        }
    }

    return 0;
};
