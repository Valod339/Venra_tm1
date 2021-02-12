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

function notify(titel, messange) {
    $(".warning").html(`
    <div class="notify animate__animated animate__fadeInDown">
        <h4>${titel}</h4>
        <p>${messange}</p>
    </div>
    `)
    setTimeout(function () {
        $(".warning").html(`
    <div class="notify animate__animated animate__fadeOut">
        <h4>${titel}</h4>
        <p>${messange}</p>
    </div>
    `)
    }, 4000)
}

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
function skill() {
    const skill = document.querySelector(".skill")

    skill_cont = [
        {
            titel: "skill",
            precent: 93,
            color: "#FB5B40"
        },
        {
            titel: "studio",
            precent: 78,
            color: "#A957E5"
        },
        {
            titel: "experience",
            precent: 89,
            color: "#74B75C"
        }
    ]
    skill_cont.forEach(item => {
        skill.innerHTML += `
        <div class="skill_content">
            <div class="skill_title">
                <span style=" color: ${item["color"]}">${item["titel"]}</span>
                <span style=" color: ${item["color"]}">${item["precent"]}%</span>
            </div>
            <div class="skill_bar">
                <div class="skill_progres" style=" width: ${item["precent"]}%; background: ${item["color"]}">
                </div>
            </div>
        </div>
        `
    });
}
skill()
function tab_cat() {
    const btn = document.querySelectorAll(".portfolio_tab_list li button");
    const img = document.querySelectorAll(".portfolio_img_item");
    btn.forEach(item =>{
        console.log();
        item.addEventListener("click", function() {
            const dataName = this.getAttribute("data-tab-name") 
            if(dataName != "all"){
                hidden()
                getTabName(dataName)
            }else{
                getTabName(dataName)
            }
        })
        function hidden() {
            img.forEach(item =>{
                item.style.display = "none"
            })
        }
        
        
       function getTabName(name){
            img.forEach(item =>{
                let itemName = item.getAttribute("data-tab-img")
                if(itemName == name){
                    item.style.display = 'block'
                    item.classList.toggle("animate__fadeIn")
                }else{
                    item.style.display = 'none'
                }
                if(name == "all"){
                    item.style.display = "block"
                }
            })
        }
    })
}
tab_cat()
function scrolls() {
    const anchor = document.querySelectorAll('a[href*="#"');

for (let anc of anchor){
    anc.addEventListener("click", function (e) {
        e.preventDefault();

        const block = anc.getAttribute("href").substr(1);

        document.getElementById(block).scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
}
}
scrolls()

$("#mail_send").on("submit", function (e) {
    e.preventDefault();
    
    const form = $(this),
          name = $("input[name=name]").val(),
          email = $("input[name=email]").val(),
          massenge = $("textarea[name=messange]").val(),
          formData = new FormData(form[0]);

    if(name == "" && email == "" && massenge == "" ){
        notify("warning", "Please fill in all the fields");
    }
    else{
        $.ajax({
            type: "post",
            url: "mail/conf.php?cmd=email",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                try {
                    resObg = JSON.parse(response);
                    obgTitle = resObg["title"];
                    obgMasseng = resObg["messange"];
                    notify(obgTitle, obgMasseng)
                } catch (e) {
                    notify("error", "error is server tray");
                }
            }
        });
    }
})
