---

title: 设计模式之单例模式
date: 2022-7-22 22:09:55 +0800
tags: [总结,设计模式,八股,Singleton]
categories: [笔记,设计模式]
typora-root-url: ..

---

## 什么是单例模式

单例模式就是一个类只能产生一个实例。

### 单例模式的特点

- 单例类只有一个实例对象
- 该单例对象必须由单例类自行创建；
- 单例类对外提供一个访问该单例的全局访问点

### 单例模式的优缺点：

优点：

* 可以设置全局访问点，优化和共享资源访问
* 可以避免对资源的多重占用
* 由于系统内存中只存在一个对象，所以可以节约系统资源，提高性能

缺点：

* 单例模式一般没有接口，扩展困难。
* 单例模式不利与代码测试。在调试过程中，如果单例中的代码没有执行完，不能模拟生成一个新的对象。
* 与单一职责原则有冲突。原因：一个类应该只实现一个逻辑，而不关心它是否是单例，是不是要单例取决于环境；单例模式把“要单例”和业务逻辑融合在一个类。

### 单例模式的使用场景

- 系统只需要一个实例对象，比如，配置信息类，如系统要求提供一个唯一的序列号生成器或资源管理器，或者需要考虑资源消耗太大而只允许创建一个对象。
- 调用类的单个实例只允许使用一个公共访问点，除了该公共访问点，不能通过其他途径访问该实例

比如Windows任务管理器只能启动一个，这就是单例模式的使用。





## 单例模式实现

### 懒汉式单例（线程不安全）

懒汉式单例就是需要使用这个单例对象的时候才去创建这个单例对象。

```c++
#include<iostream>
#include<thread>
#include<mutex>
#include<windows.h>

using namespace std;

class Singleton {
private:
	// 私有化构造函数
	Singleton() {}  // 构造函数
	~Singleton() {}  // 析构函数
	Singleton(const Singleton& s) {}  // 拷贝构造函数
	Singleton& operator=(const Singleton& s) {}  // 拷贝赋值构造函数
	// 静态成员变量
	static Singleton* singleton;
public:
	// 静态成员函数
	static Singleton* GetInstance() {
		if (Singleton::singleton == nullptr) {
			Sleep(1000);  // 模拟创建实例的时间
			singleton = new Singleton();
		}
		return singleton;
	}
};

// 静态成员变量必须类外初始化
Singleton* Singleton::singleton = nullptr;
// 定义一个互斥锁
mutex m;

void PrintAddress() {
	// 获取实例
	Singleton* singleton1 = Singleton::GetInstance();
	// 打印singleton1地址 加锁保证只有一个线程在打印地址
	m.lock();  
	cout << singleton1 << endl;
	m.unlock(); 
}

int main() {
	thread threads[10];
	// 创建10个线程
	for (auto& t : threads) {
		t = thread(PrintAddress);
	}
	// 对每个线程调用join 主线程等待子线程完成运行
	for (auto& t : threads) {
		t.join();
	}

	return 0;
}

// 运行结果
000001B8BD907270
000001B8BD906DF0
000001B8BD906EB0
000001B8BD906EF0
000001B8BD906F30
000001B8BD906FF0
000001B8BD906F70
000001B8BD907070
000001B8BD907130
000001B8BD91FA40
```

可以看出打印出来的地址并不是完全一样，这种单例模式不是线程安全的。原因是，当几个线程同时执行到语句`if (Singleton::singleton == nullptr)`时，singleton都还没创建，所以就重复创建了几个实例。

注意：C++中没有自带与平台无关的sleep()函数，因此在Linux和Windows平台下，使用sleep()将进程挂起的方式是不同的。

* 在Linux下包含头文件#include<unistd.h>，然后使用sleep()函数，参数为秒，s是小写。
* 在Windows下包含头文件\#include<windows.h> ，然后使用Sleep()函数，参数为毫秒，S是大写。

### 懒汉式单例（线程安全）

==直接加锁GetInstance函数==

我们可以通过加锁来解决上面的问题，保证同时只有一个线程访问GetInstance函数。

