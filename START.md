## 安装+初始化

###### 全局安装 Yeoman

npm install --global yo generator-code

###### 运行yo

yo code

###### 初始化项目参数

```
? What type of extension do you want to create? New Extension (TypeScript)
? What's the name of your extension? HelloMoMo
? What's the identifier of your extension? HelloMoMo
? What's the description of your extension? Fill Blank
? Initialize a git repository? Yes
? Bundle the source code with webpack? No
? Which package manager to use? npm
```

###### 初始化结束运行项目

? Do you want to open the new folder with Visual Studio Code? Open with `code`

###### 运行项目

1. 打开 `src/extension.ts`
2. 按下F5或Ctrl+Shift+P 运行命令 Debug: Start Debugging. 会在新的Extension Development Host窗口编译+运行
3. 从命令面板Ctrl+Shift+P 运行`Hello World`命令
4. 看到显示的`Hello World from HelloMoMo!`提示信息

###### 修改内容

1. 修改提示信息 `src/extensions.ts`
2. `vscode.window.showInformationMessage(Hello VS Code from HelloMoMo!)`
3. Ctrl+Shift+P `reload`reload window, F5运行打开新的窗口，Ctrl+Shift+P, 输入HelloWord命令

###### 修改命令需要三步

1. `Activation Events` 注册onCommand激活事件，在用户运行命令是扩展被激活。
2. `Contribution Points` 使用构建点，使其在命令面板中可用，绑定命令ID。扩展VS代码，在Package.json扩展清单
3. `VS Code API` 使用命令注册绑定VSCode API，在代码扩展中调用的API。

###### 文件扩展结构

```
├── .vscode
│ ├── launch.json   // 启动和调试扩展的配置
│ └──tasks.json     // 编译 TypeScript 的构建任务配置
├── .gitignore      // 忽略构建输出和node_modules
├── README.md       // 扩展功能的可读描述
├── 来源
│ └── extension.ts  // 扩展源代码
├── package.json    // 扩展清单
├── tsconfig.json   // TypeScript 配置
```
