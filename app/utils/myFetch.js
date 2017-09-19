
export default class myFetch{

    static rootUrl = 'http://115.236.94.196:30005/app'
    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static get(url,params,callback,ecallback){
        if (params) {
            let paramsArray = []
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        fetch(this.rootUrl+url,{
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            callback(responseJSON)
        })
        .catch(err=>ecallback(err))
    }
    /*
     *  post请求
     *  url:请求地址
     *  body:参数字符串
     *  callback:回调函数
     * */
    static post(url,body,callback,ecallback){
        //fetch请求
        fetch(this.rootUrl+url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            callback(responseJSON)
        })
        .catch(err=>ecallback(err))
    }
}