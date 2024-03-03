import './demo.css'
import { useState, useEffect, useEffectEvent } from 'react';
import { lists } from './textList';

//百度寻找的批量引入文件夹中所有图片的方法
const imagesContext = require.context('./img', true, /\.(png|jpe?g|svg)$/i);
const images = {};
imagesContext.keys().forEach((key) => {
  const imageName = key.replace(/(\.\/|\.)/g, '');
  images[imageName] = imagesContext(key);
});


//主体
function Demo() {
  const [showWindow, isShowWindow] = useState(false);
  console.log(showWindow);

  function handleShowChange() {
    isShowWindow(!showWindow);
  }

  //校验音频播放SpeechSynthesis接口对象
  // useEffect(() => {
  //   if (window.speechSynthesis) {
  //     alert('浏览器暂不支持音频播放。')
  //   }
  // }, [])
  // console.log(isSpeechSynthesis);
  return (
    <>
      <HandTop handleShowChange={handleShowChange} />
      <ToggleTextBox showWindow={showWindow} handleShowChange={handleShowChange} />
      <BodyContent lists={lists} />
    </>

  );
}


function HandTop({ handleShowChange }) {
  return (
    <>
      <h1 className='header'>Speech Text Reader</h1>
      <div className='header_box'>
        <button className='header_btn' onClick={handleShowChange}>Toggle Text Box</button>
      </div>
    </>
  )
}


function ToggleTextBox({ showWindow, handleShowChange }) {
  const [text, isText] = useState('');
  //获取输入框内容
  function handleChangeText(e) {
    isText(e.target.value);
  }

  //按钮点击发出语音
  function handleBtnSynth() {
    if (window.speechSynthesis) {
      let utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.rate = 1; // 语速，默认值为1
      utterance.volume = 1; // 设置音量，范围 0-1
      utterance.pitch = 1; // 音调，默认值为1
      utterance.lang = 'zh-CN'; // 设置语言为中文
      // msg.lang = 'en-US'; // 设置语言
      // msg.volume = 1; // 设置音量，范围 0-1
      // msg.rate = 1; // 设置语速，范围 0.1-10
      // msg.pitch = 1; // 设置音调，范围 0-2
      // synth.speak(utterance);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('浏览器暂不支持音频播放。')
    }
  }
  return (
    <div className={showWindow ? 'move_box' : 'move_box move_box_change'}>
      <span onClick={handleShowChange}>X</span>
      <div className='move_box_contect'>
        <h2>Choose Voice</h2>
        <select className='move_box_select'>
          <option selected>Google Deutsch de-DE</option>
        </select>
        <textarea type='text' placeholder='Enter text to read...' value={text} className='move_box_input'
          onChange={handleChangeText}
        />
        <button className='move_box_readbtn' onClick={handleBtnSynth}>Read Text</button>
      </div>
    </div >
  )
}


function BodyContent({ lists }) {
  function handleImgSynth(e) {
    if (window.speechSynthesis) {
      let utterance = new SpeechSynthesisUtterance();
      utterance.text = e.text;
      utterance.rate = 1; // 语速，默认值为1
      utterance.volume = 1; // 设置音量，范围 0-1
      utterance.pitch = 1; // 音调，默认值为1
      utterance.lang = 'zh-CN'; // 设置语言为中文
      // msg.lang = 'en-US'; // 设置语言
      // msg.volume = 1; // 设置音量，范围 0-1
      // msg.rate = 1; // 设置语速，范围 0.1-10
      // msg.pitch = 1; // 设置音调，范围 0-2
      // synth.speak(utterance);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('浏览器暂不支持音频播放。')
    }
  }
  return (
    <>
      <ul className='container'>
        {lists.map(t => {
          return <li key={t.id}>
            <button className='container_box' onClick={() => { handleImgSynth(t) }}>
              <div className='img_box'>
                <img src={setSrc(t.name)} />
              </div>
              <div className='text_box'>
                {t.text}
              </div>
            </button>
          </li>
        })}
      </ul>
    </>
  )
}

//获取图片地址
function setSrc(src) {
  const newName = src + 'jpg';
  const newSrc = images[Object.keys(images).filter(t => t == newName)];
  return newSrc;
}

export default Demo;


