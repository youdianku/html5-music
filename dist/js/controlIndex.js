(function ($, root) {
    function ControlIndex(len) {
        this.index = 0;
        this.len = len;
    }
    ControlIndex.prototype = {
        prev: function() {
            return this.getIndex(-1);
        },
        next: function() {
            return this.getIndex(1);
        },
        getIndex: function(val) {
            var len = this.len,
                index = this.index;
            var curIndex = (index + len + val) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.ControlIndex = ControlIndex;
})(window.Zepto, window.player || (window.player = {}))