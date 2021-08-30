import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'
import domselect from 'dom-select'
import Swiper from 'Swiper'
import LocomotiveScroll from 'locomotive-scroll';

class About extends Default {
	
	constructor(opt) {
		
		super(opt)

		this.slug = 'about'
	}
	
	init(req, done) {

		super.init(req, done)
	}
	
	ready(done) {
		
		super.ready()

		done()
	}

	animateIn(req, done) {

		//classes.add(config.body, `is-${this.slug}`)

		TweenLite.to(this.page, 1, {
			y: 0,
			autoAlpha: 1,
			ease: Expo.easeInOut,
			onComplete: done
		})

		var tile = document.querySelector('.meta-tile'),
			isMobile = window.innerWidth < 1025 || navigator.platform === 'iPad',
	        s = tile.dataset.slug;
	        classes.add(config.body, 'is-'+s)
	         classes.add(this.page, 'page-'+s)
	   //      var tl = new TimelineMax();
				// tl.to(config.body, 0.1, {className: '+=is-'+s})
				// tl.to(this.page, 0.1, {className: '+=page-'+s})
	        // classes.add(config.body, 'is-'+s)
	        // classes.add(this.page, 'page-'+s)
	        console.log(s);

		var app = {
			init: function(){
				this.initBidings();
			},
			initBidings: function(){
				
		    	this.scrollFunction();
		    	this.introAnim();
		    	// if(s === 'projects'){
		    	// 	this.projectSwipers();
		    	// }

			},
			introAnim: function(){
				var tl = new TimelineMax();

				tl.to('.pager', 1, {className: "+=_going", delay: 1})
				tl.to('.pager', 1, {className: "+=_top"})
				tl.to('.pager', 1, {className: "+=_off"})
				tl.to('.pager', 0, {className: "+=_reset"})
				tl.to('.pager', 0, {className: "-=_off"})
				tl.to('.pager', 0, {className: "-=_top"})
				tl.to('.pager', 0, {className: "-=_going"})
				tl.to('.pager', 0, {className: "+=_ready", delay: 1})

				// var splitone = new SplitText('.splitted._1', {type: 'chars, words'});
				// var tl = new TimelineMax();
				// tl.staggerFrom(splitone.chars, 1, {delay: 0.5, y: 80, rotation: -20, opacity: 0, ease: Power4.easeOut}, 0.01);
			},
			scrollFunction: function(){
				
				if(document.querySelector('.scroll-container')){
					const scroll = new LocomotiveScroll({
						el: document.querySelector('[data-scroll-container]'),
						smooth: true,
						getDirection: true,
						lerp: 0.05,
						touchMultiplier: 5,
						firefoxMultiplier: 180,
						smoothMobile: true
					});
					if(s === 'home') {
						const _flag = document.querySelector('img._flag')
						const _first_p = document.querySelector('.first_p')
						const _last_p = document.querySelector('.last_p')
						const _scroll_d = document.querySelector('._scroll')
						const _scroll_t = document.querySelector('._scroll._rotated')
						const target = document.querySelector('#js-target')
						
						_scroll_d.addEventListener('click', function(){
							scroll.scrollTo(window.innerHeight / 1.3);
						})
						
						scroll.on('scroll', func => {
							const r_top = _first_p.getBoundingClientRect().top
							const r_top2 = _last_p.getBoundingClientRect().top
							console.log(r_top2)
							if (r_top <= 0){
								_flag.classList.add('_sided')
							}else{
								_flag.classList.remove('_sided')
							}
							if (r_top2 <= 150){
								_scroll_d.classList.add('_rotated')
								_scroll_t.addEventListener('click', function(){
									scroll.scrollTo(window.innerHeight);
								})
							}else{
								_scroll_d.classList.remove('_rotated')
							}
						});

					}
				}
			}

		}
		app.init();
	}
	
	animateOut(req, done) {

		//classes.remove(config.body, `is-${this.slug}`)
		var tile = document.querySelector('.meta-tile'),
	        s = tile.dataset.slug;
	        setTimeout(() => {
	       	 classes.remove(config.body, 'is-'+s)
	         classes.remove(this.page, 'page-'+s)
	        }, 1000)

	        var tl = new TimelineMax();
				tl.to('.pager', .1, {className: "-=_reset"})
				tl.to('.pager', .1, {className: "-=_ready"})
				// tl.to(config.body, 1, {className: '-=is-'+s})
				// tl.to(this.page, 1, {className: '-=page-'+s})

		TweenLite.to(this.page, 0.7, {
			delay: 1,
			autoAlpha: 0,
			ease: Expo.easeInOut,
			onComplete: done
		})
	}

	destroy(req, done) {

		super.destroy()

		this.page.parentNode.removeChild(this.page)
		
		done()
	}
}

module.exports = About