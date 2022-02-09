var item1 = window.document.querySelector('.navitem1')
var item2 = window.document.querySelector('.navitem2')
var item3 = window.document.querySelector('.navitem3')

var triangle_up1 = window.document.querySelector('.triangle-up1')
var triangle_up2 = window.document.querySelector('.triangle-up2')
var triangle_up3 = window.document.querySelector('.triangle-up3')


item1.addEventListener("mouseover", function() {
    triangle_up1.style.display = 'block'
});

item1.addEventListener("mouseout", function() {
    triangle_up1.style.display = 'none'
});

/*item 2*/
item2.addEventListener("mouseover", function() {
    triangle_up2.style.display = 'block'
});

item2.addEventListener("mouseout", function() {
    triangle_up2.style.display = 'none'
});

/*item3*/
item3.addEventListener("mouseover", function () {
    triangle_up3.style.display = 'block'
});

item3.addEventListener("mouseout", function() {
    triangle_up3.style.display = 'none'
});



