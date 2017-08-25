# weex-dingtalk 文档

weex-dingtalk是钉钉开放平台提供在weex容器中使用的SDK，其中实现的功能与H5的Dingtalk.js大同小异。

通常你可以用传统的webapp的形式构建钉钉的微应用，然而有时候用户在使用你的微应用时会感觉到明显的体验不佳。为什么？那是因为网络，渲染，Web形式的应用与Native编写的应用会有明显的差距，你可能需要花费数倍的时间和精力去优化Web，但收获不佳。这正是为什么我需要weex的原因，在weex的帮助下，你可以只关注业务，不再需要关注性能的优化，只需要享受编程的乐趣和构建钉钉微应用本身即可。

目前钉钉微应用的运行是基于weex，用户并无法区分这是一个什么样的实现，你可以优雅放心的使用weex来开发你的微应用。这门技术栈并不需要你具备`java`或者`Objective-c`的知识背景，只你要会使用HTML/CSS/JavaScript，再学习一些简单的Vue2.0语法，你就可以很快的上手来开发你的微应用。

Enjoy the fun of building dingtalk microapp with weex ☺

## 安装

```bash
npm install weex-dingtalk --save
```

> 注意：使用 `--save` 将版本信息存储起来，方便后续升级维护。

## 使用

### Vue

入口weex-entry.js：

```JavaScript
  import Hello from './Hello.vue';
  Hello.el = '#app';
  new Vue(Hello);
```
业务Hello.vue：

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

### Rax

入口weex-entry.js:

```JavaScript
import { createElement, render } from 'rax';
import App from './app.js';
render(<App/>);
```

业务app.js：

```JavaScript
import { createElement, Component, render} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import dingtalk from 'weex-dingtalk';
export default class App extends Component{
	render(){
		return(
			<View>
				<Text onPress={
					()=>{
						dingtalk.ready(function(){
							const dd = dingtalk.apis;
							dd.biz.util.openLink({
								url: 'https://github.com/icepy/weex-dingtalk'
							})
						})
					}
				}>
					Hello World icepy !!!
				</Text>
			</View>
		);
	}
}
```

> 注意：

* 调用js-api时需要写在dingtalk.ready方法中

例子：

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.ready(function(){
  const dd = dingtalk.apis;
  dd.biz.navigation.setTitle({
      title: 'icepy'
  });
})
```

* 如果你有签名的需要，可以调用dingtalk.config，将你的签名对象传入，整个应用的周期内，你应该只可以调用一次config方法

例子：

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.config({
  any Object your server response sign
});
```

* 你可以使用error注册一个error函数，与H5保持一致

例子：

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.error(function(err){
  console.log(err);
});
```

* 正常的js-api可以通过dingtalk.apis来获取

例子：

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.ready(function(){
  const dd = dingtalk.apis;
});
```

## apis 描述

* config （Function | 参数 Object | 返回值 void） 配置签名对象
* ready （Function | 参数 Function Callback | 返回值 void） 使用js-api必须写在ready callback中
* error （Function | 参数 Object ）权限校验失败时
* apis （Object）必须在ready方法中使用，钉钉 js-api 列表（与H5一致）
* on 注册一个事件（与H5中的addEventListener保持一致）
* off 注销一个事件（与H5中的removeEventListener保持一致）

其他API的具体使用方法请参考 [https://open-doc.dingtalk.com/doc2/detail?spm=0.0.0.0.O1cH5b&treeId=171&articleId=104906&docType=1](https://open-doc.dingtalk.com/doc2/detail?spm=0.0.0.0.O1cH5b&treeId=171&articleId=104906&docType=1)

## 降级H5之后如何使用

为了达到让你的应用可以同时使用两种环境下的js-api，你应该继续使用 `import dingtalk from 'weex-dingtalk'` 的方式来引入模块，在这个模块中会自动判断环境给你导出相应的SDK模块。

H5环境：

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

## 统一的事件回调机制

当你注册了事件之后，触发事件将由客户端来执行。

- 页面`resume`事件

当页面重新可见并可以交互的时候，钉钉客户端会触发这个事件。

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.ready(function(){
	dingtalk.on('resume',function(){
		// do something
	})
});
```

- 页面`pause`事件

当页面不可见时，钉钉客户端会触发这个事件。

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.ready(function(){
   dingtalk.on('pause',function(){
       // do something
   })
});
```

- 导航栏 `navRightButton` 事件

导航栏右侧按钮的点击事件。

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.ready(function(){
	const dd = dingtalk.apis;
	dd.biz.navigation.setRight({
		control: true,
		show: true,
		text: 'icepy'
	})
	dingtalk.on('navRightButton',function(){
	 // do something
	})
})
```
如果想让你注册的`navRightButton`客户端可以正常的触发，需要在设置`setRight`时传`control`为`true`。

- 导航栏 `navTitle` 事件

导航栏上`title`的点击事件

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.ready(function(){
	dingtalk.on('navTitle',function(){
	  // do something
	})
});
```

- 导航栏 `navHelpIcon` 事件

导航栏上点击icon时会触发的事件

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.ready(function(){
	const dd = dingtalk.apis;
	dd.biz.navigation.setIcon({
		showIcon: true,
		iconIndex: 101
	})
	dingtalk.on('navHelpIcon',function(){
	  // do something
	})
});
```

- 导航栏 `backbutton` 事件

导航栏左侧按钮的点击事件，注意：**这个事件触发之后会自动返回**

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.ready(function(){
	const dd = dingtalk.apis;
	dd.biz.navigation.setLeft({
	  show: true,
	  control: true,
	  text: 'icepy'
	});
	dingtalk.on('backbutton',function(){
		//do something
	})
})
```
如果想让你注册的`backbutton`客户端可以正常的触发，需要在设置`setLeft`时传`control`为`true`。

- 导航栏 `navMenu` 事件

当你在导航栏右侧设置了多个按钮，你就需要注册`navMenu`事件来处理点击。

```JavaScript
import dingtalk from 'weex-dingtalk';
dingtalk.ready(function(){
	dingtalk.on('navMenu',function(){
		// do something
	})
})
```
