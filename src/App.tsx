/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */

// react基礎編
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
import { AnswersList, Chats } from './components/index'
import FormDialog from './components/Forms/FormDialog'

// TS用に型を定義
type State = {
    answers: {
        content: string
        nextId: string
    }[]
    chats: {
        text: string
        type: string
    }[]
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
        this.selectAnswer = this.selectAnswer.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
    }

    // 副作用の処理
    // render()が終わった後に走る処理
    // よって、最初の処理とほぼ同じ
    componentDidMount() {
        const initAnswer = ''
        this.selectAnswer(initAnswer, this.state.currentID)
    }

    componentDidUpdate() {
        // scroll要素をもつDomのIDをscrollAreaに入れる
        const scrollArea = document.getElementById('scroll-area')
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight
        }
    }

    displayNextQuestion = (nextQuestionId: string) => {
        const { chats } = this.state
        chats.push({
            text: this.state.dataset[nextQuestionId].question,
            type: 'question',
        })

        // 通常、setState内でthis.stateを呼ぶと、古い情報のstateを参照してしまう可能性がある
        // よって、コールバック関数でひとつ前の状態を取得する必要があるが、ここではそのまま記述
        this.setState({
            answers: this.state.dataset[nextQuestionId].answers,
            chats,
            currentID: nextQuestionId,
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    selectAnswer = (selectedAnswer: string, nextQuestionId: string) => {
        switch (true) {
            case nextQuestionId === 'init': {
                setTimeout(() => this.displayNextQuestion(nextQuestionId), 500)
                break
            }
            case nextQuestionId === 'contact': {
                this.handleClickOpen()
                break
            }
            // nextQuestionIdがhttps:から始まる文字列だったらの判定
            case /^https:*/.test(nextQuestionId): {
                // aタグを生成
                const a = document.createElement('a')
                a.href = nextQuestionId // aタグにリンクをコピー
                a.target = '_blank' // 別タブでリンクを開く
                a.click() // 自動的にクリックしてページに飛ぶ
                break
            }
            default: {
                const { chats } = this.state
                chats.push({
                    text: selectedAnswer,
                    type: 'answer',
                })

                this.setState({
                    chats,
                })

                setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000)
                break
            }
        }
    }

    // クラスの場合はrender()が必要
    // どうしても must use destructuring props assignmenteslintreact を回避できなかったので無効化
    render() {
        return (
            <div>
                <section className="c-section">
                    <div className="c-box">
                        <Chats chats={this.state.chats} />
                        <AnswersList
                            answers={this.state.answers}
                            select={this.selectAnswer}
                        />
                        <FormDialog
                            open={this.state.open}
                            handleClose={this.handleClose}
                        />
                    </div>
                </section>
            </div>
        )
    }
}
