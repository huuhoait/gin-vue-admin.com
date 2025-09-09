import{_ as s,c as n,o as e,a2 as t}from"./chunks/framework.D0tJ55os.js";const g=JSON.parse('{"title":"Production Form Generator Usage","description":"","frontmatter":{},"headers":[],"relativePath":"guide/generator/web-produce.md","filePath":"guide/generator/web-produce.md"}'),p={name:"guide/generator/web-produce.md"};function o(i,a,l,r,d,c){return e(),n("div",null,[...a[0]||(a[0]=[t(`<h1 id="production-form-generator-usage" tabindex="-1">Production Form Generator Usage <a class="header-anchor" href="#production-form-generator-usage" aria-label="Permalink to &quot;Production Form Generator Usage&quot;">​</a></h1><ul><li><ol><li>Need to modify <code>web/src/view/systemTools/formCreate/index.vue</code></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div style=&quot;height:80vh&quot;&gt;</span></span>
<span class="line"><span>    &lt;iframe width=&quot;100%&quot; height=&quot;100%&quot; :src=&quot;\`\${basePath}:\${basePort}/form-generator/#/\`&quot; frameborder=&quot;0&quot; /&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre></div><p>Modify to</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div style=&quot;height:80vh&quot;&gt;</span></span>
<span class="line"><span>    &lt;iframe width=&quot;100%&quot; height=&quot;100%&quot; :src=&quot;\`\${basePath}/form-generator/#/\`&quot; frameborder=&quot;0&quot; /&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre></div></li><li><ol start="2"><li>Add and modify nginx configuration</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    location  /form-generator {</span></span>
<span class="line"><span>        proxy_set_header Host $http_host;</span></span>
<span class="line"><span>        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span>        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>        proxy_set_header X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span>    	proxy_pass http://127.0.0.1:8888;</span></span>
<span class="line"><span>    }</span></span></code></pre></div></li><li><ol start="3"><li>Also configure <code>web/.env.production</code> as</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ENV = &#39;production&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>VITE_CLI_PORT = 8080</span></span>
<span class="line"><span>VITE_SERVER_PORT = 8888</span></span>
<span class="line"><span>VITE_BASE_API = /api</span></span>
<span class="line"><span># Modify below to your online domain</span></span>
<span class="line"><span>VITE_BASE_PATH = https://your-online-domain</span></span></code></pre></div></li></ul>`,2)])])}const h=s(p,[["render",o]]);export{g as __pageData,h as default};
