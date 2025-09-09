# Alibaba Cloud Object Storage

1. Get `Bucket`, `Domain`, `Endpoint` information

- [Create Bucket](https://oss.console.aliyun.com/bucket)
  ![img.png](/study/aliyun/create_bucket.png)

- Bucket created successfully
![Bucket created successfully](/study/aliyun/create_bucket_success.png)

- Click `sliver-horn` to enter, click Overview
![Bucket Overview](/study/aliyun/bucket.png)

2. [RAM Access Control](https://ram.console.aliyun.com/users/new) Get `AccessKeyId` and `AccessKeySecret`

- Create user
![Create user](/study/aliyun/user_new.png)

- User created successfully
![User created successfully](/study/aliyun/user_new_succes.png)

- Add permissions 
![Add permissions](/study/aliyun/assign_permissions.png)

- Permissions added successfully
![Permissions added successfully](/study/aliyun/assign_permissions_success.png)

- Enter [User Interface](https://ram.console.aliyun.com/users) 
![Enter user interface](/study/aliyun/user.png)

- Create AccessKey
![Create AccessKey](/study/aliyun/user_create_access_key.png)

- AccessKey created successfully
![AccessKey created successfully](/study/aliyun/user_create_access_key_success.png)

4. Get configuration file based on the above operations
```yaml
# aliyun oss configuration
AliyunOss:
  # Path file storage folder
  Path: 'gva'
  # Prefix custom filename prefix, can be left empty
  Prefix: 'oss_'
  # Bucket storage bucket name
  Bucket: 'sliver-horn'
  # Domain access domain
  Domain: 'https://sliver-horn.oss-cn-shenzhen.aliyuncs.com'
  # Endpoint region node
  Endpoint: 'oss-cn-shenzhen.aliyuncs.com'
  # AccessKeyId access key Id
  AccessKeyId: 'LTAI5t7dSHRh2MHhaAo3gSGR'
  # AccessKeySecret access key Secret
  AccessKeySecret: 'V4dc2lXiaJhGi40e7FcdiaLDDGtQ35'
```