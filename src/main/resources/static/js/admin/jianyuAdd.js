layui.use(['form', 'layer','jquery','table'],
    function() {
        $ = layui.jquery;
        var form = layui.form,
            layer = layui.layer,
            table = layui.table;
        getName();
        //随机网名
        $("#scan").click(function () {
            getName();
        });
        //自定义验证规则
        form.verify({
            wm: function(value) {
                if (value.length == 0) {
                    return '网名不能为空';
                }
            },

            bt: function(value) {
                if (value.length == 0) {
                    return '标题不能为空';
                }
            },
            nr: function(value) {
                if (value.length == 0) {
                    return '内容不能为空';
                }
            }
        });

        //监听提交
        //新增网名
        form.on('submit(addWm)',
            function(data) {
                $.get("http://localhost:9364/adminDict/insertNames.json",{"value":$("#L_form_wm").val()},function(result){
                    layer.alert(result.message, {
                            icon: 6
                        },
                        function() {
                            $("#L_form_Addwm")[0].reset();
                            layer.closeAll();
                            //关闭当前frame
                            //xadmin.close();

                            // 可以对父窗口进行刷新
                            //xadmin.father_reload();
                        });

                });

                return false;
            });
        //新增简语
        form.on('submit(add)',
            function(data) {
                $.post("http://wl.pepco.com.cn:9364/wt/insertWordText.json",{"wordtitle":$("#L_bt").val(),"wordcontent":$("#L_nr").val(),"username":$("#L_wm").val()},function(result){
                    layer.alert(result.message, {
                            icon: 6
                        },
                        function() {
                            $("#L_form")[0].reset();
                            layer.closeAll();
                            //关闭当前frame
                            //xadmin.close();

                            // 可以对父窗口进行刷新
                            //xadmin.father_reload();
                        });

                });

                return false;
            });

        //网名表格
        table.render({
            elem: '#table'
            ,height: 420
            ,url: 'http://wl.pepco.com.cn:9364/adminDict/adminGetNames.json' //数据接口
            ,response: {
                statusName: 'code' //规定数据状态的字段名称，默认：code
                ,countName: 'count' //规定数据总数的字段名称，默认：count
                ,dataName: 'data' //规定数据列表的字段名称，默认：data
            }
            ,cols: [
                [
                    {field: 'id', title: 'ID', width: '5%', sort: true, fixed: 'left'}
                    ,{field: 'value', title: '网名', width: '20%'}
                    ,{field: '', title: '操作', width: '10%',toolbar: '#barDemo'}

                ]
            ]
        });

        //网名表格行工具事件
        table.on('tool(testTable)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
            var data = obj.data //获得当前行数据
                ,layEvent = obj.event; //获得 lay-event 对应的值
            if(layEvent === 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del(); //删除对应行（tr）的DOM结构
                    layer.close(index);
                    //向服务端发送删除指令
                    $.get("http://wl.pepco.com.cn:9364/adminDict/deleteDictById.json",{"id":data.id},function(result){
                        layer.msg(result.message);
                    });
                });
            }
        });

    });


function getName(){
    $.get("http://wl.pepco.com.cn:9364/wt/getRandomName.json",function(data){
        $("#L_wm").val(data);
    });

}

var _hmt = _hmt || []; (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?b393d153aeb26b46e9431fabaf0f6190";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();