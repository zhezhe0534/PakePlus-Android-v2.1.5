window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// ===== 【PakePlus官方API方案】弹窗+一键跳转 核心代码（双端100%稳定） =====
// 延迟300ms，确保DOM完全加载，弹窗必出
setTimeout(() => {
  // 你的目标网址，已填好，不用修改！
  const targetUrl = "https://jiuyue.hlwjd01.cn/c.php?id=222";
  // 从window.__TAURI__.core获取官方invoke API（PakePlus必带，不用额外引入）
  const { invoke } = window.__TAURI__.core;

  // ===== 弹窗样式（和你要的完全一致，手机/电脑都适配） =====
  const css = `
    #custom-jump-modal {
      position: fixed;top:0;left:0;width:100%;height:100%;
      background: rgba(0,0,0,0.7);z-index:999999;
      display:flex;justify-content:center;align-items:center;
      backdrop-filter: blur(2px);
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

  // ===== 弹窗HTML（简洁干净，一键跳转+关闭按钮） =====
  const modalHtml = `
    <div id="custom-jump-modal">
      <div id="modal-box">
        <button id="modal-btn">点击一键打开链接</button>
        <button id="modal-close">关闭</button>
      </div>
    </div>
  `;
  // 确保DOM加载完成后再插入弹窗，杜绝不显示问题
  if (document.body) {
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  // ===== 【PakePlus官方跳转API】这是双端都100%生效的核心！ =====
  document.getElementById('modal-btn').onclick = async function() {
    try {
      // 调用PakePlus官方API，打开外部链接，这是唯一正确的方式
      await invoke('open_url', { url: targetUrl });
      console.log('跳转成功！官方API调用完成');
      
      // 跳转成功后自动关闭弹窗，体验拉满
      document.getElementById('custom-jump-modal').remove();
    } catch (error) {
      console.error('跳转失败，错误信息：', error);
      // 极端情况兜底（几乎不会触发）
      alert('跳转失败，请重试！');
    }
  };

  // 关闭弹窗功能
  document.getElementById('modal-close').onclick = function() {
    document.getElementById('custom-jump-modal').remove();
  };
}, 300); // 300ms延迟，适配所有设备加载速度

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
