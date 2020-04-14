(function ($, root) {
    var $body = $(document.body);
    // 图片
    function renderImg(src) {
        var oImg = new Image();
        oImg.onload = function () {
            root.blurImg(oImg, $body);
            $body.find('.img-wrap img').attr('src', src)
        }
        oImg.src = src;
    }
    // 信息
    function renderInfo(info) {
        var str = `<div class="song-name">${info.song}</div>
        <div class="singer-name">${info.singer}</div>
        <div class="album-name">${info.album}</div>`
        $body.find('.song-info').html(str)
    }
    // 收藏
    function renderIsLike(isLike){
        if(isLike){
            $body.find('.like-btn').addClass('liking');
        }else{
            $body.find('.like-btn').removeClass('liking');
        }
    }
    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
})(window.Zepto, window.player || (window.player = {}))