window.onload = function () {
    let vm = new Vue({
        el: '#app',
        data() {
            return {
                activeIndex2: '1'
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    })
}