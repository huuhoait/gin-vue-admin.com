# Multiple Database Support

## File Configuration
Add `db-list` option in configuration file
db-list is a superset of `mysql` and `pymysql` in the file, for compatibility with lower versions, it is not directly generated to db-list during page initialization
```yaml
db-list: [
  {
    disabled: false, # Whether to disable, set to true will not be initialized
    type: "", # Database type, currently supports mysql, pgsql
    alias-name: "", # Database name, note: alias-name needs to be unique in db-list
    path: '',
    port: '',
    config: '',
    db-name: '',
    username: '',
    password: '',
    max-idle-conns: 10,
    max-open-conns: 100,
    log-mode: "",
    log-zap: false,
  }
]
```

## Usage
After correctly configuring the `db-list` parameter in `config.yaml`, add initialization method in `main` file
```
initialize.DBList()   # Initialize multiple database list
```

When using, get the `db` object from `global.GetGlobalDBByDBName(alias-name)` or `global.MustGetGlobalDBByDBName(alias-name)` method according to the configured `alias-name`. The difference between the two methods is that `MustGetGlobalDBByDBName` will panic when the `db` object corresponding to `alias-name` does not exist

## Note
Do not directly operate global.GVA_DBList
