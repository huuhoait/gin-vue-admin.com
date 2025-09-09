---
id: k8s
title: k8s Resource Configuration
---

# k8s Resource Configuration

## Usage Statement
1. Cloud deployment requires manual database initialization, online initialization operation is not supported (/deployment/server/gva-server-configmap.yaml)

   ```
   After custom database initialization, write the configuration to /deployment/server/gva-server-configmap.yaml
   ```



## Choose Access Method



##### 1. Domain Access

​    Such as: http://demo.gin-vue-admin.com

```
Modify line 9 to your own domain in deploy/kubernetes/web/gva-web-ingress.yaml
```

##### 2. Service Access

​    Such as: http://127.0.0.1:30180

```
Modify line 12 and after to the following configuration in deploy/kubernetes/web/gva-web-service.yaml
spec:
  type: NodePort
  ports:
    - name: http
      port: 8080
      targetPort: 8080
      nodePort: 30180
  selector:
    app: gva-web
    version: gva-vue3
```



## Choose Image



##### 1. Use gin-vue-admin Official Images

​    Frontend example: image: registry.cn-hangzhou.aliyuncs.com/gva/web:latest

```
Modify line 26 to the image you need to deploy in deploy/kubernetes/web/gva-web-deploymemt.yaml
```

​    Backend example: image: registry.cn-hangzhou.aliyuncs.com/gva/server:latest

```
Modify line 26 to the image you need to deploy in deploy/kubernetes/server/gva-server-deployment.yaml
```



##### 2. Use Custom Images

```
You can refer to the docker page to create custom images, upload them to the image repository, then modify the yaml files according to step 1.
```



## Start Deployment

```
# Use default namespace
kubectl apply  -f deploy/kubernetes/server/ -f deploy/kubernetes/web/

# Specify namespace
kubectl apply  -f deploy/kubernetes/server/ -f deploy/kubernetes/web/ -n namespace

# Restart server service
kubectl -n namespace rollout restart deployment gva-server

# Scale server service
kubectl -n namespace scale deployment gva-server --replicas 2

# Clean up gva services
kubectl delete  -f deploy/kubernetes/server/ -f deploy/kubernetes/web/ -n namespace
```



