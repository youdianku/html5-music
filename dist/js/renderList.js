(function ($, root) {
    var $htmlStr = $(`<div class="play-list">
                        <div class="list-header">播放列表</div>
                        <div class="list-wrap">
                            <ul class="list-ul">
                                
                            </ul>
                        </div>
                        <div class="close-btn">关闭</div>
                    </div>`);
    var _controlIndex;
    var $body = $(document.body);
    function renderListItem(dataList) {
        var str = '';
        var len = dataList.length;
        for (var i = 0; i < len; i++) {
            str += `<li class="list-item">
                        <h3>${dataList[i].song} - <span>${dataList[i].singer}</span></h3>
                    </li>`
        }
        $htmlStr.find('.list-ul').html(str);
        $('.wrapper').append($htmlStr);
        closeList();
    }
    function show(controlIndex) {
        _controlIndex = controlIndex;
        playingSong(_controlIndex.index);
        $('.play-list').addClass('show');
    }
    // 正在播放的歌曲 样式
    function playingSong(index){
        $htmlStr.find('.playing')
                .removeClass('playing');
        $htmlStr.find('.list-ul li')
                .eq(index)
                .addClass('playing');
    }
    function closeList(){
        $htmlStr.on('click', '.close-btn', function(){
            $htmlStr.removeClass('show');
        })
        $htmlStr.find('.list-ul').on('click', '.list-item', function(){
            var index = $(this).index();
            playingSong(index);
            validIndex(index);
            // 播放
            $body.trigger('play:change', [index, true]);
            setTimeout(function(){
                $htmlStr.removeClass('show');
                $body.find('.play-btn').addClass('pause');
            }, 200);
        })
    }
    // 判断index
    function validIndex(index){
        if(index >= 0 || index <= _controlIndex.len) {
            _controlIndex.index = index;
        }
    }

    root.renderList = {
        renderListItem: renderListItem,
        show: show
    }
})(window.Zepto, window.player || (window.player = {}))