/* ZHIP Main JS */
(function(){
  // Mobile nav
  var btn=document.querySelector('.nav-hamburger');
  var mob=document.querySelector('.nav-mobile');
  if(btn&&mob){
    btn.addEventListener('click',function(){
      btn.classList.toggle('open');
      mob.classList.toggle('open');
    });
  }

  // Active nav
  var path=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function(a){
    var href=a.getAttribute('href');
    if(href===path||(path===''&&href==='index.html')){a.classList.add('active');}
  });

  // Accordion
  document.querySelectorAll('.accordion-btn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var content=this.nextElementSibling;
      var isOpen=this.classList.contains('open');
      document.querySelectorAll('.accordion-btn.open').forEach(function(b){
        b.classList.remove('open');
        b.nextElementSibling.classList.remove('open');
      });
      if(!isOpen){this.classList.add('open');content.classList.add('open');}
    });
  });

  // Count-up animation for stats
  function countUp(el){
    var target=parseFloat(el.dataset.target);
    var suffix=el.dataset.suffix||'';
    var prefix=el.dataset.prefix||'';
    var duration=1800;
    var start=performance.now();
    var isFloat=String(target).includes('.');
    function step(now){
      var progress=Math.min((now-start)/duration,1);
      var ease=1-Math.pow(1-progress,3);
      var val=target*ease;
      el.textContent=prefix+(isFloat?val.toFixed(1):Math.floor(val).toLocaleString())+suffix;
      if(progress<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting&&!e.target.dataset.counted){
        e.target.dataset.counted='1';
        countUp(e.target);
      }
    });
  },{threshold:.5});
  document.querySelectorAll('[data-target]').forEach(function(el){observer.observe(el);});

  // Scroll reveal
  var revealObs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.style.opacity='1';
        e.target.style.transform='translateY(0)';
      }
    });
  },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){
    el.style.opacity='0';
    el.style.transform='translateY(20px)';
    el.style.transition='opacity .6s ease, transform .6s ease';
    revealObs.observe(el);
  });

  // Form submit placeholder
  document.querySelectorAll('form.zhip-form').forEach(function(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var btn=form.querySelector('[type=submit]');
      var orig=btn.textContent;
      btn.textContent='Sending...';
      btn.disabled=true;
      setTimeout(function(){
        btn.textContent='Sent! We\'ll be in touch.';
        btn.style.background='var(--g-md)';
        form.reset();
      },1200);
    });
  });
})();
