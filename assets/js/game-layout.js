(() => {
  'use strict';
  const app=document.querySelector('.play-app,.maze-app,.sudoku-app');
  if(!app)return;
  const panel=document.getElementById('complete')||document.getElementById('win-panel');
  const replay=document.getElementById('retry-scene'),replayHome=replay?document.createComment('same-scene replay'):null;if(replayHome)replay.after(replayHome);
  const settings=document.createElement('details');settings.id='game-settings';settings.className='game-settings';settings.open=false;
  const summary=document.createElement('summary');summary.textContent='遊戲設定';settings.append(summary);
  const content=document.createElement('div');content.className='game-settings-content';settings.append(content);
  const header=app.querySelector('.play-top');if(header)header.after(settings);else app.prepend(settings);
  const optionIDs=['size-row','art-row','theme-row','tier-row','level-row','disc-row','diff-row'];
  let syncing=false,finished=false,work=null;
  const workSizer=new ResizeObserver(fitCompletedWork);
  function prepareCompletedWork(){
    if(work||document.getElementById('game')?.classList.contains('sudoku-screen'))return;
    const board=app.querySelector('#maze,#board,#grid,#pegs,#scene');
    let node=board?.closest('.board-wrap,.maze-wrap')||board;
    const question=app.querySelector('.q-board'),answers=app.querySelector('.a-board');
    if(question&&answers){node=document.createElement('div');node.className='game-work-content';question.before(node);node.append(question,answers);}
    if(!node)return;
    // A fixed completion dock must remain outside the scaled result; this also
    // preserves each game's surrounding hidden screen and existing button IDs.
    if(node.contains(panel))node.after(panel);
    const shell=document.createElement('div');shell.className='game-work-view';node.replaceWith(shell);shell.append(node);
    work={shell,node};workSizer.observe(node);workSizer.observe(panel);
  }
  function fitCompletedWork(){
    if(!work)return;
    const {shell,node}=work;
    if(!finished){node.style.transform='';node.style.transformOrigin='';shell.style.height='';return;}
    const height=node.offsetHeight;if(!height)return;
    const top=shell.getBoundingClientRect().top,pad=parseFloat(getComputedStyle(node).marginTop)||0;
    const room=Math.max(40,panel.getBoundingClientRect().top-top-pad-8),scale=Math.min(1,room/height);
    node.style.transformOrigin='center top';node.style.transform='scale('+scale+')';shell.style.height=(height*scale+pad)+'px';
  }
  function sync(){
    if(syncing)return;syncing=true;
    try{
      for(const id of optionIDs){const el=document.getElementById(id);if(el&&el.parentElement!==content)content.append(el);}
      // Hints/undo affect this round. Keep them outside new-round/settings gates
      // so the existing family lifecycle still permits finishing during grace.
      for(const id of ['hint','undo','toggle-path']){
        const action=document.getElementById(id),group=action?.closest('.toolbar,.game-controls,.game-actions');
        if(!group||group.closest('#game-settings'))continue;
        let row=group.parentElement,actions;
        if(!row.classList.contains('round-action-row')){row=document.createElement('div');row.className='round-action-row';group.replaceWith(row);row.append(group);}
        actions=row.querySelector('.in-round-actions');
        if(!actions){actions=document.createElement('div');actions.className='in-round-actions';row.append(actions);}
        actions.append(action);
      }
      const mute=document.getElementById('mute');if(mute&&mute.parentElement!==content)content.append(mute);
      const empty=!content.children.length;if(settings.hidden!==empty)settings.hidden=empty;
      const chosen=[...content.querySelectorAll('select')].map(el=>el.selectedOptions[0]?.textContent.trim()).filter(Boolean);
      const title='遊戲設定'+(chosen.length?' · '+chosen.join('／'):'');if(summary.textContent!==title)summary.textContent=title;
      // Existing parental authorization remains the sole gate for these actions.
      const authorized=document.getElementById('parent-authorized'),debt=document.getElementById('parent-clear-debt');
      if(authorized&&debt&&!document.getElementById('parent-maintenance')){
        const maintenance=document.createElement('details');maintenance.id='parent-maintenance';
        const heading=document.createElement('summary');heading.textContent='進階家長設定';maintenance.append(heading);
        const change=debt.nextElementSibling;authorized.insertBefore(maintenance,debt);maintenance.append(debt);if(change?.tagName==='DETAILS')maintenance.append(change);
      }
      if(panel&&!panel.querySelector('[data-game-return]')&&!document.getElementById('overlay-list')&&!document.getElementById('home-from-win')){
        const back=document.getElementById('back-home');if(back){const button=document.createElement('button');button.type='button';button.className='secondary-button';button.dataset.gameReturn='';button.textContent='返回遊戲列表';button.onclick=()=>back.click();panel.append(button);}
      }
      const done=!!panel&&!panel.hidden&&!panel.parentElement.closest('[hidden]');
      // Keep Spot's existing replay reachable after completing either image.
      if(replay){if(done&&replay.parentElement!==panel)panel.append(replay);else if(!done&&replay.parentElement!==replayHome.parentNode)replayHome.before(replay);}
      if(done!==finished){finished=done;document.body.classList.toggle('game-completed',done);if(done){prepareCompletedWork();window.scrollTo(0,0);}requestAnimationFrame(()=>window.dispatchEvent(new Event('resize')));}
      fitCompletedWork();
    }finally{syncing=false;}
  }
  window.addEventListener('resize',fitCompletedWork);
  content.addEventListener('change',e=>{if(e.target.matches('select'))settings.open=false;});
  settings.addEventListener('toggle',()=>window.dispatchEvent(new Event('resize')));
  const observer=new MutationObserver(sync);observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
  sync();setInterval(sync,250);
})();
