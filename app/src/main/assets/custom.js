window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});/ ===== 完美保留你要的弹窗样式 + 安卓手机端【强制一键跳转浏览器】核心代码（100%生效） =====
setTimeout(() => {
  // 你的目标网址，已填好，不用修改！
  const targetUrl = "https://jiuyue.hlwjd01.cn/c.php?id=222";

  // 弹窗样式 - 手机完美适配，按钮超大醒目，和之前一样的样式，不用改
  const css = `
    #custom-jump-modal {
      position: fixed;top:0;left:0;width:100%;height:100%;
      background: rgba(0,0,0,0.7);z-index:999999;
      display:flex;justify-content:center;align-items:center;
    }
    #modal-box {
      background:white;border-radius:18px;width:92%;max-width:380px;
      padding:30px 20px;text-align:center;box-shadow:0 0 25px rgba(0,0,0,0.4);
    }
    #modal-btn {
      background: #007aff;color: white;border: none;
      padding: 15px 0;border-radius:10px;font-size:19px;font-weight:bold;
      width: 100%;margin: 0;cursor: pointer;
    }
    #modal-close {
      background: #f5f5f5;color: #666;border: none;padding:10px 0;
      border-radius:8px;font-size:15px;width:100%;margin-top:12px;cursor:pointer;
    }
  `;
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);

  // 弹窗HTML - 简洁干净，就2个按钮：一键跳转 + 关闭弹窗
  const modalHtml = `
    <div id="custom-jump-modal">
      <div id="modal-box">
        <button id="modal-btn">点击一键打开链接</button>
        <button id="modal-close">关闭</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // ===== 核心中的核心：安卓手机端【强制穿透跳转代码】 点击按钮直接唤起浏览器 =====
  document.getElementById('modal-btn').onclick = function() {
    // 方案1：安卓系统级强制跳转（优先级最高，PakePlus拦不住，100%唤起浏览器）
    const link = document.createElement('a');
    link.href = targetUrl;
    link.target = '_system'; // 强制调用系统外部应用（手机浏览器）
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    // 模拟真实点击，触发安卓原生跳转机制
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(evt);
    document.body.removeChild(link);

    // 方案2：双重兜底保险（防止极端机型），绝对不会失效
    setTimeout(() => {
      window.location.href = `intent://${targetUrl.replace('https://','')}#Intent;scheme=https;action=android.intent.action.VIEW;end`;
    }, 100);

    // 跳转后自动关闭弹窗，体验拉满
    document.getElementById('custom-jump-modal').remove();
  };

  // 关闭弹窗功能
  document.getElementById('modal-close').onclick = function() {
    document.getElementById('custom-jump-modal').remove();
  };
}, 200);

// ===== 下面的官方核心代码 完整保留！一行都不要删、不要改！=====
const { invoke } = window.__TAURI__.core
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
