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

import React, { FC, useEffect, useState, useCallback } from 'react'
import defaultDataset from './dataset'
import './assets/styles/style.css'
import { AnswersList, Chats } from './components/index'
import FormDialog from './components/Forms/FormDialog'
import { db } from './firebase/index'

// TS用に型を定義
type Answer = {
    content: string
    nextId: string
}
type Chat = {
    text: string
    type: string
}

const App: FC<{}> = () => {
    // useStateを使用する際に型を決める
    // プリミティブやすでに型が決まっているものは型推論に任せる
    // オブジェクトの配列の型指定は型エイリアスでオブジェクトを
    // 作成しておき、useStateでジェネリック型を使用して、
    // オブジェクトの配列の型を指定しておく。初期値は空配列でもOK
    // useState<T[]>([])
    const [answers, setAnswers] = useState<Answer[]>([])
    const [chats, setChats] = useState<Chat[]>([])
    const [currentID, setCurrentID] = useState('init')
    const [dataset, setDataset] = useState<typeof defaultDataset>({})
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const addChats = (chat: Chat) => {
        setChats((prevChats) => {
            return [...prevChats, chat] // 今までのChatsに対して今回のChatを追加する
        })
    }

    const displayNextQuestion = (
        nextQuestionId: string,
        nextDataset: typeof defaultDataset
    ) => {
        addChats({
            text: nextDataset[nextQuestionId].question,
            type: 'question',
        })

        setAnswers(nextDataset[nextQuestionId].answers)
        setCurrentID(nextQuestionId)
    }

    const selectAnswer = (selectedAnswer: string, nextQuestionId: string) => {
        switch (true) {
            case nextQuestionId === 'contact': {
                handleClickOpen()
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
                addChats({
                    text: selectedAnswer,
                    type: 'answer',
                })
                setTimeout(
                    () => displayNextQuestion(nextQuestionId, dataset),
                    1000
                )
                break
            }
        }
    }

    // Mount
    useEffect(() => {
        ;(async () => {
            // クラウドからデータを受け取る場合は型が不明でどうすればよいかわからない…
            const initDataset: any = {}
            await db
                .collection('questions')
                .get()
                .then((snapshots) => {
                    snapshots.forEach((doc) => {
                        const { id } = doc
                        const data = doc.data()
                        initDataset[id] = data
                    })
                })
            const idset = initDataset as typeof defaultDataset
            setDataset(idset)
            displayNextQuestion(currentID, idset)
        })()
    }, [])

    // update
    useEffect(() => {
        // scroll要素をもつDomのIDをscrollAreaに入れる
        const scrollArea = document.getElementById('scroll-area')
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight
        }
    })

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    return (
        <div>
            <section className="c-section">
                <div className="c-box">
                    <Chats chats={chats} />
                    <AnswersList answers={answers} select={selectAnswer} />
                    <FormDialog open={open} handleClose={handleClose} />
                </div>
            </section>
        </div>
    )
}

export default App
