FROM node
# 维护者信息
MAINTAINER lipy "lipy@163.com"
# 将Dockerfile上下文中的nginx.repo复制到容器中的yum源位置
copy ./ /home/KoaTwoServer/
WORKDIR /home/KoaTwoServer/
# 暴露80端口
EXPOSE 7000

ENTRYPOINT ["node","koa2App.js"]
#ENTRYPOINT ["/bin/bash"]