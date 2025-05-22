# 一个轻量级简单实用的 JavaScript 工具库



#### 作者介绍: 
```
    Vuekit 精心收录了一系列在实际开发场景中千锤百炼的 JavaScript 方法。
    这些方法涵盖了数据处理、DOM 操作、网络请求、浏览器兼容性处理等多个开发中常见的领域。
    无论是复杂的数据清洗与转换，还是繁琐的 DOM 元素操作；无论是便捷的网络请求封装，还是巧妙的浏览器差异适配，Vuekit 都能提供简洁、高效的解决方案。

    它以 "轻量级" 为核心设计理念之一，整个库体积小巧，不会给项目带来额外的负担，却能发挥强大的作用。
    同时，"简单实用" 贯穿于每一个方法的设计与实现中。
    清晰的 API 设计，让开发者无需花费大量时间学习复杂的使用规则，能够快速上手，将更多的精力投入到业务逻辑的实现上。​

    Vuekit 是开发者在实际开发中的得力伙伴，它凭借着对实际问题的深刻理解和针对性的解决方案。
    帮助开发者解决各种各样的开发难题，提升开发效率，让开发过程更加顺畅和愉悦。
```


### Using npm:
```js
 npm i Vuekit
```

 
### Using in Vue. and Using in React. 

## 1. deepClone 深度克隆方法
```js
let obj1 = {a: 10, b: 20};
let obj2 = obj1;
console.log(obj1 === obj2); // true

//---------------------------------------------------

let obj3 = {a: 10, b: 20};
let obj4 = deepClone(obj3);
console.log(obj3 === obj4); // false
``` 

## 2. freezeObjectProperties 冻结对象某个属性 (方法简介: 在vue2项目中由于响应式设计上有一定的缺陷，实际开发中如果使用不当会造成一定程度的性能浪费)
```js
/* 举个栗子: 我们在渲染表格数据的时候，往往真正用到响应式数据的一般就那么几个，而后端返回的表格数据通常会有很多，如果不做处理vue就会默认这些数据都需要响应式，这就
造成了不必要的性能浪费，数据量小还好，如果数据量过大会造成一些意想不到的奇怪问题。
*/

<tl-table :data='tableData'></tl-table>

data() {
    return {
        tableData: [],
        obj: {}
    }
}

// 使用方法: 
// 1. 数组
let arrayList = [{a: 10, b: 20, c: 30, ...}, {a: 10, b: 20, c: 30, ...}, {a: 10, b: 20, c: 30, ...}]; // 假设这是后端返回的表格数据

// 那么在赋值之前 this.tableData = arrayList; 先调用一个 freezeObjectProperties 这个方法，告诉它那个key需要保留响应式即可
freezeObjectProperties(arrayList, ['c']); // 比如我只想让 c 这个字段拥有响应式，其他都不需要

this.tableData = arrayList; // 优化完成 这些数组里面 每个对象里面只有 c 保持响应式


// 2. 对象
let object = {a: 10, b: 20, c: 30};
freezeObjectProperties(object, ['c']);
this.obj = object;


// 3. 冻结全部
// 如果想要冻结整个对象，那么第二个参数不传即可
freezeObjectProperties(arrayList);
this.tableData = arrayList; // 那么整个对象都是冻结状态
```

## 3. flatArray 用于扁平化一个多维数组
```js
// 在项目中我们通常会对一些多维数据进行扁平化处理，那么这个时候就需要请出flatArray方法了。

// 使用方法:
// 这个方法一共包含两个参数，参数1必传并且必须是一个数组，参数2是可选，它代表你要扁平子级的key名字 默认是 children
flatArray(参数1，参数2)

let arr = [{a: 10, list: []}, {a: 10, list: [{a: 10, list: [{a: 10, list: []}]}]}]; // 比如这是你要扁平的数据

let temp = flatArray(arr, 'list');

```

## 4. createRandomId 得到一个随机唯一id
```js
// 使用方法:
let id1 = createRandomId(); // 随机id且唯一
let id2 = createRandomId(); // 随机id且唯一
let id3 = createRandomId(); // 随机id且唯一
let id4 = createRandomId(); // 随机id且唯一
let id5 = createRandomId(); // 随机id且唯一
let id6 = createRandomId(); // 随机id且唯一

for(let i of []) {
    i.id = createRandomId();
}
```

## 5. debounce 和 advanceDebounce 基础函数防抖 和 高级版函数防抖

