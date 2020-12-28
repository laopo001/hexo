---
title: px2rem-vc code插件推荐
slug: px2rem-vc-codecha-jian-tui-jian
date_published: 2017-03-17T09:19:00.000Z
date_updated: 2017-03-20T08:26:55.000Z
---

> px2rem

Sass(使用Sass的函数、混合宏这些功能来实现):

    $root-font-size:100px;
    
    @mixin px2rem($property,$px-values,$baseline-px:$root-font-size,$support-for-ie:false){
      $baseline-rem: $baseline-px / 1rem * 1;
      @if $support-for-ie {
        #{$property}: $px-values;
      }
      @if type-of($px-values) == "number"{
        #{$property}: $px-values / $baseline-rem;
      }
      @else {
        $rem-values:();
        @each $value in $px-values{
    
          @if $value == 0 or type-of($value) == "number"{
            $rem-values: append($rem-values, $value / $baseline-rem);
          }
        }
        #{$property}: $rem-values;
      }
    }
    //funtion写法
    @function Px2rem($px-values,$baseline-px:$root-font-size){
        $baseline-rem: $baseline-px / 1rem * 1;
        @if type-of($px-values) == "number"{
            @return  $px-values / $baseline-rem;
        }
        @else {
            $rem-values:();
            @each $value in $px-values{
                @if $value == 0 or type-of($value) == "number"{
                    $rem-values: append($rem-values, $value / $baseline-rem);
                }
            }
            @return  $rem-values;
        }
    }
    

> px2rem-0.2.0.vsix

这一个vs code下的[px2rem插件](https://github.com/Maroon1/px2rem)。
![](/source/images/2017/03/QQ--20170317171649.png)

> scss去单位

     @function strip-units($number){
        @return $number / ($number * 0 + 1);
    }
    
