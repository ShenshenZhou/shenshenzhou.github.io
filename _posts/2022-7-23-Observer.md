---

title: 设计模式之观察者模式
date: 2022-7-23 16:07:57 +0800
tags: [总结,设计模式,八股,Observer]
categories: [笔记,设计模式]
typora-root-url: ..

---

观察者（Observer）模式的定义：指多个对象间存在一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。又可以称作发布-订阅模式。

### 优缺点

有点：

* 降低了目标与观察者之间的耦合关系，符合依赖倒置原则。
* 目标与观察者之间建立了一套触发机制。

缺点：

* 目标与观察者之间的依赖关系并没有完全解除，而且有可能出现循环引用。
* 当观察者对象很多时，通知的发布会花费很多时间，影响程序的效率。

### 应用场景

应用于一个对象的行为改变可能会影响其它对象的行为改变的场景。比如EXCEL中改变数据，则对应的折线图、饼状图、柱状图等都要改变。





```c++
#include<iostream>
#include<vector>
#include<memory>

using namespace std;

// 观察者接口（抽象）
class Observer {
public:
	virtual void Update() = 0;
};

// 被观察者接口（抽象）
class Subject {
public:
	virtual void Add(Observer* ober) = 0;  // 添加观察者
	virtual void Remove(Observer* ober) = 0;  // 移除观察者
	virtual void Notify() = 0;  // 通知观察者
};

// 具体的被观察者（实现）
class ConcreteSubject : public Subject {
private:
	vector<Observer*> observers;  // 保存所有的观察者
public:
	// 添加观察者实现
	virtual void Add(Observer* ober) {
		observers.push_back(ober);
	}
	// 移除观察者实现
	virtual void Remove(Observer* ober) {
		// 检查是否已经添加
		auto pos = find(observers.begin(), observers.end(), ober);
		if (pos != observers.end()) {
			// 如果存在则删除
			observers.erase(pos); 
		}
		else {
			cout << "不存在该观察者" << endl;
		}
	}
	// 通知所有观察者更新
	virtual void Notify() {
		for (const auto& ober : observers) {
			ober->Update();
		}
	}
};

// 具体的观察者1（实现）
class Observer1 : public Observer {
public:
	virtual void Update() {
		cout << "观察者1收到通知，准备更新。。。" << endl;
	}
};

// 具体的观察者2（实现）
class Observer2 : public Observer {
public:
	virtual void Update() {
		cout << "观察者2收到通知，准备更新。。。" << endl;
	}
};

int main() {
	// 创建被观察者
	ConcreteSubject cs;
	// 创建观察者
	Observer* ober1 = new Observer1;  // 观察者1
	Observer* ober2 = new Observer2;  // 观察者2

	// ----------------------------------------
	// 使用智能指针管理 注意：所有的Observer*都要变成shared<Observer>类型
	//auto ober1 = make_shared<Observer1>();
	//auto ober2 = make_shared<Observer2>();
	// ----------------------------------------
	
	// 被观察者与观察者建立联系
	cs.Add(ober1);
	cs.Add(ober2);
	// 通知更新
	cs.Notify();
	// 释放内存
	delete ober1;
	delete ober2;

	return 0;
}

// 运行结果
观察者1收到通知，准备更新。。。
观察者2收到通知，准备更新。。。
```





















