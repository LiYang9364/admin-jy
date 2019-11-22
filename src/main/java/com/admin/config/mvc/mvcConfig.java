package com.admin.config.mvc;

import com.admin.config.Interceptor.requestInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.config.annotation.*;

import javax.servlet.ServletContext;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Configuration
public class mvcConfig implements WebMvcConfigurer  {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        //registry.addViewController("/").setViewName("index");
       //registry.addViewController("/index.html").setViewName("index");
    }



    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        //需要配置2：----------- 告知拦截器：/static/admin/** 与 /static/user/** 不需要拦截 （配置的是 路径）
        registry.addInterceptor(new requestInterceptor()).addPathPatterns("/**").excludePathPatterns("/login.html")
       .excludePathPatterns("/static/**");

    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //需要配置1：----------- 需要告知系统，这是要被当成静态文件的！
        //第一个方法设置访问路径前缀，第二个方法设置资源路径

     // registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");

    }
}
