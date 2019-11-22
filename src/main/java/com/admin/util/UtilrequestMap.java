package com.admin.util;

import com.alibaba.fastjson.JSON;

import java.util.Map;

public class UtilrequestMap {
    public static Object getValue(String str){
        Map maps = (Map) JSON.parse(str);
        System.out.println("这个是用JSON类来解析JSON字符串!!!");
        Object obj=null;
        for (Object map : maps.entrySet()){
            if(str.equals(((Map.Entry)map).getKey())){
                obj=((Map.Entry)map).getValue();
            }

        }

        return obj;
    }
}
