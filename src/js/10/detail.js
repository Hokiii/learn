window.addEventListener('load', function () {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    //当鼠标经过preview就显示和隐藏mask遮挡层和big大盒子
    preview_img.addEventListener('mousemove', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    preview_img.addEventListener('mousemove', function (e) {
        var x = e.pageX - this.offsetLeft - mask.offsetWidth / 2;
        var y = e.pageY - this.offsetTop - mask.offsetHeight / 2;
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if(x <= 0) {
            x = 0;
        }else if(x >= maskMax){
            x = maskMax;
        }
        if(y <= 0) {
            y = 0;
        }else if(y >= maskMax){
            y = maskMax;
        }
        mask.style.left = x + 'px';
        mask.style.top = y + 'px';
        var bigImg = document.querySelector('.big_img');
        var bigMax = big.offsetWidth - bigImg.offsetWidth;
        //大图片的移动距离 = 遮挡层的移动距离*大图片的最大移动距离/遮挡层的最大移动距离
        var bigX = x * bigMax / maskMax;
        var bigY = y * bigMax / maskMax;
        bigImg.style.left = bigX + 'px';
        bigImg.style.top = bigY + 'px';
    })
})