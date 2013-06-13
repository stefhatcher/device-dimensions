(function() {
  if (window.navigator.userAgent.toLowerCase().indexOf('mobile') !== -1 ||
      window.navigator.userAgent.toLowerCase().indexOf('tablet') !== -1 ||
      window.navigator.userAgent.toLowerCase().indexOf('android') !== -1) {
    var msg = document.getElementById('mobile-message');
    msg.style.display = 'block';
  }

  function hoverableBodyClass() {
    $(document.body).addClass('hoverable');

    var isScrolling = false;

    var onScroll = debounce(function() {
      isScrolling = false;
      $(document.body).addClass('hoverable');
    }, 200);


    $(window).scroll(function() {
      if (!isScrolling) {
        isScrolling = true;
        $(document.body).removeClass('hoverable');
      }

      onScroll();
    });
  }

  function debounce(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  }

  // open/close more sublist in stats
  function handleSubList(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).toggleClass('open');
  }

  // update filtered views
  function updateFiltered() {
    var filters = $('.os-type.active, .dpr.active');
    var layers = $('.layer, .device');

    layers.css('display', 'none');

    if (filters.length) {
      var filter = '.' + filters[0].id + ((filters.length > 1) ? ('.' + filters[1].id) : '');
      layers = layers.filter(filter);
    }

    layers.css('display', 'inline-block');

    if (layers.find(':visible').length === 0) {
      no_results.fadeIn('fast');
    } else {
      no_results.fadeOut(0);
    }
  };

  // show mobile vs tablet device dimensions
  function mobileTablet(e) {
    e.preventDefault();
    e.stopPropagation();

    var obj = $(this);

    if (obj.hasClass('active')) {
      body.toggleClass('portrait');
      body.toggleClass('landscape');
    } else {
      var active = document.getElementsByClassName('mobile-type active')[0];
      $(active).removeClass('active');
      body.removeClass(active.id);

      obj.addClass('active');
      body.addClass(this.id);
      device = '.' + this.id;

      updateFiltered();
    }
  }

  // os and device pixel ratio filtering
  function handleFilter(e) {
    e.preventDefault();
    e.stopPropagation();

    var obj = $(this);

    if (!obj.hasClass('active')) {
      obj.siblings().removeClass('active');
    }

    obj.toggleClass('active');

    updateFiltered();
  }

  // show stacked or grid-like view
  function handleView(e) {
    e.preventDefault();
    e.stopPropagation();

    var obj = $(this);

    if (!obj.hasClass('active')) {
      var active = obj.siblings('.active')[0];
      $(active).removeClass('active');
      obj.addClass('active');

      body.removeClass(active.id);
      body.addClass(this.id);
    }
  }

  var body = $('body').addClass('mobile portrait stacked-view');
  var no_results = $('.no-results').css('display', 'none');
  var device = '.mobile';

  function layerIn(e) {
    $(this).addClass('hover');
    $(this).siblings('.layer').removeClass('hover').css('opacity', 0.1);
  }

  function layerOut(e) {
    $('.layer').removeClass('hover').css('opacity', 1);
  }

  var mobiles = document.getElementsByClassName('layer');
  for (var i = 0, l = mobiles.length; i < l; i++) {
    var mobile = mobiles[i];

    mobile.addEventListener('touchstart', layerIn, false);
    mobile.addEventListener('touchend', layerOut, false);

    mobile.addEventListener('mouseover', layerIn, false);
    mobile.addEventListener('mouseout', layerOut, false);
  }

  var toggles = document.getElementsByClassName('toggle-sub-list');
  for (var i = 0, l = toggles.length; i < l; i++) {
    var toggle = toggles[i];
    toggle.addEventListener('touchend', handleSubList, false);
    toggle.addEventListener('mouseup', handleSubList, false);
  }

  var mobile_types = document.getElementsByClassName('mobile-type');
  for (var i = 0, l = mobile_types.length; i < l; i++) {
    var mobile_type = mobile_types[i];
    mobile_type.addEventListener('touchend', mobileTablet, false);
    mobile_type.addEventListener('mouseup', mobileTablet, false);
  }

  var os_types = document.getElementsByClassName('os-type');
  for (var i = 0, l = os_types.length; i < l; i++) {
    var os_type = os_types[i];
    os_type.addEventListener('touchend', handleFilter, false);
    os_type.addEventListener('mouseup', handleFilter, false);
  }

  var dprs = document.getElementsByClassName('dpr');
  for (var i = 0, l = dprs.length; i < l; i++) {
    var dpr = dprs[i];
    dpr.addEventListener('touchend', handleFilter, false);
    dpr.addEventListener('mouseup', handleFilter, false);
  }

  var views = document.getElementsByClassName('filter view');
  for (var i = 0, l = views.length; i < l; i++) {
    var view = views[i];
    view.addEventListener('touchend', handleView, false);
    view.addEventListener('mouseup', handleView, false);
  }

  hoverableBodyClass();

  setTimeout(function() {
    $('.layer').css('opacity', 1);
  }, 100)
})();
