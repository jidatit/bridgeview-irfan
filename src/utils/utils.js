export function formatDateRange(from, to) {
    const fromDate = new Date(from || "2013-11-11");
    const toDate = new Date(to || "2013-11-11");

    const fromMonth = fromDate.toLocaleString('default', { month: 'short' });
    const toMonth = toDate.toLocaleString('default', { month: 'short' });

    return `${fromMonth} ${fromDate.getDate()} - ${toMonth} ${toDate.getDate()}`;
};


export function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + ' ...' : text;
};

export function hasEmptyPropInObj(anyObject) {
    if (anyObject == null) {
        return true;
    }
    for (let key in anyObject) {
        if (anyObject.hasOwnProperty(key) && (/^['"]?$/.test(anyObject[key]))) {
            return true;
        }
    }
    return false;
}

