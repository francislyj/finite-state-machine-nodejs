// Copyright 2021 Yijun Liu <francislyj@gmail.com>. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const { FiniteStateMachine } = require('./index');



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
const machine = new FiniteStateMachine(
  'start',
  {
    // 开始
    start: {
      onEnter: function (){
        console.log('start on enter');
      },
      onExit: function (){
        console.log('start on exit');
      },
      events: {
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
    },

    // 结算汇款
    settlementRemittance: {
      onEnter: function (){
        console.log('settlementRemittance on enter');
      },
      onExit: function (){
        console.log('settlementRemittance on exit');
      },
      events: {
        remittanceSuccess: {
          target: 'finish',
          action: function (){
            console.log('action: remittance success');
          }
        },
        remittanceFailed: {
          target: 'remittanceRetry',
          action: function (){
            console.log('action: remittance failed')
          }
        }
      }
    },


    // 人工审核
    manualReview: {
      onEnter: function (){
        console.log('manualReview on enter');
      },
      onExit: function (){
        console.log('manualReview on exit');
      },
      events: {
        manualReviewSuccess: {
          target: 'settlementRemittance',
          action: function (){
            console.log('action: manualReview success');
          }
        },
        manualReviewFailed: {
          target: 'executeRefund',
          action: function (){
            console.log('action: manualReview failed')
          }
        }
      }
    },


    // 汇款重试
    remittanceRetry: {
      onEnter: function (){
        console.log('remittanceRetry on enter');
      },
      onExit: function (){
        console.log('remittanceRetry on exit');
      },
      events: {
        remittanceRetryYes: {
          target: 'settlementRemittance',
          action: function (){
            console.log('action: manualReview success');
          }
        },
        remittanceRetryNo: {
          target: 'flagQuestion',
          action: function (){
            console.log('action: manualReview failed')
          }
        }
      }
    },

    // 执行退款
    executeRefund: {
      onEnter: function (){
        console.log('executeRefund on enter');
      },
      onExit: function (){
        console.log('executeRefund on exit');
      },
      events: {
        refundSuccess: {
          target: 'finish',
          action: function (){
            console.log('action: refund success');
          }
        },
        refundFailed: {
          target: 'refundRetry',
          action: function (){
            console.log('action: refund failed')
          }
        }
      }
    },

    // 退款重试
    refundRetry: {
      onEnter: function (){
        console.log('refundRetry on enter');
      },
      onExit: function (){
        console.log('refundRetry on exit');
      },
      events: {
        refundRetryYes: {
          target: 'executeRefund',
          action: function (){
            console.log('action: refund retry yes');
          }
        },
        refundRetryNo: {
          target: 'flagQuestion',
          action: function (){
            console.log('action: refund retry no')
          }
        }
      }
    },


    // 结束
    finish: {
      onEnter: function (){
        console.log('finish on enter');
      },
      onExit: function (){
        console.log('finish on exit');
      },
      events: {
      }
    },
  });


console.log(`current state is ${machine.current()}`);
// 人工审核
machine.transition('needManualReview')
// 通过人工审核
machine.transition('manualReviewSuccess')
// 汇款失败
machine.transition('remittanceFailed')
// 确认重试
machine.transition('remittanceRetryYes')
// 汇款成功
machine.transition('remittanceSuccess')


