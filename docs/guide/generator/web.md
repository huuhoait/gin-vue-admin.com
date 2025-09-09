# 127.0.0.1 Connection Refused

:::warning
Not recommended for production use
:::

![image-20201026171737491](/generator/image-20201026171737491.png)

- When this happens,
  - Old version: Go to `web/src/view/systemTools/formCreate/index.vue` and replace `127.0.0.1` with local machine or server IP
  - New version: Go to the corresponding environment variables to modify the specified parameters
  `path : VITE_BASE_PATH` `port :VITE_SERVER_PORT `

- The default port for server project is `8888`, if you modify it, you also need to change `127.0.0.1:8888` to the corresponding port `ip:custom_port`

