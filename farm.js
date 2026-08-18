/**
 * 图兰的像素农场 v2 - 全升级版
 * Canvas 960×600，像素风格
 * 特性：双小人系统、天气昼夜、换装抽屉、对话气泡、自选地、彩蛋
 */

// ═══════════════════════════════════════════════════════
// 常量 & 配置
// ═══════════════════════════════════════════════════════
const W = 960, H = 600;

// 天气调色板
const WEATHER_PAL = {
  day: {
    skyTop:    '#87CEEB',
    skyBotm:   '#E0F0FF',
    grassDark: '#388E3C',
    grass:     '#4CAF50',
    grassBri:  '#66BB6A',
    dirt:      '#8b6914',
    dirtDark:  '#5c4410',
    road:      '#8d6e3f',
    mountain:  '#90A4AE',
  },
  night: {
    skyTop:    '#0a0015',
    skyBotm:   '#1a0030',
    grassDark: '#1e3d1a',
    grass:     '#1e3d1a',
    grassBri:  '#2d5a27',
    dirt:      '#5c4410',
    dirtDark:  '#3a2a08',
    road:      '#4a3020',
    mountain:  '#1a0e2a',
  },
  rain: {
    skyTop:    '#4a4a5a',
    skyBotm:   '#2a2a3a',
    grassDark: '#2d4a28',
    grass:     '#2d5a27',
    grassBri:  '#3a6a32',
    dirt:      '#7a5a10',
    dirtDark:  '#4a3808',
    road:      '#5a4030',
    mountain:  '#3a3a4a',
  },
};

const PAL = {
  red:     '#ff2442',
  redDark: '#cc1a33',
  gold:    '#f5c842',
  brown:   '#7a4f2c',
  brownDk: '#4a2e16',
  stone:   '#5a4a5a',
  stoneDk: '#3a2e3a',
  wood:    '#8b5e3c',
  woodDk:  '#5c3820',
  leafGrn: '#3a7a2a',
  leafBri: '#4a9a36',
  water:   '#2a6ab0',
  white:   '#f5e6d0',
  dim:     '#8b6676',
  black:   '#0d0608',
};

// 皮肤配置
const SKINS = {
  default: { name: '红衣少女', emoji: '👘', body: '#ff2442', pants: '#4a2030', hair: '#1a0810', accent: '#ff6b84' },
  sport:   { name: '运动达人', emoji: '🏃', body: '#2a6ab0', pants: '#1a3d6a', hair: '#1a0810', accent: '#4a8ad0' },
  reader:  { name: '读书少女', emoji: '📖', body: '#d4c098', pants: '#7a5a30', hair: '#2a1810', accent: '#e8d4a8' },
  formal:  { name: '职场精英', emoji: '💼', body: '#1a1a2e', pants: '#0d0d1a', hair: '#1a0810', accent: '#3a3a5a' },
};

// 作物配置
const CROP_TYPES = {
  A: { name: '樱花草', emoji: '🌸', color: '#ff9bc4', desc: '解锁图兰的旅行故事', unlock: `
<div class="travel-gallery">
  <p class="travel-intro">📍 走过的地方，留下的光 — 从四川出发，世界很大，都想去看看</p>
  <div class="travel-grid">
    <div class="travel-item"><img src="./travel_new1.jpg" alt="漂流"><span>漂流 · 哈哈哈哈哈 🚣</span></div>
    <div class="travel-item"><img src="./travel_new2.jpg" alt="瀑布前"><span>瀑布前，不顾形象地美 🌊</span></div>
    <div class="travel-item"><img src="./travel_new3.jpg" alt="蓝湖"><span>蓝到不真实的湖 💙</span></div>
    <div class="travel-item"><img src="./travel_new4.jpg" alt="雪山"><span>川西雪山，渺小又快乐 🏔️</span></div>
    <div class="travel-item"><img src="./travel1.jpg" alt="白塔雪山"><span>川西 · 白塔与雪山</span></div>
    <div class="travel-item"><img src="./travel3.jpg" alt="雨中探险"><span>雨中探险，透明雨衣战士 ☂️</span></div>
    <div class="travel-item"><img src="./travel4.jpg" alt="黄昏剪影"><span>黄昏剪影，去摘星星 🌙</span></div>
    <div class="travel-item"><img src="./travel6.jpg" alt="瀑布"><span>瀑布前的风 🌊</span></div>
  </div>
  <p class="travel-footer">「能走多远就走多远，攀岩攀的是岩，旅行攀的是山河」</p>
</div>` },
  B: { name: '面条苗', emoji: '🍜', color: '#f5c842', desc: '解锁图兰的厨艺日记', unlock: '图兰会做红烧肉！但最常做的还是泡面加蛋 😅' },
  C: { name: '相机花', emoji: '📸', color: '#a0c8ff', desc: '解锁图兰的生活相册', unlock: `
<div class="travel-gallery">
  <p class="travel-intro">📷 随手拍下的光 — 喜欢追日落，觉得美的瞬间就要按快门</p>
  <div class="travel-grid">
    <div class="travel-item"><img src="./camera1.jpg" alt="日落延时"><span>追着日落，一帧一帧看它沉下去 🌅</span></div>
    <div class="travel-item"><img src="./camera2.jpg" alt="晚霞大桥"><span>晚霞把桥都染成橙色了 🌉</span></div>
    <div class="travel-item"><img src="./travel2.jpg" alt="铁花表演"><span>夜里的铁花，像流星 ✨</span></div>
  </div>
  <p class="travel-footer">「光线最好看的时候，就是它快消失的时候」</p>
</div>` },
  D: { name: '咖啡豆', emoji: '☕', color: '#8b5e3c', desc: '解锁图兰的日常碎碎念', unlock: `
<div class="travel-gallery">
  <p class="travel-intro">☕ 日常碎片 — 写代码之外的图兰，也挺好玩的</p>
  <div class="travel-grid">
    <div class="travel-item"><img src="./daily1.jpg" alt="汉服写真"><span>汉服体验 · 古装美人 ✨ 图兰出没于古装现场</span></div>
    <div class="travel-item"><img src="./travel5.jpg" alt="喂猴子"><span>和小猴子拉手，它不拒绝我 🐒</span></div>
  </div>
  <p class="travel-footer">「代码写多了就去穿汉服，换个系统重启一下」</p>
</div>` },
  E: { name: '游戏草', emoji: '🎮', color: '#4a9a36', desc: '解锁图兰的娱乐清单', unlock: '图兰目前在玩... 好吧主要是宅着刷剧看小说，但 Switch 还是有的！' },
};

// 区域热区
const ZONES = {
  sports:   { x: 20,  y: 60,  w: 200, h: 200, name: '运动场' },
  cabin:    { x: 730, y: 60,  w: 210, h: 180, name: '图兰小屋' },
  bookshelf:{ x: 20,  y: 380, w: 180, h: 200, name: '书架角落' },
  ai_cabin: { x: 740, y: 360, w: 130, h: 120, name: 'AI小屋' },
  mailbox:  { x: 880, y: 400, w: 60,  h: 80,  name: '邮箱' },
};

// 5块固定菜地
const FIXED_PLOTS = [
  { id:1, x:250, y:240, w:82, h:70, emoji:'🌶️', name:'辣椒地',  desc:'图兰来自四川，说话温柔但代码有点辣 🌶️' },
  { id:2, x:345, y:240, w:82, h:70, emoji:'🍃', name:'茶叶地',  desc:'技术栈：Vue 主修，其他都是 Agent 帮写的（但我能看懂）' },
  { id:3, x:440, y:240, w:82, h:70, emoji:'📖', name:'书苗地',  desc:'资深小说党，睡前必看，书单随时互砸' },
  { id:4, x:535, y:240, w:82, h:70, emoji:'💪', name:'胡萝卜地', desc:'最近迷上攀岩，每条线路都是一道 bug 要推理' },
  { id:5, x:630, y:240, w:82, h:70, emoji:'🤖', name:'机器草地', desc:'正在探索 AI × 前端边界，本页面就是 Agent 帮做的' },
];

// 5块自选地（放在固定地下方）
const CUSTOM_PLOTS = [
  { id:6,  x:250, y:340, w:82, h:70 },
  { id:7,  x:345, y:340, w:82, h:70 },
  { id:8,  x:440, y:340, w:82, h:70 },
  { id:9,  x:535, y:340, w:82, h:70 },
  { id:10, x:630, y:340, w:82, h:70 },
];

const ALL_PLOTS = [...FIXED_PLOTS, ...CUSTOM_PLOTS];

// ═══════════════════════════════════════════════════════
// 游戏状态
// ═══════════════════════════════════════════════════════
const State = {
  skin: 'default',
  weather: 'day',   // 'day' | 'night' | 'rain'
  bgmOn: false,
  intimacy: 0,
  username: '访客',
  plots: [],
  scheduleData: [],  // 当前周日程缓存
  // 图兰主角
  turan: {
    x: 460, y: 350,
    vx: 0.5, vy: 0.25,
    frame: 0,
    frameTick: 0,
    facing: 1,
    action: 'walk',  // 'walk' | 'stand' | 'wave' | 'dance' | 'home'
    actionTimer: 0,
    homeMode: false, // 下雨时回家
    labelAlpha: 1,
  },
  // 访客小人
  visitor: {
    x: 80, y: 520,
    vx: 0, vy: 0,
    frame: 0,
    frameTick: 0,
    facing: 1,
  },
  // 对话气泡
  bubble: {
    text: '',
    timer: 0,
    streaming: false,
  },
  // 天气粒子
  rainDrops: [],
  fireflies: [],
  stars: [],
  birds: [],
  meteors: [],
  // 彩蛋
  fireworks: [],
  gardenerStreak: 0,   // 连续浇水计数
  gardenerTimer: 0,    // 勤劳园丁动画计时
  gardenerAnim: false,
  levelUpAnim: false,
  levelUpTimer: 0,
  prevLevel: -1,
  turanKeyBuffer: '',  // TURAN 彩蛋键盘输入
  danceMode: false,
  danceTimer: 0,
  // 换装抽屉
  drawerOpen: false,
  drawerX: W, // 抽屉动画位置（从右侧滑入）
  drawerSelected: 'default',
  time: 0,
  hoverZone: null,
  tooltip: '',
};

// 初始化星星
for (let i = 0; i < 60; i++) {
  State.stars.push({
    x: Math.random() * W,
    y: Math.random() * 80,
    r: Math.random(),
    twinkle: Math.random() * Math.PI * 2,
  });
}

// 初始化飞鸟
function resetBirds() {
  State.birds = [];
  const count = 2 + Math.floor(Math.random() * 2);
  for (let i = 0; i < count; i++) {
    State.birds.push({
      x: -40 - i * 80,
      y: 15 + Math.random() * 40,
      speed: 0.8 + Math.random() * 0.5,
      flapTimer: Math.random() * 20,
      wingUp: Math.random() > 0.5,
    });
  }
}
resetBirds();

// 初始化萤火虫
for (let i = 0; i < 12; i++) {
  State.fireflies.push({
    x: 230 + Math.random() * 480,
    y: 200 + Math.random() * 180,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.5,
    alpha: Math.random(),
    phase: Math.random() * Math.PI * 2,
  });
}

// 初始化雨滴
for (let i = 0; i < 120; i++) {
  State.rainDrops.push({
    x: Math.random() * W,
    y: Math.random() * H,
    speed: 6 + Math.random() * 4,
    len: 10 + Math.random() * 8,
  });
}

// ═══════════════════════════════════════════════════════
// Canvas 初始化 & 响应式缩放
// ═══════════════════════════════════════════════════════
let canvas, ctx, scale = 1, offsetX = 0, offsetY = 0;

function initCanvas() {
  canvas = document.getElementById('farm-canvas');
  ctx = canvas.getContext('2d');
  resize();
  window.addEventListener('resize', resize);
}

function resize() {
  const vw = window.innerWidth;
  const vh = window.innerHeight - 52;
  const scaleW = vw / W;
  const scaleH = vh / H;
  scale = Math.min(scaleW, scaleH);
  const cw = Math.round(W * scale);
  const ch = Math.round(H * scale);
  canvas.width  = cw;
  canvas.height = ch;
  canvas.style.width  = cw + 'px';
  canvas.style.height = ch + 'px';
  offsetX = Math.round((vw - cw) / 2);
  offsetY = 52;
  canvas.style.position = 'absolute';
  canvas.style.left = offsetX + 'px';
  canvas.style.top  = offsetY + 'px';
}

function toGame(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (clientX - rect.left) / scale,
    y: (clientY - rect.top)  / scale,
  };
}

// ═══════════════════════════════════════════════════════
// 像素绘制工具
// ═══════════════════════════════════════════════════════
function px(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x * scale), Math.round(y * scale),
               Math.max(1, Math.round(w * scale)), Math.max(1, Math.round(h * scale)));
}

function pxLine(x1, y1, x2, y2, color, lw = 1) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lw * scale;
  ctx.beginPath();
  ctx.moveTo(x1 * scale, y1 * scale);
  ctx.lineTo(x2 * scale, y2 * scale);
  ctx.stroke();
}

function pxText(text, x, y, size, color, align = 'left') {
  ctx.font = `${Math.round(size * scale)}px "Press Start 2P", monospace`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'top';
  ctx.fillText(text, x * scale, y * scale);
}

