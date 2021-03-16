# 示例

> 这时一段示例的描述

## IExample

### demo()
> DEMO desc

```ts
() => Promise<State>
```

#### 返参解释

#### 示例

```ts
demo().then((v) => {        console.log(v)    });
```

---

### demoChange()
> 改变 DEMO

```ts
(callback: (v: State) => void) => number
```
<table>
<tr>
<th>参数名</th>
<th>描述</th>
</tr>
<tr>
<td>callback</td>
<td>回调</td>
</tr>
</table>

#### 返参解释

DEMO 数字

#### 示例

```ts
let mock = demoChange((callback: State) => {        console.log(callback)    });
```

---

### demoStatus()
> DEMO 状态

```ts
(v: (number | IExample)) => void
```
<table>
<tr>
<th>参数名</th>
<th>描述</th>
</tr>
<tr>
<td>v</td>
<td>入参</td>
</tr>
</table>

#### 返参解释

无

#### 示例

```ts
demoStatus(v);
```

---

## State $^{enum}$
> 枚举的 Exp

| enum key | enum value | 描述 |
| :----: | :----: | ------ |
| STATUS | "status" | > STATUS 的描述 |
| WHAT | "what" | > WHAT？ |

---

