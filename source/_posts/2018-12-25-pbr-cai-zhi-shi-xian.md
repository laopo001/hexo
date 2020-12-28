---
title: pbr 材质实现
slug: pbr-cai-zhi-shi-xian
date_published: 2018-12-25T00:00:00.000Z
date_updated: 2018-12-25T15:00:07.000Z
draft: true
---

PBR(Physically Based Rendering)，基于物理的渲染目的便是为了使用一种更符合物理学规律的方式来模拟光线。这种渲染方式与我们原来的Phong或者Blinn-Phong光照算法相比总体上看起来要更真实一些。

> 判断一种PBR光照模型是否是基于物理的，必须满足以下三个条件（不用担心，我们很快就会了解它们的）：

- 基于微平面(Microfacet)的表面模型。
- 能量守恒。
- 应用基于物理的BRDF。
