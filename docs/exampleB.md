# 假装是一个功能

> 假装是功能的描述

## IFeature

> 假装一个 feature

### X
> 埃克斯

```ts
(string | number | symbol)
```

#### 注意

大杂烩（这是一个特殊 @ 标签）

---

### Y
> <b>Description</b>

```ts
IENUM
```

#### 注意

提醒

---

## IFunction

### A()
> 功能 A

```ts
(a?: IFeature) => void
```
<table>
<tr>
<th>参数名</th>
<th>描述</th>
</tr>
<tr>
<td>a</td>
<td>功能 A 入参</td>
</tr>
</table>

#### 返参解释

无

#### 示例

```ts
A();
```

---

### B()
> 功能 B

```ts
(callback: (param: string) => void) => void
```
<table>
<tr>
<th>参数名</th>
<th>描述</th>
</tr>
<tr>
<td>callback</td>
<td>回调函数</td>
</tr>
</table>

#### 返参解释

无

#### 示例

```ts
B((param) => console.log("-> %s"， param));
```

---

## IENUM enum

| enum key | enum value | 描述 |
| :----: | :----: | ------ |
| E | "e" |  |
| Q | "q" |  |
| R | "r" |  |
| W | "w" |  |

*这是一个枚举*

---