function pxEmoji(emoji, x, y, size) {
  ctx.font = `${Math.round(size * scale)}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, x * scale, y * scale);
}

function pxGrad(x, y, w, h, c1, c2, vertical = true) {
  const sx = x * scale, sy = y * scale, sw = w * scale, sh = h * scale;
  const grad = vertical
    ? ctx.createLinearGradient(sx, sy, sx, sy + sh)
    : ctx.createLinearGradient(sx, sy, sx + sw, sy);
  grad.addColorStop(0, c1);
  grad.addColorStop(1, c2);
  ctx.fillStyle = grad;
  ctx.fillRect(sx, sy, sw, sh);
}

// ═══════════════════════════════════════════════════════
// 地图绘制
// ═══════════════════════════════════════════════════════
function getCurrentPal() {
  return WEATHER_PAL[State.weather];
}

function drawBackground() {
  const pal = getCurrentPal();
  // 天空渐变
  pxGrad(0, 0, W, 85, pal.skyTop, pal.skyBotm);

  // 天气特效：太阳 / 月亮
  if (State.weather === 'day') {
    drawSun();
  } else if (State.weather === 'night') {
    drawMoon();
    drawStars();
  }

  // 远山
  const mountains = [
    [0,50,60,30],[40,42,80,38],[110,38,70,42],[170,44,90,36],
    [250,40,60,40],[800,38,70,42],[850,44,80,36],[900,40,80,40],
  ];
  for (const [x,y,w,h] of mountains) {
    px(x, y, w, h, pal.mountain);
  }

  // 草地
  px(0, 85, W, H-85, pal.grass);

  // 草地纹理
  for (let row = 0; row < 10; row++) {
    const y = 85 + row * 52;
    for (let col = 0; col < 20; col++) {
      if ((row + col) % 3 === 0) px(col*50, y, 48, 4, pal.grassDark);
    }
  }
  for (let i = 0; i < 40; i++) {
    const x = (i*127+30) % (W-20);
    const y = 95 + (i*53) % (H-120);
    px(x, y, 8, 2, pal.grassBri);
  }

  // 像素围栏（地图四周）
  drawFence();

  // 中间泥土小路
  pxGrad(460, 85, 40, H-85, pal.road, pal.dirtDark);
  pxGrad(230, 230, 500, 20, pal.dirtDark, pal.dirt, false);

  // 白天飞鸟 / 夜晚流星
  if (State.weather === 'day') {
    drawBirds();
  } else if (State.weather === 'night') {
    drawMeteors();
    drawFireflies();
  } else if (State.weather === 'rain') {
    drawRain();
  }
}

function drawSun() {
  const t = State.time;
  const sunX = W - 60, sunY = 18;
  // 光芒
  ctx.save();
  ctx.globalAlpha = 0.35 + 0.1 * Math.sin(t * 0.03);
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + t * 0.005;
    const r1 = 14 * scale, r2 = 22 * scale;
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2 * scale;
    ctx.beginPath();
    ctx.moveTo((sunX + Math.cos(angle) * 14) * scale, (sunY + Math.sin(angle) * 14) * scale);
    ctx.lineTo((sunX + Math.cos(angle) * 22) * scale, (sunY + Math.sin(angle) * 22) * scale);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.restore();
  // 太阳本体（像素风）
  px(sunX-9, sunY-9, 18, 18, '#FFA000');
  px(sunX-7, sunY-11, 14, 2, '#FFA000');
  px(sunX-11, sunY-7, 2, 14, '#FFA000');
  px(sunX-7, sunY+9, 14, 2, '#FFA000');
  px(sunX+9, sunY-7, 2, 14, '#FFA000');
  px(sunX-9, sunY-9, 18, 18, '#FFD700');
  px(sunX-7, sunY-7, 14, 14, '#FFEE58');
}

function drawMoon() {
  const moonX = W - 55, moonY = 18;
  px(moonX-8, moonY-8, 16, 16, '#e8e0d0');
  px(moonX-6, moonY-10, 12, 2, '#e8e0d0');
  px(moonX-10, moonY-6, 2, 12, '#e8e0d0');
  px(moonX-6, moonY+8, 12, 2, '#e8e0d0');
  px(moonX+8, moonY-6, 2, 12, '#e8e0d0');
  // 月面阴影
  px(moonX+1, moonY-5, 8, 12, '#c8c0b0');
  // 陨石坑
  px(moonX-4, moonY-3, 3, 3, '#b0a898');
  px(moonX+2, moonY+2, 2, 2, '#b0a898');
}

function drawStars() {
  for (const s of State.stars) {
    const alpha = 0.5 + 0.5 * Math.sin(s.twinkle + State.time * 0.02);
    ctx.globalAlpha = alpha;
    const size = s.r > 0.7 ? 2 : 1;
    px(s.x, s.y, size, size, '#ffffff');
    ctx.globalAlpha = 1;
  }
}

function drawMeteors() {
  for (const m of State.meteors) {
    ctx.globalAlpha = m.alpha;
    pxLine(m.x, m.y, m.x - m.len, m.y - m.len * 0.3, '#ffffff', 1);
    ctx.globalAlpha = 1;
  }
}

function drawBirds() {
  for (const b of State.birds) {
    if (b.x > W + 30) continue;
    // 像素鸟（简单V形）
    ctx.fillStyle = '#444';
    if (b.wingUp) {
      // 翅膀上
      px(b.x-6, b.y-3, 4, 2, '#333');
      px(b.x+2, b.y-3, 4, 2, '#333');
      px(b.x-2, b.y-1, 4, 2, '#555');
    } else {
      // 翅膀下
      px(b.x-6, b.y+1, 4, 2, '#333');
      px(b.x+2, b.y+1, 4, 2, '#333');
      px(b.x-2, b.y-1, 4, 2, '#555');
    }
    // 身体
    px(b.x-1, b.y-2, 2, 4, '#222');
  }
}

function drawFireflies() {
  for (const f of State.fireflies) {
    const alpha = 0.4 + 0.6 * Math.abs(Math.sin(f.phase + State.time * 0.04));
    ctx.globalAlpha = alpha;
    // 萤火虫光晕
    const grad = ctx.createRadialGradient(
      f.x * scale, f.y * scale, 0,
      f.x * scale, f.y * scale, 6 * scale
    );
    grad.addColorStop(0, 'rgba(255,255,100,0.9)');
    grad.addColorStop(1, 'rgba(255,255,100,0)');
    ctx.fillStyle = grad;
    ctx.fillRect((f.x-6)*scale, (f.y-6)*scale, 12*scale, 12*scale);
    ctx.globalAlpha = 1;
    px(f.x-1, f.y-1, 2, 2, '#ffff80');
  }
}

function drawRain() {
  ctx.globalAlpha = 0.55;
  ctx.strokeStyle = '#88aacc';
  ctx.lineWidth = 1 * scale;
  for (const d of State.rainDrops) {
    ctx.beginPath();
    ctx.moveTo(d.x * scale, d.y * scale);
    ctx.lineTo((d.x - 3) * scale, (d.y + d.len) * scale);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawFence() {
  const postColor = PAL.wood;
  const railColor = PAL.brownDk;
  // 上边围栏
  for (let x = 0; x < W; x += 20) {
    px(x, 86, 6, 14, postColor);
  }
  pxLine(0, 90, W, 90, railColor, 1.5);
  pxLine(0, 97, W, 97, railColor, 1.5);
  // 左边围栏
  for (let y = 86; y < H; y += 20) {
    px(0, y, 14, 6, postColor);
  }
  pxLine(4, 86, 4, H, railColor, 1.5);
  pxLine(11, 86, 11, H, railColor, 1.5);
  // 右边围栏
  for (let y = 86; y < H; y += 20) {
    px(W-14, y, 14, 6, postColor);
  }
  pxLine(W-4, 86, W-4, H, railColor, 1.5);
  pxLine(W-11, 86, W-11, H, railColor, 1.5);
  // 下边围栏
  for (let x = 0; x < W; x += 20) {
    px(x, H-14, 6, 14, postColor);
  }
  pxLine(0, H-10, W, H-10, railColor, 1.5);
  pxLine(0, H-4, W, H-4, railColor, 1.5);
}

function drawSportsZone() {
  const { x, y, w, h } = ZONES.sports;
  const pal = getCurrentPal();

  // 运动场底面（地面）
  px(x, y+h-20, w, 20, '#c8a060');
  // 跑道
  for (let i = 0; i < 3; i++) {
    px(x+4, y+h-20+i*6, w-8, 4, i===1 ? '#d4aa70' : '#c09050');
    if (i < 2) {
      // 跑道线
      for (let dash = 0; dash < w-8; dash += 16) {
        px(x+4+dash, y+h-20+i*6+1, 8, 1, 'rgba(255,255,255,0.4)');
      }
    }
  }

  // 篮球场地面
  px(x+8, y+30, w-16, h-60, '#c89040');
  // 篮球场线
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 1.5 * scale;
  ctx.setLineDash([]);
  ctx.strokeRect((x+8)*scale, (y+30)*scale, (w-16)*scale, (h-60)*scale);
  // 中圈
  ctx.beginPath();
  ctx.arc((x+w/2)*scale, (y+30+(h-60)/2)*scale, 22*scale, 0, Math.PI*2);
  ctx.stroke();
  // 中心点
  px(x+w/2-2, y+30+(h-60)/2-2, 4, 4, 'rgba(255,255,255,0.6)');

  // 篮球架（左侧）
  px(x+12, y+32, 4, 60, '#888');
  px(x+8, y+32, 12, 6, '#777');
  // 篮筐
  px(x+8, y+42, 18, 3, '#dd4400');
  px(x+8, y+45, 2, 8, '#dd4400');
  px(x+24, y+45, 2, 8, '#dd4400');
  // 网（简化）
  for (let i = 0; i < 4; i++) {
    pxLine(x+10+i*4, y+45, x+10+i*3+2, y+52, 'rgba(200,200,200,0.6)', 0.5);
  }

  // 篮球架（右侧）
  px(x+w-16, y+32, 4, 60, '#888');
  px(x+w-20, y+32, 12, 6, '#777');
  px(x+w-26, y+42, 18, 3, '#dd4400');
  px(x+w-26, y+45, 2, 8, '#dd4400');
  px(x+w-10, y+45, 2, 8, '#dd4400');
  for (let i = 0; i < 4; i++) {
    pxLine(x+w-24+i*4, y+45, x+w-24+i*3+2, y+52, 'rgba(200,200,200,0.6)', 0.5);
  }

  // 篮球（弹跳动画）
  const ballBounce = Math.abs(Math.sin(State.time * 0.06)) * 12;
  pxEmoji('🏀', x+w/2, y+h-32-ballBounce, 16);

  // 标牌
  px(x+w/2-40, y-14, 80, 14, PAL.brownDk);
  pxText('运动场', x+w/2, y-14, 10, PAL.gold, 'center');

  // 悬停高亮
  if (State.hoverZone === 'sports') {
    ctx.strokeStyle = PAL.red;
    ctx.lineWidth = 2 * scale;
    ctx.setLineDash([4*scale, 3*scale]);
    ctx.strokeRect(x*scale, y*scale, w*scale, h*scale);
    ctx.setLineDash([]);
  }
}

function drawCabin() {
  const { x, y, w, h } = ZONES.cabin;
  const isNight = State.weather === 'night';

  // 屋体
  px(x+10, y+60, w-20, h-60, PAL.wood);
  // 屋顶
  ctx.fillStyle = PAL.redDark;
  ctx.beginPath();
  ctx.moveTo((x+w/2)*scale, y*scale);
  ctx.lineTo(x*scale, (y+70)*scale);
  ctx.lineTo((x+w)*scale, (y+70)*scale);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = PAL.red;
  ctx.beginPath();
  ctx.moveTo((x+w/2)*scale, (y+4)*scale);
  ctx.lineTo((x+20)*scale, (y+70)*scale);
  ctx.lineTo((x+28)*scale, (y+70)*scale);
  ctx.closePath();
  ctx.fill();

  // 门
  px(x+w/2-12, y+100, 24, 40, PAL.brownDk);
  px(x+w/2-10, y+102, 20, 36, '#2a1810');
  px(x+w/2+4, y+118, 4, 4, PAL.gold);

  // 小花盆（门口装饰）
  px(x+w/2+18, y+128, 10, 12, '#cc5500');
  px(x+w/2+17, y+124, 12, 6, '#aa4400');
  pxEmoji('🌺', x+w/2+23, y+120, 10);

  // 窗户（左）
  px(x+18, y+80, 32, 28, PAL.brownDk);
  if (isNight) {
    // 夜晚窗户发光
    const glow = 0.6 + 0.4 * Math.sin(State.time * 0.03);
    ctx.globalAlpha = glow;
    px(x+20, y+82, 28, 24, '#ffd080');
    ctx.globalAlpha = 1;
    px(x+20, y+82, 13, 11, '#ffb040');
    px(x+34, y+82, 13, 11, '#ffd060');
    px(x+20, y+94, 13, 11, '#ffb040');
    px(x+34, y+94, 13, 11, '#ffc840');
    // 窗户光晕
    ctx.globalAlpha = 0.2 * glow;
    const lightGrad = ctx.createRadialGradient(
      (x+34)*scale, (y+95)*scale, 0,
      (x+34)*scale, (y+95)*scale, 40*scale
    );
    lightGrad.addColorStop(0, '#ffd080');
    lightGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = lightGrad;
    ctx.fillRect((x+14)*scale, (y+76)*scale, 40*scale, 38*scale);
    ctx.globalAlpha = 1;
  } else {
    px(x+20, y+82, 28, 24, '#1a2a4a');
    px(x+20, y+82, 13, 11, '#2a4a6a');
    px(x+34, y+82, 13, 11, '#2a4a6a');
    px(x+20, y+94, 13, 11, '#2a4a6a');
    px(x+34, y+94, 13, 11, '#2a4a6a');
  }

  // 窗户（右）
  px(x+w-50, y+80, 32, 28, PAL.brownDk);
  if (isNight) {
    const glow2 = 0.5 + 0.5 * Math.sin(State.time * 0.025 + 1);
    ctx.globalAlpha = glow2;
    px(x+w-48, y+82, 28, 24, '#ffd080');
    ctx.globalAlpha = 1;
    px(x+w-48, y+82, 13, 11, '#ffc840');
    px(x+w-34, y+82, 13, 11, '#ffb040');
  } else {
    px(x+w-48, y+82, 28, 24, '#1a2a4a');
    px(x+w-48, y+82, 13, 11, '#2a4a6a');
    px(x+w-34, y+82, 13, 11, '#2a4a6a');
  }

  // 烟囱
  px(x+w-40, y-20, 16, 30, PAL.stoneDk);
  px(x+w-42, y-22, 20, 8, PAL.stone);
  const smoke = (State.time % 120) / 120;
  ctx.globalAlpha = 0.4 * (1-smoke);
  px(x+w-34, y-30-smoke*20, 8, 8, '#aaaaaa');
  px(x+w-30, y-40-smoke*20, 6, 6, '#cccccc');
  ctx.globalAlpha = 1;

  // 路灯（夜晚发光）
  if (isNight) {
    drawLamppost(x-12, y+h-20);
    drawLamppost(x+w+2, y+h-20);
  }

  // 标牌
  px(x+w/2-42, y-14, 84, 14, PAL.brownDk);
  pxText('图兰小屋', x+w/2, y-14, 10, PAL.gold, 'center');

  // ── 状态牌（门口左下方）──
  drawStatusSign(x, y, w, h);

  if (State.hoverZone === 'cabin') {
    ctx.strokeStyle = PAL.red;
    ctx.lineWidth = 2*scale;
    ctx.setLineDash([4*scale, 3*scale]);
    ctx.strokeRect(x*scale, y*scale, w*scale, h*scale);
    ctx.setLineDash([]);
  }
}

// ───────────────────────────────────────────────────────
// 日程状态分析
// ───────────────────────────────────────────────────────

// 会议名抽象：隐去具体名称，保留类型
function abstractMeetingName(title) {
  if (!title) return '会议';
  const t = title;
  if (/晨会|早会|站会|scrum/i.test(t)) return '团队晨会';
  if (/周会|周例会|例会/i.test(t)) return '团队周会';
  if (/技术|tech|代码|review|cr/i.test(t)) return '技术会议';
  if (/评审|review|设计稿|需求评审/i.test(t)) return '评审会议';
  if (/排期|计划|planning/i.test(t)) return '排期会议';
  if (/1on1|1:1|one.on.one|单聊/i.test(t)) return '1on1';
  if (/面试|interview/i.test(t)) return '面试';
  if (/培训|training|分享|分享会/i.test(t)) return '培训分享';
  if (/复盘|总结|回顾/i.test(t)) return '复盘会议';
  if (/对齐|同步|sync/i.test(t)) return '对齐会议';
  return '工作会议';
}

function getTodayScheduleStatus() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd   = new Date(todayStart.getTime() + 24 * 3600 * 1000);

  // 过滤出今天的非全天日程
  const todayEvents = (State.scheduleData || []).filter(s => {
    if (s.allDay) return false;
    const b = new Date(s.begin);
    return b >= todayStart && b < todayEnd;
  }).sort((a, b) => new Date(a.begin) - new Date(b.begin));

  const h = now.getHours();

  // 波局 6：夜晚 22:00+
  if (h >= 22) {
    return { status: 'night', dialog: '这么晚还不睡？来浇个菜再走～', nextEvent: null };
  }

  // 波局 5：下班后 18:00+ 且无前置日程
  const futureEvents = todayEvents.filter(s => new Date(s.end) > now);
  if (h >= 18 && futureEvents.length === 0) {
    return { status: 'off_work', dialog: '今天收工了，来帮我浇浇菜吧 🌱', nextEvent: null };
  }

  // 波局 1：当前正在进行中的会议
  const ongoing = todayEvents.find(s => {
    const b = new Date(s.begin), e = new Date(s.end);
    return now >= b && now <= e;
  });
  if (ongoing) {
    const endTime = new Date(ongoing.end);
    const eh = endTime.getHours().toString().padStart(2, '0');
    const em = endTime.getMinutes().toString().padStart(2, '0');
    return {
      status: 'busy',
      dialog: `我在努力工作中 💻 ${abstractMeetingName(ongoing.title)}，${eh}:${em} 才有空哦`,
      nextEvent: ongoing,
    };
  }

  // 波局 2：30分钟内有会议
  const soonEvent = futureEvents.find(s => {
    const b = new Date(s.begin);
    return b > now && (b - now) <= 30 * 60 * 1000;
  });
  if (soonEvent) {
    const bh = new Date(soonEvent.begin).getHours().toString().padStart(2, '0');
    const bm = new Date(soonEvent.begin).getMinutes().toString().padStart(2, '0');
    return {
      status: 'soon',
      dialog: `快要开会了！趁现在来聊 😊 ${bh}:${bm} 开始`,
      nextEvent: soonEvent,
    };
  }

  // 波局 3：今日还有未开始的会议
  if (futureEvents.length > 0) {
    const next = futureEvents[0];
    const bh = new Date(next.begin).getHours().toString().padStart(2, '0');
    const bm = new Date(next.begin).getMinutes().toString().padStart(2, '0');
    const period = new Date(next.begin).getHours() < 12 ? '上午' : '下午';
    const otherPeriod = period === '上午' ? '下午' : '上午';
    return {
      status: 'free_later',
      dialog: `${otherPeriod}比较清闲，${bh}:${bm}才有会`,
      nextEvent: next,
    };
  }

  // 波局 4：今日无会
  return { status: 'free_today', dialog: '今天没有会，随时来找我玩 😊', nextEvent: null };
}

function getStatusSignConfig() {
  const s = getTodayScheduleStatus();
  const todayStart = new Date();
  todayStart.setHours(0,0,0,0);
  const todayEnd = new Date(todayStart.getTime() + 24 * 3600 * 1000);
  const todayMeetings = (State.scheduleData || []).filter(ev => {
    if (ev.allDay) return false;
    return new Date(ev.begin) >= todayStart && new Date(ev.begin) < todayEnd;
  });

  switch (s.status) {
    case 'busy':
      return { bg: '#4a3a00', border: '#febc2e', text: '会议中', textColor: '#febc2e' };
    case 'soon':
      return { bg: '#4a3a00', border: '#febc2e', text: '会议中', textColor: '#febc2e' };
    case 'off_work':
    case 'night':
      return { bg: '#1a1a3a', border: '#7a7fff', text: '下班了', textColor: '#7a7fff' };
    case 'free_today':
    case 'free_later': {
      // 今日≥ 4个会→连轴转
      if (todayMeetings.length >= 4) {
        return { bg: '#4a0a0a', border: '#ff5f57', text: '连轴转', textColor: '#ff5f57' };
      }
      return { bg: '#1a4a1a', border: '#28c840', text: '空闲中', textColor: '#28c840' };
    }
    default:
      return { bg: '#1a4a1a', border: '#28c840', text: '空闲中', textColor: '#28c840' };
  }
}

function drawStatusSign(cabinX, cabinY, cabinW, cabinH) {
  // 牌子位置：门口左侧
  const doorCenterX = cabinX + cabinW / 2;
  const sw = 60, sh = 28;
  const sx = doorCenterX - cabinW / 2 + 8;  // 小屋左侧偏内
  const sy = cabinY + cabinH - 50;          // 门口附近

  const cfg = getStatusSignConfig();

  // 状态牌：圆角矩形背景
  ctx.save();
  ctx.fillStyle = cfg.bg;
  const rx = sx * scale, ry = sy * scale, rw = sw * scale, rh = sh * scale;
  ctx.beginPath();
  ctx.roundRect(rx, ry, rw, rh, 4 * scale);
  ctx.fill();
  // 边框
  ctx.strokeStyle = cfg.border;
  ctx.lineWidth = 1.5 * scale;
  ctx.beginPath();
  ctx.roundRect(rx, ry, rw, rh, 4 * scale);
  ctx.stroke();
  // 文字
  ctx.font = `bold ${Math.round(7 * scale)}px "Press Start 2P", monospace`;
  ctx.fillStyle = cfg.textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(cfg.text, (sx + sw / 2) * scale, (sy + sh / 2) * scale);
  ctx.restore();

  // 存储状态牌区域到 State（下次 hover/click 用）
  State._statusSignBounds = { x: sx, y: sy, w: sw, h: sh };
}

function isHoverStatusSign(gx, gy) {
  const b = State._statusSignBounds;
  if (!b) return false;
  return gx >= b.x && gx <= b.x + b.w && gy >= b.y && gy <= b.y + b.h;
}

// ───────────────────────────────────────────────────────
// 今日日程弹窗
// ───────────────────────────────────────────────────────
function buildTodayScheduleModal() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd   = new Date(todayStart.getTime() + 24 * 3600 * 1000);

  const todayEvents = (State.scheduleData || []).filter(s => {
    if (s.allDay) return false;
    const b = new Date(s.begin);
    return b >= todayStart && b < todayEnd;
  }).sort((a, b) => new Date(a.begin) - new Date(b.begin));

  let eventsHtml = '';
  if (todayEvents.length === 0) {
    eventsHtml = '<div class="s-day-label" style="text-align:center;margin:12px 0">今日暂无日程 🌱</div>';
  } else {
    eventsHtml = todayEvents.map(s => {
      const b = new Date(s.begin), e = new Date(s.end);
      const bh = b.getHours().toString().padStart(2,'0');
      const bm = b.getMinutes().toString().padStart(2,'0');
      const eh = e.getHours().toString().padStart(2,'0');
      const em = e.getMinutes().toString().padStart(2,'0');
      const timeStr = `${bh}:${bm} ~ ${eh}:${em}`;
      let status = '';
      if (now >= b && now <= e) status = 'ongoing';
      else if (b > now && (b - now) <= 30 * 60 * 1000) status = 'soon';
      const badge = status === 'ongoing'
        ? '<span class="s-badge red">进行中</span>'
        : status === 'soon'
        ? '<span class="s-badge yellow">即将</span>' : '';
      return `<div class="schedule-item ${status}">`
        + `<span class="s-time">${timeStr}</span>`
        + `<span class="s-title">${abstractMeetingName(s.title)}</span>`
        + badge + '</div>';
    }).join('');
  }

  // 清明小结
  let summary = '';
  if (todayEvents.length === 0) {
    summary = '今天没有会议，随时可以找我聊 😊';
  } else {
    const lastEnd = todayEvents.reduce((m, s) => {
      const e = new Date(s.end);
      return e > m ? e : m;
    }, new Date(0));
    const lh = lastEnd.getHours().toString().padStart(2,'0');
    const lm = lastEnd.getMinutes().toString().padStart(2,'0');
    summary = `今天有 ${todayEvents.length} 个会，预计 ${lh}:${lm} 后有空`;
  }

  return `
  <div class="pixel-modal" id="today-schedule-modal" style="max-width:400px">
    <div class="modal-header">
      <h2>📅 图兰今天的日程</h2>
      <button class="modal-close">\xd7</button>
    </div>
    <div class="modal-body">
      <div class="schedule-list" style="max-height:300px">
        ${eventsHtml}
      </div>
      <hr class="pixel-divider">
      <div style="font-size:12px;color:#8b6676;text-align:center;line-height:2">${summary}</div>
    </div>
  </div>`;
}

function openTodayScheduleModal() {
  const overlay = document.getElementById('modal-overlay');
  const container = document.getElementById('modal-container');
  overlay.classList.add('visible');
  container.innerHTML = buildTodayScheduleModal();
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
}

// ───────────────────────────────────────────────────────
function drawLamppost(x, y) {
  // 灯柱
  px(x+2, y-50, 4, 50, '#666');
  px(x, y-52, 8, 6, '#888');
  // 灯头
  px(x-4, y-64, 16, 10, '#ffeb80');
  px(x-2, y-66, 12, 4, '#ffcc40');
  // 光晕
  const glow = 0.3 + 0.2 * Math.sin(State.time * 0.04);
  ctx.globalAlpha = glow;
  const grad = ctx.createRadialGradient(
    (x+4)*scale, (y-58)*scale, 0,
    (x+4)*scale, (y-58)*scale, 35*scale
  );
  grad.addColorStop(0, 'rgba(255,235,100,0.6)');
  grad.addColorStop(1, 'rgba(255,235,100,0)');
  ctx.fillStyle = grad;
  ctx.fillRect((x-30)*scale, (y-90)*scale, 70*scale, 70*scale);
  ctx.globalAlpha = 1;
}

function drawBookshelf() {
  const { x, y, w, h } = ZONES.bookshelf;
  px(x, y+20, w, h-20, PAL.brownDk);
  for (let shelf = 0; shelf < 3; shelf++) {
    px(x, y+20+shelf*56, w, 6, PAL.wood);
    const bookColors = ['#ff2442','#2a6ab0','#3aaa40','#f5c842','#8b40d0','#f0a020','#20c0a0','#ff6b84'];
    for (let b = 0; b < 8; b++) {
      const bx = x+4+b*22, by = y+26+shelf*56;
      const bw = 18, bh = 48;
      if (bx+bw > x+w) break;
      px(bx, by, bw, bh, bookColors[(shelf*8+b)%bookColors.length]);
      px(bx, by, 2, bh, 'rgba(255,255,255,0.2)');
      px(bx+4, by+8, bw-8, 1, 'rgba(0,0,0,0.3)');
      px(bx+4, by+12, bw-8, 1, 'rgba(0,0,0,0.3)');
    }
  }
  px(x, y, w, 24, PAL.wood);
  px(x, y+2, w, 4, PAL.brownDk);
  px(x+10, y-14, 80, 14, PAL.brownDk);
  pxText('书架角落', x+w/2, y-14, 10, PAL.gold, 'center');
  if (State.hoverZone === 'bookshelf') {
    ctx.strokeStyle = PAL.red;
    ctx.lineWidth = 2*scale;
    ctx.setLineDash([4*scale, 3*scale]);
    ctx.strokeRect(x*scale, y*scale, w*scale, h*scale);
    ctx.setLineDash([]);
  }
}

function drawAICabin() {
  const { x, y, w, h } = ZONES.ai_cabin;
  px(x, y+40, w, h-40, '#1a1a3a');
  ctx.fillStyle = '#2a2a5a';
  ctx.beginPath();
  ctx.moveTo((x+w/2)*scale, y*scale);
  ctx.lineTo(x*scale, (y+48)*scale);
  ctx.lineTo((x+w)*scale, (y+48)*scale);
  ctx.closePath();
  ctx.fill();
  const glow = 0.5 + 0.5*Math.sin(State.time*0.05);
  ctx.globalAlpha = 0.3 + glow*0.3;
  px(x+10, y+50, w-20, h-60, '#4040ff');
  ctx.globalAlpha = 1;
  px(x+w/2-18, y+50, 36, 30, '#0a0a2a');
  px(x+w/2-16, y+52, 32, 26, `rgba(40,80,200,${0.6+glow*0.4})`);
  pxText('AI', x+w/2-10, y+56, 9, `rgba(100,160,255,${0.8+glow*0.2})`, 'left');
  px(x+w/2-30, y-14, 60, 14, '#1a1a3a');
  pxText('AI小屋', x+w/2, y-14, 10, '#4080ff', 'center');
  if (State.hoverZone === 'ai_cabin') {
    ctx.strokeStyle = '#4080ff';
    ctx.lineWidth = 2*scale;
    ctx.setLineDash([4*scale, 3*scale]);
    ctx.strokeRect(x*scale, y*scale, w*scale, h*scale);
    ctx.setLineDash([]);
  }
}

function drawMailbox() {
  const { x, y, w, h } = ZONES.mailbox;
  px(x+w/2-3, y+40, 6, h-40, PAL.brown);
  px(x+2, y, w-4, 44, PAL.red);
  px(x+4, y+2, w-8, 18, '#ff4466');
  px(x+6, y+28, w-12, 6, PAL.black);
  pxEmoji('📮', x+w/2, y+18, 12);
  if (State.hoverZone === 'mailbox') {
    ctx.strokeStyle = PAL.red;
    ctx.lineWidth = 2*scale;
    ctx.setLineDash([4*scale, 3*scale]);
    ctx.strokeRect(x*scale, y*scale, w*scale, h*scale);
    ctx.setLineDash([]);
  }
}

// ═══════════════════════════════════════════════════════
// 菜地绘制（固定地 + 自选地）
// ═══════════════════════════════════════════════════════
// 公共地成长阶段（阈值20）
function getPublicStage(count) {
  if (count >= 20) return 'mature';
  if (count >= 15) return 'tall';
  if (count >= 10) return 'growing';
  if (count >= 5)  return 'sprout';
  return 'empty';
}

// 私人地成长阶段（阈值8）
function getPrivateStage(count) {
  if (count >= 8) return 'mature';
  if (count >= 6) return 'tall';
  if (count >= 4) return 'growing';
  if (count >= 2) return 'sprout';
  return 'empty';
}

function drawPlots() {
  // ── 公共菜园标题 ──
  const firstFixed = FIXED_PLOTS[0];
  const lastFixed = FIXED_PLOTS[FIXED_PLOTS.length - 1];
  const pubTitleX = (firstFixed.x + lastFixed.x + lastFixed.w) / 2;
  const pubTitleY = firstFixed.y - 30;
  ctx.save();
  ctx.font = `bold ${Math.round(11 * scale)}px "Press Start 2P", monospace`;
  ctx.fillStyle = PAL.gold;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('图兰的公共菜园', pubTitleX * scale, pubTitleY * scale);
  ctx.restore();

  // 固定地（公共菜园）
  for (const plot of FIXED_PLOTS) {
    const serverPlot = State.plots.find(p => p.id === plot.id);
    const waterCount = serverPlot ? serverPlot.water_count : 0;
    const stage = serverPlot ? serverPlot.stage : getPublicStage(0);
    drawSinglePlot(plot, stage, waterCount, false, null, null);
  }

  // ── 分隔线（虚线，PAL.gold）── 置于两排地块中间，Y取固定地底部+自选地顶部的中点
  const divY = Math.round((FIXED_PLOTS[0].y + FIXED_PLOTS[0].h + CUSTOM_PLOTS[0].y) / 2);
  const divX1 = FIXED_PLOTS[0].x - 4;
  const divX2 = FIXED_PLOTS[FIXED_PLOTS.length - 1].x + FIXED_PLOTS[FIXED_PLOTS.length - 1].w + 4;
  ctx.save();
  ctx.strokeStyle = PAL.gold;
  ctx.lineWidth = 1.5 * scale;
  ctx.setLineDash([6 * scale, 4 * scale]);
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(divX1 * scale, divY * scale);
  ctx.lineTo(divX2 * scale, divY * scale);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
  ctx.restore();

  // ── 私人小院标题 ── (上移16px，避免与地块重叠)
  const firstCustom = CUSTOM_PLOTS[0];
  const lastCustom = CUSTOM_PLOTS[CUSTOM_PLOTS.length - 1];
  const priTitleX = (firstCustom.x + lastCustom.x + lastCustom.w) / 2;
  const priTitleY = firstCustom.y - 8;   // 紧贴私人地顶部上方
  ctx.save();
  ctx.font = `bold ${Math.round(11 * scale)}px "Press Start 2P", monospace`;
  ctx.fillStyle = '#4aaa40';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('我的小院', priTitleX * scale, priTitleY * scale);
  ctx.restore();

  // 自选地（私人小院）
  for (const plot of CUSTOM_PLOTS) {
    const serverPlot = State.plots.find(p => p.id === plot.id);
    const waterCount = serverPlot ? serverPlot.water_count : 0;
    const stage = serverPlot ? serverPlot.stage : getPrivateStage(0);
    const cropType = serverPlot ? serverPlot.crop_type : null;
    const lastWaterer = serverPlot ? serverPlot.last_waterer : null;
    drawSinglePlot(plot, stage, waterCount, true, cropType, lastWaterer);
  }
}

function drawSinglePlot(plot, stage, waterCount, isCustom, cropType, lastWaterer) {
  const hov = State.hoverZone === ('plot_' + plot.id);
  const pal = getCurrentPal();

  // 土地底色
  px(plot.x, plot.y, plot.w, plot.h, pal.dirtDark);
  px(plot.x+2, plot.y+2, plot.w-4, plot.h-4, pal.dirt);
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if ((row+col)%2===0) px(plot.x+4+col*24, plot.y+4+row*20, 20, 16, '#9a7020');
    }
  }

  // 围栏
  for (let fx = plot.x; fx < plot.x+plot.w; fx += 12) {
    px(fx, plot.y-6, 4, 8, PAL.wood);
    px(fx, plot.y+plot.h, 4, 8, PAL.wood);
  }
  pxLine(plot.x, plot.y-2, plot.x+plot.w, plot.y-2, PAL.wood, 1);
  pxLine(plot.x, plot.y+plot.h+4, plot.x+plot.w, plot.y+plot.h+4, PAL.wood, 1);

  if (isCustom) {
    drawCustomPlantContent(plot, stage, waterCount, cropType, lastWaterer);
  } else {
    drawFixedPlant(plot, stage, waterCount);
  }

  // 夜晚路灯效果（菜地旁）
  if (State.weather === 'night') {
    const glow = 0.08 + 0.04 * Math.sin(State.time * 0.04 + plot.id);
    ctx.globalAlpha = glow;
    px(plot.x, plot.y, plot.w, plot.h, '#ffdd80');
    ctx.globalAlpha = 1;
  }

  // ── 进度条（双区，公共金色/私人绿色）──
  const threshold = isCustom ? 8 : 20;
  const barColor = isCustom ? '#4aaa40' : PAL.gold;
  const barW = plot.w - 8;
  const barH = 5;
  const barX = plot.x + 4;
  const barY = plot.y + plot.h - 9;
  // 背景
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(barX * scale, barY * scale, barW * scale, barH * scale);
  // 进度
  const progress = Math.min(waterCount / threshold, 1);
  ctx.fillStyle = barColor;
  ctx.fillRect(barX * scale, barY * scale, barW * progress * scale, barH * scale);
  // 文字
  ctx.font = `${Math.round(7 * scale)}px "Press Start 2P", monospace`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${waterCount}/${threshold}`, (plot.x + plot.w/2) * scale, (barY + barH/2) * scale);

  // 悬停高亮
  if (hov) {
    ctx.strokeStyle = PAL.gold;
    ctx.lineWidth = 2*scale;
    ctx.setLineDash([3*scale, 2*scale]);
    ctx.strokeRect(plot.x*scale, plot.y*scale, plot.w*scale, plot.h*scale);
    ctx.setLineDash([]);
    const tip = isCustom && !cropType ? '🌱 点击种植' : '💧 点击浇水+10亲密';
    pxText(tip, plot.x+plot.w/2, plot.y-22, 9, PAL.white, 'center');
  }

  // 成熟标记
  if (stage === 'mature') {
    const pulse = 0.7 + 0.3 * Math.sin(State.time*0.08);
    ctx.globalAlpha = pulse;
    pxText('✨', plot.x+plot.w-14, plot.y+2, 10, PAL.gold, 'left');
    ctx.globalAlpha = 1;
  }
}

