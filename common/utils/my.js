
import http from './http'
 
const AUTH_TOKEN = "token";
 
// 本地地址
// http.setBaseUrl("http://localhost:8080/smartp/");
// 测试服务器地址
http.setBaseUrl("http://sutongiot.com/");
// http.header['comp'] = "cjx913"
http.header['content-type'] = 'application/x-www-form-urlencoded';
if (uni.getStorageSync(AUTH_TOKEN)) {
    http.header[AUTH_TOKEN] = uni.getStorageSync(AUTH_TOKEN);
}
 
http.beforeResponseFilter = function (res) {
    //X-Auth-Token
    if (res.header) {
        var respXAuthToken = res.header[AUTH_TOKEN.toLocaleLowerCase()];
        if (respXAuthToken) {
            uni.setStorageSync(AUTH_TOKEN, respXAuthToken);
            http.header[AUTH_TOKEN] = respXAuthToken;
        }
    }
    return res;
}
 
let my = {
    'http': http
}
export default my