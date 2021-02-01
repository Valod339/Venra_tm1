window.addEventListener("scroll", function(e){
    let header = $("header")
    let menu = $(".header_inner .header_item nav ul li a")
    if(window.scrollY > 0){
        $(header).addClass("active");
        $(menu).addClass("active");
    }else{
        $(header).removeClass("active");
        $(menu).removeClass("active");
    }
})

function burger() {
    const menuBtn = $(".btn_menu_active");
    const menuBtnClose = $(".btn_menu_close");
    const menu = $(".header_inner .header_item nav");
    menuBtn.on("click", function (e) {
        e.preventDefault()
        $(menu).addClass("active");
    })
    menuBtnClose.on("click", function (e) {
        e.preventDefault()
        $(menu).removeClass("active");
        
    })
}
burger()