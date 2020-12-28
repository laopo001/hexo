---
title: webgl学习3——画一个三角形
slug: webglxue-xi-xuan-zhuan-suo-fang-ping-yi
date_published: 2018-05-20T05:25:14.000Z
date_updated: 2018-05-21T11:07:17.000Z
---

> 准备顶点的坐标

let vertices = new Float32Array([-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.0, 0.5, 0.0])

> 创建顶点缓存VBO

        createVbo(data: Float32Array): WebGLBuffer {
            let { gl } = this;
            // 创建缓存区对象
            let vbo = gl.createBuffer();
            // 将缓冲区对象绑定到目标
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            // 想向缓冲区对象中写入数据
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            return vbo;
        }
    

> 将顶点缓存传入顶点attibute变量

            const a_Position = gl.getAttribLocation(program, 'position');
            gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(a_Position);
    

> [vertexAttribPointer](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer)

gl.vertexAttribPointer(index, size, type, normalized, stride, offset)

    index 指定要修改的顶点属性的索引。
    size 指定每个顶点属性的数量。
    type 数据类型.
       gl.BYTE: signed 8-bit integer, with values in [-128, 127]
       gl.SHORT: signed 16-bit integer, with values in [-32768, 32767]
       gl.UNSIGNED_BYTE: unsigned 8-bit integer, with values in [0, 255]
       gl.UNSIGNED_SHORT: unsigned 16-bit integer, with values in [0, 65535]
       gl.FLOAT: 32-bit IEEE floating point number
       When using a WebGL 2 context, the following values are available additionally:
          gl.HALF_FLOAT: 16-bit IEEE floating point number
    normalized 指定整数数据值在被转换为浮点数时是否应归一化到一定范围内。
       对于类型gl.BYTE和gl.SHORT，如果为true，则将值标准化为[-1,1]。
       对于gl.UNSIGNED_BYTE和gl.UNSIGNED_SHORT类型，如果值为true，则将值标准化为[0，1]。
       对于gl.FLOAT和gl.HALF_FLOAT类型，此参数不起作用。
    stride 指定连续顶点属性开始之间的偏移量（以字节为单位）。不能大于255.如果步幅为0，则假定属性紧密排列。
    offset 指定顶点属性数组中第一个组件的字节偏移量。必须是类型的倍数。
    

> enableVertexAttribArray

gl.enableVertexAttribArray(index);

开启指定索引的顶点属性

> drawArrays

void gl.drawArrays(mode, first, count);

![](/source/images/2018/05/1.png)
![](/source/images/2018/05/2.png)

> demo

[demo](http://dadigua.oss-cn-shenzhen.aliyuncs.com/webgl-learn/demo2/deploy/index.html)
[github](https://github.com/laopo001/webgl-learn/tree/master/src/demo2)
