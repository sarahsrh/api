//window.onload=function(){
    /* some code */
    function getResultValue(value){
        var result = value;
        if(value == ''){
            result = 'unknown';
        }
        return result;
    }
    function collectDataEntity(entity){
        getDataTechnology(entity, false)
    }
    
    function pushTransaction(entity, transaction){
        getDataTechnology(entity, transaction)
    }
       
    
    //get data technology
    function getDataTechnology(entity, segmentAdditional){
        var xhr = new XMLHttpRequest();
        var url = "https://api.ipregistry.co/?key=tt3ce8olacauvp";
    
        xhr.open('GET', url, true);
        xhr.send();
        xhr.responseType = 'json';
        xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            data = xhr.response;
    
            if(segmentAdditional == false ){
                entity["transactionId"] = "not set";
                entity["totalItem"] = "not set";
                entity["revenue"] = "not set";
    
            }else{
                entity["transactionId"] = segmentAdditional.transactionId;
                entity["totalItem"] = segmentAdditional.totalItem;
                entity["revenue"] = segmentAdditional.revenue;
    
            }
    
            trackEvent(data, entity);
            }
        }        
    }
    
    function trackEvent(data,entity){
        var dataEntity = {
            //technology
            'device':data.user_agent.device.type,
            'os':data.user_agent.os.name,
            'browser':data.user_agent.name,
            'provider':data.carrier.name,
            'ipAddress':data.ip,
            'cookieGA':getCookie('_ga'),
            'tuid':'unknown',
            'guid':'unknown',
            'tdid':getCookie('TDID'),
            'campaignId':entity.campaignId,
                    
            //entity user
            'email':entity.email,
            'phone':entity.phone,
            'age':entity.age,
            'type':entity.type,
            'gender':entity.gender,
            'city':data.location.region.name,
            'country':data.location.country.name,
        
            //page
            'page':window.location.href,
            'title':document.title,
            'section':entity.section,
            'category':entity.category,
            'clientId':entity.clientId,
    
            //transaction
            'transactionId':entity.transactionId,
            'totalItem':entity.totalItem,
            'revenue':entity.revenue
    
        }
         retrieveCustomerDataCollection(dataEntity)
    }
    
    function retrieveCustomerDataCollection(dataEntity){
        var xhr = new XMLHttpRequest();
        var url = "https://c40e0c30-b354-450c-8546-53cc5a0a0d8a.mock.pstmn.io/test?log_data="+JSON.stringify(dataEntity);
    
        xhr.open('GET', url, true);
        xhr.send();
        xhr.responseType = 'json';
        xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            data = xhr.response;
            }
        }
    } 
    
    //};
    
    //dynamicallyLoadScript('https://oneanalytics.github.io/plugins/vendor_new/custom-script/cookie.js')
    
    /*function dynamicallyLoadScript(url) {
            var script = document.createElement("script");  // create a script DOM node
            script.src = url;  // set its src to the provided URL
        
            document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    }*/
    
    function setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
                }
            }
            return "";
    }
    
    function guid() {
        var guid = '';
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        guid = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      
        return guid;
    }
    
    function getUser(){
        var user = '';
        var url = new URL(window.location.href);
        if( url.searchParams.get("user") != null){
            user = url.searchParams.get("user");
        }
        return user;
    }
    
    