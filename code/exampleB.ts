/**
 * @name 假装是一个功能
 * @desc 假装是功能的描述
 */
export interface IFunction {
  /**
   * @desc 功能 A
   * @param a 功能 A 入参
   * @return 无
   * @example
   *      A();
   */
  A: (a?: IFeature) => void;

  /**
   * @desc 功能 B
   * @param callback 回调函数
   * @return 无
   * @example
   *      B((param) => console.log("-> %s"， param));
   */
  B: (callback: (param: string) => void) => void;
}

/**
 * @desc 假装一个 feature
 */
export interface IFeature {
  /**
   * @desc 埃克斯
   * @tips 大杂烩（这是一个特殊 @ 标签）
   */
  X?: number | string | null | symbol;

  /**
   * @desc <b>Description</b>
   * @tips 提醒
   */
  Y?: IENUM;
}

/**
 * 这是一个枚举
 */
export enum IENUM {
  Q = "q",
  W = "w",
  E = "e",
  R = "r",
}
