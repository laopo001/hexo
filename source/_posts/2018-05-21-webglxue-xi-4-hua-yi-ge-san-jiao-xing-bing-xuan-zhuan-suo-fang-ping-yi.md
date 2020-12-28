---
title: webgl学习4——画一个三角形并旋转缩放平移
slug: webglxue-xi-4-hua-yi-ge-san-jiao-xing-bing-xuan-zhuan-suo-fang-ping-yi
date: 2018-05-21T10:54:04.000Z
date_updated: 2018-05-21T11:07:32.000Z
---

    shader如下
    attribute vec4 position;  
    uniform mat4 matrix;
    void main(void){  
        gl_Position = matrix * position;
        gl_PointSize = 10.0;
    }  
    
    void main(void){  
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  
    }  
    

这里通过matrix 一个4*4矩阵来变换。通过uniform变量来传递。

> uniform 变量

我们已经知道了如何从js中向顶点着色器的attribute变量传递数据，这里有个新的变量uniform，它用来从js中向顶点or片元着色器传输`一致的（不变的）`数据。如下使用

            // 以z轴为中心，旋转90度
            let mat4Angles = new Mat4().setFromEulerAngles(0, 0, 90);
            // x,y缩放1.5倍
            let mat4Scale = new Mat4().setScale(1.5, 1.5, 1);
            // x,y位移0.2
            let mat4Translate = new Mat4().setTranslate(0.2, 0.2, 0.2);
            // 矩阵相乘
            let mat4 = mat4Angles.mul(mat4Scale).mul(mat4Translate);
            //获取uniform变量的下标
            const matrix = gl.getUniformLocation(program, 'matrix');
            // 赋值
            gl.uniformMatrix4fv(matrix, false, mat4.data)
    
    

> demo

[demo](http://dadigua.oss-cn-shenzhen.aliyuncs.com/webgl-learn/demo3/deploy/index.html)
[github](https://github.com/laopo001/webgl-learn/tree/master/src/demo3)
