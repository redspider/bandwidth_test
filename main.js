$(function () {
    console.log("Registering");

    function printBps(bps) {
        if (bps < 1024) {
            return Math.floor(bps) + 'B/s';
        }
        if (bps < (10*1024*1024)) {
            return Math.floor(bps/(1024)) + 'KB/s';
        }
        return Math.floor(bps/(1024*1024)) + 'MB/s';
    }

    function printB(bps) {
        if (bps < 1024) {
            return Math.floor(bps) + 'B';
        }
        if (bps < (10*1024*1024)) {
            return Math.floor(bps/(1024)) + 'KB';
        }
        return Math.floor(bps/(1024*1024)) + 'MB';
    }

    $('button.start-test').click(function () {
        var bandwidthTest = new BandwidthTest();

        bandwidthTest.downloadProgress = function (b, bps, percentage) {
            $('.test.download .progress .bar').width($('.test.download .progress').width() * (percentage/100));
            $('.test.download .bps').text(printB(b) + ' at ' + printBps(bps));
        };
        bandwidthTest.uploadProgress = function (b, bps, percentage) {
            $('.test.upload .progress .bar').width($('.test.download .progress').width() * (percentage/100));
            $('.test.upload .bps').text(printB(b) + ' at ' + printBps(bps));
        };
        bandwidthTest.downloadComplete = function () {
            bandwidthTest.startUpload();
        };
        bandwidthTest.uploadComplete = function () {
        };
        bandwidthTest.startDownload();
    });
});