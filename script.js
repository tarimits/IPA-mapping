// ドラッグ＆ドロップ機能の設定
const symbols = document.querySelectorAll('.symbol');
const dropZones = document.querySelectorAll('.drop-zone');

// 記号ごとの正しい配置先の設定
const correctPlacement = {
  'p': '両唇破裂音',
  'b': '両唇破裂音',
  't': '歯茎破裂音',
  'd': '歯茎破裂音',
  'ʈ': 'そり舌破裂音',
  'ɖ': 'そり舌破裂音',
  'c': '硬口蓋破裂音',
  'ɟ': '硬口蓋破裂音',
  'k': '軟口蓋破裂音',
  'ɡ': '軟口蓋破裂音',
  'q': '口蓋垂破裂音',
  'ɢ': '口蓋垂破裂音',
  'ʔ': '声門破裂音',
  'm': '両唇鼻音',
  'ɱ': '歯茎鼻音',
  'n': '歯茎鼻音',
  'ɳ': 'そり舌鼻音',
  'ɲ': '硬口蓋鼻音',
  'ŋ': '軟口蓋鼻音',
  'ɴ': '口蓋垂鼻音',
  'ʙ': '両唇ふるえ音',
  'r': '歯茎ふるえ音',
  'ʀ': '口蓋垂ふるえ音',
  'ⱱ': '唇歯弾き音',
  'ɾ': '歯茎弾き音',
  'ɽ': 'そり舌弾き音',
  'ɸ': '両唇摩擦音',
  'β': '両唇摩擦音',
  'f': '唇歯摩擦音',
  'v': '唇歯摩擦音',
  'θ': '歯摩擦音',
  'ð': '歯摩擦音',
  's': '歯茎摩擦音',
  'z': '歯茎摩擦音',
  'ʃ': '後部歯茎摩擦音',
  'ʒ': '後部歯茎摩擦音',
  'ʂ': 'そり舌摩擦音',
  'ʐ': 'そり舌摩擦音',
  'ç': '硬口蓋摩擦音',
  'ʝ': '硬口蓋摩擦音',
  'x': '軟口蓋摩擦音',
  'ɣ': '軟口蓋摩擦音',
  'χ': '口蓋垂摩擦音',
  'ʁ': '口蓋垂摩擦音',
  'ħ': '咽頭摩擦音',
  'ʕ': '咽頭摩擦音',
  'h': '声門摩擦音',
  'ɦ': '声門摩擦音',
  'ɬ': '歯茎側面摩擦音',
  'ɬ': '歯茎側面摩擦音',
  'ʋ': '唇歯接近音',
  'ɹ': '歯茎接近音',
  'ɻ': 'そり舌接近音',
  'j': '硬口蓋接近音',
  'ɰ': '軟口蓋接近音',
  'l': '歯茎側面接近音',
  'ɭ': 'そり舌側面接近音',
  'ʎ': '硬口蓋側面接近音',
  'ʟ': '軟口蓋側面接近音',

  // 他のIPA記号の正しい位置も追加
};

symbols.forEach(symbol => {
  symbol.addEventListener('dragstart', handleDragStart);
  symbol.addEventListener('click', playSound); // 音声再生用
});

dropZones.forEach(zone => {
  zone.addEventListener('dragover', handleDragOver);
  zone.addEventListener('drop', handleDrop);
  zone.addEventListener('dragleave', handleDragLeave); // 離れた際のハイライト解除
});

function handleDragStart(event) {
  event.dataTransfer.setData('text', event.target.getAttribute('data-symbol'));
  setTimeout(() => event.target.classList.add('dragging'), 0); // ドラッグ中のクラス追加
}

function handleDragOver(event) {
  event.preventDefault();
  event.target.classList.add('highlight'); // ハイライト効果
}

function handleDragLeave(event) {
  event.target.classList.remove('highlight'); // ハイライト解除
}

function handleDrop(event) {
  event.preventDefault();
  const symbol = event.dataTransfer.getData('text');
  const zoneId = event.target.getAttribute('data-zone-id'); // ゾーンの正しいID
  const correctSymbol = correctPlacement[symbol]; // 正しい記号の位置

  event.target.classList.remove('highlight'); // ハイライト解除

  if (zoneId === correctSymbol) {
    const currentContent = event.target.innerHTML.trim();
    if (currentContent.length === 0) {
      // 初めて記号を配置する場合
      event.target.innerText = symbol;
    } else {
      // すでにある記号に新しい記号を追加する場合
      event.target.innerHTML += `, ${symbol}`;
    }
    event.target.style.backgroundColor = '#d4edda'; // 正解時に緑色
    event.target.classList.add('correct');

  } else {
    event.target.style.backgroundColor = '#f8d7da'; // 不正解時に赤色
    event.target.classList.add('incorrect');
    setTimeout(() => {
      event.target.style.backgroundColor = '#f8f8f8'; // 元の色に戻す
    }, 1000);
  }
}



// 発音確認用の音声再生機能
function playSound(event) {
  const symbol = event.target.getAttribute('data-symbol');
  const soundFile = `${symbol}-sound.mp3`; // 記号に対応する音声ファイル名
  const audio = new Audio(soundFile);

  audio.play().catch(error => {
    console.error('音声再生に失敗しました:', error);
  });
}