function drawCustomPlantContent(plot, stage, waterCount, cropType, lastWaterer) {
  const cx = plot.x + plot.w / 2;
  const cy = plot.y + plot.h / 2;
  if (!cropType) {
    // 空地提示
    px(cx-16, cy-8, 32, 14, 'rgba(0,0,0,0.5)');
    pxText('空地', cx, cy-8, 10, '#aaaaaa', 'center');
    pxText('种植', cx, cy+5, 9, '#888888', 'center');
  } else {
    const crop = CROP_TYPES[cropType];
    if (crop) {
      drawCustomPlant(plot, stage, waterCount, cropType, crop);
    }
  }
}

function drawCustomPlant(plot, stage, waterCount, cropType, crop) {
  const cx = plot.x + plot.w / 2;
  const cy = plot.y + plot.h / 2 + 4;
  const wave = Math.sin(State.time * 0.04 + plot.id) * 2;

  const stemH = stage === 'sprout' ? 10 : stage === 'growing' ? 20 : 28;
  px(cx-2, cy+4, 4, stemH, '#3a6a20');

  if (stage === 'sprout') {
    px(cx-5, cy, 10, 7, '#5aaa30');
  } else if (stage === 'growing') {
    px(cx-8, cy-4, 16, 10, '#4a9020');
    pxEmoji(crop.emoji, cx, cy-12, 12);
  } else {
    for (let i = 0; i < 4; i++) {
      px(cx-10+i*5+wave, cy-8, 6, 12, '#3a8020');
    }
    pxEmoji(crop.emoji, cx, cy-18+wave, 18);
  }
}

