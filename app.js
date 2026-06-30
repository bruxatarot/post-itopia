/* ── Post-itopia app.js ── */

const MOOD_COLORS = {
  calm: '#c8f0dc', sad: '#b3c6e8', overwhelmed: '#e8c3e8',
  angry: '#f4b8b8', confused: '#ffd9a8', lonely: '#dce8f0',
  anxious: '#c9d4f0', grateful: '#fff0b8', motivated: '#ffe0b8',
  drained: '#cfd8dc', hopeful: '#b8eaf4'
};

const MOOD_EMOJIS = {
  calm:'😌', sad:'😔', overwhelmed:'😵', angry:'😡', confused:'😕',
  lonely:'🤍', anxious:'🧿', grateful:'✨', motivated:'🔥', drained:'🌧️', hopeful:'🌈'
};

const PROMPTS = {
  sad: '¿Qué te apachurró el corazón hoy? 💙',
  calm: 'Qué bien que estés tranqui… ¿qué te dio paz hoy? 🌿',
  overwhelmed: 'Respira. Cuéntale a tu notita qué te tiene así 💜',
  angry: '¿Qué te hizo enojar? Aquí puedes soltarlo todo 🔴',
  confused: '¿Qué te tiene con la cabeza hecha bola? 🌀',
  lonely: 'No estás sola/solo. Cuéntame qué sientes 🤍',
  anxious: 'Respira suavito. ¿Qué te está preocupando? 🫧',
  grateful: '¡Qué bonito! ¿Qué te hizo sonreír hoy? ✨',
  motivated: '¡Eso! ¿Qué te está llenando de energía? 🔥',
  drained: 'Está bien descansar. ¿Qué te dejó sin pilas? 🌧️',
  hopeful: 'Se siente bien tener esperanza 🌈 ¿Qué la generó?'
};

const COMMUNITY_RESPONSES = {
  apoyo:    ['🐻 Estoy contigo', '☁️ Respira conmigo', '🐥 Yo también pasé por eso', '⭐ Lo estás haciendo bien'],
  consejos: ['🌱 Un paso a la vez', '🫧 Habla con alguien de confianza', '🌸 Date un momento para ti', '✨ Está bien pedir ayuda'],
  historias:['🫂 Una vez yo también…', '💜 Pasé algo similar', '🌈 Salí adelante, tú puedes', '🐣 No eres la única'],
  humor:    ['🐸 Miau (apoyo incondicional)', '✨ Tu notita te manda papitas', '🌟 Error 404: tristeza no encontrada', '🍰 ¿Y si nos comemos un pastel?'],
  stickers: ['💛', '🌸', '⭐', '🫂']
};

const ROTATIONS = [-3, -1.5, 0, 1.5, 2.5, -2, 1, -1, 3, -2.5];

const POSTIBOO = `<svg width="56" height="60" viewBox="0 0 56 60" xmlns="http://www.w3.org/2000/svg">
  <!-- wings -->
  <ellipse cx="8" cy="34" rx="9" ry="6" fill="#fde68a" opacity="0.85" class="wing-left"/>
  <ellipse cx="48" cy="34" rx="9" ry="6" fill="#fde68a" opacity="0.85" class="wing-right"/>
  <!-- body -->
  <rect x="10" y="12" width="36" height="36" rx="10" fill="#fef08a"/>
  <rect x="10" y="12" width="36" height="36" rx="10" fill="none" stroke="#fbbf24" stroke-width="1.5"/>
  <!-- folded corner -->
  <polygon points="38,12 46,12 46,20" fill="#fde047"/>
  <line x1="38" y1="12" x2="46" y2="20" stroke="#fbbf24" stroke-width="1"/>
  <!-- eyes -->
  <ellipse cx="21" cy="32" rx="4.5" ry="5" fill="white"/>
  <ellipse cx="35" cy="32" rx="4.5" ry="5" fill="white"/>
  <circle cx="22" cy="32" r="2.5" fill="#3b2a4a"/>
  <circle cx="36" cy="32" r="2.5" fill="#3b2a4a"/>
  <circle cx="23" cy="31" r="1" fill="white"/>
  <circle cx="37" cy="31" r="1" fill="white"/>
  <!-- blush -->
  <ellipse cx="17" cy="38" rx="4" ry="2.5" fill="#fda4af" opacity="0.6"/>
  <ellipse cx="39" cy="38" rx="4" ry="2.5" fill="#fda4af" opacity="0.6"/>
  <!-- mouth uwu -->
  <path d="M23 41 Q28 45 33 41" stroke="#a16207" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <!-- antenna / sparkle -->
  <line x1="28" y1="12" x2="28" y2="6" stroke="#fbbf24" stroke-width="1.5"/>
  <circle cx="28" cy="5" r="2.5" fill="#f472b6"/>
</svg>`;

