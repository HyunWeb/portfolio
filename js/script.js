window.addEventListener("load", function(){
    let button = document.querySelector("#button");
    var mainTitle = document.querySelector("#main > div:first-child");
    var mainImg = document.querySelector("#main > div:last-child");
    var contents = document.querySelector("#contents");
    var menu = document.querySelector("#menu");
    var dotrec = document.querySelector("#dotRec");
    var dotcir = document.querySelector("#dotCircle");
    var recSize = [100, 105];
    var i = 0;
    // 페이지 스크롤링
    var pageIndex = Math.round(document.body.scrollTop / window.innerHeight);
    var lastPageIndex = document.querySelectorAll("#contents > div").length -1 ;
    var windowHeight = window.innerHeight;
    var posTop = windowHeight * pageIndex;
    // 패스 진행 
    let PL900 = document.querySelector(".PL900")
    let PL800 = document.querySelector(".PL800")

    // 해상도 높이에 따라서 들어가는 적용되는 패스가 달라진다. 
    if(window.innerHeight > 900){
    var path = document.querySelector(".PathLines900");
    }
    else{
    var path = document.querySelector(".PathLines800");
    }
    // var path = document.querySelector(".PathLines900");

    var pathLength = path.getTotalLength()
    var pathPercent = [75,50,33,20,0];
    // 메뉴 버튼
    var menu = document.querySelector("#menu");
    var menulist = document.querySelectorAll("#menu > li > span");
    var menubutton = document.querySelectorAll("#menu > li");
    // 아트웍 슬라이드
    let artTop = document.querySelector(".arttop");
    let artbottom = document.querySelector(".artbottom");
    let slide = document.getElementsByClassName("slide");
    let artImage = document.querySelectorAll(".slide > li");
    let overlay = document.querySelector("#overlay");



    function menufunction(){
        for(var j = 0; j < menulist.length; j++)
            menulist[j].removeAttribute("style");
        menulist[pageIndex].style.opacity = "1";
    }

    window.setTimeout(function(){
        document.documentElement.scrollTop = pageIndex * window.innerHeight;
    }, 10);
    
    document.documentElement.style.scrollBehavior= "smooth";
    
    
    var pageStop = 0;
    menulist[0].style.opacity = "1";
    // 페이지 스크롤링
    window.addEventListener("wheel",function(event){
    
        event.preventDefault();
        if(pageStop == 1 || contents.style.opacity != "1") return;
      
        if(event.deltaY > 0) {  
            if(pageIndex >= lastPageIndex) return;
            pageIndex++;}
        else if (event.deltaY < 0){
            if(pageIndex <= 0 ) return;
            pageIndex--;}
        
        posTop = windowHeight * pageIndex;
        // document.documentElement.scrollTop = posTop; 
        window.scrollTo(0,posTop);

        window.setTimeout(function(){
            path.style.strokeDashoffset = Length(pathPercent[pageIndex])
        },500)

        menufunction();

        pageStop = 1;
    
        window.setTimeout(function(){
            pageStop = 0;
        },600);
    },{ passive:false });
    
    window.addEventListener("resize", function(){
        windowHeight = window.innerHeight;
    });
        

    // 메인페이지 망점 사각형
    dotrec.style.transitionDuration = "2s";
    dotrec.style.scale = "105%";

    window.setInterval(function(){
        dotrec.style.scale =  recSize[i] + "%"
        i++
        if(i >= 2) i = 0;
    }, 3000);

    // 메인 페이지 점선 원형 회전
    dotcir.style.transitionDuration = "40s"
    dotcir.style.rotate ="360deg"

    // 메인 페이지 자세히 보기 버튼
    button.addEventListener("click", function(){
        mainTitle.style.left = "-900px";
        mainImg.style.right = "-1200px";

        window.setTimeout(function(){
            contents.style.visibility = "visible";
            contents.style.opacity = "1";
            menu.style.right = "0";
            document.getElementById("view").style.overflow = "visible";

            path.style.strokeDashoffset = Length(75)
            path.style.transitionDuration = "2000ms"
        },500);
    });

    // 메인 배경 패스진행

     //선이 얼마나 그려질지 계산
    function Length(percent) {
        var value = percent * (pathLength / 100)
        return value
    }
    path.style.strokeDasharray = pathLength
    path.style.strokeDashoffset = pathLength
    

    // 메뉴 바 
    for(var b = 0; b < menubutton.length; b++)
    menubutton[b].addEventListener("click",function(){
        var menuNumber = this.getAttribute("data-menu")
        pageIndex = menuNumber ;
        posTop = windowHeight * pageIndex;
        window.scrollTo(0,posTop);
        menufunction();

        if(pageIndex == 1){
            rolling();
            skillbox();
        }else if(pageIndex == 3)
        portshow();

        window.setTimeout(function(){
            path.style.strokeDashoffset = Length(pathPercent[pageIndex])
        },500)

        // 화면 전환시 디테일 화면이 열려있을 경우 닫는 버튼 강제 실행
        if(detailButton.style.opacity == "1")
            DetailClosed();

    });

    
    var datablock = document.getElementsByClassName("datacircle");
    var d = 0


// 스킬 그래프
    var pageStop2 = 0
    let page2 = window.addEventListener("wheel",function(){
        if(pageStop2 == 0 && pageIndex == 1){
        rolling();
        skillbox();

        pageStop2++;
        this.window.setTimeout(function(){
            pageStop2--;
        },500);
    }
});

function rolling() {
    // 모든 그래프 제거 
    for(var d = 0; d < datablock.length; d++)
        datablock[d].removeAttribute("style");

    var circledata = 0;
    // 페이지 돌입 1초 후 그래프 돌아감
    window.setTimeout(function(){
        // 직접 그래프를 돌리는 타이머

        // 1,2 번 그래프
        var skill = window.setInterval(function(){
            if(circledata <= 90){
                // 처음엔 다 돌린다. 
                for(var rolling = 0; rolling <= 1; rolling++)  
                    datablock[rolling].style.backgroundImage = "conic-gradient(#572dff 0% "+circledata+"%, #ebebeb "+circledata+"% 100%)"
                    circledata++
            }
            else clearInterval(skill);
        },10);  

        // 3,4 번 그래프
        var skill2 = window.setInterval(function(){
            if(circledata <= 75){
                // 처음엔 다 돌린다. 
                for(var rolling = 2; rolling <= 3; rolling++)  
                    datablock[rolling].style.backgroundImage = "conic-gradient(#572dff 0% "+circledata+"%, #ebebeb "+circledata+"% 100%)"
                    circledata++
            }
            else clearInterval(skill2);
        },10);  

        // 5,6 번 그래프
        var skill3 = window.setInterval(function(){
            if(circledata <= 60){
                // 처음엔 다 돌린다. 
                for(var rolling = 4; rolling <= 5; rolling++)  
                    datablock[rolling].style.backgroundImage = "conic-gradient(#572dff 0% "+circledata+"%, #ebebeb "+circledata+"% 100%)"
                    circledata++
            }
            else clearInterval(skill3);
        },10);  
    },1000);
};

// 포토 일러 설명 
    let photoshop = document.querySelector(".photoshop");
    let illustrator = document.querySelector(".illustrator");
    let skillBox= document.querySelectorAll(".skillbox");
    function skillbox(){
        for(var skilli = 0; skilli < skillBox.length; skilli++){
            skillBox[skilli].removeAttribute("style");
            }

        window.setTimeout(function(){
            photoshop.style.transitionDuration = "1s";
            illustrator.style.transitionDuration = "1s";
            photoshop.style.right = "0";
            illustrator.style.left = "0";
        }, 500);
    };

// 아트웍 슬라이드
    var slideTop = window.setInterval(TopSlide ,2000)
    var slideBottom = window.setInterval(BottomSlide ,2000)

    function TopSlide(){
        artTop.style.transitionDuration = "1s"
        artTop.style.marginLeft = "-25%"

        window.setTimeout(function(){
            artTop.appendChild(artTop.firstElementChild);
            artTop.removeAttribute("style");
        },1000);
    }

    function BottomSlide(){
        artbottom.style.transitionDuration = "1s"
        artbottom.style.marginLeft = "0%"

        window.setTimeout(function(){
            artbottom.removeAttribute("style");
            appendFirst(artbottom, artbottom.lastElementChild);
            artbottom.style.marginLeft = "-25%"
        },1000);
    }

    function appendFirst(node, childnode){
        if(node.firstElementChild) {
            node.insertBefore(childnode, node.firstElementChild);
        } else {
            node.appendChild(childnode)
        }
    }

    for(var slideCount = 0; slideCount < slide.length; slideCount++){
    slide[slideCount].addEventListener("mouseenter", function(){
        window.clearInterval(slideTop);
        window.clearInterval(slideBottom);
    });
    slide[slideCount].addEventListener("mouseleave", function(){
        slideTop = window.setInterval(TopSlide, 2000);
        slideBottom = window.setInterval(BottomSlide, 2000);
    });
    }
// 이미지 클릭 오버레이 
    for(var artImages = 0; artImages < artImage.length; artImages++)
    artImage[artImages].addEventListener("click",function(){
        overlay.firstElementChild.src = this.firstElementChild.src
        overlay.style.display = "block"

        window.setTimeout(function(){
            window.clearInterval(slideTop);
            window.clearInterval(slideBottom);
        },500);
    });

    // 사진 이미지를 클릭하면 다시 사라진다. 
    overlay.addEventListener("click",function(){
        overlay.style.display = "none";
        
        slideTop = window.setInterval(TopSlide, 2000);
        slideBottom = window.setInterval(BottomSlide, 2000);
    });


    // 포폴 페이지
    let portCompose = document.querySelector(".portcompose");
    let portStussy = document.querySelector(".portstussy");
    let portHamilton = document.querySelector(".porthamilton");
    let portBox = document.querySelectorAll(".portBox");
    let pageStop3 = 0
    let portRight = document.querySelector(".portRight")

    function portshow(){
        if(pageStop3 == 0 && pageIndex == 3){
        for(var porti1 = 0; porti1 < portBox.length; porti1++){
        portBox[porti1].removeAttribute("style");
        }
        this.window.setTimeout(function(){
            for(var porti2 = 0; porti2 < portBox.length; porti2++){
                portBox[porti2].style.transitionDuration = "1s";
                }
            portCompose.style.transform = "translate(130%, 10%)";
            portStussy.style.transform = "translate(10%, 120%)";
            portHamilton.style.transform = "translate(130%,250%)";
    }, 500);}}

    // 스크롤 내리면 좌우에서 요소들이 등장한다. 
    window.addEventListener("wheel",function(){
        // 화면 전환시 디테일 화면이 열려있을 경우 닫는 버튼 강제 실행
        if(detailButton.style.opacity == "1")
            DetailClosed();

        // 포트폴리오 화면 보이게 하는 함수
        portshow();
        
        pageStop3++;
        this.window.setTimeout(function(){
            pageStop3--;
        },500);
    });
    
let imgView = document.querySelectorAll(".imgView");
let detailDetail = document.querySelectorAll(".detail_detail");
let detailButton = document.querySelector("#detailClose");

    for(var imgViewI = 0; imgViewI < imgView.length; imgViewI++)
    imgView[imgViewI].addEventListener("click",function(event){
        event.stopPropagation();
        this.previousElementSibling.style.display = "none"

        if(this.parentElement == portCompose){
            portStussy.style.display = "none";
            portHamilton.style.display = "none";
        }else if(this.parentElement == portStussy){
            portCompose.style.display = "none";
            portHamilton.style.display = "none";
        }else{
        portStussy.style.display = "none";
        portCompose.style.display = "none";}

        this.parentElement.style.transform = "translate(130%,120%) scale(130%)";
        this.parentElement.style.transformOrigin = "100% 50%";

        // 사용자 데이터 속성에 담아둔 각 디테일 설명 아이디 들을 활용한다. 
        var dataDetail = this.parentElement.getAttribute("data-detail");
        var dataDetail2= document.querySelector(dataDetail);
        // 각 썸네일에 해당하는 디테일들을 나타나게 한다. 
        dataDetail2.style.transitionDuration = "1s";
        dataDetail2.style.opacity = "1";
        dataDetail2.style.left = "10%";

        // 버튼이 불투명해지면서 우측에서 들어온다.
        detailButton.style.opacity = "1";
        detailButton.style.right = "5%";
    });

    detailButton.addEventListener("click", function(event){
            event.stopPropagation();
            DetailClosed();
        });

    function DetailClosed(){
        for(var detailI = 0; detailI < detailDetail.length; detailI++){
            detailDetail[detailI].removeAttribute("style");
            }
            detailButton.removeAttribute("style");

            for(var porti2 = 0; porti2 < portBox.length; porti2++){
                portBox[porti2].style.transitionDuration = "1s";
                portBox[porti2].style.display = "block";
                portBox[porti2].firstElementChild.removeAttribute("style");
                }
            portCompose.style.transform = "translate(130%, 10%) scale(100%)";
            portStussy.style.transform = "translate(10%, 120%) scale(100%)";
            portHamilton.style.transform = "translate(130%,250%) scale(100%)";
    }
    let over900 = document.getElementsByClassName("over900");

    if(portRight.scrollHeight > 900){
        path = document.querySelector(".PathLines900");
        for(overI = 0; overI < over900.length; overI++){
            over900[overI].style.paddingTop = "10%";
            over900[overI].style.boxSizing = "border-box";
        }
        PL900.style.display = "block"
        PL900.style.left = "-375px"
        PL800.style.display = "none"
    }
    else{
        path = document.querySelector(".PathLines800");
        PL900.style.display = "none"
        PL800.style.display = "block"
        PL800.style.width = "139%"
    }
});