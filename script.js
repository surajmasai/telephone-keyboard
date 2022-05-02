
var button = document.querySelectorAll('button'),
    input = document.querySelector('input'),
    busy = true,
    hold,
    is_busy,
    delay = 1000,
    change = -1,
    click = null;
for (var i = 0, len = button.length; i < len; ++i) {
    button[i].onmousedown = function (e) {
        var text = this.getAttribute('data-text').split(""),
            number = this.getAttribute('data-number');
        busy = true;
        clearTimeout(is_busy);
        if (click !== e.target) {

            busy = false;

        }
        if (change >= text.length - 1 || click !== e.target) {
            change = 0;
            click = e.target;
        } else {
            change = change + 1;
        }

        hold = setTimeout(function () {
            input.value = input.value.slice(0, -1) + number;
        }, delay);


        input.value = busy ? (input.value.substr(input.value.length - 1) == text[change] ? input.value + text[change] : input.value.slice(0, -1) + text[change])
            // input.value.slice(0, -1) + text[change] 
            :
            input.value + text[change];
        // console.log(input.value.substr(input.value.length-1))
        if (text[0] === '-') {
            input.value = input.value.slice(0, -1);
        }
    };

    button[i].onmouseup = function (e) {
        clearTimeout(hold);
        busy = true;
        is_busy = setTimeout(function () {
            change = -1;
            busy = false;
            e.target = null;
        }, delay);

    };
}



