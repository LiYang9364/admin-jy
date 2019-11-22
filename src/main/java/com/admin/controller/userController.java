package com.admin.controller;

import com.admin.config.constants.constants;
import com.admin.result.result;
import com.admin.util.UtilHttpRequest;
import com.admin.util.UtilrequestMap;
import com.alibaba.fastjson.JSON;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class userController {
    public String dev_url="http://wl.pepco.com.cn:9364/adminUser/URL.json";//开发环境
    public String pro_url="http://47.75.63.2/adminUser/URL.json";
    @RequestMapping(value = "/login.json",method = RequestMethod.GET)
    @ResponseBody
    public result login(String username, String password, HttpSession session){
        String requesturl=UtilHttpRequest.sendGet(dev_url.replace("URL","getUser"),"username="+username+"&password="+password,"UTF-8");
        Map maps = (Map) JSON.parse(requesturl);
        boolean b=(Boolean) maps.get("status");
        if(b){
            session.setAttribute(constants.USER_,maps.get("data"));
            session.setMaxInactiveInterval(30*60*5);
            return   new result(b,"登录成功");
        }
        return   new result(b,"账号或密码有误");
    }
}
