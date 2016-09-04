function parseUrl(url) {
    var el = document.createElement('a');
    el.setAttribute('href', url);

    return el;
}
