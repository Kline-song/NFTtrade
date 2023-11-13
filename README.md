# NFTtrade
NFTtrade是一个专门为软件体系结构与设计模式课程大作业的NFT交易平台设计的后端项目。

## 环境配置

### 1. 安装Node.js
请确保你已安装Node.js的18.18.0的LTS版本。如果没有安装，请访问[node.js官方网站](https://nodejs.org/)下载并安装。

### 2. 安装全局依赖
在终端中运行以下命令来全局安装Express框架及其关键模块：
```bash
npm install -g express body-parser cookie-parser multer
```
在终端中运行相关命令来全局安装vue

### 3. 数据库配置
- 安装MySQL数据库。
- 根据项目中提供的sql文件，创建名为`nftback`的数据库。
打开`config.js`文件，并将数据库连接信息修改为你的本地数据库配置。

### 4、部署RNode节点（可选）
下载`rnode_0.13.0-alpha3_all.deb`。
在终端中运行以下命令：
```
rnode run -s --data-dir ~/Desktop/rnode0 --shard-name dev --host 192.168.5.131 --api-host localhost --allow-private-addresses --validator-private-key 28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36 --synchrony-constraint-threshold 0 --no-upnp --discovery-port 40400 --api-port-grpc-external 40401 --api-port-grpc-internal 40402 --api-port-http 40403 --protocol-port 40404 --api-port-admin-http 40405
```
可能需要更改的部分：
- `--data-dir [RNode本地文件目录]`
- `--host [IP地址]`

## 运行方法

1. 在项目的根目录下运行：
```bash
npm install
npm start
```

2. 在NFTvue目录下运行：
```bash
npm install
npm run dev
```

3. 成功运行后，在浏览器中访问vue终端给出的地址，并添加正确的路由如`/register`来访问相关页面。

## 上传代码和合作流程

为了保证代码的质量和稳定性，我们建议以下的合作流程：

1. **不要直接在`main`分支上进行开发。** 请为每一个新功能或修复创建一个新的分支。
2. 完成开发后，推送你的分支到远程仓库。
3. 从你的分支创建一个Pull Request到`main`分支。
4. 请其他团队成员进行代码审查，确保没有问题后，合并到`main`分支。

## 代码撰写规范

请在使用涉及到数据库中的相关属性时，例如product_id，nft_identifier等，请确保变量名与数据库中的属性一致。
如果不清楚表中属性的含义或需要增添更多属性，请与相关人员进行沟通。

## 测试流程

- 可测试用户：
- 用户1 用户名：cai 密码：123
- 用户2 用户名：tom 密码：tom123