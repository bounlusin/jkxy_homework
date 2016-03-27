/**
 * Created by bounlusin on 2016/1/12.
 * 使用了单例模式
 */
/* globals $:false */

'use strict';

$(document).ready(function() {

    var single = {
        init: function() {
            var dom = this;
            dom.render();
            dom.bind();
        },
        render: function() {
            var dom = this;
            dom.bgSaved = localStorage.getItem('bg');
        },
        bind: function() {
            var dom = this;
            /*加载皮肤*/
            function load() {
                if (dom.bgSaved !== undefined) {
                    $('body').css('background', 'url(' + dom.bgSaved + ') no-repeat fixed');
                    $('.hd').addClass('hd-bg');
                    $('.hd-left-menu-li').addClass('white');
                    $('.hd-right-menu-li').addClass('white');
                    $('#logo').attr({ 'src': 'images/logo_white.png' });
                }
            }
            /*下拉菜单隐藏和显示*/
            function more() {
                /*用户名下拉菜单*/
                $('.hd-right-menu-username').mouseover(function() {
                    $('.hd-menu-username').removeClass('hide');
                }).mouseout(function() {
                    $('.hd-menu-username').addClass('hide');
                });
                $('.hd-menu-username').mousemove(function() {
                    $(this).removeClass('hide');
                }).mouseout(function() {
                    $(this).addClass('hide');
                });

                /*设置下拉菜单*/
                $('.hd-right-menu-set').mouseover(function() {
                    $('.hd-menu-set').removeClass('hide');
                }).mouseout(function() {
                    $('.hd-menu-set').addClass('hide');
                });
                $('.hd-menu-set').mousemove(function() {
                    $(this).removeClass('hide');
                }).mouseout(function() {
                    $(this).addClass('hide');
                });

                /*更多产品下拉菜单*/
                $('.hd-right-menu-more').mousemove(function() {
                    $('.hd-menu-more').removeClass('hide');
                    $(this).addClass('hd-right-menu-more-hover');
                }).mouseout(function() {
                    $('.hd-menu-more').addClass('hide');
                    $(this).removeClass('hd-right-menu-more-hover');
                });
                $('.hd-menu-more').mousemove(function() {
                    $(this).removeClass('hide');
                    $('.hd-right-menu-more').addClass('hd-right-menu-more-hover');
                }).mouseout(function() {
                    $(this).addClass('hide');
                    $('.hd-right-menu-more').removeClass('hd-right-menu-more-hover');
                });
            }

            /*换肤*/
            function skin() {
                $('body').click(function(e) {
                    if (e.pageY > 288) {
                        $('#skin').slideUp();
                    }
                });
                $('#showSkin').click(function() {
                    $('#skin').slideDown();
                });


                $('#hideSkin').click(function() {
                    $('#skin').slideUp();
                });

                $('.skin-list-pic').each(function() {
                    $(this).mouseover(function() {
                        $('#preview-content').attr({ 'src': this.src, 'width': 264, 'height': 180 });
                    });
                    $(this).click(function() {
                        dom.bgSaved = this.src;
                        localStorage.setItem('bg', dom.bgSaved);
                        $('body').css('background', 'url(' + this.src + ') no-repeat fixed');
                        $('.hd').addClass('hd-bg');
                        $('.hd-left-menu-li').addClass('white');
                        $('.hd-right-menu-li').addClass('white');
                        $('#logo').attr({ 'src': 'images/logo_white.png' });
                    });
                });

                $('.skin-body-list').mouseout(function() {
                    $('#preview-content').attr({ 'src': null });
                });

                $('#clearSkin').click(function() {
                    localStorage.removeItem('bg');
                    $('body').css('background', '#ffffff');
                    $('.hd').removeClass('hd-bg');
                    $('.hd-left-menu-li').removeClass('white');
                    $('.hd-right-menu-li').removeClass('white');
                    $('#logo').attr({ 'src': 'images/bd_logo1.png' });
                });

                $('.skin-li').each(function(index) {
                    $(this).click(function() {
                        $('.choose').addClass('hide');
                        $('.choose').removeClass('choose');
                        $('.choose-skin').removeClass('choose-skin');
                        $(this).addClass('choose-skin');
                        $('div.skin-body-list').eq(index).addClass('choose');
                        $('div.skin-body-list').eq(index).removeClass('hide');
                    });
                });
            }

            /*main切换页面*/
            function main() {
                $('.main-menu-item').each(function(index) {
                    $(this).click(function() {
                        $('.main-choose').addClass('hide');
                        $('.main-choose').removeClass('main-choose');
                        $('.main-menu-item-choose').removeClass('main-menu-item-choose');
                        $(this).addClass('main-menu-item-choose');
                        $('div.main-content-item').eq(index).removeClass('hide');
                        $('div.main-content-item').eq(index).addClass('main-choose');
                    });
                });

                $('#top').click(function() {
                    $('body,html').animate({ 'scrollTop': 0 }, 500);
                });
            }

            load();
            main();
            more();
            skin();
        }
    };

    single.init();

});
