# 安装Node.js
FROM node:latest

# 创建工作目录
WORKDIR /app

# 将node_modules添加到工作目录
COPY package.json .
RUN npm install -g pnpm
RUN pnpm i

# 将所有文件复制到工作目录
COPY . .

# 编译前端项目
RUN pnpm build

# 产生静态文件
FROM nginx:stable-alpine
COPY --from=0 /app/dist /usr/share/nginx/html/
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/