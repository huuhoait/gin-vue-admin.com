# Tencent Cloud Object Storage

1. Get `Bucket` and `Domain` information
- [Create Storage Bucket](https://console.cloud.tencent.com/cos/bucket)
![Create Storage Bucket](/study/tencent/create_bucket.png)
- Fill in basic bucket information
![Fill in bucket information](/study/tencent/create_bucket_info.png)
- Fill in advanced optional bucket configuration (choose according to your needs)
![Fill in advanced optional bucket configuration](/study/tencent/create_bucket_options.png)
- Confirm configuration
![Confirm configuration](/study/tencent/create_bucket_confirm_configuration.png)
- Storage bucket created successfully
![Storage bucket created successfully](/study/tencent/create_bucket_success.png)
- Get `Bucket` and `Domain`
![Bucket information](/study/tencent/bucket.png)

2. Get `SecretId` and `SecretKey`

2.1 [Enter User List](https://console.cloud.tencent.com/cam)

2.2 Create new user
- ![User List](/study/tencent/user.png)

2.3 Quick create
![Quick create](/study/tencent/create_user_2_3.png)
2.4 Fill in username, edit access method, edit user permissions
![Fill in username, edit access method, edit user permissions](/study/tencent/create_user_2_4.png)
2.4.1 Check access method as programmatic access, Tencent Cloud console access choose according to needs
![Check access method as programmatic access, Tencent Cloud console access choose according to your situation](/study/tencent/create_user_2_4_1.png)
2.4.2 Check user permissions, choose according to needs
![Check user permissions, choose according to needs](/study/tencent/create_user_2_4_2.png)
2.4.3 Complete username, edit access method, edit user permissions selection
![Complete username, edit access method, edit user permissions selection](/study/tencent/create_user_2_4_3.png)
2.5 User created successfully
![img.png](/study/tencent/create_user_success.png)

3. Get configuration file based on the above operations
```yaml
# tencent cos configuration
TencentCos:
  # Path file storage folder
  Path: 'gva'
  # Prefix custom filename prefix, can be left empty
  Prefix: 'oss_'
  # Bucket storage bucket name
  Bucket: 'gva-1304136212'
  # Domain access domain
  Domain: 'https://gva-1304136212.cos.ap-guangzhou.myqcloud.com'
  # SecretId access key Id
  SecretId: 'AKIDCG6g3B2ez3qMbZGiz0kDQM1QZR5SaGiv'
  # SecretKey access key Secret
  SecretKey: '0kDPLnLhphKiqvqWTDj5FBuNZU8pJZbP'
```
