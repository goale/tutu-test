function drawRating(vote) {
    if (vote >= 0 && vote <= 20) {
        return '★☆☆☆☆';
    }
    else if (vote > 20 && vote <= 40) {
        return '★★☆☆☆';
    }
    else if (vote > 40 && vote <= 60) {
        return '★★★☆☆';
    }
    else if (vote > 60 && vote <= 80) {
        return '★★★★☆';
    }
    else if (vote > 80 && vote <= 100) {
        return '★★★★★';
    }
}

// Проверка работы результата
console.log(drawRating(1) ); // ★☆☆☆☆
console.log(drawRating(50)); // ★★★☆☆
console.log(drawRating(99)); // ★★★★★
