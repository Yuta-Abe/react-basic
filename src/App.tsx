import React from 'react'
// import logo from './logo.svg'
// import './App.css'
import Article from './components/Article'

function App() {
    // return (
    //     <div className="App">
    //         <header className="App-header">
    //             <img src={logo} className="App-logo" alt="logo" />
    //             <p>TypeScriptのテンプレートを使用しただけです。</p>
    //             <p>ホットリロードにも対応してます。</p>
    //             <p>ESLintとPrettierの連携もできました</p>
    //             <p>
    //                 注意点はESLintの設定で「prettier/@typescript-eslint」がいらないことです
    //             </p>
    //             <a
    //                 className="App-link"
    //                 href="https://reactjs.org"
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //             >
    //                 Learn React
    //             </a>
    //         </header>
    //     </div>
    // )
    return (
        <div>
            <Article
                title="TSだと、暗黙的Anyは使えない"
                content="だから、型を定義しておく必要があります"
            />
            <Article
                title="TypeScriptでの関数コンポーネント"
                content="React.FC<型>を利用します。これにより破壊的オブジェクトを回避できます"
            />
        </div>
    )
}

export default App
