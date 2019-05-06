/**
 * 接口请求地址
 * created by bo.peng 2018/4/18
 * email:spion@qq.com
 */
const APP = "http://Api4.jianyicp.com";
//const APP = "http://devapi.jianyicp.com";
const API = {
    //所有签到信息
    user_guoqin_list : APP+"/user/user_guoqin_list",
    //发起签到
    user_guoqin_add : APP+"/user/user_guoqin_add",
    //投资信息
    user_guoqin_ticket : APP+"/user/user_guoqin_ticket"
};
export default API;
