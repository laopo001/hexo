---
title: webgl学习5——有颜色的三角形
slug: webglxue-xi-4-you-yan-se-de-san-jiao-xing-2
date_published: 2018-05-21T00:00:00.000Z
date_updated: 2018-05-21T16:03:47.000Z
draft: true
---

    // vertex shader
    attribute vec4 position;  
    uniform mat4 matrix;
    attribute vec4 a_Color;
    varying vec4 v_Color;
    void main(){  
        gl_Position = matrix * position;
        v_Color = a_Color;
    }
    // fragment shader
    precision lowp float;
    varying vec4 v_Color;                
    void main(void) {                          
        gl_FragColor = v_Color;                
    }
    

> varying变量

向片元着色器传递数据（片元着色器不支持attribute变量），先声明attribute变量a_Color用以接受颜色数据，然后声明了新的varying变量v_Color，该变量负责将颜色值传给片元着色器。varying变量只能是float(以及像个的vec2 vec3 vec4 mat3 mat4)类型。

> demo

[demo](http://dadigua.oss-cn-shenzhen.aliyuncs.com/webgl-learn/demo4/deploy/index.html)
[github](https://github.com/laopo001/webgl-learn/tree/master/src/demo4)
