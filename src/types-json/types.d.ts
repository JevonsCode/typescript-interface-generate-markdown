/**
 * 针对不同写法 查漏补缺
 * 
 * @description All JSON 类型
 */


interface ICommon {
  id?: number
  name?: string
  kind?: number
  flags?: {
    /**
     * 是否可选 "?"
     */
    isOptional?: boolean
    /**
     * 只读
     */
    isReadonly?: boolean
    isConst?: boolean
  }
}

interface ISource {
  fileName: string
  line: number
  /**
   * 第几个字符
   */
  character: number
}

export interface IJSON extends ICommon {
  originalName?: string
  children?: IModule[]
  groups?: unknown
}

/**
 * 模块 type
 */
interface IModule extends ICommon {
  kindString: "Module"
  /**
   * 模块下可以 是 interface 或 枚举(enum) 的 type
   * 
   * @description 如果没有说明只写了一段空注释
   */
  children?: (IEnumeration | IInterface | IFunction | ITypeAlias | IVariable)[]
  groups?: unknown
  sources?: ISource[]
}

interface IComment {
  shortText?: string
  tags?: {
    tag: string
    text?: string
    /**
     * @ param 参数常量名
     */
    param?: string
  }[]
}

/**
 * 枚举 type
 */
interface IEnumeration extends ICommon {
  /**
   * 枚举类型
   */
  kindString: "Enumeration"
  comment?: IComment
  /**
   * 枚举中的值 (Array)
   */
  children: IEnumerationMember[]
  groups: unknown
  sources: ISource[]
}

/**
 * 枚举 item type
 */
interface IEnumerationMember extends ICommon {
  kindString: "Enumeration member"
  comment?: IComment
  sources: ISource[]
  /**
   * 枚举值 (value)
   */
  defaultValue: string
}

interface IFunction extends ICommon {
  kindString: "Function"
  comment?: IComment
  signatures?: ISignature[]
  sources: ISource[]
}

interface ITypeAlias extends ICommon {
  kindString: "Type alias"
  comment?: IComment
  sources: ISource[]
  type: IAll_Type
}

interface IVariable extends ICommon {
  kindString: "Variable"
  comment?: IComment
  type: IType_reference
  defaultValue?: string
  groups?: unknown
  sources?: ISource[]
}

/**
 * Interface 类型
 */
interface IInterface extends ICommon {
  /**
   * Interface 类型
   */
  kindString: "Interface"
  /**
   * 有可能没有注释
   */
  comment?: IComment
  children?: IProperty[]
  groups?: unknown
  sources?: ISource[]
  /**
   * 被集成   [A] extends B
   */
  extendedBy?: IType_reference[]
  /**
   * 继承于   A extends [B]
   */
  extendedTypes?: IType_reference[]
  /**
   * 类型传参
   */
  typeParameter?: ITypeParameter[]
}

interface ITypeParameter extends ICommon {
  kindString: "Type parameter"
  default: IType_intrinsic
}

/**
 * Property 类型
 */
interface IProperty extends ICommon {
  kindString: "Property"
  /**
   * Property 注释
   */
  comment?: IComment
  sources: ISource[]
  type: IType_reflection | IType_reference | IType_intrinsic | IType_array | IType_union | IType_literal
  inheritedFrom?: IType_reference
}

interface ISignature extends ICommon {
  kindString: "Call signature"
  parameters?: IParameter[]
  type: IType_intrinsic | IType_reference
}

interface IParameter extends ICommon {
  /**
   * 方法的入参
   */
  kindString: "Parameter"
  type: IType_intrinsic | IType_reflection | IType_reference | IType_array | IType_union
}

interface IDeclaration extends ICommon {
  kindString: "Type literal"
  signatures?: ISignature[]
  groups?: unknown
  children?: any
}

/**
 * 固定值 Type
 */
interface IType_intrinsic {
  /**
   * 固定值
   */
  type: "intrinsic"
  name: string
}

interface IType_reflection {
  type: "reflection"
  declaration: IDeclaration
}

interface IType_array {
  type: "array"
  elementType: IType_reference | IType_intrinsic | IType_union
}

interface IType_union {
  /**
   * type1 | type2 | type3
   */
  type: "union"
  types: (IType_literal | IType_intrinsic | IType_array | IType_reference)[]
}
interface IType_literal {
  /**
   * 文字类型
   */
  type: "literal"
  value: string
}

interface IType_reference {
  type: "reference"
  id?: number
  name: string
  /**
   * 类型参数
   */
  typeArguments?: (IType_reference | IType_intrinsic | IType_array)[]
}

/**
 * 出现的所有 type
 */
type IAll_Type = IType_reference | IType_intrinsic | IType_array | IType_reflection | IType_union | IType_literal;