function drawFixedPlant(plot, stage, waterCount) {
  const cx = plot.x + plot.w / 2;
  const cy = plot.y + plot.h / 2 + 4;
  const wave = Math.sin(State.time * 0.04 + plot.id) * 2;

  if (stage === 'empty') {
    px(cx-6, cy-4, 12, 8, '#7a5010');
    return;
  }
  const stemH = stage === 'sprout' ? 12 : stage === 'growing' ? 22 : 30;
  px(cx-2, cy+6, 4, stemH, '#3a6a20');

  switch (plot.id) {
    case 1: // 辣椒
      if (stage === 'sprout') {
        px(cx-6, cy, 12, 8, '#5aaa30');
      } else if (stage === 'growing') {
        px(cx-8, cy-4, 16, 12, '#4a9020');
        px(cx-3, cy-10, 6, 8, '#ff4020');
      } else {
        px(cx-10, cy-8, 20, 14, '#3a8020');
        px(cx-4, cy-18+wave, 8, 18, '#ff2020');
        px(cx+2, cy-14+wave, 6, 14, '#ff4020');
        px(cx-8, cy-10+wave, 5, 12, '#cc1010');
      }
      break;
    case 2: // 茶叶
      if (stage === 'sprout') {
        px(cx-5, cy-4, 10, 8, '#3a8a20');
      } else if (stage === 'growing') {
        for (let i = 0; i < 5; i++) px(cx-12+i*6+wave, cy-8-i%2*4, 6, 10, '#3a9a20');
      } else {
        for (let i = 0; i < 8; i++) {
          const lx = cx-18+i*6+wave, ly = cy-10-(i%3)*3;
          px(lx, ly, 8, 12, '#2a8a10');
          px(lx+1, ly+1, 4, 6, '#4aaa30');
        }
      }
      break;
    case 3: // 书苗
      if (stage === 'sprout') {
        px(cx-6, cy-4, 12, 10, '#8a9a50');
      } else if (stage === 'growing') {
        px(cx-8, cy-8, 16, 14, '#7a8a40');
        px(cx-6, cy-10, 12, 4, '#d4c098');
      } else {
        px(cx-10, cy-16+wave, 20, 16, '#d4c098');
        px(cx-9, cy-15+wave, 18, 14, '#c4a070');
        px(cx-10, cy-16+wave, 2, 16, '#8a6040');
        px(cx-8, cy-13+wave, 16, 1, '#b09060');
        px(cx-8, cy-10+wave, 16, 1, '#b09060');
        px(cx-8, cy-7+wave, 16, 1, '#b09060');
      }
      break;
    case 4: // 胡萝卜
      if (stage === 'sprout') {
        px(cx-4, cy-4, 8, 10, '#4aaa20');
      } else if (stage === 'growing') {
        px(cx-6, cy-6, 12, 14, '#5abc30');
        px(cx-2, cy+4, 4, 8, '#f07020');
      } else {
        for (let leaf = 0; leaf < 4; leaf++) px(cx-8+leaf*6+wave, cy-14, 4, 18, '#4aaa20');
        ctx.fillStyle = '#f07020';
        ctx.beginPath();
        ctx.moveTo((cx-5)*scale, (cy+2)*scale);
        ctx.lineTo((cx+5)*scale, (cy+2)*scale);
        ctx.lineTo(cx*scale, (cy+20)*scale);
        ctx.closePath();
        ctx.fill();
        px(cx-4, cy+2, 8, 4, '#f08030');
      }
      break;
    case 5: // 机器草
      if (stage === 'sprout') {
        px(cx-4, cy-4, 8, 8, '#4040aa');
      } else if (stage === 'growing') {
        px(cx-8, cy-12, 16, 12, '#4040aa');
        px(cx-6, cy-10, 12, 8, '#6060cc');
        px(cx-5, cy-8, 4, 4, '#80ffff');
        px(cx+1, cy-8, 4, 4, '#80ffff');
      } else {
        px(cx-10, cy-20+wave, 20, 16, '#3030aa');
        px(cx-8, cy-18+wave, 16, 12, '#5050cc');
        px(cx-7, cy-15+wave, 5, 5, `rgba(0,255,255,${0.7+0.3*Math.sin(State.time*0.1)})`);
        px(cx+2, cy-15+wave, 5, 5, `rgba(0,255,255,${0.7+0.3*Math.sin(State.time*0.1+1)})`);
        px(cx-1, cy-26+wave, 2, 8, '#8080dd');
        px(cx-3, cy-28+wave, 6, 4, '#a0a0ff');
        px(cx-8, cy-4, 16, 14, '#2a2a80');
        ctx.globalAlpha = 0.5+0.5*Math.sin(State.time*0.12);
        px(cx-8, cy-4, 16, 1, '#6060ff');
        ctx.globalAlpha = 1;
      }
      break;
  }
}

// ═══════════════════════════════════════════════════════
// 图兰小人（主角，24×36 精细像素绘制）
// ═══════════════════════════════════════════════════════
function drawTuran() {
  const c = State.turan;
  if (c.homeMode) return; // 下雨时进屋后不显示

  const skin = SKINS[State.skin];
  const f = c.frame;
  const scaleX = c.facing;
  const x = c.x - 12, y = c.y - 36;

  ctx.save();
  if (scaleX === -1) {
    ctx.translate(c.x * 2 * scale, 0);
    ctx.scale(-1, 1);
  }

  // 阴影
  ctx.globalAlpha = 0.25;
  px(x+3, y+34, 18, 5, '#000');
  ctx.globalAlpha = 1;

  // 黑色长发（更漂亮：3px宽下垂）
  // 头顶刘海
  px(x+4, y, 16, 4, skin.hair);
  px(x+2, y+2, 20, 3, skin.hair);
  // 两侧垂发
  px(x+2, y+2, 3, 22, skin.hair); // 左侧垂发
  px(x+19, y+2, 3, 22, skin.hair); // 右侧垂发
  // 后背长发
  px(x+4, y+2, 16, 28, skin.hair); // 宽发帘
  px(x+3, y+16, 4, 16, skin.hair); // 左侧延伸
  px(x+17, y+16, 4, 16, skin.hair); // 右侧延伸

  // 脸（白色肤色，精细化）
  px(x+5, y+4, 14, 11, '#f5e8d8');
  // 腮红
  ctx.globalAlpha = 0.4;
  px(x+5, y+11, 3, 2, '#ffb0b0');
  px(x+16, y+11, 3, 2, '#ffb0b0');
  ctx.globalAlpha = 1;

  // 眉毛
  px(x+7, y+5, 4, 1, '#3a2010');
  px(x+13, y+5, 4, 1, '#3a2010');

  // 眼睛（动态眨眼）
  if (State.time % 200 < 190) {
    // 睁眼
    px(x+7, y+7, 3, 3, '#1a0810');
    px(x+14, y+7, 3, 3, '#1a0810');
    // 眼睛高光
    px(x+8, y+7, 1, 1, '#ffffff');
    px(x+15, y+7, 1, 1, '#ffffff');
    // 睫毛
    px(x+7, y+6, 3, 1, '#1a0810');
    px(x+14, y+6, 3, 1, '#1a0810');
  } else {
    // 闭眼
    px(x+7, y+8, 3, 1, '#1a0810');
    px(x+14, y+8, 3, 1, '#1a0810');
  }

  // 嘴巴（笑容）
  px(x+9, y+12, 6, 2, '#e0706a');
  px(x+9, y+13, 1, 1, '#e0706a');
  px(x+14, y+13, 1, 1, '#e0706a');

  // 颈部
  px(x+9, y+15, 6, 4, '#f5e8d8');

  // 身体（裙装，图兰标志红色）
  // 上衣/裙子
  px(x+4, y+19, 16, 10, skin.body);
  px(x+3, y+21, 18, 8, skin.body);
  // 裙子展开
  px(x+2, y+27, 20, 6, skin.body);
  px(x+1, y+31, 22, 5, skin.body);
  // 裙摆
  px(x+0, y+33, 24, 4, skin.body);
  // 衣领装饰
  px(x+9, y+19, 6, 2, '#ffffff');
  // 腰带
  px(x+3, y+27, 18, 2, skin.accent);

  // 皮肤特殊细节
  if (State.skin === 'reader') {
    px(x+20, y+21, 8, 10, '#d4c098');
    px(x+21, y+22, 6, 8, '#c4a070');
    px(x+20, y+21, 1, 10, '#8a6040');
  }
  if (State.skin === 'formal') {
    px(x+10, y+19, 4, 10, PAL.red); // 领带
    px(x+4, y+19, 16, 3, '#2a2a4a'); // 衣领
  }

  // 手臂动画
  let armSwingL = 0, armSwingR = 0;
  if (c.action === 'wave' || c.action === 'dance') {
    const waveAng = Math.sin(State.time * 0.2) * 8;
    armSwingL = waveAng;
    armSwingR = -waveAng;
  } else {
    armSwingL = f < 2 ? 3 : -3;
    armSwingR = f < 2 ? -3 : 3;
  }
  // 左手臂
  px(x+1, y+20+armSwingL, 3, 9, skin.body);
  px(x+1, y+28+armSwingL, 3, 3, '#f5e8d8'); // 手
  // 右手臂（下雨时举伞）
  if (State.weather === 'rain') {
    px(x+20, y+18, 3, 9, skin.body);
    // 小雨伞
    pxEmoji('☂️', x+22, y+10, 14);
  } else {
    px(x+20, y+20+armSwingR, 3, 9, skin.body);
    px(x+20, y+28+armSwingR, 3, 3, '#f5e8d8');
  }

  // 腿
  const legOffset = f < 2 ? 2 : -2;
  if (c.action === 'stand' || c.action === 'wave') {
    px(x+5, y+35, 6, 6, '#4a3060');
    px(x+13, y+35, 6, 6, '#4a3060');
  } else {
    px(x+5, y+35+legOffset, 6, 6, skin.pants || '#4a3060');
    px(x+13, y+35-legOffset, 6, 6, skin.pants || '#4a3060');
  }
  // 鞋子
  px(x+4, y+40+legOffset, 7, 3, '#3a2010');
  px(x+13, y+40-legOffset, 7, 3, '#3a2010');

  ctx.restore();

  // 头顶标签「图兰 ✨」
  drawCharLabel(c.x, y-2, '图兰 ✨', '#ff2442');

  // 对话气泡
  if (State.bubble.text && State.bubble.timer > 0) {
    drawBubble(c.x, y-14);
  }
}

