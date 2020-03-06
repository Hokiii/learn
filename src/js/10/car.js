//jQuery方法
$(function () {
    getSum();
    addBackground();
    //1.全选全不选功能模块，就是把全选按钮的状态赋值给小li里的小按钮，事件可以用change
    //$("选择器").prop(属性)获得属性值     $("选择器").prop(属性， 属性值)设置属性值
    $(".checkall").change(function () {
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        getSum();
        addBackground();
    });
    //2.如果小复选框被选中的个数等于购物车总数，就把全选按钮选上，否则不选
    $(".j-checkbox").change(function () {
        getSum();
        addBackground();
        if($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
    });
    //3.增减商品数量模块 首先声明一个变量，当点击+号时（increment），就让这个值++，然后赋值给文本框
    //计算小计模块 根据文本框的值 * 当前商品的价格 = 商品小计 substr(1)
    $(".increment").click(function () {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // var p = $(this).parent().parent().siblings(".p-price").html().substr(1);
        //$("选择器").parents("选择器")返回指定的父级元素   $("选择器").parent()只能返回最近的父级
        var p = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    //-号同理，但减到1就不能再减了
    $(".decrement").click(function () {
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        var p = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    //4.用户修改文本框的值 计算小计模块
    $(".itxt").change(function () {
        //获得当前文本框的值 * 单价 = 小计
        var n = $(this).val();
        var p = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    //5.计算总和和总额模块
    function getSum() {
        var countAll = 0;
        var priceAll = 0;
        $(".j-checkbox:checked").each(function (i, ele) {
            // console.log($(ele).parent().siblings(".p-num").find(".itxt").val());
            countAll += parseInt($(ele).parent().siblings(".p-num").find(".itxt").val());
            priceAll += parseFloat($(ele).parent().siblings(".p-sum").text().substr(1));
        });
        $(".amount-sum em").text(countAll);
        $(".price-sum em").text("￥" + priceAll.toFixed(2));
    }
    //6.删除商品模块
    //删除当前商品
    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    //删除选中商品
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    //清空购物车
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    });
    //7.添加背景模块
    function addBackground() {
        $(".j-checkbox").each(function (i, ele) {
            if($(ele).prop("checked")){
                $(ele).parents(".cart-item").addClass("check-cart-item");
            } else {
                $(ele).parents(".cart-item").removeClass("check-cart-item");
            }
        });
    }
});