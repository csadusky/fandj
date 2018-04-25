$(document).ready(function(){



$('#menu_icon').click(function(){
  $('#menu_collapsed').slideToggle();
})

$('.collapsed').click(function(){
  $('#menu_collapsed').slideUp();
})


$(".menuItem").click(function (e) {
  console.log("clicked!");
  // Remove any old one
  // $(".ripple").remove();

  // Setup
  var posX = $(this).offset().left,
      posY = $(this).offset().top,
      buttonWidth = $(this).width(),
      buttonHeight =  $(this).height();

  // Add the element
  $(this).prepend("<span class='ripple'></span>");


 // Make it round!
  if(buttonWidth >= buttonHeight) {
    buttonHeight = buttonWidth;
  } else {
    buttonWidth = buttonHeight;
  }

  // Get the center of the element
  var x = e.pageX - posX - buttonWidth / 2;
  var y = e.pageY - posY - buttonHeight / 2;


  // Add the ripples CSS and start the animation
  $(".ripple").css({
    width: buttonWidth,
    height: buttonHeight,
    top: y + 'px',
    left: x + 'px'
  }).addClass("rippleEffect");
});




});

var VueScrollTo = require('vue-scrollto');

Vue.use(VueScrollTo,{
  offset: -80
})

var app = new Vue({
  el: '#app',
  data: {
    projects: projects,
    neighborhoods: [],
    selectedNeighborhood: {},
    selectedHouse: {},
    neighborhoodContainerLeft: 0,
    neighborhoodContainerTop: 0,
    showAddress: false,
    showHouse: false,
    currentImage: 0
  },

  mounted: function (){
    const vm = this;
    // console.log("Documents: ", this.neighborhoods);
      const Prismic = require('prismic-javascript');
      const apiEndpoint = "https://fandj.prismic.io/api/v2";


      Prismic.getApi(apiEndpoint).then(function(api) {
        return api.query(""); // An empty query will return all the documents
      }).then(function(response) {

        for(i = 0; i < response.results.length; i++){
          const currentNeighborhood = response.results[i].data.neighborhood[0].text;
          let currentNeighborhoodIndex;
          const currentAddress = response.results[i].data.address[0].text;
          // console.log(response.results[i]);
          var found = vm.neighborhoods.some(function(el, index){
              currentNeighborhoodIndex = index;
              return el.neighborhood === currentNeighborhood;
          })
          if(!found){
              var obj = {};
                vm.neighborhoods.push(obj={
                neighborhood: response.results[i].data.neighborhood[0].text,
                houses: [
                        {
                          address: response.results[i].data.address[0].text,
                          description: response.results[i].data.description[0].text,
                          rooms: response.results[i].data.rooms,
                          bathrooms: response.results[i].data.bathrooms,
                          images:response.results[i].data.images
                        }
                ]
              })
          }else{
            if(vm.neighborhoods[currentNeighborhoodIndex].houses.indexOf(currentAddress) === -1){
              vm.neighborhoods[currentNeighborhoodIndex].houses.push(obj={
                  address: response.results[i].data.address[0].text,
                  description: response.results[i].data.description[0].text,
                  rooms: response.results[i].data.rooms,
                  bathrooms: response.results[i].data.bathrooms,
                  images:response.results[i].data.images
              })
            }else{
              console.log("already in there")
            }


          }
          // vm.houses.push(response.results[i]);
          console.log("these are the houses")
          console.log(vm.neighborhoods);

        }

        // console.log("Documents: ", this.houses);

      }, function(err) {
        console.log("Something went wrong: ", err);
      });
      console.log(this.houses);
  },
  created: function(){
  // opening sequence
    setTimeout(function(){

    }, 1000)
    setTimeout(function(){
      $("#descriptionItem1").css("border", "none");
      $("#descriptionItem1").addClass('descriptionItemFade');
      $("#circle1").addClass('circleBefore');
      $("#circle1").addClass('circleAfter');
    }, 1300);
    setTimeout(function(){
      $("#descriptionItem2").css("border", "none");
      $("#descriptionItem2").addClass('descriptionItemFade');
      $("#circle2").addClass('circleBefore');
      $("#circle2").addClass('circleAfter');
    }, 1600);
    setTimeout(function(){
      $("#descriptionItem3").css("border", "none");
      $("#descriptionItem3").addClass('descriptionItemFade');
      $("#circle3").addClass('circleBefore');
      $("#circle3").addClass('circleAfter');
    }, 1900);
    setTimeout(function(){
      $("#descriptionItem4").css("border", "none");
      $("#descriptionItem4").addClass('descriptionItemFade');
      $("#circle4").addClass('circleBefore');
      $("#circle4").addClass('circleAfter');
    }, 2100);
    window.addEventListener('scroll', this.adjustNavBar);
  },
  destroyed: function(){
    window.removeEventListener('scroll', this.adjustNavBar);
  },
  methods: {
    adjustNavBar: function(){
      var navbarColor = "62,195,246"; //color attr for navbar
      var smallLogoHeight = $('.small_logo').height();
      var bigLogoHeight = $('.bannerImage').height();
      var navbarHeight = $('.navbar').height();

      var smallLogoEndPos = (navbarHeight - smallLogoHeight) / 2;

      var ratio = (smallLogoHeight / bigLogoHeight);
      var ySmall = ($(window).scrollTop() * ratio);
      var smallPadding = navbarHeight - ySmall;

      if (smallPadding > navbarHeight) { smallPadding = navbarHeight; }
      if (smallPadding < smallLogoEndPos) { smallPadding = smallLogoEndPos; }
      if (smallPadding < 0) { smallPadding = 0; }

      $('.small_logo_container ').css({ "padding-top": smallPadding});
      // console.log(smallPadding);

      var navOpacity = ySmall / smallLogoHeight;
      if  (navOpacity > 1) { navOpacity = 1; }
      if (navOpacity < 0 ) { navOpacity = 0; }
      var navBackColor = 'rgba(' + navbarColor + ',' + navOpacity + ')';
      $('.navbar').css({"background-color": navBackColor});

      var shadowOpacity = navOpacity / 2;
      if ( ySmall > 1) {
        $('.navbar').css({"box-shadow": "0 2px 3px rgba(0,0,0," + shadowOpacity + ")"});
        $('#menu').css("font-size", "16px");
      } else {
        $('.navbar').css({"box-shadow": "none"});
        $('#menu').css("font-size", "24px");
      }
    },
    changeNeighborhood: function(selected, e){
      this.getPosition(e);
      this.selectedNeighborhood = selected;
      this.showAddress = true;
    },
    getPosition : function(e){
          var xDown = 20;
          var yDown = e.target.offsetTop;

          console.log("XDown: " + xDown + " " + "yDown: " + yDown);
          // if(window.innerHeight > window.innerWidth){
          //       this.neighborhoodContainerLeft = 50;
          //   }else{
                this.neighborhoodContainerLeft = xDown;
            // }
            this.neighborhoodContainerTop = yDown;
    }
  },
  computed: {
    isEmpty: function () {
      return jQuery.isEmptyObject(this.selectedNeighborhood);
    }
  }
})


