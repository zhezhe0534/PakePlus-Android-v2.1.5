window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// ===== 核心：APP启动自动弹出带按钮的弹窗 + 点击跳转 + 关闭功能 【手机+电脑 完美适配】 =====
setTimeout(() => {
  // 1. 创建弹窗的样式 (自适应手机/电脑，美观不刺眼)
  const css = `
    #custom-jump-modal {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.6); /* 半透明黑色遮罩，醒目不刺眼 */
      z-index: 999999; /* 弹窗置顶，永远在最上层 */
      display: flex; justify-content: center; align-items: center;
    }
    #modal-box {
      background: white; border-radius: 15px;
      width: 90%; max-width: 350px; /* 手机适配90%宽度，电脑最大350px */
      padding: 25px; text-align: center;
      box-shadow: 0 0 20px rgba(0,0,0,0.3);
    }
    #modal-btn {
      background: #007aff; color: white; border: none;
      padding: 12px 30px; border-radius: 8px;
      font-size: 18px; font-weight: bold;
      margin-top: 15px; width: 100%; cursor: pointer;
    }
    #modal-close {
      background: #f5f5f5; color: #666; border: none;
      padding: 8px 20px; border-radius: 6px;
      font-size: 14px; margin-top: 10px; cursor: pointer;
    }
  `;
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);

  // 2. 创建弹窗的HTML内容 (标题+跳转按钮+关闭按钮)
  const modalHtml = `
    <div id="custom-jump-modal">
      <div id="modal-box">
        <h3>点击下方按钮跳转</h3>
        <button id="modal-btn">立即打开链接</button>
        <button id="modal-close">关闭弹窗</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // 3. 按钮点击事件 - 核心跳转逻辑 (手机端100%生效，无任何坑)
  document.getElementById('modal-btn').onclick = function() {
    // 点击按钮，调用系统浏览器打开你的目标网址
    window.open('https://jiuyue.hlwjd01.cn/c.php?id=222', '_blank');
    // 跳转后自动关闭弹窗，体验更好
    document.getElementById('custom-jump-modal').remove();
  };

  // 4. 关闭按钮事件 - 点击关闭弹窗，不影响使用APP
  document.getElementById('modal-close').onclick = function() {
    document.getElementById('custom-jump-modal').remove();
  };
}, 200);

// ===== 下面的官方核心代码 完整保留！！！一行都不要删、不要改 =====
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
