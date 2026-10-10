(async () => {
  "use strict";
  const shapes = ["●", "▲", "■", "★"];
  const colors = ["#d25b6a", "#7aa7c7", "#e0b15a", "#2f6f4e"];
  let round = 0, answer = 0, startedAt = Date.now();
  const rounds = [
    () => seq(["●", "▲", "●", "▲"], ["●", "■", "★"], 0),
    () => seq(["1", "2", "3", "4"], ["5", "6", "1"], 0),
    () => seq(["紅", "紅", "藍", "藍"], ["紅", "藍", "綠"], 0),
    () => seq(["小", "中", "大"], ["更大", "小", "中"], 0),
    () => seq(["★", "★", "★★", "★★"], ["★★★", "★", "●"], 0),
    () => seq(["🐱", "🐟", "🐱", "🐟"], ["🐱", "🐶", "🐟"], 0),
    () => seq(["2", "4", "6", "8"], ["10", "9", "12"], 0),
    () => seq(["○", "○○", "○○○"], ["○○○○", "○", "●"], 0),
    () => seq(["上", "下", "上", "下"], ["上", "左", "下"], 0),
    () => seq(["A", "B", "A", "B"], ["A", "C", "B"], 0),
    () => seq(["1", "1", "2", "3"], ["5", "4", "8"], 0),
    () => seq(["🌙", "⭐", "🌙", "⭐"], ["🌙", "☀", "⭐"], 0)
  ];
  function seq(items, choices, correct) {
    return { items, choices, correct };
  }
  async function start(reason="new") {return SistersRound.start(()=>{round=0;
    startedAt = Date.now();
    document.getElementById("complete").hidden = true;
    show();
  },reason);}
  function show() {
    const q = rounds[round % rounds.length]();
    answer = q.correct;
    const seq = document.getElementById("seq");
    seq.replaceChildren();
    q.items.forEach(item => { const d = document.createElement("div"); d.className = "token"; d.textContent = item; seq.append(d); });
    const ask = document.createElement("div"); ask.className = "token"; ask.textContent = "?"; seq.append(ask);
    const choices = document.getElementById("choices");
    choices.replaceChildren();
    q.choices.forEach((item, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "token"; b.textContent = item;
      b.onclick = () => pick(i);
      choices.append(b);
    });
    document.getElementById("status").textContent = `第 ${Math.min(round + 1,rounds.length)} / ${rounds.length} 題 · 看規律，選下一個`;
  }
  function pick(i) {
    if(!SistersRound.canInteract())return;
    if (i !== answer) { SistersPlay.playSound("soft"); document.getElementById("status").textContent = "再看一次規律"; return; }
    SistersPlay.playSound("ok");
    round++;
    if (round >= rounds.length) {
      SistersPlay.showComplete("十二種規律都找到了");
      SistersPlay.recordResult({ game: "pattern", difficulty: "mixed", level: rounds.length, startedAt, moves: rounds.length });
      SistersRound.checkpoint();
      return;
    }
    show();SistersRound.checkpoint();
  }
  SistersPlay.showCoach("pattern", [{ demo: "●▲●?", line: "看規律，選下一個" }]);
  SistersPlay.mount({ title: "規律接龍", onRestart: () => start("restart") });
  document.getElementById("overlay-next").onclick = ()=>start();
  if(!await SistersRound.attach({snapshot:()=>({round,answer,startedAt}),restore:p=>{({round,answer,startedAt}=p);show();}})) await start();
})();
