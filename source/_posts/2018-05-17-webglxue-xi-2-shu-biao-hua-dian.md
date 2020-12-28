---
title: webgl学习2——鼠标画点
slug: webglxue-xi-2-shu-biao-hua-dian
date_published: 2018-05-17T12:32:44.000Z
date_updated: 2018-05-21T11:05:43.000Z
tags: webgl
---

与上篇博客不同的是，这次试用了attribute变量，向shader中传参数。

            let vertices = [0.0, 0.0];
    
            let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            let program = initShaders(gl, vert, frag);
            const a_Position = gl.getAttribLocation(program, 'position');
            canvas.addEventListener('click', (e) => {
                let rect = canvas.getBoundingClientRect();
                let x = e.clientX / rect.width * 2 - 1;
                let y = 1 - e.clientY / rect.height * 2;
                vertices.push(x, y)
                console.log(x, y);
                gl.clear(gl.COLOR_BUFFER_BIT);
                for (let i = 0; i < vertices.length; i = i + 2) {
                    let x = vertices[i];
                    let y = vertices[i + 1];
                    gl.vertexAttrib3f(a_Position, x, y, 0)
                    gl.drawArrays(gl.POINTS, 0, 1);
                }
            })
            gl.vertexAttrib3f(a_Position, vertices[0], vertices[1], 0.0)
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, 0, 1);
    
    

> getAttribLocation

getAttribLocation(program: WebGLProgram | null, name: string): number;

返回属性位置的下标 GLint 数字，如果找不到该属性则返回-1。

> `WebGLRenderingContext.vertexAttrib[1234]f[v]()`

可以为顶点attibute变量赋值。

void gl.vertexAttrib1f(index, v0);

void gl.vertexAttrib2f(index, v0, v1);

void gl.vertexAttrib3f(index, v0, v1, v2);

void gl.vertexAttrib4f(index, v0, v1, v2, v3);

void gl.vertexAttrib1fv(index, value);

void gl.vertexAttrib2fv(index, value);

void gl.vertexAttrib3fv(index, value);

void gl.vertexAttrib4fv(index, value);

    const a_foobar = gl.getAttribLocation(shaderProgram, 'foobar');
    //either set each component individually:
    gl.vertexAttrib3f(a_foobar, 10.0, 5.0, 2.0);
    //or provide a Float32Array:
    const floatArray = new Float32Array([10.0, 5.0, 2.0]);
    gl.vertexAttrib3fv(a_foobar, floatArray);
    

前3个参数默认补0，最后一位补1.

[demo](http://dadigua.oss-cn-shenzhen.aliyuncs.com/webgl-learn/demo1/deploy/index.html)
[github](https://github.com/laopo001/webgl-learn/tree/master/src/demo1)