function drawCharLabel(cx, y, text, color) {
  const labelW = text.length * 6 + 10;
  // 背景框
  px(cx - labelW/2, y - 12, labelW, 11, 'rgba(0,0,0,0.7)');
  ctx.strokeStyle = color;
  ctx.lineWidth = 1 * scale;
  ctx.strokeRect((cx-labelW/2)*scale, (y-12)*scale, labelW*scale, 11*scale);
  pxText(text, cx, y - 12, 6, color, 'center');
}

// ═══════════════════════════════════════════════════════
// 访客小人（20×30，蓝绿系）
// ═══════════════════════════════════════════════════════
function drawVisitor() {
  const v = State.visitor;
  const x = v.x - 10, y = v.y - 30;
  const f = v.frame;

  ctx.save();
  if (v.facing === -1) {
    ctx.translate(v.x * 2 * scale, 0);
    ctx.scale(-1, 1);
  }

  // 阴影
  ctx.globalAlpha = 0.2;
  px(x+2, y+28, 16, 4, '#000');
  ctx.globalAlpha = 1;

  // 圆头（蓝绿系）
  px(x+3, y, 14, 12, '#2a8a9a');
  px(x+2, y+2, 16, 10, '#3a9aaa');
  // 圆头圆弧顶
  px(x+5, y-1, 10, 3, '#3a9aaa');
  px(x+4, y-2, 12, 2, '#3a9aaa');

  // 头发（短发）
  px(x+3, y, 14, 3, '#1a5060');
  px(x+2, y+1, 2, 5, '#1a5060');
  px(x+16, y+1, 2, 5, '#1a5060');

  // 眼睛
  if (State.time % 180 < 170) {
    px(x+5, y+4, 2, 2, '#0a2030');
    px(x+11, y+4, 2, 2, '#0a2030');
    px(x+5, y+4, 1, 1, '#ffffff');
    px(x+11, y+4, 1, 1, '#ffffff');
  } else {
    px(x+5, y+5, 2, 1, '#0a2030');
    px(x+11, y+5, 2, 1, '#0a2030');
  }
  // 嘴
  px(x+7, y+8, 4, 1, '#2a6070');

  // 颈
  px(x+7, y+12, 6, 3, '#3a9aaa');

  // 身体（蓝绿色）
  px(x+3, y+15, 14, 10, '#2a7a8a');
  px(x+2, y+17, 16, 8, '#2a7a8a');
  // 衬衫领口
  px(x+7, y+15, 6, 2, '#4aaabb');

  // 手臂
  const armSwing = f < 2 ? 2 : -2;
  px(x+0, y+16+armSwing, 3, 7, '#2a7a8a');
  px(x+17, y+16-armSwing, 3, 7, '#2a7a8a');

  // 雨伞（下雨时）
  if (State.weather === 'rain') {
    pxEmoji('☂️', x+18, y+8, 14);
  }

  // 裤子（深蓝）
  px(x+3, y+25, 6, 6, '#1a3a5a');
  px(x+11, y+25, 6, 6, '#1a3a5a');
  // 腿
  const legOff = f < 2 ? 2 : -2;
  px(x+3, y+28+legOff, 6, 4, '#1a3a5a');
  px(x+11, y+28-legOff, 6, 4, '#1a3a5a');
  // 鞋
  px(x+2, y+31+legOff, 8, 2, '#0a1a30');
  px(x+11, y+31-legOff, 8, 2, '#0a1a30');

  ctx.restore();

  // 访客标签
  const labelText = State.username ? State.username.slice(0,6) : '访客';
  drawCharLabel(v.x, y-2, labelText, '#2a9ab0');
}

// ═══════════════════════════════════════════════════════
// 对话气泡
// ═══════════════════════════════════════════════════════
function drawBubble(cx, topY) {
  const text = State.bubble.text;
  if (!text) return;

  // 测量文字宽度
  ctx.font = `${Math.round(9 * scale)}px "Press Start 2P", monospace`;
  const lines = wrapText(text, 28);
  const maxW = lines.reduce((m, l) => Math.max(m, ctx.measureText(l).width / scale), 0);
  const bw = Math.max(maxW + 20, 60);
  const bh = lines.length * 10 + 14;
  const bx = cx - bw/2;
  const by = topY - bh - 10;

  // 气泡背景
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.strokeStyle = '#ff2442';
  ctx.lineWidth = 1.5 * scale;
  const rx = bx*scale, ry = by*scale, rw = bw*scale, rh = bh*scale;
  ctx.beginPath();
  ctx.roundRect(rx, ry, rw, rh, 4*scale);
  ctx.fill();
  ctx.stroke();

  // 尖角
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.strokeStyle = '#ff2442';
  ctx.lineWidth = 1.5 * scale;
  ctx.beginPath();
  ctx.moveTo((cx-5)*scale, (by+bh)*scale);
  ctx.lineTo(cx*scale, (by+bh+8)*scale);
  ctx.lineTo((cx+5)*scale, (by+bh)*scale);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 文字
  ctx.fillStyle = '#1a0810';
  ctx.font = `${Math.round(9 * scale)}px "Press Start 2P", monospace`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], (bx+10)*scale, (by+8+i*10)*scale);
  }
}

function wrapText(text, maxChars) {
  const words = text;
  const lines = [];
  let line = '';
  for (const ch of words) {
    line += ch;
    if (line.length >= maxChars) {
      lines.push(line);
      line = '';
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ═══════════════════════════════════════════════════════
// 换装抽屉
// ═══════════════════════════════════════════════════════
function drawSkinDrawer() {
  if (!State.drawerOpen && State.drawerX >= W) return;

  const dw = 200, dh = H - 52;
  const dx = State.drawerX;

  // 抽屉背景
  ctx.fillStyle = 'rgba(26,8,16,0.97)';
  ctx.fillRect(dx*scale, 0, dw*scale, dh*scale);
  ctx.strokeStyle = PAL.red;
  ctx.lineWidth = 2*scale;
  ctx.strokeRect(dx*scale, 0, dw*scale, dh*scale);

  // 标题
  px(dx, 0, dw, 22, '#cc1a33');
  pxText('👗 换装', dx+10, 5, 8, '#fff');

  // 4套皮肤预览
  const skinKeys = Object.keys(SKINS);
  skinKeys.forEach((key, i) => {
    const skin = SKINS[key];
    const itemY = 34 + i * 90;
    const isSelected = State.drawerSelected === key;

    // 高亮框
    if (isSelected) {
      px(dx+8, itemY-2, dw-16, 84, 'rgba(245,200,66,0.15)');
      ctx.strokeStyle = PAL.gold;
      ctx.lineWidth = 2*scale;
      ctx.strokeRect((dx+8)*scale, (itemY-2)*scale, (dw-16)*scale, 84*scale);
    } else {
      ctx.strokeStyle = 'rgba(255,36,66,0.3)';
      ctx.lineWidth = 1*scale;
      ctx.strokeRect((dx+8)*scale, (itemY-2)*scale, (dw-16)*scale, 84*scale);
    }

    // 小人预览（简化版）
    drawMiniSkinPreview(dx+22, itemY+8, key, skin);

    // 名称和 emoji
    pxText(skin.emoji, dx+70, itemY+14, 20, '#fff');
    pxText(skin.name, dx+88, itemY+12, 10, isSelected ? PAL.gold : PAL.white);
    if (isSelected) {
      pxText('✓已选', dx+88, itemY+24, 7, PAL.gold);
    }

    // 点击区域标记
    State[`_drawerItem_${i}`] = { x: dx+8, y: itemY-2, w: dw-16, h: 84, key };
  });

  // 关闭提示
  pxText('点击空白处关闭', dx+dw/2, dh-18, 8, PAL.dim, 'center');
}

function drawMiniSkinPreview(x, y, skinKey, skin) {
  const pw = 32, ph = 48;
  // 小背景
  px(x, y, pw, ph, 'rgba(0,0,0,0.4)');

  // 迷你小人
  // 发
  px(x+8, y+2, 16, 3, skin.hair);
  px(x+6, y+3, 3, 14, skin.hair);
  px(x+23, y+3, 3, 14, skin.hair);
  // 脸
  px(x+9, y+5, 14, 10, '#f5e8d8');
  // 眼
  px(x+11, y+7, 2, 2, '#1a0810');
  px(x+19, y+7, 2, 2, '#1a0810');
  // 颈
  px(x+13, y+15, 6, 3, '#f5e8d8');
  // 身体（裙）
  px(x+7, y+18, 18, 8, skin.body);
  px(x+5, y+24, 22, 6, skin.body);
  px(x+4, y+28, 24, 4, skin.body);
  // 腿
  px(x+8, y+32, 6, 8, skin.pants || '#4a3060');
  px(x+18, y+32, 6, 8, skin.pants || '#4a3060');
  // 鞋
  px(x+7, y+39, 7, 3, '#3a2010');
  px(x+18, y+39, 7, 3, '#3a2010');
}

// ═══════════════════════════════════════════════════════
// 彩蛋特效
// ═══════════════════════════════════════════════════════
function drawFireworks() {
  for (const fw of State.fireworks) {
    for (const p of fw.particles) {
      ctx.globalAlpha = p.life / p.maxLife;
      px(p.x, p.y, 3, 3, p.color);
      ctx.globalAlpha = 1;
    }
  }
}

function spawnFirework(x, y) {
  const colors = ['#ff2442','#f5c842','#4aaa40','#4080ff','#ff8040','#cc40ff','#40ffcc'];
  const particles = [];
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const speed = 1 + Math.random() * 3;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 60, maxLife: 60,
    });
  }
  State.fireworks.push({ particles });
}

function triggerFireworks() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      spawnFirework(100 + Math.random() * (W - 200), 80 + Math.random() * 200);
    }, i * 300);
  }
}

function drawGardenerAnim() {
  if (!State.gardenerAnim) return;
  const alpha = Math.min(1, State.gardenerTimer / 20);
  const fadeOut = State.gardenerTimer > 100 ? 1 - (State.gardenerTimer - 100) / 50 : 1;
  ctx.globalAlpha = alpha * fadeOut;
  // 横幅背景
  px(W/2-100, H/2-20, 200, 36, 'rgba(26,8,16,0.9)');
  ctx.strokeStyle = PAL.gold;
  ctx.lineWidth = 2*scale;
  ctx.strokeRect((W/2-100)*scale, (H/2-20)*scale, 200*scale, 36*scale);
  pxText('🌱 勤劳园丁！', W/2, H/2-14, 8, PAL.gold, 'center');
  pxText('连续浇水3块地', W/2, H/2+2, 9, PAL.white, 'center');
  ctx.globalAlpha = 1;
}

// ═══════════════════════════════════════════════════════
// 主渲染循环
// ═══════════════════════════════════════════════════════
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawSportsZone();
  drawCabin();
  drawBookshelf();
  drawPlots();
  drawAICabin();
  drawMailbox();
  drawVisitor();
  drawTuran();
  drawGardenerAnim();
  drawFireworks();
  drawSkinDrawer();

  // 悬停提示
  if (State.tooltip) {
    ctx.font = `${Math.round(9*scale)}px "Press Start 2P", monospace`;
    const tw = ctx.measureText(State.tooltip).width / scale;
    px(W/2 - tw/2 - 8, H - 32, tw + 16, 20, 'rgba(26,8,16,0.9)');
    pxText(State.tooltip, W/2, H - 30, 10, PAL.white, 'center');
  }

  // 下雨提示
  if (State.weather === 'rain' && State.turan.homeMode) {
    px(W/2-100, 100, 200, 22, 'rgba(26,8,16,0.85)');
    pxText('图兰回家躲雨啦 🏠', W/2, 102, 9, '#88aacc', 'center');
  }
}

// ═══════════════════════════════════════════════════════
// 游戏逻辑更新
// ═══════════════════════════════════════════════════════
function updateTuran() {
  const c = State.turan;

  // 下雨模式：走向小屋
  if (State.weather === 'rain') {
    if (!c.homeMode) {
      const cabinX = ZONES.cabin.x + ZONES.cabin.w / 2;
      const cabinY = ZONES.cabin.y + ZONES.cabin.h;
      const dx = cabinX - c.x, dy = cabinY - c.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 20) {
        c.homeMode = true;
      } else {
        const speed = 1.2;
        c.x += (dx/dist) * speed;
        c.y += (dy/dist) * speed;
        c.facing = dx > 0 ? 1 : -1;
        c.action = 'walk';
      }
    }
    updateCharFrames(c);
    return;
  }
  c.homeMode = false;

  // 舞蹈模式
  if (State.danceMode) {
    c.action = 'wave';
    State.danceTimer--;
    if (State.danceTimer <= 0) {
      State.danceMode = false;
      c.action = 'walk';
    }
    updateCharFrames(c);
    return;
  }

  // 普通漫步
  c.actionTimer--;
  if (c.actionTimer <= 0) {
    // 随机切换动作
    const actions = ['walk', 'walk', 'walk', 'stand', 'wave'];
    c.action = actions[Math.floor(Math.random() * actions.length)];
    c.actionTimer = 60 + Math.floor(Math.random() * 120);
  }

  if (c.action === 'walk') {
    c.x += c.vx;
    c.y += c.vy;
    const minX = 240, maxX = W - 80;
    const minY = 220, maxY = H - 60;
    if (c.x < minX || c.x > maxX) {
      c.vx *= -1;
      c.facing = c.vx > 0 ? 1 : -1;
      c.x = Math.max(minX, Math.min(maxX, c.x));
    }
    if (c.y < minY || c.y > maxY) {
      c.vy *= -1;
      c.y = Math.max(minY, Math.min(maxY, c.y));
    }
    if (Math.random() < 0.004) {
      c.vx = (Math.random() - 0.5) * 1.0;
      c.vy = (Math.random() - 0.5) * 0.5;
      if (Math.abs(c.vx) < 0.2) c.vx = 0.2 * Math.sign(c.vx || 1);
      c.facing = c.vx > 0 ? 1 : -1;
    }
  }

  updateCharFrames(c);
}

function updateCharFrames(c) {
  c.frameTick++;
  const speed = c.action === 'stand' ? 20 : 8;
  if (c.frameTick >= speed) {
    c.frameTick = 0;
    c.frame = (c.frame + 1) % 4;
  }
}

function updateVisitor() {
  const v = State.visitor;
  const keys = State._keys || {};

  let moved = false;
  const speed = 2.5;
  if (keys['ArrowLeft'] || keys['KeyA']) { v.x -= speed; v.facing = -1; moved = true; }
  if (keys['ArrowRight'] || keys['KeyD']) { v.x += speed; v.facing = 1; moved = true; }
  if (keys['ArrowUp'] || keys['KeyW']) { v.y -= speed; moved = true; }
  if (keys['ArrowDown'] || keys['KeyS']) { v.y += speed; moved = true; }

  // 边界
  v.x = Math.max(20, Math.min(W - 20, v.x));
  v.y = Math.max(100, Math.min(H - 20, v.y));

  if (moved) {
    v.frameTick++;
    if (v.frameTick >= 6) { v.frameTick = 0; v.frame = (v.frame + 1) % 4; }
  }

  // 检查是否靠近图兰
  const t = State.turan;
  if (!t.homeMode) {
    const dist = Math.sqrt((v.x-t.x)**2 + (v.y-t.y)**2);
    if (dist < 60 && State.bubble.timer <= 0) {
      triggerTuranDialog();
    }
  }
}

