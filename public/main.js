$(document).ready(function(){
     
    var clientId = "1097111234281-rjuhjmudrolodiajoud6tbrvjg2igpcj.apps.googleusercontent.com";

    var redirect_uri = "http://localhost:9000/upload";

    var scope = "https://www.googleapis.com/auth/drive";

    var newUrl = "";


    $("#login").click(function(){

        newUrl = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+redirect_uri
        +"&prompt=consent&response_type=code&client_id="+clientId+"&scope="+scope
        +"&access_type=offline";
 
        window.location = newUrl;

    });

});