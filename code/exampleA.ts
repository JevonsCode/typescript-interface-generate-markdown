/**
 * @name 示例
 * @desc 这时一段示例的描述
 */
export interface IExample {
  /**
   * @desc DEMO desc
   * @return {Promise<AppStateType>}
   * @example
   *      demo().then((v) => {
   *          console.log(v)
   *      });
   */
  demo: () => Promise<State>;
  /**
   * @desc 改变 DEMO
   * @param callback 回调
   * @return DEMO 数字
   * @example
   *      let mock = demoChange((callback: State) => {
   *          console.log(callback)
   *      });
   */
  demoChange: (callback: (v: State) => void) => number;
  /**
   * @desc DEMO 状态
   * @param v 入参
   * @return 无
   * @example
   *      demoStatus(v);
   */
  demoStatus: (v: number | IExample) => void;
}

/**
 * @desc 枚举的 Exp
 */
export enum State {
  /**
   * @desc STATUS 的描述
   */
  STATUS = "status",

  /**
   * @desc WHAT？
   */
  WHAT = "what",
}
