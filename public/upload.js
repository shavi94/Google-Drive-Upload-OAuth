$(document).ready(function(){
    

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const redirect_uri = "http://localhost:9000/upload";
    const client_secret = "kOX6H2uv2TbY179al0-vVUe8";
    const scope = "https://www.googleapis.com/auth/drive";
    var client_id = "1097111234281-rjuhjmudrolodiajoud6tbrvjg2igpcj.apps.googleusercontent.com";
    

    $.ajax({
        type: 'POST',
        url: "https://www.googleapis.com/oauth2/v4/token",
        data: {code:code
            ,redirect_uri:redirect_uri,
            client_secret:client_secret,
        client_id:client_id,
        scope:scope,
        grant_type:"authorization_code"},
        dataType: "json",
        success: function(resultData) {
           
           localStorage.setItem("accessTkn",resultData.access_token);
           localStorage.setItem("refreshTkn",resultData.refresh_token);
           localStorage.setItem("expires_in",resultData.expires_in);
           window.history.pushState({}, document.title, "/upload");   
           
        }
  });  

    var Upload = function (file) {
        this.file = file;
    };
    
    Upload.prototype.getName = function() {
        return this.file.name;
    };
    Upload.prototype.doUpload = function () {
        var that = this;
        var fd = new FormData();
    
        fd.append("file", this.file, this.getName());
        fd.append("upload_file", true);
    
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessTkn"));
                
            },
            url: "https://www.googleapis.com/upload/drive/v2/files",
            data:{
                uploadType:"media"
            },
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            success: function (data) {
                console.log(data);
                swal("Data saved in drive!", "", "success")
                .then((value) => {
                    
                });
            },
            error: function (error) {
                console.log(error);
            },
            async: true,
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000
        });
    };

    $("#upload").on("click", function (e) {
        var file = $("#files")[0].files[0];
        var upload = new Upload(file);
   
        upload.doUpload();
    });

});