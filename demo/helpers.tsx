/* ====== Helpers ====== */
export function updateQueryStringParameter(uri, key, value) {
    const keyValue = value === '' ? key : key + '=' + value;
    const re = new RegExp('([?|&])' + key + '=?.*?(&|#|$)', 'i');
    if (uri.match(re)) {
        if (value !== undefined) {
            return uri.replace(re, '$1' + keyValue + '$2');
        } else {
            return uri.replace(re, (_, separator: string, rest: string) => {
                if (rest.startsWith('&')) {
                    rest = rest.substring(1);
                }
                return separator === '&' ? rest : separator + rest;
            });
        }
    } else {
        if (value === undefined) {
            return uri;
        }
        let hash = '';
        if (uri.indexOf('#') !== -1) {
            hash = uri.replace(/.*#/, '#');
            uri = uri.replace(/#.*/, '');
        }
        const separator = uri.indexOf('?') !== -1 ? '&' : '?';
        return uri + separator + keyValue + hash;
    }
}