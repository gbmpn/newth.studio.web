import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'

class Home extends Default {
	
	constructor(opt) {
		
		super(opt)

		this.slug = 'home'
		this.ui = null
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
			onComplete: done
		})


		var width = window.offsetWidth;
		var height = window.offsetHeight;
		var playground = document.getElementById('px-render');

		var canvas;

		var ratio = 150 / 830;

		var count = 0;
		var raf;


		var renderer = PIXI.autoDetectRenderer(width, height, {transparent:true});
		renderer.autoResize = true;
		var tp, preview;
		var displacementSprite,
			displacementFilter,
			stage;

		function setScene(url){
					playground.appendChild(renderer.view);

			        stage = new PIXI.Container();

			        tp = PIXI.Texture.fromImage(url);
			        preview = new PIXI.Sprite(tp);

			        preview.anchor.x = 0;
			    
			        displacementSprite = PIXI.Sprite.fromImage('https://res.cloudinary.com/dvxikybyi/image/upload/v1486634113/2yYayZk_vqsyzx.png');
			        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

			       	displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

			        displacementSprite.scale.y = 0.6;
			        displacementSprite.scale.x = 0.6;


			        stage.addChild(displacementSprite);

			        stage.addChild(preview);

					animate();
		}

		function removeScene(){
			cancelAnimationFrame(raf);
			stage.removeChildren();
			stage.destroy(true);
			playground.removeChild(canvas);
		}


		function animate() {
		    raf = requestAnimationFrame(animate);
		            
		    displacementSprite.x = count*5;
			displacementSprite.y = count*5;

			count += 0.05;

		    stage.filters = [displacementFilter];

		    renderer.render(stage);

		    canvas = playground.querySelector('canvas');
		}

		setScene('/static/images/bg2.png');
	}

	animateOut(req, done) {
		
		classes.remove(config.body, `is-${this.slug}`)

		TweenLite.to(this.page, 0.7, {
			autoAlpha: 0,
			ease: Expo.easeInOut,
			onComplete: done
		})
	}

	destroy(req, done) {

		super.destroy()

		this.ui = null

		this.page.parentNode.removeChild(this.page)
		
		done()
	}
}

module.exports = Home