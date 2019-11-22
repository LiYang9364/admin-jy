package com.admin.controller;

import com.admin.config.annotation.loginAnnotation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/*
跳转页面控制器
 */
@Controller
public class pageController {

    @loginAnnotation()
    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @loginAnnotation()
    @RequestMapping(value = "/index.html")
    public String indexHtml() {
        return "index";
    }

    @RequestMapping(value = "/login.html")
    public String login() {
        return "login";
    }

    @loginAnnotation()
    @RequestMapping(value = "/admin-add.html")
    public String admin_add() {
        return "admin-add";
    }

    @loginAnnotation()
    @RequestMapping(value = "/admin-cate.html")
    public String admin_cate() {
        return "admin-cate";
    }

    @loginAnnotation()
    @RequestMapping(value = "/admin-edit.html")
    public String admin_edit() {
        return "admin-edit";
    }

    @loginAnnotation()
    @RequestMapping(value = "/admin-list.html")
    public String admin_list() {
        return "admin-list";
    }

    @loginAnnotation()
    @RequestMapping(value = "/admin-role.html")
    public String admin_role() {
        return "admin-role";
    }

    @loginAnnotation()
    @RequestMapping(value = "/admin-rule.html")
    public String admin_rule() {
        return "admin-rule";
    }





    @loginAnnotation()
    @RequestMapping(value = "/demo.html")
    public String admin_demo() {
        return "demo";
    }



    @loginAnnotation()
    @RequestMapping(value = "/error.html")
    public String error() {
        return "error";
    }

    @loginAnnotation()
    @RequestMapping(value = "/log.html")
    public String log() {
        return "log";
    }

    @loginAnnotation()
    @RequestMapping(value = "/member-add.html")
    public String member_add() {
        return "member-add";
    }

    @loginAnnotation()
    @RequestMapping(value = "/member-del.html")
    public String member_del() {
        return "member-list";
    }

    @loginAnnotation()
    @RequestMapping(value = "/member-edit.html")
    public String member_edit() {
        return "member-edit";
    }

    @loginAnnotation()
    @RequestMapping(value = "/member-list.html")
    public String member_list() {
        return "member-list";
    }



    @loginAnnotation()
    @RequestMapping(value = "/order-add.html")
    public String order_add() {
        return "order-add";
    }

    @loginAnnotation()
    @RequestMapping(value = "/order-list.html")
    public String order_list() {
        return "order-list";
    }



    @loginAnnotation()
    @RequestMapping(value = "/unicode.html")
    public String unicode() {
        return "unicode";
    }

    @loginAnnotation()
    @RequestMapping(value = "/role-add.html")
    public String role_add() {
        return "role-add";
    }

    @loginAnnotation()
    @RequestMapping(value = "/welcome.html")
    public String welcome() {
        return "welcome";
    }

    @loginAnnotation()
    @RequestMapping(value = "/welcome1.html")
    public String welcome1() {
        return "welcome1";
    }

    @loginAnnotation()
    @RequestMapping(value = "/selectWordText.html")
    public String selectWordText() {
        return "selectWordText";
    }
    @loginAnnotation()
    @RequestMapping(value = "/selectLink.html")
    public String selectLink() {
        return "selectLink";
    }

}