```c++
mutex m;  // 创建锁
class Singleton {
private:
	// 私有化构造函数
	Singleton() {}  // 构造函数
	~Singleton() {}  // 析构函数
	Singleton(const Singleton& s) {}  // 拷贝构造函数
	Singleton& operator=(const Singleton& s) {}  // 拷贝赋值构造函数
	// 静态成员变量
	static Singleton* singleton;
public:
	// 静态成员函数
	static Singleton* GetInstance() {
		m.lock();  // 
		if (Singleton::singleton == nullptr) {
			Sleep(1000);  // 模拟创建实例的时间
			singleton = new Singleton();
		}
		m.unlock();
		return singleton;
	}
};

// 运行结果
000001DCA3F76B30
000001DCA3F76B30
000001DCA3F76B30
000001DCA3F76B30
000001DCA3F76B30
000001DCA3F76B30
000001DCA3F76B30
000001DCA3F76B30
000001DCA3F76B30
000001DCA3F76B30
```

可以发现，所有线程获取到的实例的地址都相同。整个程序中只有一个Singleton实例。原因是进入`GetInstance`函数之后，立马锁住创建实例的语句，保证只有一个线程在访问创建实例的代码。当一个线程创建之后，后续线程再访问时，Singleton::singleton就不为空了，这是一个静态成员变量，所以只存在这一个实例，后续的线程时共享这个实例。

==仅仅加锁创建实例的语句==

如果仅仅是对创建实例的语句进行加锁，线程时不安全的，因为当线程同时执行到语句`if (Singleton::singleton == nullptr)`时，singleton都还没有被创建，故会条件为真，多个线程都会创建实例，尽管不是同时创建。

```c++
// 其它部分代码相同
//m.lock();
if (Singleton::singleton == nullptr) {
    Sleep(1000);  // 模拟创建实例的时间
    m.lock();
    singleton = new Singleton();
    m.unlock();
}
//m.unlock();

// 运行结果
0000016176586E70
0000016176586E70
0000016176586E70
00000161765871F0
0000016176586EB0
0000016176587230
00000161765872F0
00000161765866B0
00000161765866B0
000001617659D7A0
```

为了解决这个问题，需要在加锁后再次判断实例是否为空，如果为空就创建实例。**称之为双检锁，使用双检锁的好处就是只有实例为空时才加锁，而不是每次调用创建实例的函数都加锁。这样可以较少加锁的开销。**

```c++
// 其它部分代码相同
//m.lock();
if (Singleton::singleton == nullptr) {
    Sleep(1000);  // 模拟创建实例的时间
    m.lock();
    if (Singleton::singleton == nullptr) {
        singleton = new Singleton();
    }
    m.unlock();
}
//m.unlock();

// 运行结果
000001D4601A6630
000001D4601A6630
000001D4601A6630
000001D4601A6630
000001D4601A6630
000001D4601A6630
000001D4601A6630
000001D4601A6630
000001D4601A6630
000001D4601A6630
```

### 懒汉式单例（内存安全）

上述new对象之后如果忘记释放内存的话会出现内存泄漏的问题。

最直观的想法就是在类内定义一个释放实例的静态成员函数，在使用完实例之后，**手动调用释放**即可。

```c++
#include<iostream>
#include<thread>
#include<mutex>
#include<windows.h>

using namespace std;

mutex m;
class Singleton {
private:
	// 私有化构造函数
	Singleton() { cout << "构造函数" << endl; }  // 构造函数
	~Singleton() { cout << "析构函数" << endl; }  // 析构函数
	Singleton(const Singleton& s) {}  // 拷贝构造函数
	Singleton& operator=(const Singleton& s) {}  // 拷贝赋值构造函数
	// 静态成员变量
	static Singleton* singleton;
public:
    ------------------------------------------------
    // 释放内存资源
	static void delInstance() {
		if (singleton != nullptr) {
			delete singleton;
			singleton = nullptr;
		}
	}
    ------------------------------------------------
	// 静态成员函数
	static Singleton* GetInstance() {
		if (Singleton::singleton == nullptr) {
			Sleep(1000);  // 模拟创建实例的时间
			m.lock();
			if (Singleton::singleton == nullptr) {
				singleton = new Singleton();
			}
			m.unlock();
		}
		return singleton;
	}
};

// 静态成员变量必须类外初始化
Singleton* Singleton::singleton = nullptr;
// 定义一个互斥锁
mutex m1;

void PrintAddress() {
	// 获取实例
	Singleton* singleton1 = Singleton::GetInstance();
	// 打印singleton1地址 加锁保证只有一个线程在打印地址
	m1.lock();
	cout << singleton1 << endl;
	m1.unlock();
}

int main() {
	thread threads[10];
	// 创建10个线程
	for (auto& t : threads) {
		t = thread(PrintAddress);
	}
	// 对每个线程调用join 主线程等待子线程完成运行
	for (auto& t : threads) {
		t.join();
	}
    -------------------------------------
	Singleton::delInstance();  // 手动释放
    -------------------------------------

	return 0;
}

// 运行结果
构造函数
000002C242B47370
000002C242B47370
000002C242B47370
000002C242B47370
000002C242B47370
000002C242B47370
000002C242B47370
000002C242B47370
000002C242B47370
000002C242B47370
析构函数
```

