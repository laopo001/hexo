---
title: OpenGl学习2--Blinn-Phong光照模型
slug: openglxue-xi-2-phongguang-zhao-mo-xing
date: 2016-12-23T06:31:40.000Z
date_updated: 2016-12-23T06:31:40.000Z
---

> VERTEX SHADER

    precision highp float;
    
    // Attributes
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;
    
    // Uniforms
    uniform mat4 worldViewProjection;
    
    // Varying
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUV;
    
    void main(void) {
        vec4 outPosition = worldViewProjection * vec4(position, 1.0);
        gl_Position = outPosition;
        
        vUV = uv;
        vPosition = position;
        vNormal = normal;
    }
    

> PIXEL (FRAGMENT) SHADER

    precision highp float;
    
    // Varying
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUV;
    
    // Uniforms
    uniform mat4 world;
    
    // Refs
    uniform vec3 cameraPosition;
    uniform sampler2D textureSampler;
    
    void main(void) {
        vec3 vLightPosition = vec3(0,20,40);
        
        // World values
        vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
        vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
        vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
        
        // Light
        vec3 lightVectorW = normalize(vLightPosition - vPositionW);
        vec3 color = texture2D(textureSampler, vUV).rgb;
        
        // diffuse
        float ndl = max(0., dot(vNormalW, lightVectorW));
        
        // Specular
        vec3 angleW = normalize(viewDirectionW + lightVectorW);
        float specComp = max(0., dot(vNormalW, angleW));
        specComp = pow(specComp, max(1., 64.)) * 2.;
        
        gl_FragColor = vec4(color * ndl + vec3(specComp), 1.);
    }
    

Blinn-Phong是一种简化的PHong模型。

Blinn-Phong模型很大程度上和Phong是相似的，不过它稍微改进了Phong模型，使之能够克服我们所讨论到的问题。它放弃使用反射向量，而是基于我们现在所说的一个叫做半程向量（halfway vector）的向量，这是个单位向量，它在视线方向和光线方向的中间。半程向量和表面法线向量越接近，镜面反射成份就越大。转自[高级光照](https://learnopengl-cn.readthedocs.io/zh/latest/05%20Advanced%20Lighting/01%20Advanced%20Lighting/)。
![](/source/images/2016/12/advanced_lighting_halfway_vector.png)

先从vertex shader（点着色器）看起，uniform是application的输入。worldViewProjection是一个mat4的世界-视图-投影矩阵。这里的vertex shader是一个平常的，没有位置变幻等操作。主要是向PIXEL传递了uv（vec2纹理坐标），position（vec3点坐标），normal（vec3法向量）。

PIXEL SHADER中。这个mat4 world是一个世界矩阵。vec3 cameraPosition相机的坐标，sampler2D textureSampler二维纹理

vec3 vLightPosition是光源的坐标。

`vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));`这里当前点的坐标乘以世界矩阵，即可得世界坐标系中光源的坐标，（3D世界为啥要用vec4呢，是因为在解决3d数学问题时，是用4维空间的方式解决的，避免了万向锁的问题。）

`vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));`同样是，把法向量转换成世界坐标系的模向量，normalize转换成模向量。

`vec3 viewDirectionW = normalize(cameraPosition - vPositionW);`相机的坐标减当前点的世界坐标，就是向量。然后求模。

`vec3 lightVectorW = normalize(vLightPosition - vPositionW);`当前点坐标到灯光坐标的模向量

`vec3 color = texture2D(textureSampler, vUV).rgb;`当前原始的颜色。// texture2D 返回类型的精度为lowp是一个四维向量。`.rgb`是把前3个值赋值给color:vec3向量。一共是`rgba`4个维度。同理`.rga`就是取第1，2，4维度的值。

`float ndl = max(0., dot(vNormalW, lightVectorW));`求法向量与lightVectorW向量的点积。点积不是一个向量了，他是一个常数（float）。点积还可以判断向量之间的夹角，等于0，则两向量垂直，大于0为锐角，小于0为钝角。还有cross叉积。这里ndl是与0对比的最大值。与法向量为钝角时，则是光照在背面。即没有光照。则颜色vec3向量乘以0，为黑色。dot(vNormalW, lightVectorW)就是这两个向量夹角的cos值,vNormalW,lightVectorW都是模为1的向量。ndl是一个[0,1)之间。
![](/source/images/2016/04/-C-FOX8P---93-D-PBI-HTQ.png)

`vec3 angleW = normalize(viewDirectionW + lightVectorW);`求半程向量。

`float specComp = max(0., dot(vNormalW, angleW));`同上。

`specComp = pow(specComp, max(1., 64.)) * 2.;` 这是Blinn-Phong的计算公式。

`gl_FragColor = vec4(color * ndl + vec3(specComp), 1.);`得出最终color。
