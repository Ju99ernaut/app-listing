// from http://www.sberry.me/articles/javascript-event-throttling-debouncing
export default function throttle(fn, delay) {
    let allowSample = true;

    return function (e) {
        if (allowSample) {
            allowSample = false;
            setTimeout(function () { allowSample = true; }, delay);
            fn(e);
        }
    };
}