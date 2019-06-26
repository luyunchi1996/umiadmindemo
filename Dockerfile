# 指定基础镜像
 FROM centos
 FROM node:10.16.0

 #FROM yarnpkg/node-yarn:latest
 # 指定（镜像创建者）
 MAINTAINER DEMO
 
 # 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
 ADD . /app/
 # cd到app文件夹下
 WORKDIR /app
 
 # 安装项目依赖包
 #RUN yarn config set ignore-engines true
 RUN centos curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
 RUN centos curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
 RUN centos yum install yarn

 RUN yarn
 #RUN npm rebuild node-sass --force
 
 # 配置环境变量
 ENV HOST 0.0.0.0
 ENV PORT 8000
 
 # 容器对外暴露的端口号
 EXPOSE 8000
 # 容器启动时执行的命令，类似npm run start
 CMD ["yarn","start","build"]
 #####it