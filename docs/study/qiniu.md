# Qiniu Cloud Kodo

1. [Space Management](https://portal.qiniu.com/kodo/bucket)

![Space Management](/study/qiniu/bucket.png)

1.1 Create Space
![Create Space](/study/qiniu/create_bucket.png)

1.2 Get test domain `Domain`
![Get test domain](/study/qiniu/domain.png)

2. [Key Management](https://portal.qiniu.com/user/key)

![Key Management](/study/qiniu/key.png)

2.1 Key created successfully, get `AccessKey` `SecretKey`
![Key created successfully](/study/qiniu/create_key_success.png)

3. Get configuration file
```yaml
# qiniu configuration (please apply for corresponding public key, private key, bucket and domain address from Qiniu)
QiniuKodo:
  # Path file storage folder
  Path: 'gva'
  # Prefix custom filename prefix, can be left empty
  Prefix: 'oss_'
  # Bucket storage bucket name
  Bucket: 'gva-1'
  # Domain access domain
  Domain: 'rf5bfe2uo.hn-bkt.clouddn.com'
  # AccessKey access key AccessKey
  AccessKey: 'eAM1JaXHRJL_-Ue52tYLYw5gijt6r9ORgcG4dmLt'
  # SecretKey access key SecretKey
  SecretKey: 'GQtW43BUPBoj9HS99fTU7-xsPhQHLI70FvCAMHJ2'
  # UseHttps whether to use https
  UseHttps: false
  # UseCdnDomains whether to use cdn domain
  UseCdnDomains: false
```
