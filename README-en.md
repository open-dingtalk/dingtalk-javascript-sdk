# weex-dingtalk Doc

[![Build Status](https://travis-ci.org/icepy/weex-dingtalk.svg?branch=master)](https://travis-ci.org/icepy/weex-dingtalk)

weex-dingtalk is a JavaScript SDK powered by Dingtalk weex Container, which is an awesome solution for building Dingtalk microapp with extremely high performanece.

Usually you can build your microapp in Dingtalk as a traditional webapp, however sometimes your users are unsatisfied with the poor performance of your webapp. Why? Nowadays the gap between web and native, in the aspect of performance and user experience, is still wide. You might feel frustrated to optimize the performance of your webapp, but finally bring just a little improvement. That is why we need weex.

With the help of weex, you can focus on your business, no more need to worry about the performance, just enjoy the fun of coding and building your microapp. The microapps based on weex will look so elegant and run so smoothly that your users cannot tell the difference between a weex microapp developed by javascript and a native user interface developed by java or objective-c.

The code you write for a weex microapp is javascript and css, you will feel so familiar if you are a web developer. Under the hood, weex render engine parse your code and render a completely native user interface, rather than a web user interface.

Enjoy the fun of building dingtalk microapp with weex ☺

## For Chinese

[SDK中文文档](https://github.com/icepy/weex-dingtalk/blob/master/README-cn.md)

## Install

```bash
npm install weex-dingtalk --save
```

> Note：using `--save` save weex-dingtalk version in your package.json

## How using it？

it's your weex application entry（weex-entry.js）：

```JavaScript
  import Hello from './Hello.vue';
  Hello.el = '#app';
  new Vue(Hello);
```

then Vue code（Hello.vue）：

```Vue
    <template>
        <div class="wrapper">
            <text class="title">Hello icepy</text>
            <text class="subtitle" v-on:click="getClick">{{ link }}</text>
        </div>
    </template>
    <script>

        var stream = weex.requireModule('stream');
        var modal = weex.requireModule('modal');
        var dingtalk = require('weex-dingtalk');

        export default {
            name: 'hello',
            data: function(){
                return {
                    link: 'DingTalk'
                }
            },
            mounted: function(){
              dingtalk.ready(function(){
                const dd = dingtalk.apis;
                // 设置导航
                dd.biz.navigation.setTitle({
                    title: 'icepy'
                });
              });
            },
            methods: {
                getClick: function(){
                  modal.toast({
                    message: 'Hello World ICEPY !!!',
                    duration: 2
                  });
                }
            }
        }
    </script>
    <style>
      .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 750px;
        height: 1000px;
        background-color: #333377;
      }
      .title {
        font-size: 60px;
        color: #505050;
        text-align: center;
      }
      .subtitle {
        display: block;
        font-size: 30px;
        color: #AAAAAA;
        xxxx: static;
        text-align: center;
        margin-top: 20px;
      }
    </style>
```

> Note：

- call js-api need to write  in `ready` method

example：

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.ready(function(){
  const dd = dingtalk.apis;
  dd.biz.navigation.setTitle({
      title: 'icepy'
  });
})
```

- the js-api for getting user will work, only call `dingtalk.config` once

example:

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.config({
  any Object your server response sign
});
```

- using `dingtalk.error` register error handler

example:

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.error(function(err){
  console.log(err);
});
```
- fetch all `js-api ` , only using `dingtalk.apis`, its in 'dingtalk.ready' method

example:

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.ready(function(){
  const dd = dingtalk.apis;
});
```

## Describe the weex-dingtalk apis

* config （Function | 参数 Object | 返回值 void）
* ready （Function | 参数 Function Callback | 返回值 void）
* error （Function | 参数 Object ）
* apis （Object）
* on register event handler（ like addEventListener）
* off remove event handler（like removeEventListener）

see other： [https://open-doc.dingtalk.com/doc2/detail?spm=0.0.0.0.O1cH5b&treeId=171&articleId=104906&docType=1](https://open-doc.dingtalk.com/doc2/detail?spm=0.0.0.0.O1cH5b&treeId=171&articleId=104906&docType=1)

## How runing Web

Web：

```JavaScript

import dingtalk from 'weex-dingtalk';

dingtalk.ready(function(){
  const dd = dingtalk.apis;
  // 设置导航
  dd.biz.navigation.setTitle({
      title: 'icepy'
  });
});

```
