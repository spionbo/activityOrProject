/**
 * desc:
 * created by bo.peng 2018/9/24.
 * email:spion@qq.com
 */
import API from "../contant/urls/URLS";

const Mock = require("mockjs");
Mock.mock(API.user_guoqin_list,"get",{
    "mock":"immock",
    "ret": 0,
    "response": {
        "message": "success",
        "data": {
            "list": [
                {
                "day": "20180923", //#日期
                "check": true, //#是否可点签到
                "num": 100 //#签到积分
                },
                {
                    "day": "20180924",
                        "check": false,
                        "num": 100
                },
                {
                    "day": "20180925",
                        "check": false,
                        "num": 100
                },
                {
                    "day": "20180926",
                        "check": false,
                        "num": 100
                },
                {
                    "day": "20180927",
                        "check": false,
                        "num": 500
                }
            ]
        }
    },
    "benchmark": 0
})
