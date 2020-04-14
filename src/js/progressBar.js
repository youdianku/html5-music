(function($, root){
    var $body = $(document.body);
    var frameId;
    var totalTime;
    var startTime;
    var lastPercent = 0;
    function formatTime(duration){
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration % 60;
        if(minute < 10){
            minute = '0' + minute;
        }
        if(second < 10){ 
            second = '0' + second;
        }
        return minute + ':' + second;
    }
    // 渲染总时间
    function renderTime(duration) {
        // 切换歌曲 清空记录
        lastPercent = 0;
        totalTime = duration
        var time = formatTime(duration);
        $body.find('.all-time').text(time)
    }
    // 开启动画
    function startAnimation(percentage) {
        // 拖动进度条 接收进度百分比
        lastPercent = percentage === undefined ? lastPercent : percentage;
        // 开始前清除上一个animation
        cancelAnimationFrame(frameId);
        // 开始时间
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var percent = lastPercent + (curTime - startTime) / (totalTime * 1000);
            if(percent < 1){
                frameId = requestAnimationFrame(frame);
                updateTimeAndAnimation(percent)
            }else{
                cancelAnimationFrame(frameId);
            }
        }
        frame();
    }
    // 暂停动画
    function stopAnimation(){
        // 记录暂停时间，计算已经播放的百分比，在重新开始的时候加上，再暂停再开始要重新记录lastPercent
        var stopTime = new Date().getTime();
        lastPercent = lastPercent + (stopTime - startTime) / (totalTime * 1000);
        cancelAnimationFrame(frameId);
    }
    // 更新当前时间和进度条
    function updateTimeAndAnimation(percent){
        var curTime = formatTime(percent * totalTime);
        $body.find('.cur-time').text(curTime)
        var percentage = (percent - 1) * 100 + '%';
        $body.find('.prog-top').css({
            transform: `translateX(${percentage})`
        })
    }
    root.progressBar = {
        renderTime: renderTime,
        startAnimation: startAnimation,
        stopAnimation: stopAnimation,
        updateTimeAndAnimation: updateTimeAndAnimation,
    }
})(window.Zepto, window.player || (window.player = {}))