const POSTIBOO_SAD = `<svg width="56" height="60" viewBox="0 0 56 60" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="8" cy="38" rx="7" ry="4" fill="#fde68a" opacity="0.7"/>
  <ellipse cx="48" cy="38" rx="7" ry="4" fill="#fde68a" opacity="0.7"/>
  <rect x="10" y="12" width="36" height="36" rx="10" fill="#fef08a"/>
  <rect x="10" y="12" width="36" height="36" rx="10" fill="none" stroke="#fbbf24" stroke-width="1.5"/>
  <polygon points="38,12 46,12 46,20" fill="#fde047"/>
  <line x1="38" y1="12" x2="46" y2="20" stroke="#fbbf24" stroke-width="1"/>
  <ellipse cx="21" cy="32" rx="4" ry="4.5" fill="white"/>
  <ellipse cx="35" cy="32" rx="4" ry="4.5" fill="white"/>
  <circle cx="22" cy="33" r="2.5" fill="#3b2a4a"/>
  <circle cx="36" cy="33" r="2.5" fill="#3b2a4a"/>
  <ellipse cx="17" cy="38" rx="4" ry="2.5" fill="#93c5fd" opacity="0.5"/>
  <ellipse cx="39" cy="38" rx="4" ry="2.5" fill="#93c5fd" opacity="0.5"/>
  <path d="M23 43 Q28 40 33 43" stroke="#a16207" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <line x1="28" y1="12" x2="28" y2="6" stroke="#fbbf24" stroke-width="1.5"/>
  <circle cx="28" cy="5" r="2.5" fill="#93c5fd"/>
</svg>`;

let selectedMood = null;
let notes = [];

const sadMoods = ['sad', 'overwhelmed', 'lonely', 'anxious', 'drained'];

function isSad(mood) { return sadMoods.includes(mood); }

function getPostiboo(mood) {
  return mood && isSad(mood) ? POSTIBOO_SAD : POSTIBOO;
}

function renderPostiboo(el, mood) {
  el.innerHTML = getPostiboo(mood);
}

function init() {
  document.getElementById('postibooMain').innerHTML = POSTIBOO;
  document.getElementById('postibooWriter').innerHTML = POSTIBOO;

  loadSeedNotes();
  renderNotes();
  bindEvents();
}

function bindEvents() {
  document.getElementById('newNoteBtn').onclick = openModal;
  document.getElementById('modalClose').onclick = closeModal;
  document.getElementById('modalOverlay').onclick = (e) => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  };

  document.getElementById('hugBtn').onclick = () => {
    document.getElementById('hugOverlay').classList.add('active');
  };
  document.getElementById('hugClose').onclick = () => {
    document.getElementById('hugOverlay').classList.remove('active');
  };
  document.getElementById('hugOverlay').onclick = (e) => {
    if (e.target === document.getElementById('hugOverlay'))
      document.getElementById('hugOverlay').classList.remove('active');
  };

  document.getElementById('noteText').oninput = function() {
    document.getElementById('charCount').textContent = this.value.length;
  };

  document.getElementById('dropBtn').onclick = dropNote;

  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedMood = btn.dataset.mood;
      document.getElementById('promptText').textContent = PROMPTS[selectedMood] || 'Cuéntale a tu notita qué pasó… 💛';
      const writer = document.getElementById('postibooWriter');
      renderPostiboo(writer, selectedMood);
    };
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterNotes(btn.dataset.filter);
    };
  });
}

