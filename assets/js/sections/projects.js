import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'
import Swiper from 'Swiper'

class Projects extends Default {
	
	constructor(opt) {
		
		super(opt)

		this.slug = 'projects'
	}
	
	init(req, done) {

		super.init(req, done)
	}
	
	ready(done) {
		
		super.ready()

		done()
	}

	animateIn(req, done) {

		classes.add(config.body, `is-${this.slug}`)

		TweenLite.to(this.page, 1, {
			autoAlpha: 1,
			ease: Expo.easeInOut,
			onComplete: done,
			
		})


		setTimeout(function(){
			document.querySelector('.gallery-top').classList.add('_rotated')
			document.querySelector('.gallery-thumbs').classList.add('_on')
		}, 100)

		var galleryThumbs = new Swiper('.gallery-thumbs', {
	      spaceBetween: 10,
	      //slidesPerView: 'auto',
	      // freeMode: false,
	      mousewheel: false,
	      watchSlidesVisibility: true,
	      watchSlidesProgress: true,
	      speed: 800,
	      centerSlides: true,
	      loop: true,
	      thumbs: {
	        swiper: galleryTop
	    }

	    });
	    var galleryTop = new Swiper('.gallery-top', {
	        spaceBetween: 10,
	        direction: 'vertical',
	        slidesPerView: 1,
	        spaceBetween: 30,
	        mousewheel: true,
	        speed: 800,
	        loop: true,
	        invert: true,
	        //freeMode: true,
		    // navigation: {
		    //     nextEl: '.swiper-button-next',
		    //     prevEl: '.swiper-button-prev',
		    // },
		    thumbs: {
		        swiper: galleryThumbs
		    }
	    });

	}
	
	animateOut(req, done) {

		classes.remove(config.body, `is-${this.slug}`)

		TweenLite.to(this.page, 0.7, {
			autoAlpha: 0,
			ease: Expo.easeInOut,
			onComplete: done,
			delay: 1
		})

		document.querySelector('.gallery-top').classList.remove('_rotated')
		document.querySelector('.gallery-top').classList.add('_full')
		document.querySelector('.gallery-thumbs').classList.remove('_on')
	}

	destroy(req, done) {

		super.destroy()

		this.page.parentNode.removeChild(this.page)
		
		done()
	}
}

module.exports = Projects