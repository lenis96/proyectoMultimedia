var exports=module.exports={};
exports.isContact=function(user,contacts){
    var ans=false;
    for(var i=0;i<contacts.length;i++){
        if(contacts[i]==user){
            ans=true;
            i=contacts.length;
        }
    }
    return ans;
}