function openModal() {
  document.getElementById('modalOverlay').classList.add('active');
  document.getElementById('noteText').focus();
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  resetModal();
}

function resetModal() {
  selectedMood = null;
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('noteText').value = '';
  document.getElementById('charCount').textContent = '0';
  document.getElementById('promptText').textContent = 'Cuéntale a tu notita qué pasó… 💛';
  document.getElementById('anonCheck').checked = false;
  document.querySelector('input[name="respType"][value="apoyo"]').checked = true;
  renderPostiboo(document.getElementById('postibooWriter'), null);
}

function dropNote() {
  const text = document.getElementById('noteText').value.trim();
  if (!text && !selectedMood) {
    document.getElementById('noteText').focus();
    return;
  }
  const anon = document.getElementById('anonCheck').checked;
  const respType = document.querySelector('input[name="respType"]:checked').value;
  const mood = selectedMood || 'calm';
  const responses = COMMUNITY_RESPONSES[respType] || COMMUNITY_RESPONSES.apoyo;

  const note = {
    id: Date.now(),
    mood,
    text: text || '…',
    color: MOOD_COLORS[mood],
    emoji: MOOD_EMOJIS[mood],
    author: anon ? 'Anónima 🫧' : 'Tú 💛',
    responses: responses.slice(0, 2 + Math.floor(Math.random() * 3)),
    rot: ROTATIONS[notes.length % ROTATIONS.length],
    ts: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
  };

  notes.unshift(note);
  closeModal();
  renderNotes();

  if (!isSad(mood)) {
    setTimeout(showWinToast, 600);
    setTimeout(launchConfetti, 700);
  }
}

function renderNotes() {
  const board = document.getElementById('corkboard');
  const postiboo = document.getElementById('postibooMain');
  board.innerHTML = '';
  board.appendChild(postiboo);

  notes.forEach(n => {
    const el = createNoteEl(n);
    board.appendChild(el);
  });
}

function createNoteEl(note) {
  const div = document.createElement('div');
  div.className = 'note-card';
  div.dataset.mood = note.mood;
  div.style.setProperty('--rot', note.rot + 'deg');
  div.style.background = note.color;

  const pin = document.createElement('div');
  pin.className = 'note-pin';

  const emoji = document.createElement('div');
  emoji.className = 'note-mood-emoji';
  emoji.textContent = note.emoji;

  const text = document.createElement('p');
  text.className = 'note-text';
  text.textContent = note.text;

  const footer = document.createElement('div');
  footer.className = 'note-footer';

  const author = document.createElement('span');
  author.className = 'note-author';
  author.textContent = note.author;

  const reactions = document.createElement('div');
  reactions.className = 'note-reactions';
  note.responses.forEach(r => {
    const s = document.createElement('span');
    s.className = 'reaction-sticker';
    s.title = r;
    const first = r.match(/^\p{Emoji}/u);
    s.textContent = first ? first[0] : '💛';
    s.onclick = (e) => { e.stopPropagation(); s.style.transform = 'scale(1.6)'; setTimeout(() => s.style.transform = '', 300); };
    reactions.appendChild(s);
  });

  footer.appendChild(author);
  footer.appendChild(reactions);
  div.appendChild(pin);
  div.appendChild(emoji);
  div.appendChild(text);
  div.appendChild(footer);

  if (note.responses.length > 0 && note.responses[0].length > 2) {
    const resp = document.createElement('div');
    resp.style.cssText = 'font-size:0.72rem;color:rgba(80,60,100,0.6);font-weight:600;font-style:italic;margin-top:0.25rem;';
    resp.textContent = note.responses[0];
    div.insertBefore(resp, footer);
  }

  return div;
}