function updateWeatherParticles() {
  if (State.weather === 'rain') {
    for (const d of State.rainDrops) {
      d.y += d.speed;
      d.x -= 1.5;
      if (d.y > H) { d.y = -10; d.x = Math.random() * W; }
      if (d.x < 0) { d.x = W; d.y = Math.random() * H; }
    }
  }
  if (State.weather === 'night') {
    // 萤火虫移动
    for (const f of State.fireflies) {
      f.x += f.vx;
      f.y += f.vy;
      if (f.x < 220 || f.x > 740) f.vx *= -1;
      if (f.y < 180 || f.y > 430) f.vy *= -1;
      f.phase += 0.05;
      // 随机方向微调
      if (Math.random() < 0.02) {
        f.vx += (Math.random() - 0.5) * 0.3;
        f.vy += (Math.random() - 0.5) * 0.2;
        f.vx = Math.max(-1.2, Math.min(1.2, f.vx));
        f.vy = Math.max(-0.8, Math.min(0.8, f.vy));
      }
    }
    // 流星
    for (const m of State.meteors) {
      m.x += m.vx;
      m.y += m.vy;
      m.alpha -= 0.02;
    }
    State.meteors = State.meteors.filter(m => m.alpha > 0 && m.x < W && m.y < 90);
    if (Math.random() < 0.003) {
      State.meteors.push({
        x: Math.random() * W * 0.6,
        y: Math.random() * 40,
        vx: 3 + Math.random() * 3,
        vy: 1.5 + Math.random() * 1,
        len: 20 + Math.random() * 20,
        alpha: 1,
      });
    }
    // 飞鸟夜晚不出现
  }
  if (State.weather === 'day') {
    // 更新飞鸟
    let allGone = true;
    for (const b of State.birds) {
      b.x += b.speed;
      b.flapTimer++;
      if (b.flapTimer >= 10) {
        b.flapTimer = 0;
        b.wingUp = !b.wingUp;
      }
      if (b.x < W + 30) allGone = false;
    }
    if (allGone) {
      setTimeout(resetBirds, 8000 + Math.random() * 10000);
    }
  }
}

function updateFireworks() {
  for (const fw of State.fireworks) {
    for (const p of fw.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1;
      p.life--;
    }
  }
  State.fireworks = State.fireworks.filter(fw => fw.particles.some(p => p.life > 0));
}

function updateDrawerAnim() {
  const target = State.drawerOpen ? W - 200 : W;
  const diff = target - State.drawerX;
  State.drawerX += diff * 0.18;
  if (Math.abs(diff) < 0.5) State.drawerX = target;
}

function updateBubble() {
  if (State.bubble.timer > 0) {
    State.bubble.timer--;
    if (State.bubble.timer <= 0 && !State.bubble.streaming) {
      State.bubble.text = '';
    }
  }
}

function updateGardenerAnim() {
  if (State.gardenerAnim) {
    State.gardenerTimer++;
    if (State.gardenerTimer > 150) {
      State.gardenerAnim = false;
      State.gardenerTimer = 0;
    }
  }
}

let lastTime = 0;
function gameLoop(timestamp) {
  const dt = timestamp - lastTime;
  lastTime = timestamp;
  State.time++;
  updateTuran();
  updateVisitor();
  updateWeatherParticles();
  updateFireworks();
  updateDrawerAnim();
  updateBubble();
  updateGardenerAnim();
  draw();
  requestAnimationFrame(gameLoop);
}

// ═══════════════════════════════════════════════════════
// 对话系统
// ═══════════════════════════════════════════════════════
const DIALOG_BY_LEVEL = {
  0: [
    '你好呀，欢迎来我的农场！',
    '要帮我浇浇水吗？',
    '第一次来？随便逛逛～',
    '我是图兰，一个喜欢像素风的前端工程师',
    '看到那片辣椒地了吗？四川人，你懂的 🌶️',
  ],
  30: [
    '又来啦！最近在看什么书？',
    '这块地快熟了，来看看？',
    '我的茶叶地长得不错吧？',
    '今天天气不错，适合浇浇水 🌱',
    '每次看到你来，心情都变好了',
  ],
  60: [
    '嘿！今天心情怎么样？',
    '来聊聊天嘛～',
    '书架角落的书单更新了，去看看？',
    '我最近在看《三体》，你也看过吗？',
    '运动场的篮球架修好了，来投一个？',
  ],
  90: [
    '老朋友！来加个微信吧！e-electron',
    '谢谢你一直来帮我浇水 🌱',
    '要不要来小红书找我玩？',
    '下次请你喝奶茶！',
    '我的好基友，今天想聊什么？',
  ],
};

function getCurrentLevel() {
  const s = State.intimacy;
  if (s >= 90) return 90;
  if (s >= 60) return 60;
  if (s >= 30) return 30;
  return 0;
}

function triggerTuranDialog(useAI) {
  if (State.bubble.streaming) return;
  const schedStatus = getTodayScheduleStatus();
  if (schedStatus.status !== 'free_today' && schedStatus.dialog) {
    State.bubble.text = schedStatus.dialog;
    State.bubble.timer = 220;
    State.bubble.streaming = false;
    return;
  }
  // 外网版直接走亲密度对话
  const level = getCurrentLevel();
  const dialogs = DIALOG_BY_LEVEL[level] || DIALOG_BY_LEVEL[0];
  const text = dialogs[Math.floor(Math.random() * dialogs.length)];
  State.bubble.text = text;
  State.bubble.timer = 220;
  State.bubble.streaming = false;
}

async function fetchAIBubble(question) {
  try {
    const resp = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const reader = resp.body.getReader();
    const dec = new TextDecoder();
    let buf = '', result = '';
    State.bubble.text = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') break;
        try {
          const d = JSON.parse(payload);
          if (d.text) {
            result += d.text;
            State.bubble.text = result;
            State.bubble.timer = 200;
          }
        } catch {}
      }
    }
    State.bubble.streaming = false;
    State.bubble.timer = 240;
  } catch {
    State.bubble.text = '（图兰走神了...）';
    State.bubble.timer = 120;
    State.bubble.streaming = false;
  }
}

// ═══════════════════════════════════════════════════════
// 交互检测
// ═══════════════════════════════════════════════════════
State._keys = {};

function hitTest(gx, gy, zone) {
  return gx >= zone.x && gx <= zone.x + zone.w &&
         gy >= zone.y && gy <= zone.y + zone.h;
}

function getHoverZone(gx, gy) {
  for (const [key, zone] of Object.entries(ZONES)) {
    if (hitTest(gx, gy, zone)) return key;
  }
  for (const plot of ALL_PLOTS) {
    if (hitTest(gx, gy, plot)) return 'plot_' + plot.id;
  }
  return null;
}

function isNearTuran(gx, gy) {
  const t = State.turan;
  return Math.sqrt((gx-t.x)**2 + (gy-t.y)**2) < 36;
}

// ═══════════════════════════════════════════════════════
// 弹窗管理
// ═══════════════════════════════════════════════════════
function openModal(type) {
  const overlay = document.getElementById('modal-overlay');
  const container = document.getElementById('modal-container');
  overlay.classList.add('visible');
  switch (type) {
    case 'cabin':     container.innerHTML = buildCabinModal(); break;
    case 'sports':    container.innerHTML = buildSportsModal(); break;
    case 'bookshelf': container.innerHTML = buildBookshelfModal(); break;
    case 'ai_cabin':  container.innerHTML = buildAIModal(); break;
    case 'mailbox':   container.innerHTML = buildBottleModal(); loadBottles(); break;
  }
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('visible');
}

document.addEventListener('keydown', e => {
  State._keys[e.code] = true;

  // Escape 关闭弹窗/抽屉
  if (e.key === 'Escape') {
    closeModal();
    State.drawerOpen = false;
  }

  // 空格触发对话
  if (e.code === 'Space' && !e.repeat) {
    e.preventDefault();
    triggerTuranDialog(true);
  }

  // TURAN 彩蛋
  if (e.key && e.key.length === 1) {
    State.turanKeyBuffer = (State.turanKeyBuffer + e.key.toUpperCase()).slice(-5);
    if (State.turanKeyBuffer === 'TURAN') {
      State.danceMode = true;
      State.danceTimer = 240;
      showToast('💃 图兰跳舞啦！');
      State.turanKeyBuffer = '';
    }
  }
});

document.addEventListener('keyup', e => {
  delete State._keys[e.code];
});

// ═══════════════════════════════════════════════════════
// 弹窗内容构建
// ═══════════════════════════════════════════════════════
function buildCabinModal() {
  return `
  <div class="pixel-modal" style="max-width:460px">
    <div class="modal-header">
      <h2>🏠 图兰的自我介绍</h2>
      <button class="modal-close">×</button>
    </div>
    <div class="modal-body">
      <div class="info-row">
        <span class="info-label">名字</span>
        <span>图兰 / 胡美琳 🌶️</span>
      </div>
      <div class="info-row">
        <span class="info-label">星座</span>
        <span>水瓶座 ♒ · 2001年出生</span>
      </div>
      <div class="info-row">
        <span class="info-label">MBTI</span>
        <span>INFJ（看起来内向但代码很外向）</span>
      </div>
      <div class="info-row">
        <span class="info-label">工作</span>
        <span>小红书 社区PC-Web前端开发</span>
      </div>
      <div class="info-row">
        <span class="info-label">来自</span>
        <span>四川 🌶️（是的代码也有点辣）</span>
      </div>
      <hr class="pixel-divider">
      <div class="info-row">
        <span class="info-label">技术栈</span>
        <span>Vue 主修 · TS · Node · 偶尔 React</span>
      </div>
      <div class="info-row">
        <span class="info-label">爱好</span>
        <div>
          <span class="pixel-tag">🧗 攀岩</span>
          <span class="pixel-tag">📚 看小说</span>
          <span class="pixel-tag">🤖 探索AI</span>
          <span class="pixel-tag">💪 健身</span>
        </div>
      </div>
      <div class="info-row">
        <span class="info-label">招募</span>
        <span>🔍 小说搭子 · AI 话题讨论</span>
      </div>
      <hr class="pixel-divider">
      <div style="font-size:15px;color:#8b6676;line-height:2;text-align:center">
        👾 本页面由 AI Agent 辅助生成<br>
        欢迎来农场种地解锁我的冷知识 🌾
      </div>
      <hr class="pixel-divider">
      <div class="schedule-board">
        <div class="schedule-title">📅 图兰的本周日程 <span class="schedule-sync" id="scheduleSync">同步中...</span></div>
        <div id="scheduleList" class="schedule-list"><div class="schedule-loading">🌀 加载中...</div></div>
      </div>
    </div>
  </div>`;
  setTimeout(loadSchedule, 80);
}

function loadSchedule() {
  var list = document.getElementById('scheduleList');
  var sync = document.getElementById('scheduleSync');
  if (!list) return;
  fetch('/api/schedule')
    .then(function(r){ return r.json(); })
    .then(function(d) {
      var schedules = d.schedules || [];
      if (!schedules.length) {
        list.innerHTML = '<div class="schedule-empty">本周暂无日程，随时可以找我聊 😊</div>';
        if (sync) sync.textContent = '已同步 ✓';
        return;
      }
      var weekdays = ['周日','周一','周二','周三','周四','周五','周六'];
      var groups = {};
      schedules.forEach(function(s) {
        var bd = new Date(s.begin);
        var key = (bd.getMonth()+1) + '月' + bd.getDate() + '日 ' + weekdays[bd.getDay()];
        if (!groups[key]) groups[key] = [];
        var bh = bd.getHours().toString().padStart(2,'0');
        var bm = bd.getMinutes().toString().padStart(2,'0');
        var ed = new Date(s.end);
        var eh = ed.getHours().toString().padStart(2,'0');
        var em = ed.getMinutes().toString().padStart(2,'0');
        var timeStr = s.allDay ? '全天' : (bh+':'+bm+' ~ '+eh+':'+em);
        var now = Date.now();
        var status = '';
        if (!s.allDay) {
          if (now >= bd.getTime() && now <= ed.getTime()) status = 'ongoing';
          else if (bd.getTime() > now && bd.getTime()-now < 30*60*1000) status = 'soon';
        }
        groups[key].push({title:s.title, time:timeStr, status:status});
      });
      var html = Object.keys(groups).map(function(day) {
        var items = groups[day].map(function(item) {
          var badge = item.status==='ongoing' ? '<span class="s-badge red">进行中</span>'
                    : item.status==='soon'    ? '<span class="s-badge yellow">即将</span>' : '';
          return '<div class="schedule-item' + (item.status?' '+item.status:'') + '">'
            + '<span class="s-time">'+item.time+'</span>'
            + '<span class="s-title">'+item.title+'</span>'
            + badge + '</div>';
        }).join('');
        return '<div class="schedule-day"><div class="s-day-label">'+day+'</div>'+items+'</div>';
      }).join('');
      list.innerHTML = html;
      if (sync) sync.textContent = '已同步 ✓';
    })
    .catch(function(){
      if (list) list.innerHTML = '<div class="schedule-empty">加载失败，稍后再试</div>';
      if (sync) sync.textContent = '×';
    });
}

function buildSportsModal() {
  return `
  <div class="pixel-modal" style="max-width:520px">
    <div class="modal-header">
      <h2>🏋️ 运动场 & 健身日志</h2>
      <button class="modal-close">×</button>
    </div>
    <div class="modal-body">
      <div class="gym-photos">
        <div class="gym-photo-item">
          <img src="./gym1.jpg" alt="力量训练">
          <span>背训日常 · 拉背机死忠粉 💪</span>
        </div>
        <div class="gym-photo-item">
          <img src="./gym2.jpg" alt="抱石攀岩">
          <span>抱石攀岩 · 每条线都是一道 bug 🧗</span>
        </div>
      </div>
      <hr class="pixel-divider">
      <div class="info-row">
        <span class="info-label">入坑</span>
        <span>刚入坑 · 被坑进攀岩馆，出不来了</span>
      </div>
      <div class="info-row">
        <span class="info-label">水平</span>
        <span>V0 刚起步（菜鸟认证）</span>
      </div>
      <div class="info-row">
        <span class="info-label">日常</span>
        <div>
          <span class="pixel-tag">🏋️ 力量训练</span>
          <span class="pixel-tag">🧗 抱石攀岩</span>
          
        </div>
      </div>
      <div class="info-row">
        <span class="info-label">感悟</span>
        <span>核心越稳，上线越稳 — 健身和写代码是同一件事</span>
      </div>
    </div>
  </div>`;
}