```js
// 使用方法
// debounce(参数1, 参数2, 餐数3); // 参数1 要防抖的函数，参数2等待的时间(毫秒), 参数3 是否立即执行(可不传默认false)
// advanceDebounce(参数1, 参数2, 餐数3); // 参数1 要防抖的函数，参数2等待的时间(毫秒), 参数3 是否立即执行(可不传默认false) 高级带有 带取消和flush功能


<el-input v-model='value' @input='searchInput'></el-input>

data() {
    return {
        value: '',
        searchInput: ''
    }
}

created() {
    // 基础版
    this.searchInput = debounce(() => {
        // 函数体
    }, 500)

    // 高级版 带取消和flush功能 可以更加灵活的控制防抖行为
    this.searchInput = advanceDebounce(() => {
        // 函数体
    }, 500)

    this.searchInput.cancel(); // 取消
    this.searchInput.flush(); // flush
}

```

## 6. throttle 和 throttleOut 和 advanceThrottle 节流函数
```js
// 1. 使用方法  基础版 throttle
<el-input v-model='value' @input='searchInput'></el-input>

data() {
    return {
        value: '',
        searchInput: ''
    }
}

created() {
    // 在单位时间内只执行一次
    this.searchInput = throttle(() => {
        // 函数体
    }, 800);
}


// 2. 综合版 throttleOut 定时器方式 + 最后一次一定执行方式
<el-input v-model='value' @input='searchInput'></el-input>

data() {
    return {
        value: '',
        searchInput: ''
    }
}

created() {
    // 定时器方式 + 最后一次一定执行方式
    this.searchInput = throttleOut(() => {
        // 函数体
    }, 800);
}


// 3. 进阶综合版 advanceThrottle 立即执行 + 最后一次一定执行方式
<el-input v-model='value' @input='searchInput'></el-input>

data() {
    return {
        value: '',
        searchInput: ''
    }
}

created() {
    // 立即执行 + 最后一次一定执行方式
    this.searchInput = advanceThrottle(() => {
        // 函数体
    }, 800);
}

```


## 7. _getPathValue 访问深层对象属性

```js
// 使用方法: 在低版本js中不支持可选连操作(?.) , 如果要访问深层对象又要保证不报错，写出来的代码十分臃肿一堆 a && a.b && a.b.c......使代码十分不容易维护

let obj = {
    a: {
        b: {
            c: {
                d: {
                    f: {
                        name:"你好111"
                    }
                }
            }
        }
    }
};

方法1: console.log(obj.a.b.c.d.f.name); // 不推荐 没有容错判断

方法2: console.log(obj && obj.a && obj.a.b &&  obj.a.b.c.....); // 太沉重 不推荐

方法3: try { console.log(obj.a.b.c.d.f.name); } catch(e) { console.log('默认值') }; // 效率差 不优雅 极为不推荐

方法4: console.log(obj?.a?.b?.c?.d?.f?.name); // 可选连操作 高版本才能用 (高版本推荐)

方法5: console.log(_getPathValue(obj, 'a.b.c.d.f.name', '这是默认值')); // 低版本js 推荐使用
```


## 8. _numberfilter 数值转换

```js
// 使用方法:
在一些业务场景中需要把小写数字转换成大写数字

console.log(_numberfilter('520')); // 五百二十
console.log(_numberfilter('521')); // 五百二十一
console.log(_numberfilter('1314')); // 一千三百十四
console.log(_numberfilter('666')); // 六百六十六
```

## 9. _moneyfilter 数字金额读法

```
// 使用方法:
console.log(_moneyfilter('1314.56'));    // 壹仟叁佰壹拾肆元伍角陆分
console.log(_moneyfilter('1001001.00')); // 壹佰万零壹仟零壹元整
console.log(_moneyfilter(1002003004.6)); // 壹拾亿零贰佰万零叁仟零肆元陆角
console.log(_moneyfilter('0'));          // 零元整
console.log(_moneyfilter('-300.75'));    // 负叁佰元柒角伍分
console.log(_moneyfilter('00123.45'));   // 壹佰贰拾叁元肆角伍分
console.log(_moneyfilter('abc123'));     // 金额错误
console.log(_moneyfilter(null));         // 金额错误
console.log(_moneyfilter('99999999999999.99')); // 玖拾玖兆玖仟玖佰玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖元玖角玖分
```




## 10. _pick 从源对象中选择指定字段构成新对象

```js
// 使用方法
let obj = {
    a: 10,
    b: 20,
    c: 30
};

console.log(_pick(obj, ['c']));
打印结果: {
    "c": 30
}
```

## 11. deepFindTreeNodeDom 此方法针对的是 element-ui 中的 el-tree 节点树

