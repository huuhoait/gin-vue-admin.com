# viper

## Priority Description

1. The path variable parameter is to leave an opening for unit testing, convenient to use relative path or absolute path to specify the location of the config file

2. Use `./server -c xxx/config.yaml` to pass values through command line and assign to config variable

3. [ConfigEnv](https://github.com/flipped-aurora/gin-vue-admin/blob/main/server/core/internal/constant.go#L4) is a constant defined in server/core/internal/constant.go, you can modify it to your desired environment variable

4. Finally, it will match the definition in `server/core/internal/constant.go` file according to the `GIN_MODE` environment variable that comes with the Gin framework.

   :::danger Note

   GIN_MODE can only have three values: debug, release, test, other values will panic
   :::

## `GIN_MODE` Usage Scenario Description

1. There are three branches: development branch develop, test branch test, production branch release
2. But the databases and OSS connected by the three branches are different, so there will be three configuration files, which cannot be saved in documents
3. So generally use git's .gitattributes file, each branch has its own branch's configuration file and Dockerfile
4. In the Dockerfile file, specify any of the following lines of code to control the configuration file corresponding to each environment

```
ENV GIN_MODE=debug
ENV GIN_MODE=release
ENV GIN_MODE=test
```