function buildBookshelfModal() {
  var score = State.intimacy;
  var unlocked = score >= 90;
  var books = [
    { title:'三体三部曲', author:'刘慈欣', bg:'linear-gradient(135deg,#0a0a2e,#1a1a6e)', desc:'地球文明与三体文明的生死博弈，黑暗森林法则下宇宙没有赢家，中国科幻天花板' },
    { title:'残次品', author:'priest', bg:'linear-gradient(135deg,#1a0030,#4a0080)', desc:'星际社会被AI「伊甸园」统治，底层残次品们争夺自由与生存权。图兰是书里的白银十卫女队长 ✨' },
    { title:'小蘑菇', author:'一十四洲', bg:'linear-gradient(135deg,#0d2b0d,#1a5e1a)', desc:'末世磁场崩塌，有自我意识的蘑菇安折获得人类身体，在变异生物横行的世界里寻找自己的孢子' },
    { title:'攀高枝', author:'白鹭成双', bg:'linear-gradient(135deg,#3d1a00,#8b4500)', desc:'古言，世家男主魂穿贪财女主共用躯体，替她开挂一路攀高枝，又甜又爽' },
    { title:'活着', author:'余华', bg:'linear-gradient(135deg,#2b1a00,#5e3d00)', desc:'徐富贵历经战乱饥荒、痛失至亲，用一生的苦难告诉你：活着本身就是意义' },
    { title:'围城', author:'钱钟书', bg:'linear-gradient(135deg,#1a1a1a,#3d3d3d)', desc:'留学归国的方鸿渐在婚姻与人生里进退两难——城里想出去，城外想进来' },
    { title:'长夜难明', author:'紫金陈', bg:'linear-gradient(135deg,#1a0a0a,#4a0000)', desc:'检察官江阳十年追查沉冤，重重阻碍下不断收集证据，黑暗中那道执念的光' },
    { title:'坏孩子', author:'紫金陈', bg:'linear-gradient(135deg,#0a0a0a,#2a0a2a)', desc:'三个孩子无意拍下一场谋杀，《隐秘的角落》原著，每个人都走进了自己的深渊' },
  ];
  var bookHtml = books.map(function(b) {
    return '<div class="book-item">'
      + '<div class="book-cover" style="background:' + b.bg + '">' + b.title + '</div>'
      + '<div class="book-info">'
      + '<div class="book-title">' + b.title + '</div>'
      + '<div class="book-author">' + b.author + '</div>'
      + '<div class="book-desc">' + b.desc + '</div>'
      + '</div></div>';
  }).join('');
  var contactHtml = unlocked
    ? '<div class="wechat-box"><div style="font-size:13px;color:#8b6676">微信号</div><div class="wechat-id">e-electron</div><div style="font-size:13px;color:#8b6676;margin-top:6px">备注"小说搭子"哦 📚</div></div>'
    : '<div class="locked-hint">🔒 再浇浇水，我们还不够熟 😊<br><span style="color:#ff2442">亲密度达到 90+ 解锁微信</span><br>当前：' + score + ' / 90</div>';
  return '<div class="pixel-modal" style="max-width:560px">'
    + '<div class="modal-header"><h2>📚 书架 · 小说搭子招募</h2><button class="modal-close">×</button></div>'
    + '<div class="modal-body">'
    + '<div class="book-intro">资深小说党，睡前必看 📖 &nbsp;·&nbsp; 爱看：古言 · 悬疑 · 科幻 · 耽美</div>'
    + '<div class="book-list-title">📖 我的书单（欢迎互砸）</div>'
    + '<div class="book-list">' + bookHtml + '</div>'
    + '<hr class="pixel-divider">'
    + '<div style="font-size:14px;color:#f5c842;margin-bottom:10px">📬 加我一起互砸书单：</div>'
    + contactHtml
    + '</div></div>';
}


function buildAIModal() {
  const score = State.intimacy;
  const unlocked = score >= 60;
  if (!unlocked) {
    return `
    <div class="pixel-modal" style="max-width:380px">
      <div class="modal-header">
        <h2>🤖 AI 分身</h2>
        <button class="modal-close">×</button>
      </div>
      <div class="modal-body">
        <div class="locked-hint">
          🔒 AI 小屋还没向你开放<br>
          <span style="color:#4080ff">亲密度达到 60+ 解锁对话</span><br>
          当前：${score} / 60<br><br>
          去浇浇水嘛 💧
        </div>
      </div>
    </div>`;
  }
  return `
  <div class="pixel-modal" style="max-width:500px">
    <div class="modal-header">
      <h2>🤖 和图兰的 AI 分身聊聊</h2>
      <button class="modal-close">×</button>
    </div>
    <div class="modal-body">
      <div id="ai-chat-log">
        <div class="chat-msg-ai">你好！我是图兰的 AI 分身 🌶️ 有什么想问的？</div>
      </div>
      <div id="ai-input-row">
        <input id="ai-input" type="text" placeholder="问点什么..." maxlength="200">
        <button id="ai-send-btn" onclick="sendAIMessage()">发送</button>
      </div>
    </div>
  </div>`;
}