```js
// 使用方法
// 在使用el-tree 节点树的时候很多场景就是 默认选中节点树第一个节点并点击
// 那么这个方法就可以很好的帮助你

// 注意: 在使用此方法之前  el-tree 必须添加 default-expand-all 这个属性 否则不生效
<el-tree :data='treeData' ref='tree' default-expand-all></el-tree>

this.$nextTick(() => {
    let ele = deepFindTreeNodeDom(this.$refs.tree.$el);
    ele && ele.click();
})
```

## 12. _isEmpty 判断值是否为空 包含 null 、undefined、空数组、空对象、空字符串

```js
// 使用示例 返回 true 表示为空
console.log(_isEmpty([])); // true
console.log(_isEmpty([1])); // false
console.log(_isEmpty({})); // true
console.log(_isEmpty({a: 10})); // false
console.log(_isEmpty([null])); // true
console.log(_isEmpty([undefined])); // true
```

## 13. 关于浏览所有方法 all

```js
// 1. 获取页面滚动高度（兼容各种浏览器）
getScrollTop();

// 2. 获取视口宽高（兼容）
getViewportSize();

// 3. 注册事件监听器（兼容 IE）
addEvent(element, type, handler);

// 4. 移除事件监听器（兼容 IE）
removeEvent(element, type, handler)

// 5.  获取元素样式（兼容 IE）
getStyle(element, prop);

// 6. requestAnimationFrame 兼容处理
requestAnimFrame();

// 7. cancelAnimationFrame 兼容处理
cancelAnimFrame();

// 8. 判断浏览器是否支持某个 API / 属性
isSupport(feature);

// 9. 判断是否支持 ES6 箭头函数（间接判断 ES6）
isES6Supported();

// 10. 获取浏览器信息（简单版本）
getBrowserInfo();

// 11. 判断是否是移动端设备
isMobileDevice();

// 12.判断当前是否为触摸设备
isTouchDevice();

// 13. 获取兼容的全屏 API
requestFullscreen(el);

// 14. 退出全屏
exitFullscreen();

// 15. 判断是否处于全屏状态
isFullscreen();
```


## 14. 格式化时间 formatDate()（自定义格式）
```js
formatDate();
// 结果示例：2025-05-21 14:30:15

formatDate(new Date(), 'YYYY/MM/DD');
// 结果示例：2025/05/21

formatDate(new Date(), 'HH:mm:ss');
// 结果示例：14:30:15

formatDate(new Date(), 'YYYY年MM月DD日 HH时mm分ss秒');
// 结果示例：2025年05月21日 14时30分15秒

const myDate = new Date('2023-12-01T08:05:09');
formatDate(myDate, 'YYYY-MM-DD HH:mm:ss');
// 结果：2023-12-01 08:05:09
```


## 15.  只执行一次的函数 once()
```js
// 1. 
function sayHello(name) {
  console.log('Hello, ' + name);
  return 'Greeted ' + name;
}

const greetOnce = once(sayHello);

console.log(greetOnce('Alice')); // 输出：Hello, Alice\nGreeted Alice
console.log(greetOnce('Bob'));   // 无输出，返回：Greeted Alice

// 2. 
function initializeApp() {
  console.log('App initialized');
  return true;
}

const init = once(initializeApp);

init(); // 输出：App initialized
init(); // 无输出
init(); // 依然无输出

// 3. 
function fetchData() {
  console.log('Fetching data from server...');
  return { success: true, data: [1, 2, 3] };
}

const fetchOnce = once(fetchData);

console.log(fetchOnce()); // 输出：Fetching data from server...，返回数据
console.log(fetchOnce()); // 不再输出日志，返回第一次的结果


// 4. 
function add(a, b) {
  return a + b;
}

const addOnce = once(add);

console.log(addOnce(3, 4)); // 输出：7
console.log(addOnce(5, 6)); // 输出：7（第二次调用不生效，仍返回第一次结果）
```


## 16.  复制文本到剪贴板 copyToClipboard()
```js
// 1. 
<button onclick="copyToClipboard('Hello World!')">复制文字</button>

// 2. 
<input id="myInput" value="这是一段测试内容" />
<button onclick="copyToClipboard(document.getElementById('myInput').value)">复制输入内容</button>

// 3. 
async function handleCopy() {
  try {
    await copyToClipboard('复制成功的内容');
    alert('内容已复制到剪贴板');
  } catch (err) {
    alert('复制失败：' + err.message);
  }
}

document.getElementById('copyBtn').addEventListener('click', handleCopy);

// 4. 
<template>
  <button @click="copyText">复制 Vue 中的内容</button>
</template>

<script>
import { copyToClipboard } from './utils/clipboard'; // 假设你放在 utils 文件夹里

export default {
  methods: {
    async copyText() {
      try {
        await copyToClipboard('来自 Vue 的问候');
        this.$toast('复制成功！'); // 假设你有 toast 插件
      } catch (err) {
        console.error('复制失败', err);
      }
    }
  }
}
</script>
```


