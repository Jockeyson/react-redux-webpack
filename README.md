react-redux-webpack
====
本Demo是typescript+reactjs+redux+webpack+gooflow的一个简单实现。
## 功能介绍
运行成功之后，显示出来的页面右边会出现2个按钮，一个前进，一个后退，功能等同于浏览器的前进，后退，该例子是想通过redux简单实现控制流程图的每一步操作。
## 运行
在当前目录下，依次执行命令</br>
npm install<br/>
npm run build<br/>
npm start<br/>
浏览器会自动打开页面，ps:在安装依赖的时候，redux-thunk的声明文件并不会安装在node_modules\@types\redux-thunk下(暂时不知道原因)，可手动把声明文件拷贝到该路径下。或者也可以修改代码，把用到redux-thunk的代码都去掉，本例默认使用的是静态数据。想要异步获取数据的，需要自行修改下代码。
