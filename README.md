## Dingtalk JavaScript SDK

JavaScript SDK For [Dingtalk](https://www.dingtalk.com)

## 安装

```bash
npm install dingtalk-javascript-sdk --save
```

> 注意：使用 `--save` 将版本信息存储起来，方便后续升级维护。

## 使用

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
import dingtalk from 'dingtalk-javascript-sdk';
export default class App extends Component{
  render(){
    return(
      <View>
      <Text onPress={
        ()=>{
          dingtalk.ready(function(){
            const dd = dingtalk.apis;
            dd.biz.util.openLink({
              url: 'https://github.com/icepy/dingtalk-javascript-sdk'
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
import dingtalk from 'dingtalk-javascript-sdk';
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
import dingtalk from 'dingtalk-javascript-sdk';
dingtalk.config({
  any Object your server response sign
});
```

* 你可以使用error注册一个error函数，与H5保持一致

例子：

```JavaScript
import dingtalk from 'dingtalk-javascript-sdk';
dingtalk.error(function(err){
  console.log(err);
});
```

* 正常的js-api可以通过dingtalk.apis来获取

例子：

```JavaScript
import dingtalk from 'dingtalk-javascript-sdk';
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

为了达到让你的应用可以同时使用两种环境下的js-api，你应该继续使用 `import dingtalk from 'dingtalk-javascript-sdk` 的方式来引入模块，在这个模块中会自动判断环境给你导出相应的SDK模块。

H5环境：

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

## 统一的事件回调机制

当你注册了事件之后，触发事件将由客户端来执行。

- 页面`resume`事件

当页面重新可见并可以交互的时候，钉钉客户端会触发这个事件。

```JavaScript
import dingtalk from 'dingtalk-javascript-sdk';
dingtalk.ready(function(){
	dingtalk.on('resume',function(){
		// do something
	})
});
```

- 页面`pause`事件

当页面不可见时，钉钉客户端会触发这个事件。

```JavaScript
import dingtalk from 'dingtalk-javascript-sdk';
dingtalk.ready(function(){
   dingtalk.on('pause',function(){
       // do something
   })
});
```

- 导航栏 `navRightButton` 事件

导航栏右侧按钮的点击事件。

```JavaScript
import dingtalk from 'dingtalk-javascript-sdk';
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
import dingtalk from 'dingtalk-javascript-sdk';
dingtalk.ready(function(){
	dingtalk.on('navTitle',function(){
	  // do something
	})
});
```

- 导航栏 `navHelpIcon` 事件

导航栏上点击icon时会触发的事件

```JavaScript
import dingtalk from 'dingtalk-javascript-sdk';
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
import dingtalk from 'dingtalk-javascript-sdk';
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
import dingtalk from 'dingtalk-javascript-sdk';
dingtalk.ready(function(){
	dingtalk.on('navMenu',function(){
		// do something
	})
})
```