function buildBottleModal() {
  const score = State.intimacy;
  const unlocked = score >= 60;
  if (!unlocked) {
    return `
    <div class="pixel-modal" style="max-width:380px">
      <div class="modal-header">
        <h2>📮 漂流瓶</h2>
        <button class="modal-close">×</button>
      </div>
      <div class="modal-body">
        <div class="locked-hint">
          🔒 邮箱暂未开放<br>
          <span style="color:#ff2442">亲密度达到 60+ 才能投漂流瓶</span><br>
          当前：${score} / 60
        </div>
      </div>
    </div>`;
  }
  return `
  <div class="pixel-modal" style="max-width:460px">
    <div class="modal-header">
      <h2>📮 漂流瓶</h2>
      <button class="modal-close">×</button>
    </div>
    <div class="modal-body">
      <div style="font-size:14px;color:#8b6676;margin-bottom:10px">来自各方的漂流瓶 ↓</div>
      <div id="bottle-list"><div style="font-size:15px;color:#8b6676">加载中...</div></div>
      <hr class="pixel-divider">
      <div style="font-size:15px;color:#ff2442;margin-bottom:8px">💌 投一个漂流瓶：</div>
      <textarea id="bottle-input" rows="3" placeholder="写点什么..." maxlength="200"></textarea>
      <button id="bottle-send-btn" onclick="sendBottle()">投出漂流瓶 🌊</button>
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════════
// 菜地弹窗
// ═══════════════════════════════════════════════════════
function openPlotModal(plotId) {
  const isCustom = plotId >= 6;
  const serverPlot = State.plots.find(p => p.id === plotId);
  const waterCount = serverPlot ? serverPlot.water_count : 0;
  const stage = serverPlot ? serverPlot.stage : 'empty';
  const cropType = serverPlot ? serverPlot.crop_type : null;
  const lastWaterer = serverPlot ? serverPlot.last_waterer : null;

  const overlay = document.getElementById('modal-overlay');
  const container = document.getElementById('modal-container');
  overlay.classList.add('visible');

  if (isCustom && !cropType) {
    // 显示种植面板（私人小院）
    container.innerHTML = buildPlantModal(plotId);
  } else if (isCustom) {
    // 显示私人小院浇水面板
    const customPlot = CUSTOM_PLOTS.find(p => p.id === plotId);
    const crop = CROP_TYPES[cropType];
    const matureThreshold = serverPlot ? (serverPlot.mature_threshold || 8) : 8;
    container.innerHTML = buildCustomPlotModal(plotId, waterCount, stage, cropType, crop, lastWaterer, matureThreshold);
  } else {
    // 公共菜园浇水面板
    const plot = FIXED_PLOTS.find(p => p.id === plotId);
    const matureThreshold = serverPlot ? (serverPlot.mature_threshold || 20) : 20;
    container.innerHTML = buildPlotModal(plot, waterCount, stage, matureThreshold);
  }

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
  const waterBtn = document.getElementById('water-btn');
  if (waterBtn) {
    waterBtn.addEventListener('click', () => waterPlot(plotId));
  }
}

function buildPlantModal(plotId) {
  const cropHTML = Object.entries(CROP_TYPES).map(([key, crop]) => `
    <div class="plant-option" onclick="plantCrop(${plotId}, '${key}')">
      <span style="font-size:24px">${crop.emoji}</span>
      <div style="flex:1;margin-left:10px">
        <div style="font-size:14px;color:#f5e6d0">${crop.name}</div>
        <div style="font-size:13px;color:#8b6676;margin-top:2px">${crop.desc}</div>
      </div>
      <span style="font-size:13px;color:#ff2442">选择 ▶</span>
    </div>`).join('');
  return `
  <div class="pixel-modal" style="max-width:460px">
    <div class="modal-header">
      <h2>🌱 选择种植</h2>
      <button class="modal-close">×</button>
    </div>
    <div class="modal-body">
      <div style="font-size:14px;color:#8b6676;margin-bottom:12px">
        🪴 我的小院只有你看得到！种下去，浇水8次成熟后解锁图兰的秘密！
      </div>
      ${cropHTML}
    </div>
  </div>`;
}

function buildCustomPlotModal(plotId, waterCount, stage, cropType, crop, lastWaterer, matureThreshold = 8) {
  const stages = { empty:'空地', sprout:'嫩芽', growing:'生长中', tall:'快熟了！', mature:'已成熟！' };
  const stageColors = { empty:'#8b6676', sprout:'#3aaa40', growing:'#4aaa40', tall:'#f5a020', mature:'#f5c842' };
  const isMature = stage === 'mature';
  const watererText = lastWaterer ? `最近浇水：${lastWaterer}` : '';
  return `
  <div class="pixel-modal" style="max-width:400px">
    <div class="modal-header">
      <h2>${crop ? crop.emoji : '🌱'} ${crop ? crop.name : '自选地'}</h2>
      <button class="modal-close">×</button>
    </div>
    <div class="modal-body">
      <div class="plot-emoji">${crop ? crop.emoji : '🌱'}</div>
      <div class="plot-name" style="color:${stageColors[stage]}">${stages[stage]}</div>
      ${watererText ? `<div style="font-size:13px;color:#8b6676;text-align:center;margin-top:4px">${watererText}</div>` : ''}
      <div style="font-size:12px;color:#4aaa40;margin-bottom:6px;text-align:center">🪴 我的小院 · 只有你看得到这块地的进度</div>
      <div class="water-progress">浇水次数：${waterCount} / ${matureThreshold}</div>
      <div style="margin:10px 0;background:rgba(74,170,64,0.1);border:1px solid rgba(74,170,64,0.3);height:8px">
        <div style="height:100%;background:#4aaa40;width:${Math.min(waterCount/matureThreshold*100,100)}%;transition:width 0.4s"></div>
      </div>
      ${isMature ? `
      <div class="unlock-box">
        ✨ 解锁彩蛋：<br><br>
        ${crop ? crop.unlock : ''}
      </div>` : `
      <div class="plot-desc">${crop ? crop.desc : ''}<br><br>浇到 ${matureThreshold} 次解锁彩蛋 ✨</div>`}
      <button id="water-btn" class="water-btn">
        💧 浇水 (+10 亲密度)
      </button>
    </div>
  </div>`;
}

function buildPlotModal(plot, waterCount, stage, matureThreshold = 20) {
  const stages = { empty:'空地', sprout:'嫩芽', growing:'生长中', tall:'快熟了！', mature:'已成熟！' };
  const stageColors = { empty:'#8b6676', sprout:'#3aaa40', growing:'#4aaa40', tall:'#f5a020', mature:'#f5c842' };
  const isMature = stage === 'mature';
  return `
  <div class="pixel-modal" style="max-width:400px">
    <div class="modal-header">
      <h2>${plot.emoji} ${plot.name}</h2>
      <button class="modal-close">×</button>
    </div>
    <div class="modal-body">
      <div class="plot-emoji">${plot.emoji}</div>
      <div class="plot-name" style="color:${stageColors[stage]}">${stages[stage]}</div>
      <div style="font-size:12px;color:#f5c842;margin-bottom:6px;text-align:center">📍 公共菜园 · 已有 ${waterCount} 人一起浇过水</div>
      <div class="water-progress">已浇 ${waterCount} / ${matureThreshold} 次</div>
      <div style="margin:10px 0;background:rgba(245,200,66,0.1);border:1px solid rgba(245,200,66,0.3);height:8px">
        <div style="height:100%;background:${PAL.gold};width:${Math.min(waterCount/matureThreshold*100,100)}%;transition:width 0.4s"></div>
      </div>
      ${isMature ? `
      <div class="unlock-box">
        ✨ 解锁彩蛋：<br><br>
        ${plot.desc}
      </div>` : `
      <div class="plot-desc">${isMature ? plot.desc : `浇到 ${matureThreshold} 次解锁彩蛋 ✨`}</div>`}
      <button id="water-btn" class="water-btn">
        💧 浇水 (+10 亲密度)
      </button>
    </div>
  </div>`;
}

async function plantCrop(plotId, cropType) {
  const vid = getVisitorId();
  if (State.plots) { const p = State.plots.find(p=>p.id===plotId); if(p) p.crop_type=cropType; }
  closeModal();
  showToast('\u{1F331} 种植成功！快去浇水让它长大吧');
  typeof drawFarm === 'function' && drawFarm();
  try {
    const rows = await sbFetch('farm_private_plots?id=eq.'+plotId+'&visitor_id=eq.'+encodeURIComponent(vid)+'&select=id');
    if (rows.length) {
      await sbFetch('farm_private_plots?id=eq.'+plotId+'&visitor_id=eq.'+encodeURIComponent(vid),
        {method:'PATCH',prefer:'return=minimal',body:JSON.stringify({crop_type:cropType})});
    } else {
      await sbFetch('farm_private_plots',
        {method:'POST',prefer:'return=minimal',body:JSON.stringify({id:plotId,visitor_id:vid,crop_type:cropType,water_count:0})});
    }
  } catch(e) { console.error('plantCrop error', e); }
}

async function waterPlot(plotId) {
  const vid = getVisitorId();
  const isPrivate = plotId >= 6;
  // 乐观更新
  if (State.plots) {
    const plot = State.plots.find(p => p.id === plotId);
    if (plot) {
      plot.water_count = (plot.water_count||0) + 1;
      plot.stage = isPrivate ? getPrivateStage(plot.water_count) : getPublicStage(plot.water_count);
    }
  }
  const newIntimacy = Math.min(100, (State.intimacy||0) + 10);
  State.intimacy = newIntimacy;
  updateIntimacyHUD(newIntimacy);
  showToast('\u{1F4A7} 浇水成功！亲密度 +10 \u2192 ' + newIntimacy);
  typeof playWaterSound === 'function' && playWaterSound();
  closeModal();
  typeof drawFarm === 'function' && drawFarm();
  // 写 Supabase
  try {
    if (isPrivate) {
      const rows = await sbFetch('farm_private_plots?id=eq.'+plotId+'&visitor_id=eq.'+encodeURIComponent(vid)+'&select=water_count');
      if (rows.length) {
        await sbFetch('farm_private_plots?id=eq.'+plotId+'&visitor_id=eq.'+encodeURIComponent(vid),
          {method:'PATCH',prefer:'return=minimal',body:JSON.stringify({water_count:rows[0].water_count+1})});
      } else {
        await sbFetch('farm_private_plots',
          {method:'POST',prefer:'return=minimal',body:JSON.stringify({id:plotId,visitor_id:vid,water_count:1})});
      }
    } else {
      const rows = await sbFetch('farm_plots?id=eq.'+plotId+'&select=water_count');
      if (rows.length) {
        await sbFetch('farm_plots?id=eq.'+plotId,
          {method:'PATCH',prefer:'return=minimal',body:JSON.stringify({water_count:rows[0].water_count+1,last_waterer:vid})});
      }
    }
    // 亲密度
    const irows = await sbFetch('farm_intimacy?visitor_id=eq.'+encodeURIComponent(vid)+'&select=score');
    if (irows.length) {
      await sbFetch('farm_intimacy?visitor_id=eq.'+encodeURIComponent(vid),
        {method:'PATCH',prefer:'return=minimal',body:JSON.stringify({score:newIntimacy})});
    } else {
      await sbFetch('farm_intimacy',
        {method:'POST',prefer:'return=minimal',body:JSON.stringify({visitor_id:vid,score:newIntimacy})});
    }
  } catch(e) { console.error('waterPlot error', e); }
}

function getCurrentLevelIndex(score) {
  if (score >= 90) return 3;
  if (score >= 60) return 2;
  if (score >= 30) return 1;
  return 0;
}

// ═══════════════════════════════════════════════════════
// AI 问答
// ═══════════════════════════════════════════════════════
async function sendAIMessage() {
  const input = document.getElementById('ai-input');
  const log = document.getElementById('ai-chat-log');
  const btn = document.getElementById('ai-send-btn');
  const q = input.value.trim();
  if (!q) return;
  input.value = '';
  btn.disabled = true;
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-msg-user';
  userDiv.textContent = q;
  log.appendChild(userDiv);
  const aiDiv = document.createElement('div');
  aiDiv.className = 'chat-msg-ai';
  aiDiv.textContent = '';
  log.appendChild(aiDiv);
  log.scrollTop = log.scrollHeight;
  try {
    const resp = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q }),
    });
    const reader = resp.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') break;
        try {
          const d = JSON.parse(payload);
          if (d.text) { aiDiv.textContent += d.text; log.scrollTop = log.scrollHeight; }
        } catch {}
      }
    }
  } catch {
    aiDiv.textContent = '（网络波动，请稍后再试）';
  }
  btn.disabled = false;
  log.scrollTop = log.scrollHeight;
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('ai-input') === document.activeElement) {
    sendAIMessage();
  }
});

// ═══════════════════════════════════════════════════════
// 漂流瓶
// ═══════════════════════════════════════════════════════
async function loadBottles() {
  const el = document.getElementById('bottle-list');
  if (!el) return;
  el.innerHTML = '<div style="font-size:13px;color:#9b7880;text-align:center;padding:12px">加载中...</div>';
  try {
    const rows = await sbFetch('bottles?select=content,nickname,created_at&order=created_at.desc&limit=20');
    if (!rows.length) {
      el.innerHTML = '<div style="font-size:13px;color:#9b7880;text-align:center;padding:12px">还没有漂流瓶，来投一个吧 🍾</div>';
      return;
    }
    el.innerHTML = rows.map(r => {
      const d = new Date(r.created_at);
      const timeStr = (d.getMonth()+1) + '/' + d.getDate() + ' ' + d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
      return '<div class="bottle-item"><div style="font-size:13px;color:#f5e6d0;line-height:1.8">' + r.content + '</div><div class="bottle-from">— ' + r.nickname + ' · ' + timeStr + '</div></div>';
    }).join('');
  } catch(e) {
    el.innerHTML = '<div style="font-size:13px;color:#9b7880;text-align:center;padding:12px">加载失败，稍后再试</div>';
    console.error('loadBottles error', e);
  }
}

async function sendBottle(contentText, nickname) {
  try {
    await sbFetch('bottles', {
      method: 'POST',
      prefer: 'return=minimal',
      body: JSON.stringify({ content: contentText, nickname: nickname || '匿名旅人' }),
    });
    return true;
  } catch(e) {
    console.error('sendBottle error', e);
    return false;
  }


// ═══════════════════════════════════════════════════════
// HUD 更新
// ═══════════════════════════════════════════════════════
function updateHUD() {
  const score = State.intimacy;
  const bar = document.getElementById('intimacy-bar');
  const rank = document.getElementById('intimacy-rank');
  const label = document.getElementById('intimacy-label');
  if (bar) bar.style.width = Math.min(score, 100) + '%';
  if (rank) {
    const ranks = [
      [0,  '🚶 路人'],
      [30, '😊 熟人'],
      [60, '🤝 好友'],
      [90, '💜 好基友'],
    ];
    const r = [...ranks].reverse().find(([min]) => score >= min);
    rank.textContent = r ? r[1] : '🚶 路人';
  }
  if (label) label.textContent = `亲密度 ${score}`;
}

// ═══════════════════════════════════════════════════════
// Toast 提示
// ═══════════════════════════════════════════════════════
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

// ═══════════════════════════════════════════════════════
// BGM（Web Audio API 8-bit 风格）
// ═══════════════════════════════════════════════════════
let audioCtx = null;
let bgmPlaying = false;
const MELODY = [
  261.63, 293.66, 329.63, 349.23,
  392.00, 349.23, 329.63, 261.63,
  293.66, 329.63, 349.23, 392.00,
  440.00, 392.00, 349.23, 293.66,
];
let melodyIdx = 0;
let bgmInterval = null;

function initAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playBGM() {
  if (!audioCtx) initAudio();
  if (bgmPlaying) return;
  bgmPlaying = true;
  function playNote() {
    if (!bgmPlaying) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.value = MELODY[melodyIdx % MELODY.length];
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
    melodyIdx++;
    bgmInterval = setTimeout(playNote, 220);
  }
  playNote();
}

function stopBGM() {
  bgmPlaying = false;
  clearTimeout(bgmInterval);
}

function toggleBGM() {
  if (!audioCtx) initAudio();
  State.bgmOn = !State.bgmOn;
  const btn = document.getElementById('bgm-btn');
  if (State.bgmOn) {
    playBGM();
    if (btn) { btn.classList.add('active'); btn.title = 'BGM: ON'; }
  } else {
    stopBGM();
    if (btn) { btn.classList.remove('active'); btn.title = 'BGM: OFF'; }
  }
}

function playWaterSFX() {
  if (!audioCtx) initAudio();
  const freqs = [1200, 1600, 1000, 1400];
  freqs.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const t = audioCtx.currentTime + i * 0.06;
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.12);
  });
}

// ═══════════════════════════════════════════════════════
// 皮肤 & 天气切换
// ═══════════════════════════════════════════════════════
function openSkinDrawer() {
  State.drawerSelected = State.skin;
  State.drawerOpen = !State.drawerOpen;
}

function setSkinFromDrawer(skinId) {
  State.drawerSelected = skinId;
  State.skin = skinId;
  State.drawerOpen = false;
  showToast(`✨ 换装成功：${SKINS[skinId].name}`);
}

// 旧接口保留（HTML onclick 兼容）
function setSkin(skinId) {
  State.skin = skinId;
  State.drawerSelected = skinId;
}

function setWeather(mode) {
  const prevWeather = State.weather;
  State.weather = mode;
  // 切换到晴天重置飞鸟
  if (mode === 'day' && prevWeather !== 'day') {
    resetBirds();
  }
  // 切换到晴天/夜晚，图兰从屋里出来
  if (mode !== 'rain') {
    State.turan.homeMode = false;
  }
  // 更新天气按钮
  document.querySelectorAll('.weather-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.weather === mode);
  });
}

// 旧接口（暗黑模式按钮兼容，改为天气循环）
function toggleTheme() {
  const order = ['day', 'night', 'rain'];
  const idx = order.indexOf(State.weather);
  setWeather(order[(idx + 1) % order.length]);
}

// ═══════════════════════════════════════════════════════
// 数据加载
// ═══════════════════════════════════════════════════════
async function loadFarmData() {
  try {
    const vid = getVisitorId();
    const [publicPlots, privatePlots, intimacyRows] = await Promise.all([
      sbFetch('farm_plots?select=*&order=id'),
      sbFetch('farm_private_plots?select=*&visitor_id=eq.' + encodeURIComponent(vid) + '&order=id'),
      sbFetch('farm_intimacy?visitor_id=eq.' + encodeURIComponent(vid) + '&select=score'),
    ]);
    const privateMap = {};
    privatePlots.forEach(p => { privateMap[p.id] = p; });
    const plots = [];
    for (let i = 1; i <= 5; i++) {
      const p = publicPlots.find(r => r.id === i) || { id: i, water_count: 0, crop_type: null };
      plots.push({ id: i, water_count: p.water_count||0, crop_type: p.crop_type||null,
        last_waterer: p.last_waterer||null, is_private: false, mature_threshold: 20,
        stage: getPublicStage(p.water_count||0) });
    }
    for (let i = 6; i <= 10; i++) {
      const p = privateMap[i] || { id: i, water_count: 0, crop_type: null };
      plots.push({ id: i, water_count: p.water_count||0, crop_type: p.crop_type||null,
        last_waterer: null, is_private: true, mature_threshold: 8,
        stage: getPrivateStage(p.water_count||0) });
    }
    State.plots = plots;
    State.intimacy = intimacyRows.length ? (intimacyRows[0].score||0) : 0;
    updateIntimacyHUD(State.intimacy);
  } catch(e) {
    console.error('loadFarmData error', e);
    State.plots = State.plots || [];
    State.intimacy = parseInt(localStorage.getItem('intimacy')||'0');
    updateIntimacyHUD(State.intimacy);
  }
}

async function loadScheduleData(force) {
  // GitHub Pages 版本：无后端，日程功能不可用
  State.scheduleData = [];
}

// ═══════════════════════════════════════════════════════
// 初始化入口
// ═══════════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  const c = document.getElementById('farm-canvas');

  c.addEventListener('mousemove', e => {
    const g = toGame(e.clientX, e.clientY);
    // 如果抽屉开着，不处理地图悬停
    if (State.drawerX < W - 10) {
      State.hoverZone = null;
      State.tooltip = '';
      c.style.cursor = 'default';
      return;
    }
    const zone = getHoverZone(g.x, g.y);
    State.hoverZone = zone;
    if (zone) {
      c.style.cursor = 'pointer';
      if (zone.startsWith('plot_')) {
        const pid = parseInt(zone.split('_')[1]);
        if (pid >= 6) {
          const sp = State.plots.find(p => p.id === pid);
          const ct = sp ? sp.crop_type : null;
          const lw = sp ? sp.last_waterer : null;
          if (!ct) {
            State.tooltip = '🌱 点击种植';
          } else {
            const crop = CROP_TYPES[ct];
            State.tooltip = lw ? `${lw}种了${crop ? crop.name : '作物'}·点击浇水` : '💧 点击浇水';
          }
        } else {
          State.tooltip = '💧 点击浇水';
        }
      } else {
        const names = { sports:'运动场·点击查看', cabin:'图兰小屋·点击查看', bookshelf:'书架角落·点击查看', ai_cabin:'AI小屋·点击查看', mailbox:'漂流瓶邮箱·点击查看' };
        State.tooltip = names[zone] || '';
      }
    } else if (isHoverStatusSign(g.x, g.y)) {
      c.style.cursor = 'pointer';
      // tooltip：显示今日第一条日程或暂无
      const todayStart = new Date(); todayStart.setHours(0,0,0,0);
      const todayEnd = new Date(todayStart.getTime() + 24*3600*1000);
      const firstEvt = (State.scheduleData||[]).filter(s=>!s.allDay&&new Date(s.begin)>=todayStart&&new Date(s.begin)<todayEnd)
        .sort((a,b)=>new Date(a.begin)-new Date(b.begin))[0];
      if (firstEvt) {
        const bh = new Date(firstEvt.begin).getHours().toString().padStart(2,'0');
        const bm = new Date(firstEvt.begin).getMinutes().toString().padStart(2,'0');
        State.tooltip = `今日首个日程: ${bh}:${bm} ${firstEvt.title}`;
      } else {
        State.tooltip = '今日暂无日程';
      }
    } else if (isNearTuran(g.x, g.y)) {
      c.style.cursor = 'pointer';
      State.tooltip = '点击和图兰说话';
    } else {
      c.style.cursor = 'crosshair';
      State.tooltip = '';
    }
  });

  c.addEventListener('mouseleave', () => {
    State.hoverZone = null;
    State.tooltip = '';
  });

  c.addEventListener('click', e => {
    const g = toGame(e.clientX, e.clientY);

    // 抽屉开着时：点击抽屉内皮肤 or 关闭抽屉
    if (State.drawerOpen || State.drawerX < W - 10) {
      // 检查是否点了某个皮肤条目
      const skinKeys = Object.keys(SKINS);
      for (let i = 0; i < skinKeys.length; i++) {
        const item = State[`_drawerItem_${i}`];
        if (item && g.x >= item.x && g.x <= item.x + item.w && g.y >= item.y && g.y <= item.y + item.h) {
          setSkinFromDrawer(item.key);
          return;
        }
      }
      // 点击抽屉外关闭
      if (g.x < State.drawerX) {
        State.drawerOpen = false;
      }
      return;
    }

    // 点击状态牌：弹出今日日程弹窗
    if (isHoverStatusSign(g.x, g.y)) {
      openTodayScheduleModal();
      return;
    }

    // 点击图兰主角
    if (isNearTuran(g.x, g.y)) {
      triggerTuranDialog(true);
      return;
    }

    const zone = getHoverZone(g.x, g.y);
    if (!zone) return;
    if (zone.startsWith('plot_')) {
      const id = parseInt(zone.split('_')[1]);
      openPlotModal(id);
    } else {
      openModal(zone);
    }
  });

  // 关闭弹窗点击遮罩
  const overlay = document.getElementById('modal-overlay');
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  // 加载农场数据
  loadFarmData();
  // 页面加载后立即拉取日程
  loadScheduleData();
  // 每 60 分钟定时刷新日程（仅 09:00-00:00）
  setInterval(function() {
    var h = new Date().getHours();
    if (h >= 9 || h === 0) {  // 00:00 也属于深夜，但 09:00-23:59 内才刚好
      // 仅 09:00-23:59 刺新
      if (h >= 9) loadScheduleData();
    }
  }, 60 * 60 * 1000);
  // 启动游戏循环
  requestAnimationFrame(gameLoop);
  // HUD 初始化
  updateHUD();
});

// 全局暴露给 HTML onclick
window.sendAIMessage = sendAIMessage;
window.sendBottle = sendBottle;
window.setSkin = setSkin;
window.toggleBGM = toggleBGM;
window.toggleTheme = toggleTheme;
window.setWeather = setWeather;
window.openSkinDrawer = openSkinDrawer;
window.setSkinFromDrawer = setSkinFromDrawer;
window.plantCrop = plantCrop;

/* ── 旅行相册图片全屏预览 ── */
document.addEventListener('click', function(e) {
  const img = e.target.closest('.travel-item img');
  if (!img) return;
  const lb = document.createElement('div');
  lb.className = 'img-lightbox';
  const big = document.createElement('img');
  big.src = img.src; big.alt = img.alt;
  lb.appendChild(big);
  document.body.appendChild(lb);
  lb.addEventListener('click', function() { lb.remove(); });
  document.addEventListener('keydown', function esc(ev) {
    if (ev.key === 'Escape') { lb.remove(); document.removeEventListener('keydown', esc); }
  });
});


// ── 亲密度 HUD 更新 ──
function updateIntimacyHUD(score) {
  const bar = document.getElementById('intimacy-bar');
  const label = document.getElementById('intimacy-label');
  const rank = document.getElementById('intimacy-rank');
  if (bar) bar.style.width = Math.min(100, score) + '%';
  if (label) label.textContent = '亲密度 ' + score;
  const ranks = [[0,'路人'],[30,'熟人'],[60,'好友'],[90,'好基友']];
  const r = [...ranks].reverse().find(([min]) => score >= min);
  if (rank) rank.textContent = r ? r[1] : '路人';
}


// ═══ Supabase 工具函数（外网公共后端）═══
const SUPABASE_URL = 'https://cjyveohtixrlqouhhtra.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeXZlb2h0aXhybHFvdWhodHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMTc2NDEsImV4cCI6MjEwMjU5MzY0MX0.Fl621beNMGYNUYWJNdo1a1fKd3yEQdyOZZ0I0Xhc6J4';

async function sbFetch(path, options = {}) {
  const url = SUPABASE_URL + '/rest/v1/' + path;
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_KEY,
    'Content-Type': 'application/json',
  };
  if (options.prefer) headers['Prefer'] = options.prefer;
  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body || undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error('Supabase ' + res.status + ': ' + err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : [];
}

function getVisitorId() {
  let id = localStorage.getItem('visitor_id');
  if (!id) {
    id = 'v_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('visitor_id', id);
  }
  return id;
}
}
