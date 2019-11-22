package com.admin.config.Interceptor;
/*\
拦截器
 */

import com.admin.config.annotation.loginAnnotation;
import com.admin.config.constants.constants;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Method;


public class requestInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        String URL = request.getRequestURL().toString();
        System.out.println("请求地址:" + URL);

        HandlerMethod handlerMethod=(HandlerMethod) handler;
        Method method=handlerMethod.getMethod();

        loginAnnotation login=method.getAnnotation(loginAnnotation.class);
        if(login != null ){
            Object obj = session.getAttribute(constants.USER_);
            if (obj == null) {
                System.out.println("未登录-需要登录");
                request.getRequestDispatcher("/login.html").forward(request, response);
                return false;
            }
        }
        return true;

    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception { }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception { }
}
