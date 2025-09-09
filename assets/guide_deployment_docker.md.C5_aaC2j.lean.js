import{_ as a,c as n,o as i,a2 as e}from"./chunks/framework.F2PfgoOO.js";const d=JSON.parse('{"title":"Docker","description":"","frontmatter":{},"headers":[],"relativePath":"guide/deployment/docker.md","filePath":"guide/deployment/docker.md"}'),p={name:"guide/deployment/docker.md"};function l(t,s,r,h,k,c){return i(),n("div",null,[...s[0]||(s[0]=[e(`<h1 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-label="Permalink to &quot;Docker&quot;">​</a></h1><h2 id="web-frontend-project-standalone-packaging" tabindex="-1">Web Frontend Project Standalone Packaging <a class="header-anchor" href="#web-frontend-project-standalone-packaging" aria-label="Permalink to &quot;Web Frontend Project Standalone Packaging&quot;">​</a></h2><ul><li>Using <code>nginx</code> image</li></ul><p><code>my.conf</code> source from <a href="https://github.com/flipped-aurora/gin-vue-admin" target="_blank" rel="noreferrer">gin-vue-admin</a>&#39;s <a href="https://github.com/flipped-aurora/gin-vue-admin/blob/master/.docker-compose/nginx/conf.d/my.conf" target="_blank" rel="noreferrer">my.conf</a></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   listen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">       8080</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   server_name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> localhost</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   #charset koi8-r;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   #access_log  logs/host.access.log  main;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       root</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/share/nginx/html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       add_header</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Cache-Control</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       try_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $uri $uri</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /index.html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /api</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       proxy_set_header</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $http_host;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       proxy_set_header</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  X-Real-IP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $remote_addr;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       proxy_set_header</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> X-Forwarded-For</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       proxy_set_header</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> X-Forwarded-Proto</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $scheme;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       rewrite</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ^/api/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)$ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">$1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> break</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#rewrite</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       proxy_pass</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://127.0.0.1:8888</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Set proxy server protocol and address</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /api/swagger/index.html</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       proxy_pass</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http://127.0.0.1:8888/swagger/index.html</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><code>Dockerfile</code> source from <a href="https://github.com/flipped-aurora/gin-vue-admin" target="_blank" rel="noreferrer">gin-vue-admin</a>&#39;s <a href="https://github.com/flipped-aurora/gin-vue-admin/blob/master/dockerfile_web" target="_blank" rel="noreferrer">dockerfile_web</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Declare image source as node:12.16.1</span></span>
<span class="line"><span>FROM node:12.16.1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Declare working directory</span></span>
<span class="line"><span>WORKDIR /gva_web/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Copy entire web project to current working directory</span></span>
<span class="line"><span>COPY . .</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Download cnpm through npm</span></span>
<span class="line"><span>RUN npm install -g cnpm --registry=https://registry.npm.taobao.org</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Use cnpm to install dependencies</span></span>
<span class="line"><span>RUN cnpm install || npm install</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Use npm run build command to package web project</span></span>
<span class="line"><span>RUN npm run build</span></span>
<span class="line"><span># ===================================================== Multi-stage build below ==========================================================</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Declare image source as nginx:alpine, alpine image is small</span></span>
<span class="line"><span>FROM nginx:alpine</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Image author and email</span></span>
<span class="line"><span>LABEL MAINTAINER=&quot;SliverHorn@sliver_horn@qq.com&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Copy my.conf from .docker-compose/nginx/conf.d/ directory to /etc/nginx/conf.d/my.conf in container</span></span>
<span class="line"><span>COPY .docker-compose/nginx/conf.d/my.conf /etc/nginx/conf.d/my.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Copy files from first stage</span></span>
<span class="line"><span>COPY --from=0 /gva_web/dist /usr/share/nginx/html</span></span>
<span class="line"><span></span></span>
<span class="line"><span># View /etc/nginx/nginx.conf file</span></span>
<span class="line"><span>RUN cat /etc/nginx/nginx.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span># View /etc/nginx/conf.d/my.conf</span></span>
<span class="line"><span>RUN cat /etc/nginx/conf.d/my.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Check if files are copied successfully</span></span>
<span class="line"><span>RUN ls -al /usr/share/nginx/html</span></span></code></pre></div><h2 id="server-project-standalone-packaging" tabindex="-1">Server Project Standalone Packaging <a class="header-anchor" href="#server-project-standalone-packaging" aria-label="Permalink to &quot;Server Project Standalone Packaging&quot;">​</a></h2><p><code>Dockerfile</code> source from <a href="https://github.com/flipped-aurora/gin-vue-admin" target="_blank" rel="noreferrer">gin-vue-admin</a>&#39;s <a href="https://github.com/flipped-aurora/gin-vue-admin/blob/gva_gormv2_dev/server/Dockerfile" target="_blank" rel="noreferrer">Dockerfile</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Declare image source as golang:alpine</span></span>
<span class="line"><span>FROM golang:alpine</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Declare working directory</span></span>
<span class="line"><span>WORKDIR /go/src/gin-vue-admin</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Copy entire server project to working directory</span></span>
<span class="line"><span>COPY . .</span></span>
<span class="line"><span></span></span>
<span class="line"><span># go generate automatically execute code before compilation</span></span>
<span class="line"><span># go env view go environment variables</span></span>
<span class="line"><span># go build -o server . package project generate binary file named server</span></span>
<span class="line"><span>RUN go generate &amp;&amp; go env &amp;&amp; go build -o server .</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ==================================================== Multi-stage build below ==========================================================</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Declare image source as alpine:latest</span></span>
<span class="line"><span>FROM alpine:latest</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Image author and email</span></span>
<span class="line"><span>LABEL MAINTAINER=&quot;SliverHorn@sliver_horn@qq.com&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Declare working directory</span></span>
<span class="line"><span>WORKDIR /go/src/gin-vue-admin</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Copy entire folder files from /go/src/gin-vue-admin to current working directory</span></span>
<span class="line"><span>COPY --from=0 /go/src/gin-vue-admin ./</span></span>
<span class="line"><span></span></span>
<span class="line"><span>EXPOSE 8888</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Run packaged binary and use -c to specify config.docker.yaml configuration file</span></span>
<span class="line"><span>ENTRYPOINT ./server -c config.docker.yaml</span></span></code></pre></div><h2 id="generate-docker-image-from-dockerfile" tabindex="-1">Generate Docker Image from Dockerfile <a class="header-anchor" href="#generate-docker-image-from-dockerfile" aria-label="Permalink to &quot;Generate Docker Image from Dockerfile&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -f specify Dockerfile file, default is Dockerfile</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -t image name:version tag</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># . must definitely be added</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gva-server:1.0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span></span></code></pre></div><h2 id="run-docker-image" tabindex="-1">Run Docker Image <a class="header-anchor" href="#run-docker-image" aria-label="Permalink to &quot;Run Docker Image&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -d run in background</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -p map port:internal port</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -name container name</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># gva-server:1.0 is the -t parameter from docker build</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 8888:8888</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gva-server-v1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gva-server:1.0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -it run in interactive mode and enter container, use Ctrl + p + q to run program in background, Ctrl+c to exit container</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -p map port:internal port</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># -name container name</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># gva-server:1.0 is the -t parameter from docker build</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 8888:8888</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gva-server-v1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gva-server:1.0</span></span></code></pre></div>`,14)])])}const g=a(p,[["render",l]]);export{d as __pageData,g as default};
