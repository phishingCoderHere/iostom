var timer = null;
var offset = 5000;
var index = -1; 

//大图交替轮换
function slideImage(id){
    // var id = 'image_pic-0'+ (i+1);
    var video0 = $('#featured .image:visible .js-video');
    if(video0.length>0){
        video0.data('Video').pause();
    }
    $('#'+ id)
        .animate({opacity: 1}, 800, function(){
            $(this).find('.word').animate({height: 'show'}, 'slow');
        }).show()
        .siblings(':visible')
        .find('.word').animate({height: 'hide'},'fast',function(){
            $(this).parent().animate({opacity: 0}, 800).hide();
        });
    var video = $('#'+ id).find('.js-video');
    if(video.length>0){
        video.data('Video').play();
    }

}
//bind thumb a
function hookThumb(){    
    $('#thumbs ')
        .on('click', 'li a',function(){
            var id = this.id;
            var imageId = 'image'+id.substr(5);
            // index = getIndex(id.substr(6));
            rechange(id);
            slideImage(imageId);
            this.blur();            
            return false;
        });
}
//bind next/prev img
function hookBtn(){
    $('#thumbs li img').filter('#play_prev,#play_next')
        .bind('click', function(){
            var length = $('#thumbs li.slideshowItem').length;
            var id = this.id;
            if (id == 'play_prev') {
                index--;
                if (index < 0) index = length-1;
            }else{
                index++;
                if (index > length-1) index = 0;
            }
            var tarThumbId = $('#thumbs li.slideshowItem:eq('+index+') a').attr('id');
            var tarImgId = 'image'+tarThumbId.substr(5);
            rechange(tarThumbId);
            slideImage(tarImgId);
        });
}
//get index
// function getIndex(v){
//     for(var i=0; i < target.length; i++){
//         if (target[i] == v) return i;
//     }
// }
function rechange(id){
    // var id = 'thumb_'+ target[loop];
    $('#thumbs li a.current').removeClass('current');
    $('#'+ id).addClass('current');
}
function auto(){
    index++;
    if (index > 6){
        index = 0;
    }
    // rechange(index);
    // slideImage(index);
}
$(function(){    
    //change opacity
    $('div.word').css({opacity: 0.85});
    auto();
    hookThumb(); 
    hookBtn();
    
});