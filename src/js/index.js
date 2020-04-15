var $ = window.Zepto;
var root = window.player;
var $body = $(document.body);
var controlIndex;
var dataList;
var audioManagement = new root.AudioManagement();
function bindClick() {
    $body.on('play:change', function(e, index, flag){
        audioManagement.setAudioSource(dataList[index].audio);
        if(audioManagement.status == 'play' || flag){
            audioManagement.play();
            // 在播放中 切换歌曲，重新开启动画
            root.progressBar.startAnimation();
        }
        root.render(dataList[index]);
        // 渲染总时间
        root.progressBar.renderTime(dataList[index].duration);
        // 切换歌曲 重新计算时间、清空lastPercent记录
        root.progressBar.updateTimeAndAnimation(0);
    })
    // 上一首
    $body.on('click', '.prev-btn', function(){
        alert('prev')
        var index = controlIndex.prev();
        $body.trigger('play:change', index);
    })
    // 下一首
    $body.on('click', '.next-btn', function(){
        alert('next')
        var index = controlIndex.next();
        $body.trigger('play:change', index);
    })
    // 播放/暂停
    $body.on('click', '.play-btn', function(){
        alert('play')
        if(audioManagement.status == 'play'){
            root.progressBar.stopAnimation();
            audioManagement.pause();
        }else{
            root.progressBar.startAnimation();
            audioManagement.play();
        }
        $(this).toggleClass('pause')
    })
    // 歌单列表
    $body.on('click', '.list-btn', function() {
        alert('list')
        root.renderList.show(controlIndex);
    })
    // 点击进度条
    $('.progress-wrap').on('click', function(e){
        var offsetX = e.offsetX;
        var width = $(this).width();
        var percent = offsetX / width;
        jumpEvent(percent);
    })
    // 收藏
    $('.like-btn').click(function(){
        alert('Developing')
    })
}

function jumpEvent(percent){
    var jumpTime = dataList[controlIndex.index].duration * percent;
    audioManagement.jumpToPlay(jumpTime);
    // 重新开始进度条
    root.progressBar.startAnimation(percent);
    $body.find('.play-btn').addClass('pause');
}

// 拖动进度条
function bindTouch() {
    var $sliderPoint = $body.find('.slider-point');
    // 进度条的宽度、距离左边的距离
    var wrapOffset = $body.find('.progress-wrap').offset();
    var left = wrapOffset.left;
    var width = wrapOffset.width;
    // 开始拖动、取消进度条动画渲染
    $sliderPoint.on('touchstart', function(){
        root.progressBar.stopAnimation();
    }).on('touchmove', function(e) {
        // 获取点在X轴距离，计算拖拽的百分比
        var clientX = e.changedTouches[0].clientX;
        var percent = (clientX - left) / width;
        // 判断超出边界，更新当前时间和进度条
        percent = percent > 1 ? 1 : (percent < 0 ? 0 : percent);
        root.progressBar.updateTimeAndAnimation(percent);
    }).on('touchend', function(e) {
        // 拖拽结束，计算百分比
        var clientX = e.changedTouches[0].clientX;
        var percent = (clientX - left) / width;
        // 判断超出边界，跳转播放
        percent = percent > 1 ? 1 : (percent < 0 ? 0 : percent);
        jumpEvent(percent);
    })
}

function getData(url){
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data){
            // 点击切换歌曲
            bindClick();
            // 拖动进度
            bindTouch();
            // 渲染歌单列表
            root.renderList.renderListItem(data);
            // 存储data
            dataList = data;
            // 初始化歌曲
            $body.trigger('play:change', 0);
            // 控制index
            controlIndex = new root.ControlIndex(data.length);
        },
        error: function(){
            console.log('error')
        }
    })
}
getData('../mock/data.json');