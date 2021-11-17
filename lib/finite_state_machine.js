// Copyright 2021 Yijun Liu <francislyj@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

/**
 * 创建状态机
 * @Params definitionData 状态机定义参数 {
 *   initState:
 * }
 * */
function createStateMachine(definitionData){

}


/**
 * state:
 *
 * start -> 开始
 * settlementRemittance -> 结算汇款
 * manualReview -> 人工审核
 * remittanceRetry -> 汇款重试
 * executeRefund -> 执行退款
 * refundRetry -> 退款重试
 * flagQuestion -> 标记问题
 * finish -> 结束
 * */
const machine = createStateMachine({
  initState: 'start',

  start: {
    actions: {
      onEnter: function (){
        console.log('start on enter');
      },
      onExit: function (){
        console.log('start on exit');
      }
    },
    transitions: {
      needManualReview: {
        target: 'manualReview',
        action: function (){
          console.log('action: need manual review');
        }
      },
      noNeedManualReview: {
        target: 'settlementRemittance',
        action: function (){
          console.log('action: no need manual review')
        }
      }
    }
  }

});