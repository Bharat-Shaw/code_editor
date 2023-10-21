import { useState } from 'react'
import './App.css'

function App() {
  const [html, setHtml] = useState(JSON.parse(localStorage.getItem('html')) || '');
  const [css, setCss] = useState(JSON.parse(localStorage.getItem('css')) || '');
  const [js, setJs] = useState(JSON.parse(localStorage.getItem('js')) || '');
  const [lock, setLock] = useState(false);

  const handleTab = (e, stateSetter) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      if (!lock) {
        const newValue = e.target.value.substring(0, selectionStart) + '\t' + e.target.value.substring(selectionEnd);
        e.target.value = newValue;
        e.target.setSelectionRange(selectionStart + 1, selectionStart + 1);
        stateSetter(newValue);
      }
    }
  };

  const LockUnlock = () => {
    setLock(!lock);
    alert(lock ? 'Editor unlocked' : 'Editor locked')
  }

  const saveCode = () => {
    localStorage.setItem('html', JSON.stringify(html))
    localStorage.setItem('css', JSON.stringify(css))
    localStorage.setItem('js', JSON.stringify(js))
    alert('Code saved!');
  }

  const clearCode = () => {
    setHtml('');
    setCss('');
    setJs('');
  }

  const copyToClipboard = () => {
    const combinedCode = `
      <!-- HTML -->
      ${html}
      
      <!-- CSS -->
      <style>
        ${css}
      </style>
      
      <!-- JavaScript -->
      <script>
        ${js}
      </script>
    `;
    navigator.clipboard.writeText(combinedCode)
      .then(() => {
        alert('Code copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy code: ', err);
      });
  };

  return (
    <>
      <div>
        {/* title */}
        <h2 className='title'>Code Editor</h2>

        {/* editor */}
        <div className='editor'>

          {/*editor code area */}
          <div className='editor_code'>
            <h4>HTML</h4>
            <textarea type="text" className='display_area' value={html}
              onChange={(e) => {
                if (!lock) {
                  setHtml(e.target.value)
                }
              }}
              onKeyDown={(e) => handleTab(e, setHtml)} />
            <h4>CSS</h4>
            <textarea type="text" className='display_area' value={css}
              onChange={(e) => {
                if (!lock) {
                  setCss(e.target.value)
                }
              }}
              onKeyDown={(e) => handleTab(e, setCss)} />
            <h4>JavaScript</h4>
            <textarea type="text" className='display_area' value={js}
              onChange={(e) => {
                if (!lock) {
                  setJs(e.target.value)
                }
              }}
              onKeyDown={(e) => handleTab(e, setJs)} />

            {/*editor button */}
            <div className='editor_button'>
              <button className='editor_button--blue editor_button--size' onClick={copyToClipboard}>Copy</button>
              <button className='editor_button--green editor_button--size' onClick={saveCode}>Save</button>
              <button className='editor_button--red editor_button--size' disabled={lock} onClick={clearCode}>Clear</button>
              <button className={lock ? 'editor_button--red editor_button--size' : 'editor_button--gray editor_button--size'}
                onClick={LockUnlock}>{lock ? 'Unlock' : 'Lock'}</button>
            </div>
          </div>

          {/* editor output area */}
          <div className='editor_output'>
            <h4>Output</h4>
            <iframe className='display_area'  sandbox="allow-scripts"
              srcDoc={html + '<style>' + css + '</style>' + '<script>' + js + '</script>'}>
            </iframe>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

