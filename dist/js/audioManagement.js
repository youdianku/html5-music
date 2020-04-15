(function($, root){
    var $body = $(document.body);
    function AudioManagement() {
        this.status = 'pause';
        this.audio = new Audio();
        // 监听播放完成
        this.bindEnded();
    }
    AudioManagement.prototype = {
        play: function() {
            this.audio.play();
            this.status = 'play';
        },
        pause: function() {
            this.audio.pause();
            this.status = 'pause';
        },
        setAudioSource: function(src) {
            this.audio.src = src;
            this.audio.load();
        },
        jumpToPlay: function(duration) {
            this.audio.currentTime = duration;
            this.play();
        },
        bindEnded: function() {
            $(this.audio).on('ended', function(){
                $body.find('.next-btn').trigger('click');
            })
        }
    }
    root.AudioManagement = AudioManagement;
})(window.Zepto, window.player || (window.player = {}))