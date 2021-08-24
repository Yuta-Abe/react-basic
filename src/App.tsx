/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
// import React, { useEffect, useState } from 'react'
// // import logo from './logo.svg'
// // import './App.css'
// import Article from './components/Article'
// import TextInput from './components/Textinput'
// import Counter from './components/Counter'
// import ToggleButton from './components/ToggleButton'

// function App() {
//     // return (
//     //     <div className="App">
//     //         <header className="App-header">
//     //             <img src={logo} className="App-logo" alt="logo" />
//     //             <p>TypeScriptのテンプレートを使用しただけです。</p>
//     //             <p>ホットリロードにも対応してます。</p>
//     //             <p>ESLintとPrettierの連携もできました</p>
//     //             <p>
//     //                 注意点はESLintの設定で「prettier/@typescript-eslint」がいらないことです
//     //             </p>
//     //             <a
//     //                 className="App-link"
//     //                 href="https://reactjs.org"
//     //                 target="_blank"
//     //                 rel="noopener noreferrer"
//     //             >
//     //                 Learn React
//     //             </a>
//     //         </header>
//     //     </div>
//     // )

//     // useEffectのユースケース
//     const [name, setName] = useState('')
//     const [id, setId] = useState('Yuta-Abe')
//     // yuta-abeのIDは非公開だからnullですよ～
//     const ids = [
//         'Yuta-Abe',
//         'MerlinVR',
//         'aws',
//         'google',
//         'facebook',
//         'gaearon',
//         'deatiger',
//         'JUKI',
//         '1938',
//     ]
//     const getRandomID = () => {
//         const aid = ids[Math.floor(Math.random() * ids.length)]
//         setId(aid)
//     }

//     useEffect(() => {
//         // テンプレートリテラルで${id}にして変数を埋め込む
//         // fetchで指定アドレスからデータをとってくる
//         fetch(`https://api.github.com/users/${id}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data)
//                 setName(String(data.name))
//             })
//             .catch((error) => {
//                 setId('a')
//                 console.error(error)
//             })
//     }, [id])
//     // idが変更されるたびに実行される

//     return (
//         <div>
//             {/* 第6回まで */}
//             <Article
//                 title="TSだと、暗黙的Anyは使えない"
//                 content="だから、型を定義しておく必要があります"
//             />
//             <Article
//                 title="TypeScriptでの関数コンポーネント"
//                 content="React.FC<型>を利用します。これにより破壊的オブジェクトを回避できます"
//             />

//             {/* 第7回から */}
//             <TextInput />
//             <Counter />
//             <ToggleButton />

//             {/* 第9回から */}
//             <p>
//                 {id}の、GitHub上の名前は{name}です。
//             </p>
//             <button onClick={getRandomID} type="button">
//                 IDを変更
//             </button>
//         </div>
//     )
// }

// リアクト実践編
import React from 'react'
import defaultDataset from './dataset'
import './assets/styles/style.css'

// TS用に型を定義
type State = {
    answers: string[]
    chats: string[]
    currentID: string
    dataset: typeof defaultDataset
    open: boolean
}

// クラスコンポーネントに変更
// クラスコンポーネントの場合はジェネリックで型指定
// 引数無しの型なら{}でOK
export default class App extends React.Component<{}, State> {
    // state: State
    constructor(props: {}) {
        super(props)
        this.state = {
            answers: [],
            chats: [],
            currentID: 'init',
            dataset: defaultDataset,
            open: false,
        }
    }

    // クラスの場合はrender()が必要
    // どうしても must use destructuring props assignmenteslintreact を回避できなかったので無効化
    render() {
        return (
            <div>
                <section className="c-section">
                    <div className="c-box">{this.state.currentID}</div>
                </section>
            </div>
        )
    }
}
