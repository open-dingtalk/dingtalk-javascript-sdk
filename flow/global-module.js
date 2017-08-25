declare module 'dingtalk-sdk-polyfills'{
  declare var weexInstanceVar:Object;
  declare export default typeof weexInstanceVar;
}

declare module "dingtalk-sdk-ship"{
  declare var ship:Object;
  declare export default typeof ship;
}

declare module 'dingtalk-sdk-exec'{
  declare var exec:Function;
  declare export default typeof exec;
}