function filterNotes(filter) {
  document.querySelectorAll('.note-card').forEach(card => {
    if (filter === 'all' || card.dataset.mood === filter) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

function showWinToast() {
  const toasts = [
    { icon: '🐥', text: '¡Lo estás haciendo bien! 🌟' },
    { icon: '⭐', text: '¡Pequeña victoria celebrada! ✨' },
    { icon: '🌈', text: '¡Tu notita llegó al corcho! 💛' },
    { icon: '🌸', text: '¡Eso es! ¡Sigue así, campeona! 🎉' },
  ];
  const t = toasts[Math.floor(Math.random() * toasts.length)];
  const toast = document.getElementById('winToast');
  toast.querySelector('.win-icon').textContent = t.icon;
  toast.querySelector('.win-text').textContent = t.text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function launchConfetti() {
  const colors = ['#f9c8d8', '#fff3b8', '#c8e4f8', '#e2d4f8', '#c8f0dc', '#ffd8c0'];
  for (let i = 0; i < 28; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = (20 + Math.random() * 60) + 'vw';
    piece.style.top = (Math.random() * 30) + 'vh';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (6 + Math.random() * 8) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDelay = (Math.random() * 0.5) + 's';
    piece.style.animationDuration = (0.9 + Math.random() * 0.8) + 's';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2000);
  }
}

function loadSeedNotes() {
  notes = [
    {
      id: 1, mood: 'hopeful', text: 'Hoy por fin dormí bien. Es poco pero es algo 🌈',
      color: MOOD_COLORS.hopeful, emoji: '🌈', author: 'Sol 💛',
      responses: ['💛', '⭐ Lo estás haciendo bien', '🌸'],
      rot: -2, ts: '09:14'
    },
    {
      id: 2, mood: 'sad', text: 'Extraño a mi mejor amiga. La distancia duele.',
      color: MOOD_COLORS.sad, emoji: '😔', author: 'Anónima 🫧',
      responses: ['🐻 Estoy contigo', '☁️ Respira conmigo', '💜'],
      rot: 1.5, ts: '10:32'
    },
    {
      id: 3, mood: 'grateful', text: 'Mi mamá me hizo mi comida favorita sin que se lo pidiera. La amo tanto.',
      color: MOOD_COLORS.grateful, emoji: '✨', author: 'Luna 🌙',
      responses: ['💛', '🌸', '⭐ Lo estás haciendo bien'],
      rot: -1, ts: '11:05'
    },
    {
      id: 4, mood: 'anxious', text: 'Tengo presentación mañana y siento que no estoy lista para nada 😬',
      color: MOOD_COLORS.anxious, emoji: '🧿', author: 'Anónima 🫧',
      responses: ['🐻 Estoy contigo', '🌱 Un paso a la vez', '🫧'],
      rot: 2, ts: '12:18'
    },
    {
      id: 5, mood: 'motivated', text: '¡Por fin terminé el proyecto que tenía abandonado desde hace meses! ¡LOGRÉ!',
      color: MOOD_COLORS.motivated, emoji: '🔥', author: 'Vale 🔥',
      responses: ['⭐', '🐥', '💛'],
      rot: -2.5, ts: '14:00'
    },
    {
      id: 6, mood: 'calm', text: 'Tarde con té, lluvia y un libro. Esto es todo lo que necesitaba hoy.',
      color: MOOD_COLORS.calm, emoji: '😌', author: 'Ro 🌿',
      responses: ['🌸', '💛', '☁️'],
      rot: 1, ts: '16:45'
    },
  ];
}

document.addEventListener('DOMContentLoaded', init);
