const utils = {

    formatTime(time) {
        let seconds = Math.floor(time % 60);
        let foo = time - seconds;
        let minutes = Math.floor(foo / 60);

        if(seconds < 10) {
            seconds = "0" + seconds.toString();
        }

        return minutes + ":" + seconds;
    }
    
};

export default utils;