## 17.  数组按条件分组 groupBy()

```js

// 1. 示例 1：按对象属性分组
const users = [
  { name: 'Alice', age: 20 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 20 },
];

const groupedByAge = groupBy(users, 'age');
console.log(groupedByAge);

//  输出
{
  20: [
    { name: 'Alice', age: 20 },
    { name: 'Charlie', age: 20 }
  ],
  25: [
    { name: 'Bob', age: 25 }
  ]
}

// 2. 按字符串长度分组
const words = ['one', 'two', 'three', 'four', 'five'];

const groupedByLength = groupBy(words, word => word.length);
console.log(groupedByLength);

// 输出
{
  3: ['one', 'two'],
  5: ['three'],
  4: ['four', 'five']
}


// 3. 按数字是否为奇偶数分组
const numbers = [1, 2, 3, 4, 5, 6];

const groupedByEvenOdd = groupBy(numbers, n => (n % 2 === 0 ? 'even' : 'odd'));
console.log(groupedByEvenOdd);

// 输出
{
  odd: [1, 3, 5],
  even: [2, 4, 6]
}

// 4. 按首字母分组
const names = ['Alice', 'Adam', 'Bob', 'Brian', 'Charlie'];

const groupedByFirstLetter = groupBy(names, name => name[0]);
console.log(groupedByFirstLetter);


// 输出
{
  A: ['Alice', 'Adam'],
  B: ['Bob', 'Brian'],
  C: ['Charlie']
}
```

## 17. 下载文件 downloadFile()

```js
// 1. 下载远程图片
downloadFile('https://example.com/image.png', 'example.png');

// 2. 下载 Blob 文件（如生成的 PDF）
const blob = new Blob(['Hello world!'], { type: 'text/plain' });
downloadFile(blob, 'hello.txt');

// 下载 Base64 文件
const base64Data = 'data:text/plain;base64,SGVsbG8gd29ybGQh';
downloadFile(base64Data, 'hello.txt');
```


## 18 . 通用数组交集 deepIntersection(arr1, arr2) 和 deepDifference(arr1, arr2)

```js
const a = { id: 1 };
const b = { id: 2 };
const c = { id: 3 };
const d = { id: 1 };

const arr1 = [1, 'a', a, b, [1, 2], { id: 3 }];
const arr2 = ['a', 2, d, c, [1, 2]];

console.log('交集:', deepIntersection(arr1, arr2));
console.log('差集:', deepDifference(arr1, arr2));

```

## 19.  通用的“首字母大写”函数

```js
// 标准版：单个单词首字母大写
capitalize("hello WORLD");           // "Hello"

// 扩展版：每个单词首字母都大写（Title Case）
capitalizeWords("hello WORLD test"); // "Hello World Test"

// 高级版：支持 Unicode、标点、特殊分隔符
smartCapitalize("l'été d'amour");    // "L'Été D'Amour"
smartCapitalize("hello-world");      // "Hello-World"

```

## 20. 是否为 URL

```js
isValidUrl('https://example.com');           // true
isValidUrl('http://localhost:3000/test');    // true
isValidUrl('ftp://192.168.0.1/file.txt');    // true
isValidUrl('/relative/path');                // false
isValidUrl('/relative/path', { allowRelative: true }); // true
isValidUrl('example.com');                   // false
isValidUrl('//example.com', { requireProtocol: false }); // true


// | 功能                 | 默认行为 | 可配置                     |
// | ------------------ | ---- | ----------------------- |
// | 必须包含协议             | ✅ 是  | ✅ 可禁用 `requireProtocol` |
// | 支持 IP、localhost、域名 | ✅ 是  |                         |
// | 支持带端口、路径、参数        | ✅ 是  |                         |
// | 支持相对路径             | ❌ 否  | ✅ 可启用 `allowRelative`   |
// | 支持 `//example.com` | ❌ 否  | ✅ 可允许无协议                |

