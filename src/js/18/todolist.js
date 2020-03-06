$(function () {
    //1.按下回车 把完整数据存储到本地存储里面
    //存储的数据格式 var todolist = [{title: "xxx", done: false}]
    load();
    $("#title").on("keydown", function (e) {
        if(e.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您的待办事项！");
            } else {
                //先读取本地存储的数据
                var local = getData();
                // console.log(local);
                //把local数组进行更新数据，把最新的数据追加给local数组
                // local.push({title: "xxx", done: false});
                local.push({title: $(this).val(), done: false});
                //把这个数组local存储给本地存储
                saveData(local);
                //2.todolist本地存储渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });
    //3.todolist删除操作
    $("ol, ul").on("click", "a", function () {
        //先获取本地存储
        var datas = getData();
        //修改数据
        var index = $(this).attr("id");//获取要删除元素的索引号
        datas.splice(index, 1);//splice(从第几个元素开始删除，删除几个元素);
        //保存到本地存储
        saveData(datas);
        //重新渲染页面
        load();
    });
    //4.todolist正在进行和已经完成选项操作
    $("ol, ul").on("click", "input", function () {
        //先获取本地存储
        var datas = getData();
        //修改数据
        var index = $(this).siblings("a").attr("id");//获取要删除元素的索引号 input的索引号就是它的兄弟a的索引号
        datas[index].done = $(this).prop("checked");//获取元素属性 固有属性通过prop(属性名);获取；自定义属性通过attr(属性名);获取
        //保存到本地存储
        saveData(datas);
        //重新渲染页面
        load();
    });
    //读取本地存储的数据
    function getData() {
        var datas = localStorage.getItem("todolist");
        if (datas !== null) {
            //本地存储里面的数据是字符串格式的，但是我们需要的对象格式的
            return JSON.parse(datas);
        } else {
            return [];
        }
    }
    //保存本地存储数据
    function saveData(datas) {
        //将数据转换成字符串存入本地存储
        localStorage.setItem("todolist", JSON.stringify(datas));
    }
    //渲染加载数据
    function load() {
        //读取本地存储的数据
        var datas = getData();
        // console.log(datas);
        //遍历前要先清空ol里面的数据
        $("ol, ul").empty();
        //遍历这个数据
        var todocount = 0;
        var donecount = 0;
        // $.each(遍历的数据组,function (索引号, 里面的每一项) {
        $.each(datas,function (i, data) {
            //给节点添加元素：prepend(node);在子元素的前面添加，append(node);在子元素的后面添加
            if (data.done) {
                $("ul").prepend("<li><input type='checkbox' checked > <p>" + data.title + "</p> <a href='javascript:;' id='" + i + "'></a></li>");
                donecount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'> <p>" + data.title + "</p> <a href='javascript:;' id='" + i + "'></a></li>");
                todocount++;
            }
            $("#todocount").text(todocount);
            $("#donecount").text(donecount); 
        });
    }
});