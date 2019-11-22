
layui.use(['layer', 'table'], function(){
    var layer = layui.layer //弹层
        ,table = layui.table //表格
    //简语表格
    table.render({
        elem: '#demo'
        ,height: 700
        ,url: 'http://wl.pepco.com.cn:9364/wt/adminGetwordText.json' //数据接口
        ,page: true
        ,response: {
            statusName: 'code' //规定数据状态的字段名称，默认：code
            ,countName: 'count' //规定数据总数的字段名称，默认：count
            ,dataName: 'data' //规定数据列表的字段名称，默认：data
        }
        ,cols: [
            [
                {field: 'wordid', title: 'ID', width: '5%', sort: true, fixed: 'left'}
                ,{field: 'wordtitle', title: '标题', width: '20%'}
                ,{field: 'wordcontent', title: '内容', width: '40%'}
                ,{field: 'createdtime', title: '创建时间', width: '15%'}
                ,{field: 'username', title: '网名', width: '10%'}
                ,{field: '', title: '操作', width: '10%',toolbar: '#barDemo'}

            ]
        ]
    });

    //简语工具事件
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
        if(layEvent === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del(); //删除对应行（tr）的DOM结构
                layer.close(index);
                //向服务端发送删除指令
                $.get("http://wl.pepco.com.cn:9364/wt/deletewordTextByid.json",{"wordid":data.wordid},function(result){
                    layer.msg(result.message);
                });
            });
        }else if(layEvent === 'detail'){
            window.sessionStorage.setItem('wordid',data.wordid);
            layer.open({
                type: 2,
                title: '简语查看',
                shadeClose: true,
                shade: false,
                maxmin: true, //开启最大化最小化按钮
                area: ['893px', '600px'],
                content: ['/selectWordText.html','no']
            });
        }
    });



});

//简语详情
function selectWordText(){
  var wordid = window.sessionStorage.getItem("wordid");
    $.ajax({
        url:"http://wl.pepco.com.cn:9364/wt/selectWordTextById.json",
        dataType:"json",
        data:{"wordid":wordid},
        async:true,
        type:"GET",
        success:function(result){
            $("#select #wm").val(result.data.username);
            $("#select #bt").val(result.data.wordtitle);
            $("#select #createTime").val(result.data.createdtime);
            $("#select #nr").val(result.data.wordcontent);
            window.sessionStorage.removeItem("wordid");


        },
        error:function(){}

    });

}