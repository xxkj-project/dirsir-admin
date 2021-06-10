<!--
 * @Author: wangshengxian
 * @Date: 2020-08-17 15:34:06
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-27 10:30:20
 * @Desc: 项目说明文档
-->

## 简介

电商商品管理系统

### 域名

测试域名：http://shop.tangseng.io

正式域名：http://blog.xinxingouwu.com

### 服务器地址

测试服：18.167.22.103

测试访问：http://shop.tangseng.io/dirsir

测试登录账号：用户名：wsx;密码：wsx

正式服：18.167.22.41

正式访问：http://blog.xinxingouwu.com/dirsir

### 接口文档

[测试接口文档] http://shop.tangseng.io/cms/swagger-ui.html#/

[正式接口文档] http://blog.xinxingouwu.com/cms/swagger-ui.html

## 命令

```bash
# 启动
npm run serve 或 yarn serve

# 打包
npm run build:环境名 或 yarn build:环境名

# 静态资源分析
npm run report 或 yarn report

# 代码格式检查并自动修复
npm run lintcd
├── public                     // html模板
├── src                        // 源代码
│   ├── api                    // 各模块请求接口函数
│   ├── assets                 // 图片、icons、styles等静态资源
│   ├── components             // 全局公共组件
│   ├── directive              // 公共自定义指令
│   ├── filters                // 公共filter
│   │   ├── transform.js       // 字段转中文函数
│   ├── utils                  // 公用方法目录
│   │   ├── request.js         // axios请求统一配置
│   │   ├── routerGuards.js    // 全局路由拦截
│   │   ├── tools.js           // 公共工具方法
│   │   ├── storage.js         // localStorage存储封装
│   │   ├── validate.js        // 公共表单校验方法
│   ├── views                  // 所有页面代码目录
├── vue.config.js              // vue-cli配置
```

### 第三方插件

- 播放器插件(vue-video-player)

```bash

  # github地址
  https://github.com/surmon-china/vue-video-player/blob/master/examples/01-video.vue

```

#### 注意

```bash
  # int 类型
  取值有限制 -2147483648到2147483647

```

### 去中心化

### 共享表单验证方法(搭配 vuex 来实现)

## 浏览器支持

IE 11
Edge
Chrome
Firefox
Safari