```

## 21. deepUnique 「数组去重」函数

```js
// | 功能             | 说明                                                                    |
// | -------------- | --------------------------------------------------------------------- |
// | ✅ 支持基本类型       | `number`, `string`, `boolean`, `null`, `undefined`, `NaN`, `Symbol` 等 |
// | ✅ 支持对象、数组、嵌套结构 | `{ id: 1 }`, `[1, 2, [3]]` 等深层结构                                      |
// | ✅ 支持循环引用对象     | 使用 `WeakSet` 避免递归死循环                                                  |
// | ✅ 支持自定义去重依据    | 如根据对象字段去重（`item.id`）或自定义函数                                            |
// | ✅ 保持原始顺序       | 结果中元素顺序和原数组一致                                                         |



//  使用示例

deepUnique([1, 2, 2, 'a', 'a', NaN, NaN, { a: 1 }, { a: 1 }, [1, 2], [1, 2]]);
// => [1, 2, 'a', NaN, { a: 1 }, [1, 2]]


// 按字段去重
const users = [
  { id: 1, name: 'Tom' },
  { id: 2, name: 'Jerry' },
  { id: 1, name: 'Tommy' },
];

deepUnique(users, 'id');
// => [{ id: 1, name: 'Tom' }, { id: 2, name: 'Jerry' }]


// 使用函数作为规则
deepUnique(users, user => `${user.id}-${user.name.length}`);
// 例如：根据 id + 名字长度去重

```


## 22. truncateString 按字符数裁剪 + 添加省略号

```js
truncateString('The quick brown fox jumps over the lazy dog', 20);
// => 'The quick brown f...'

truncateString('你好，这是一个测试用例', 8);
// => '你好，这是...'

truncateString('The quick brown fox jumps', 20, { preserveWords: true });
// => 'The quick brown...'

truncateString('这是一个中文的测试句子', 10, { ellipsis: '...' });
// => '这是一个中文的...'
```

## 23. truncateByVisualWidth 考虑字符宽度（中英文混排）

```js
truncateByVisualWidth('中英混排 Hello 世界', 10);
// => '中英混排 H...'

truncateByVisualWidth('你好吗123456', 8);
// => '你好吗12...'
```

## 24. 大整数 相加 保持精度 bigIntAdd,bigIntSubtract, bigIntMultiply, bigIntDivide

```js 
console.log(bigIntAdd('-9999999999999999999', '9999999999999999999')); // "0"   高精度加法（含负数）
console.log(bigIntSubtract('1000000000000', '999999999999'));           // "1" 高精度减法（含负数）
console.log(bigIntMultiply('-123456789', '1000000000000'));            // "-123456789000000000000"  高精度乘法（含负数）
console.log(bigIntDivide('99999999999999999999', '3'));                // "33333333333333333333"  高精度整数除法（返回商，不含小数）
```

## 25. 获取 window 滚动位置的通用方法 和 获取任意滚动容器的滚动位置

```js
// 页面滚动位置
console.log(getScrollPosition()); 
// {scrollLeft: ..., scrollTop: ...}

// 某个滚动元素
const container = document.querySelector('.scroll-container');
console.log(getScrollPosition(container));

```

## 26. 通用的滚动到顶部方法，兼容各种浏览器，支持传入目标元素（默认为 window），还支持可选的平滑滚动动画。

```js
// 滚动整个页面到顶部（瞬间）
scrollToTop();

// 滚动整个页面到顶部（平滑滚动）
scrollToTop(window, true);

// 滚动指定元素到顶部
const div = document.querySelector('.scroll-container');
scrollToTop(div, true);
```

## 27. 获取元素位置和尺寸

```js
const el = document.querySelector('.my-element');
const pos = getElementPosition(el);
console.log(`元素左上角坐标：(${pos.left}, ${pos.top})`);
console.log(`元素尺寸：宽=${pos.width}px 高=${pos.height}px`);
```

## 28. 加密 解密 函数

```js
let reson = _enciphered("你好"); // 加密函数
let result = _decrypt(reson); // 解密函数
```


## 29. _retryAsync 异步重试函数

``` js
// ✅ 最大重试次数

// ✅ 指数退避机制

// ✅ 条件判断是否继续重试

// ✅ onRetry 回调通知

// ✅ 取消机制（中止重试）

// ✅ 超时机制（每次请求超时中止）

const controller = new AbortController();

retryAsync(
  () =>
    fetch('https://xxxxx.com/api', {
      signal: controller.signal,
    }),
  {
    retries: 5,
    delay: 500,
    timeout: 3000, // 每次超时时间
    exponentialBackoff: true,
    signal: controller.signal,
    onRetry: (err, attempt) => {
      console.log(`第 ${attempt} 次尝试失败：`, err.message);
    },
  }
).catch(console.error);

// 可手动取消
setTimeout(() => {
  controller.abort();
  console.warn('已手动中止重试流程');
}, 5000);

```