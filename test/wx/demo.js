var WXBizDataCrypt = require('./WXBizDataCrypt')

var appId = 'wxbc4ee34494150e2e';
var sessionKey = 'tSmXJusTlKJZqUo72A1PfA==';
var encryptedData ='SP9h5B1vl5Ip6TvY5GUWV1989HYOod2rpGiv5bDRT/12E3JcDtpwERzNN6CZznNyylp4U7H+YuF4TlN+t3be8/WjTPBZbVcwFWaq9xez45RI2DH23u7Vt4+cnFUFAx7NnBb3pd+XwDWykQb/1+08pnNE4M+s/24VaDdP5KBS8XNgqvQHwu0aNLMKOx3jd5FcRrPIYVwlw+eJVJLX0P8SUg==';
var iv = 'OA3KUWR5kzV694dC5HGU7A==';

var pc = new WXBizDataCrypt(appId, sessionKey)

var data = pc.decryptData(encryptedData , iv)

console.log('解密后 data: ', data)
// 解密后的数据为
//
// data = {
//   "nickName": "Band",
//   "gender": 1,
//   "language": "zh_CN",
//   "city": "Guangzhou",
//   "province": "Guangdong",
//   "country": "CN",
//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
//   "watermark": {
//     "timestamp": 1477314187,
//     "appid": "wx4f4bc4dec97d474b"
//   }
// }
