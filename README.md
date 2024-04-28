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

1. `Activation Events` 注册onCommand激活事件，在用户运行命令是扩展被激活。 `onCommand:extension.helloWorld`
2. `Contribution Points` 使用构建点，使其在命令面板中可用，绑定命令ID。扩展VS代码，在Package.json扩展清单 `extension.helloWorld`
3. `VS Code API` 使用命令注册绑定VSCode API，在代码扩展中调用的API。`commands.registerCommand`

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

package.json
engines:vscode 支持最低的vscode版本 
activationEvents 支持激活的事件
main 文件的入口
contributes 命令最重要

```

###### structuredClone 未定义

`const structuredClone = (val) => JSON.parse(JSON.stringify(val))`
`npm run test // 运行成功`

```
Found existing install in C:\Users\CelineZ\OneDrive - M. Moser Associates Limited\Desktop\Work\KC\_CODE\Extensions\HelloMoMo\.vscode-test\vscode-win32-x64-archive-1.88.1. Skippi

[main 2024-04-23T08:23:32.034Z] update#setState disabled
[main 2024-04-23T08:23:32.037Z] update#ctor - updates are disabled by the environment
Loading development extension at c:\Users\CelineZ\OneDrive - M. Moser Associates Limited\Desktop\Work\KC\_CODE\Extensions\HelloMoMo
Started local extension host with pid 2252.

  Extension Test Suite
    ✔ Sample test
  1 passing (104ms)
[main 2024-04-23T08:23:36.139Z] Extension host with pid 2252 exited with code: 0, signal: unknown.
Exit code:   0
Done
```

###### 禁用其它的扩展插件

`--disable-extensions`

###### vsce 发布工具 将Extension发布出来

`npm install -g vsce`
`vsce publish`

1. WARNING  A 'repository' field is missing from the 'package.json' manifest file.

```
 // 添加repository字段在package.json.
 "repository": {
    "type": "git",
    "url": "https://github.com/wanjingzhang/HelloMoMo.git"
  } 

```

2. WARNING  LICENSE.md, LICENSE.txt or LICENSE not found

```
// 新建LICENSE文件
Visual Studio Code MoMo Packs

Copyright (c) Microsoft Corporation

All rights reserved.

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
```

3. ERROR  Missing publisher name. Learn more: <https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions>
    1. 需要Azure DevOps组织
    2. 创建Publisher
    3. 登录Publisher
    4. 发布

```
 // 设置publisher

```