**也可以使用智能指针管理动态内存**，但是智能指针无法调用私有的析构函数，shared_ptr在定义的时候可以指定删除器（deleter），所以我们在使用的时候自己指定一个删除器就好了。[给shared_ptr添加自定义删除器的几种方式](https://blog.csdn.net/hp_cpp/article/details/103452196)

```c++
// 注意代码的变化
#include<iostream>
#include<thread>
#include<mutex>
#include<windows.h>
#include<memory>

using namespace std;

mutex m;
class Singleton {
private:
	// 私有化构造函数
	Singleton() { cout << "调用构造函数" << endl; }  // 构造函数
	~Singleton() { cout << "调用析构函数" << endl; } // 析构函数
	Singleton(const Singleton& s) = delete;  // 拷贝构造函数
	Singleton& operator=(const Singleton& s) = delete;  // 拷贝赋值构造函数
	static void Destory(Singleton* obj) {  // 自定义删除器
		delete obj;
	}
	// 静态成员变量
	static shared_ptr<Singleton> singleton;
public:
	// 静态成员函数
	static shared_ptr<Singleton> GetInstance() {
		//m.lock();
		if (Singleton::singleton == nullptr) {
			Sleep(1000);  // 模拟创建实例的时间
			m.lock();
			if (Singleton::singleton == nullptr) {
				// new创建对象
				//singleton = new Singleton();
				// 析构函数保持私有化 自己写删除器
				//shared_ptr<Singleton> singleton(new Singleton(), Singleton::Destory);
			}
			m.unlock();
		}
		//m.unlock();
		return singleton;
	}
};

// 静态成员变量必须类外初始化
shared_ptr<Singleton> Singleton::singleton = nullptr;
// 定义一个互斥锁
mutex m1;

void PrintAddress() {
	// 获取实例
	shared_ptr<Singleton> singleton1 = Singleton::GetInstance();
	// 打印singleton1地址 加锁保证只有一个线程在打印地址
	m1.lock();  
	cout << singleton1 << endl;
	m1.unlock(); 
}

int main() {
	thread threads[10];
	// 创建10个线程
	for (auto& t : threads) {
		t = thread(PrintAddress);
	}
	// 对每个线程调用join 主线程等待子线程完成运行
	for (auto& t : threads) {
		t.join();
	}

	return 0;
}

```

### 饿汉式单例（线程安全）

先实例化该单例类，而不是像之前一样初始化为空指针，饿汉式单例本身就是线程安全的。

```c++
// 其它代码不变
class Singleton {
private:
	// 私有化构造函数
	Singleton() { cout << "调用构造函数" << endl; }  // 构造函数
	~Singleton() { cout << "调用析构函数" << endl; } // 析构函数
	Singleton(const Singleton& s) = delete;  // 拷贝构造函数
	Singleton& operator=(const Singleton& s) = delete;  // 拷贝赋值构造函数
	// 静态成员变量
	static Singleton* singleton;
public:
	// 静态成员函数
	static Singleton* GetInstance() {
		return singleton;
	}
};

// 静态成员变量必须类外初始化
Singleton* Singleton::singleton = new Singleton();
```

饿汉式单例模式的内存安全可以使用上述同样的方法。







