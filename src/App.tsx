import React from 'react'
import Counter from './components/Counter'
// import logo from './logo.svg'
// import './App.css'
import Article from './components/Article'
import TextInput from './components/Textinput'
import ToggleButton from './components/ToggleButton'

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
            {/* 第6回まで */}
            <Article
                title="TSだと、暗黙的Anyは使えない"
                content="だから、型を定義しておく必要があります"
            />
            <Article
                title="TypeScriptでの関数コンポーネント"
                content="React.FC<型>を利用します。これにより破壊的オブジェクトを回避できます"
            />

            {/* 第7回から */}
            <TextInput />
            <Counter />
            <ToggleButton />
        </div>
    )
}

export default App
