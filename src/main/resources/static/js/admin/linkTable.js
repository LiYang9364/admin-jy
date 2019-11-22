
layui.use(['layer', 'table','form'], function(){
    var layer = layui.layer //弹层
        ,table = layui.table //表格
        ,form = layui.form
    //简语表格
    table.render({
        elem: '#table'
        ,height: 650
        ,url: 'http://wl.pepco.com.cn:9364/adminLink/selectLinkByType.json' //数据接口
        ,page: true
        ,response: {
            statusName: 'code' //规定数据状态的字段名称，默认：code
            ,countName: 'count' //规定数据总数的字段名称，默认：count
            ,dataName: 'data' //规定数据列表的字段名称，默认：data
        }
        ,cols: [
            [
                {field: 'id', title: 'ID', width: '5%', sort: true, fixed: 'left'}
                ,{field: 'linkType', title: '链接类型', width: '10%'}
                ,{field: 'linkAddres', title: '链接地址', width: '15%'}
                ,{field: 'linkByname', title: '链接别名', width: '10%'}
                ,{field: 'linkName', title: '链接名', width: '10%'}
                ,{field: 'linkDescribe', title: '链接描述', width: '40%'}
                ,{field: 'linkDescribe', title: '操作', width: '10%',toolbar: '#barDemo'}

            ]
        ]
    });
    selectLink();
    //简语工具事件
    table.on('tool(testTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
        if(layEvent === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del(); //删除对应行（tr）的DOM结构
                layer.close(index);
                //向服务端发送删除指令
                $.get("http://wl.pepco.com.cn:9364/adminLink/deleteLinkById.json",{"id":data.id},function(result){
                    layer.msg(result.message);
                });
            });
        }else if (layEvent === 'edit'){
            window.sessionStorage.setItem("linkid",data.id);
            layer.open({
                type: 2,
                title: '链接查看',
                shadeClose: true,
                shade: false,
                maxmin: true, //开启最大化最小化按钮
                area: ['893px', '600px'],
                content: ['/selectLink.html','no']
            });

        }
    });
    //链接查看js
    //自定义验证规则
    /*
    form.verify({
        nikename: function(value) {
            if (value.length < 5) {
                return '昵称至少得5个字符啊';
            }
        },
        pass: [/(.+){6,12}$/, '密码必须6到12位'],
        repass: function(value) {
            if ($('#L_pass').val() != $('#L_repass').val()) {
                return '两次密码不一致';
            }
        }
    });
*/
    //监听提交
    form.on('submit(add)',
        function(data) {
            console.log(data.field);
            //发异步，把数据提交给php

            layer.alert("增加成功", {
                    icon: 6
                },
                function() {
                    // 获得frame索引
                    var index = parent.layer.getFrameIndex(window.name);
                    //关闭当前frame
                    parent.layer.close(index);
                });
            return false;
        });


});

function selectLink(){
    //加载链接类型
    /*
    $.get("http://wl.pepco.com.cn:9364/adminDict/adminGetLinkType.json",function(result){


        $.each(result.data,function(index,value){
            console.log(value.value);
            $("#link_div #linkType").append("<option value='"+value.value+"'>"+value.value+"</option>");
        });


    });
*/
    var linkid=window.sessionStorage.getItem("linkid");
    $.ajax({
        url:"http://wl.pepco.com.cn:9364/adminLink/selectLinkById.json",
        dataType:"json",
        data:{"id":linkid},
        async:true,
        type:"GET",
        success:function(result){
            $("#link_div #linkName").val(result.data.linkName);
            $("#link_div #linkByName").val(result.data.linkByname);
            $("#link_div #linkAddres").val(result.data.linkAddres);
            $("#link_div #linkType").find("option[value='"+result.data.linkType+"']").attr("selected",true);
            $("#link_div #desc").val(result.data.linkDescribe);
            window.sessionStorage.removeItem("linkid");


        },
        error:function(){}

    });
}
