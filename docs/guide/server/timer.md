# Scheduled Tasks

## Open Interface Description
Interface address: gin-vue-admin/server/utils/timer/Timer
```go
type Timer interface {
	// Find all Crons
	FindCronList() map[string]*taskManager
	// Add Task method form in seconds
	AddTaskByFuncWithSecond(cronName string, spec string, fun func(), taskName string, option ...cron.Option) (cron.EntryID, error) // Add Task Func in seconds
	// Add Task interface form in seconds
	AddTaskByJobWithSeconds(cronName string, spec string, job interface{ Run() }, taskName string, option ...cron.Option) (cron.EntryID, error)
	// Add task through function method
	AddTaskByFunc(cronName string, spec string, task func(), taskName string, option ...cron.Option) (cron.EntryID, error)
	// Add task through interface method, need to implement an interface with Run method
	AddTaskByJob(cronName string, spec string, job interface{ Run() }, taskName string, option ...cron.Option) (cron.EntryID, error)
	// Get cron corresponding to taskName, may be empty
	FindCron(cronName string) (*taskManager, bool)
	// Start specified cron execution
	StartCron(cronName string)
	// Stop specified cron execution
	StopCron(cronName string)
	// Find specified task under specified cron
	FindTask(cronName string, taskName string) (*task, bool)
	// Remove specified task under specified cron by id
	RemoveTask(cronName string, id int)
	// Remove specified task under specified cron by taskName
	RemoveTaskByName(cronName string, taskName string)
	// Clear specified cronName
	Clear(cronName string)
	// Stop all crons
	Close()
}
```

## 使用Demo
```go
type Job struct{}

func (j *Job) Run() {
	fmt.Println("testFunc") // 每天打印一遍
}

func Demo() {
	// 在gva中 global.GVA_Timer 已经是初始化Timer对象供使用
	// 如果你想自己调用 utils.NewTimerTask() 即可拿到 Timer 接口
	// demo 演示
	t := utils.NewTimerTask()
	// spec 定时任务详细配置参考 https://pkg.go.dev/github.com/robfig/cron?utm_source=godoc
	// 同一个 taskName 中也可以设置多个任务
	id , err := t.AddTaskByFunc("testFunc", "@daily", func() {
		fmt.Println("testFunc") // 每天打印一遍
	})
	if err != nil {
		// ...
    }
	// job 实例
	id1 , err1 := t.AddTaskByJob("testFunc", "@daily", &Job{})
	if err1 != nil {
	     // ...   	    
	} 

	// 使用 AddTaskByFunc AddTaskByJob 添加的任务默认是激活状态
	// 想要停止调用 StopTask 即可
	t.StopTask("testFunc")

	// 也可以调用 t.FindCron() 获取cron原生对象,调用它的更多方法

	// t.Remove() 删除任务
	t.Remove("testFunc",id)
    
	
	
	// t.Close() 释放资源
	t.Close()
}

```

## 项目内示例

文件路径`gin-vue-admin/server/initialize/timer.go`

```go
package initialize

import (
	"fmt"
	"github.com/flipped-aurora/gin-vue-admin/server/task"

	"github.com/robfig/cron/v3"

	"github.com/flipped-aurora/gin-vue-admin/server/global"
)

func Timer() {
	go func() {
		var option []cron.Option
		option = append(option, cron.WithSeconds())
		// 清理DB定时任务
		_, err := global.GVA_Timer.AddTaskByFunc("ClearDB", "@daily", func() {
			err := task.ClearTable(global.GVA_DB) // 定时任务方法定在task文件包中
			if err != nil {
				fmt.Println("timer error:", err)
			}
		}, option...)
		if err != nil {
			fmt.Println("add timer error:", err)
		}

		// 其他定时任务定在这里 参考上方使用方法

		//_, err := global.GVA_Timer.AddTaskByFunc("定时任务标识", "corn表达式", func() {
		//	具体执行内容...
		//  ......
		//}, option...)
		//if err != nil {
		//	fmt.Println("add timer error:", err)
		//}
	}()
}
```
