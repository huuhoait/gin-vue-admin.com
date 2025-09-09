import{_ as e,c as a,o as s,a2 as o}from"./chunks/framework.D0tJ55os.js";const h=JSON.parse('{"title":"Environment Variables","description":"","frontmatter":{},"headers":[],"relativePath":"guide/web/env.md","filePath":"guide/web/env.md"}'),p={name:"guide/web/env.md"};function i(t,n,l,r,d,c){return s(),a("div",null,[...n[0]||(n[0]=[o(`<h1 id="environment-variables" tabindex="-1">Environment Variables <a class="header-anchor" href="#environment-variables" aria-label="Permalink to &quot;Environment Variables&quot;">​</a></h1><h2 id="env-development" tabindex="-1">.env.development <a class="header-anchor" href="#env-development" aria-label="Permalink to &quot;.env.development&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ENV = &#39;development&#39;  // Identifier, don&#39;t worry about it</span></span>
<span class="line"><span></span></span>
<span class="line"><span>VITE_CLI_PORT = 8080</span></span>
<span class="line"><span>VITE_SERVER_PORT = 8888</span></span>
<span class="line"><span>VITE_BASE_API = /api</span></span>
<span class="line"><span>VITE_FILE_API = /api</span></span>
<span class="line"><span>VITE_BASE_PATH = http://127.0.0.1</span></span>
<span class="line"><span>VITE_POSITION = close  // open to enable code positioning function, close to disable code positioning function</span></span>
<span class="line"><span>VITE_EDITOR = vscode  // Options: vscode webstorm</span></span>
<span class="line"><span>// VITE_EDITOR = webstorm If using webstorm for development and want to use dom positioning to code line function, please first add webstorm to environment variables, then change VITE_EDITOR value to webstorm</span></span>
<span class="line"><span>// If using docker-compose development mode, set to the address below or local host IP</span></span>
<span class="line"><span>// VITE_BASE_PATH = http://177.7.0.12</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// When code positioning function is enabled, hold shift+alt+left mouse click on code lines in web page to open corresponding code files in editor</span></span></code></pre></div><h2 id="env-production" tabindex="-1">.env.production <a class="header-anchor" href="#env-production" aria-label="Permalink to &quot;.env.production&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ENV = &#39;production&#39;  // Identifier, don&#39;t worry about it</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Below are the program proxy prefixes needed for production, generally used for nginx proxy forwarding</span></span>
<span class="line"><span>VITE_BASE_API = /api</span></span>
<span class="line"><span>VITE_FILE_API = /api</span></span>
<span class="line"><span># Change below to your production IP (use when need to use form builder tool online, no need for other cases)</span></span>
<span class="line"><span>VITE_BASE_PATH = https://demo.gin-vue-admin.com</span></span></code></pre></div>`,5)])])}const v=e(p,[["render",i]]);export{h as __pageData,v as default};
