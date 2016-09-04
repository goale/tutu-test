function drawRating(vote) {
    var starsCount = Math.ceil(vote / 20),
        result = [];

    for (var i = 0; i < 5; i++) {
        result.push(i < starsCount ? '★' : '☆');
    }

    return result.join('');
}

// Проверка работы результата
console.log(drawRating(1) ); // ★☆☆☆☆
console.log(drawRating(50)); // ★★★☆☆
console.log(drawRating(99)); // ★★★★★
