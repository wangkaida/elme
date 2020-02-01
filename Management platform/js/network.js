var baseUrl = "http://127.0.01:3000";

function getDataByGet(url,data,callback){
    mui.ajax(baseUrl+url,{
     data:data,
     dataType:"json",
     type:"get",
     success:function(data){
        callback(data);
     }
    })
}





function getDataByPost(url,data){

}