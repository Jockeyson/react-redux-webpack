export const fetchCurrentFlowData = (arr: any[], index: number) => {
    var item = arr.filter((a) => {
        return a.index == index;
    });
    return item && item.length > 0 ? item[0].flowData : {};
};

export const deepCopy = (result, source) => {
    for (var key in source) {
        var copy = source[key];
        if (source === copy) continue; //如window.window === window，会陷入死循环
        if (isTypeOf(copy, "Object")) {
            result[key] = deepCopy(result[key] || {}, copy);
        } else if (isTypeOf(copy, "Array")) {
            result[key] = deepCopy(result[key] || [], copy);
        } else {
            result[key] = copy;
        }
    }
    return result;
}
const isTypeOf = (obj, type) => {
    var toString = Object.prototype.toString, undefined;
    return (type === "Null" && obj === null) ||
        (type === "Undefined" && obj === undefined) ||
        toString.call(obj).slice(8, -1) === type;
}

export const getTimeSpan = () => {
    var timestamp = new Date().getTime();
    return timestamp;
}