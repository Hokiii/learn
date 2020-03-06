//移动动画
function move(obj, target,callback){
    //清除以前的定时器，只保留当前一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //步长值写到定时器里，把步长值改为整数，不要出现小数，浮点运算容易出错
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(obj.offsetLeft === parseInt(target)){
            //停止动画本质是停止定时器
            clearInterval(obj.timer);
            //回调函数写到定时器结束里
            // if(callback){
            //     //调用函数
            //     callback();
            // }
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}
//轮播图
window.addEventListener('load', function () {
    //1.获取元素
    var arr_l = document.querySelector('.arr-l');
    var arr_r = document.querySelector('.arr-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    ul.style.width = ul.children.length * 100 + '%';
    //2.鼠标经过就显示隐藏左右按钮，mouseenter和mouseleave不会冒泡，mouseover和mouseout会冒泡
    focus.addEventListener('mouseenter', function () {
        arr_l.style.display = 'block';
        arr_r.style.display = 'block';
        clearInterval(timer);
        timer = null;//清除定时器变量
    });
    focus.addEventListener('mouseleave', function () {
        arr_l.style.display = 'none';
        arr_r.style.display = 'none';
        timer = setInterval(function () {
            arr_r.click();
        }, 2000);
    });
    //3.动态生成小圆圈，有几张图片就生成几个小圆圈
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个小li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号，通过自定义属性来做
        li.setAttribute('data-index', i);
        //把小li插入ol
        ol.appendChild(li);
        //4.小圆圈的排他思想，在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            //把所有小li清除类名current 干掉所有人
            for (var i = 0; i < ol.children.length; i++){
                ol.children[i].className = '';
            }
            //当前小li设置类名current 留下我自己
            this.className = 'current';
            //5.点击小圆圈移动图片，移动的是ul,ul的移动距离 = -（小圆圈的索引号 * 图片宽度）
            //当我们点击某个小li就得到当前小li的索引号
            var dataIndex = parseInt(this.getAttribute('data-index'));
            num = dataIndex;
            move(ul, -dataIndex * focusWidth);
        });
    }
    ol.children[0].className = 'current';
    //6.点击左侧按钮图片滚动一张
    var num = 0;
    var flag = true;//节流阀
    arr_l.addEventListener('click', function () {
        if(flag){
            flag = false;
            if(num >0){
                num--;
                move(ul, -num * focusWidth, function () {
                    flag = true;
                });
                changeCircle();
            }else {
                num = ul.children.length-1;
                ul.style.left = -(ul.children.length-1) * focusWidth + 'px';
                changeCircle();
                flag = true
            }
        }
    });
    arr_r.addEventListener('click', function () {
        if(flag) {
            flag = false;
            if(num < ul.children.length - 1){
                num++;
                move(ul, -num * focusWidth, function () {
                    flag = true;
                });
                changeCircle();
            }else {
                num = 0;
                ul.style.left = 0 + 'px';
                changeCircle();
                flag = true;
            }
        }
    });
    //7.小圆圈跟着图片滚动
    function changeCircle() {
        //先清除其余小圆圈的current类名
        for (var i = 0; i < ul.children.length; i++){
            ol.children[i].className = '';
        }
        //设置当前小圆圈的类名为current
        ol.children[num].className = 'current';
    }
    //8.自动播放轮播图
    var timer = setInterval(function () {
        //手动调用右侧按钮点击事件
        arr_r.click();
    }, 2000);
});