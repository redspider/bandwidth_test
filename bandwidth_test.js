var BandwidthTest = (function () {
    "use strict";

    var Module = {
        downloadPaths: {
            '256': 'http://raven.redspider.co.nz/l4d2/file_256.z',
            '2048': 'http://raven.redspider.co.nz/l4d2/file_2048.z'
        },
        downloadProgress: function (bps, percentage) {
            console.log("Download",bps,percentage);
        },
        uploadProgress: function (bps, percentage) {
            console.log("Upload",bps,percentage);
        },
        downloadComplete: function () {},
        uploadComplete: function () {},
        startDownload: function () {
            var xhr = new XMLHttpRequest();
            var start = new Date();
            var bt = this;
            xhr.open('GET',this.downloadPaths['2048'] + '?' + Math.random()*1000000,true);
            // xhr.responseType = 'blob';
            xhr.addEventListener('progress', function (e) {
                var time = (new Date() - start);
                var bps = e.loaded / (time/1000);
                bt.downloadProgress(e.loaded, bps, (e.loaded / e.totalSize)*100);
            });
            xhr.addEventListener('load', function (e) {
                bt.downloadComplete();
            });
            xhr.send();
        },
        uploadPath: 'http://raven.redspider.co.nz/l4d2/test.php',
        startUpload: function () {
            var fakefile = new ArrayBuffer(2*1024*1024);
            var xhr = new XMLHttpRequest();
            var start = new Date();
            var bt = this;
            xhr.open('POST',this.uploadPath,true);
            // xhr.responseType = 'blob';
            xhr.upload.addEventListener('progress', function (e) {
                var time = (new Date() - start);
                var bps = e.loaded / (time/1000);
                bt.uploadProgress(e.loaded, bps, (e.loaded / e.totalSize)*100);
            });
            xhr.upload.addEventListener('load', function (e) {
                bt.uploadComplete();
            });
            xhr.send(fakefile);
        }
    };

    return Module;
});