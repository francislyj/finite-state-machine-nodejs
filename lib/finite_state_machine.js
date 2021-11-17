// Copyright 2021 Yijun Liu <francislyj@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.


/**
 * 有限状态机
 * */
class FiniteStateMachine {

  /**
   * @Params initState: 初始状态
   * @Params states: {state:    //state
   *                    {onEnter,  // 进入状态行为
   *                     onExit,  // 退出状态行为
   *                     events: {event:  // event
   *                                {target, // target state
   *                                action  // 处于状态行为
   *                                }}}}
   * */
  constructor(initState, states) {
    this.currentState = initState;
    this.states = states;
  }

  current(){
    return this.currentState;
  }

  transition(event){
    const currentStateData = this.states[this.currentState];
    const currentStateEvents = currentStateData.events;
    const eventData = currentStateEvents[event];
    if(!eventData){
      return;
    }

    const targetState = eventData.target;
    const targetStateData = this.states[targetState];

    eventData.action();
    currentStateData.onExit();
    targetStateData.onEnter();
    this.currentState = targetState;
    console.log(`current state is ${this.current()}`);
  }
}

module.exports = {
  FiniteStateMachine
};
