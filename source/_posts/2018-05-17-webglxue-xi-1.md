---
title: webgl学习1——画一点
slug: webglxue-xi-1
date: 2018-05-17T12:32:15.000Z
date_updated: 2018-05-21T11:05:14.000Z
---

> shader编译

    export function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            console.log(gl.getShaderInfoLog(shader));
            return false;
        }
        return shader;
    }
    

> 连接pragrom

    export function createProgram(gl: WebGLRenderingContext, vshader: string, fshader: string) {
        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
           //获取连接状态
            console.log(gl.getProgramInfoLog(program));
            return false;
        }
        gl.useProgram(program)
        return program;
    }
    

> 清楚画布

            gl.clearColor(0.0, 0.0, 0.0, 1.0); 设置清除颜色
            gl.clear(this.gl.COLOR_BUFFER_BIT);
    

###### 程序

    //顶点着色器
    void main(void){  
        gl_Position = vec4(0.0,0.5,0.0,1.0);
        gl_PointSize = 10.0;
    } 
    直接在shader中，赋值坐标，直接画出点
    gl.drawArrays(gl.POINTS, 0, 1);
    

[demo](http://dadigua.oss-cn-shenzhen.aliyuncs.com/webgl-learn/demo0/deploy/index.html)
[github](https://github.com/laopo001/webgl-learn/tree/master/src/demo)
