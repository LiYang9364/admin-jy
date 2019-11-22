package com.admin.config.annotation;

import java.lang.annotation.*;

@Target({ElementType.METHOD,ElementType.PACKAGE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface loginAnnotation {
}
