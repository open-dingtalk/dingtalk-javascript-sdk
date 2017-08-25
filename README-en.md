## Install

```bash
npm install dingtalk-javascript-sdk --save
```

> Note：using `--save` save dingtalk-javascript-sdk version in your package.json

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
        var dingtalk = require('dingtalk-javascript-sdk');

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
import dingtalk from 'dingtalk-javascript-sdk';
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
import dingtalk from 'dingtalk-javascript-sdk';
dingtalk.config({
  any Object your server response sign
});
```

- using `dingtalk.error` register error handler

example:

```JavaScript
import dingtalk from 'dingtalk-javascript-sdk';
dingtalk.error(function(err){
  console.log(err);
});
```
- fetch all `js-api ` , only using `dingtalk.apis`, its in 'dingtalk.ready' method

example:

```JavaScript
import dingtalk from 'dingtalk-javascript-sdk';
dingtalk.ready(function(){
  const dd = dingtalk.apis;
});
```

## Describe the dingtalk-javascript-sdk apis

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

import dingtalk from 'dingtalk-javascript-sdk';

dingtalk.ready(function(){
  const dd = dingtalk.apis;
  // 设置导航
  dd.biz.navigation.setTitle({
      title: 'icepy'
  });
});

```
