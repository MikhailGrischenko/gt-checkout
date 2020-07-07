const formatNumber = function(value, digits = 0) {
    if (Intl && Intl.NumberFormat) {
        return new Intl.NumberFormat("ru-RU", {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits,
        }).format(value);
    } else {
        return parseFloat(value).toFixed(digits);
    }
};

export {formatNumber};
