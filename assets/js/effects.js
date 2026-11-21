(function () {
  var theme = document.documentElement.getAttribute("data-theme");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Pointer spotlight on cards
  document.addEventListener("pointermove", function (e) {
    var c = e.target.closest && e.target.closest(".proj, .pub, .exp, .edu-block, .resume-box, aside.sidebar");
    if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty("--mx", e.clientX - r.left + "px");
    c.style.setProperty("--my", e.clientY - r.top + "px");
  });

  // Aurora: soft cursor glow
  if (theme === "v2") {
    var glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);
    window.addEventListener("pointermove", function (e) {
      glow.style.transform = "translate(" + (e.clientX - 260) + "px," + (e.clientY - 260) + "px)";
    });
  }

  // Blueprint: starry night sky
  if (theme === "v4" && !reduce) {
    var cv = document.createElement("canvas");
    cv.id = "netCanvas";
    document.body.insertBefore(cv, document.body.firstChild);
    var ctx = cv.getContext("2d"), W, H, stars = [], shoot = null, nextShoot = 120;
    function size() {
      var d = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * d; cv.height = H * d;
      cv.style.width = W + "px"; cv.style.height = H + "px";
      ctx.setTransform(d, 0, 0, d, 0, 0);
      var n = Math.round(Math.min(220, (W * H) / 6000));
      stars = [];
      for (var i = 0; i < n; i++) stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + .3, ph: Math.random() * 6.283, sp: .01 + Math.random() * .025, warm: Math.random() < .25 });
    }
    size();
    window.addEventListener("resize", size);
    (function frame() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.ph += s.sp;
        var a = .35 + .65 * (.5 + .5 * Math.sin(s.ph));
        ctx.fillStyle = (s.warm ? "rgba(255,225,180," : "rgba(205,225,255,") + a + ")";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
        if (s.r > 1.2) {
          ctx.strokeStyle = "rgba(255,255,255," + a * .35 + ")";
          ctx.beginPath(); ctx.moveTo(s.x - 4, s.y); ctx.lineTo(s.x + 4, s.y); ctx.moveTo(s.x, s.y - 4); ctx.lineTo(s.x, s.y + 4); ctx.stroke();
        }
      }
      if (!shoot && --nextShoot <= 0) {
        shoot = { x: Math.random() * W * .8 + W * .2, y: Math.random() * H * .4, l: 0 };
        nextShoot = 300 + Math.random() * 400;
      }
      if (shoot) {
        shoot.x -= 9; shoot.y += 4.5; shoot.l++;
        var g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x + 90, shoot.y - 45);
        g.addColorStop(0, "rgba(255,255,255,.9)"); g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(shoot.x + 90, shoot.y - 45); ctx.stroke();
        ctx.lineWidth = 1;
        if (shoot.l > 70) shoot = null;
      }
      requestAnimationFrame(frame);
    })();
  }

  // ---- Cultural versions (v5–v8): layered mountains, mist, moon, petals ----
  var cultural = { v5: 1, v6: 1, v7: 1, v8: 1 }[theme];
  if (cultural) {
    var LAYERS = {
      v5: [{ c: "#2b3239", o: .10, b: .42, a: .34, f: 2.2, s: 1 }, { c: "#2b3239", o: .16, b: .60, a: .30, f: 3.0, s: 2 }, { c: "#20262b", o: .26, b: .80, a: .24, f: 3.8, s: 3 }],
      v6: [{ c: "#3f9a8e", o: .30, b: .40, a: .34, f: 2.2, s: 4 }, { c: "#2a79a0", o: .30, b: .58, a: .30, f: 3.0, s: 5 }, { c: "#1c6a66", o: .38, b: .78, a: .24, f: 3.8, s: 6 }],
      v7: [{ c: "#141b52", o: .85, b: .52, a: .30, f: 2.4, s: 7 }, { c: "#0d1342", o: .92, b: .70, a: .26, f: 3.2, s: 8 }, { c: "#070a2a", o: 1, b: .88, a: .20, f: 4.0, s: 9 }],
      v8: [{ c: "#c78fb8", o: .38, b: .46, a: .32, f: 2.2, s: 10 }, { c: "#a56aa0", o: .42, b: .64, a: .28, f: 3.0, s: 11 }, { c: "#7d4a88", o: .50, b: .82, a: .22, f: 3.8, s: 12 }]
    }[theme];

    function ridge(L) {
      var W = 1600, H = 400, d = "M0," + H;
      for (var x = 0; x <= W; x += 10) {
        var t = x / W * Math.PI * 2 * L.f;
        var h = Math.pow(Math.abs(Math.sin(t + L.s)), 1.4) * .6 + Math.pow(Math.abs(Math.sin(t * 2.3 + L.s * 1.7)), 1.2) * .3 + Math.sin(t * 5.1 + L.s) * .05 + .1;
        d += " L" + x + "," + (H * L.b + H * (1 - L.b) * 0 - L.a * H * h + L.a * H * .35).toFixed(1);
      }
      return d + " L" + W + "," + H + " Z";
    }

    var scene = document.createElement("div");
    scene.className = "scenery";
    var svg = '<svg viewBox="0 0 1600 400" preserveAspectRatio="none" aria-hidden="true">';
    LAYERS.forEach(function (L, i) {
      svg += '<g class="ly" data-k="' + (0.015 + i * 0.012) + '"><path d="' + ridge(L) + '" fill="' + L.c + '" fill-opacity="' + L.o + '"/></g>';
    });
    scene.innerHTML = svg + "</svg>";
    document.body.insertBefore(scene, document.body.firstChild);
    if (theme === "v5" || theme === "v6") {
      var mist = document.createElement("div");
      mist.className = "mist";
      document.body.insertBefore(mist, document.body.firstChild);
    }
    var sv = scene.querySelector("svg"), gs = scene.querySelectorAll(".ly");
    function parallax() {
      var y = window.scrollY;
      sv.style.transform = "translateX(" + (-(y * 0.02) % 120).toFixed(1) + "px)";
      for (var i = 0; i < gs.length; i++) gs[i].style.transform = "translate(" + (-y * gs[i].getAttribute("data-k") * 0.5).toFixed(1) + "px," + (y * 0.01 * i).toFixed(1) + "px)";
    }
    if (!reduce) { window.addEventListener("scroll", parallax, { passive: true }); parallax(); }

    // Moon + stars + fireflies (v7) / petals (v8)
    if ((theme === "v7" || theme === "v8") && !reduce) {
      var c2 = document.createElement("canvas");
      c2.id = "fxCanvas";
      document.body.insertBefore(c2, document.body.firstChild);
      var g = c2.getContext("2d"), W2, H2, items = [], t0 = 0;
      function sz() {
        var d = Math.min(window.devicePixelRatio || 1, 2);
        W2 = window.innerWidth; H2 = window.innerHeight;
        c2.width = W2 * d; c2.height = H2 * d;
        c2.style.width = W2 + "px"; c2.style.height = H2 + "px";
        g.setTransform(d, 0, 0, d, 0, 0);
        items = [];
        var i, n;
        if (theme === "v7") {
          n = Math.round(Math.min(160, W2 * H2 / 9000));
          for (i = 0; i < n; i++) items.push({ x: Math.random() * W2, y: Math.random() * H2 * .85, r: Math.random() * 1.2 + .3, ph: Math.random() * 6.3, sp: .01 + Math.random() * .03 });
          for (i = 0; i < 18; i++) items.push({ f: 1, x: Math.random() * W2, y: H2 * (.5 + Math.random() * .5), vx: (Math.random() - .5) * .3, vy: -.1 - Math.random() * .25, ph: Math.random() * 6.3 });
        } else {
          n = Math.round(Math.min(46, W2 / 36));
          for (i = 0; i < n; i++) items.push(petal(true));
        }
      }
      function petal(init) {
        return { x: Math.random() * W2, y: init ? Math.random() * H2 : -20, s: 5 + Math.random() * 7, vy: .5 + Math.random() * .9, sw: Math.random() * 6.3, swS: .01 + Math.random() * .02, rot: Math.random() * 6.3, vr: (Math.random() - .5) * .04, a: .55 + Math.random() * .4 };
      }
      sz();
      window.addEventListener("resize", sz);
      (function loop() {
        g.clearRect(0, 0, W2, H2);
        t0++;
        if (theme === "v7") {
          var sy = window.scrollY, max = Math.max(1, document.documentElement.scrollHeight - H2), p = Math.min(1, sy / max);
          var mx = W2 * .94, my = H2 * (.62 - p * .44), mr = Math.max(30, Math.min(W2, H2) * .06);
          g.globalAlpha = W2 < 1300 ? .45 : 1;
          var glow = g.createRadialGradient(mx, my, mr * .6, mx, my, mr * 5);
          glow.addColorStop(0, "rgba(255,240,190,.38)"); glow.addColorStop(1, "rgba(255,240,190,0)");
          g.fillStyle = glow; g.beginPath(); g.arc(mx, my, mr * 5, 0, 6.283); g.fill();
          var mg = g.createRadialGradient(mx - mr * .3, my - mr * .3, mr * .1, mx, my, mr);
          mg.addColorStop(0, "#fffbe8"); mg.addColorStop(1, "#f3dfa0");
          g.fillStyle = mg; g.beginPath(); g.arc(mx, my, mr, 0, 6.283); g.fill();
          g.fillStyle = "rgba(190,160,90,.25)";
          [[-.3, -.2, .22], [.25, .1, .16], [-.1, .35, .12]].forEach(function (c) { g.beginPath(); g.arc(mx + c[0] * mr, my + c[1] * mr, c[2] * mr, 0, 6.283); g.fill(); });
          g.globalAlpha = 1;
          for (var i = 0; i < items.length; i++) {
            var it = items[i];
            if (it.f) {
              it.x += it.vx + Math.sin(t0 * .02 + it.ph) * .25; it.y += it.vy; it.ph += .02;
              if (it.y < -10) { it.y = H2 + 10; it.x = Math.random() * W2; }
              var fa = .35 + .65 * (.5 + .5 * Math.sin(it.ph * 2));
              var fg = g.createRadialGradient(it.x, it.y, 0, it.x, it.y, 9);
              fg.addColorStop(0, "rgba(255,244,170," + fa + ")"); fg.addColorStop(1, "rgba(255,244,170,0)");
              g.fillStyle = fg; g.beginPath(); g.arc(it.x, it.y, 9, 0, 6.283); g.fill();
            } else {
              it.ph += it.sp;
              g.fillStyle = "rgba(236,230,255," + (.3 + .7 * (.5 + .5 * Math.sin(it.ph))) + ")";
              g.beginPath(); g.arc(it.x, it.y, it.r, 0, 6.283); g.fill();
            }
          }
        } else {
          for (var j = 0; j < items.length; j++) {
            var q = items[j];
            q.y += q.vy; q.sw += q.swS; q.x += Math.sin(q.sw) * .8 + .25; q.rot += q.vr;
            if (q.y > H2 + 20 || q.x > W2 + 20) { items[j] = petal(false); continue; }
            g.save(); g.translate(q.x, q.y); g.rotate(q.rot); g.globalAlpha = q.a;
            var pg = g.createLinearGradient(0, -q.s, 0, q.s);
            pg.addColorStop(0, "#ffd6df"); pg.addColorStop(1, "#f08fb0");
            g.fillStyle = pg;
            g.beginPath(); g.moveTo(0, -q.s); g.bezierCurveTo(q.s * .9, -q.s * .6, q.s * .8, q.s * .7, 0, q.s); g.bezierCurveTo(-q.s * .8, q.s * .7, -q.s * .9, -q.s * .6, 0, -q.s); g.fill();
            g.restore();
          }
        }
        requestAnimationFrame(loop);
      })();
    }
  }
})();
