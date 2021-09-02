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

import React, { useEffect, useState, useMemo } from 'react'
import defaultDataset from './dataset'
import type { Answer, Dataset, DatasetRecord } from './dataset'
import './assets/styles/style.css'
import { AnswerList, Chats } from './components/index'
import FormDialog from './components/Forms/FormDialog'
import { db } from './firebase/index'

// プロパティにtypeを持たせることで、recodeの型が自動的に決まる！
// キーワード → 型システム、typeguard
// 型設計的にはユーザが選んだ情報も含めて記録しておくことが大事
type Chat =
    // ユーザからの質問
    | {
          type: 'question'
          text: string
          record: Answer
      }
    // ボットの応答
    | {
          type: 'answer'
          text: string
          record: DatasetRecord
      }

const App = () => {
    /**
     * 状態管理に、一意的に求められるものを含んではいけない！
     * キーワード → single source of truth
     * Frontはユーザが好き勝手に操作できるので、厳守しないとデータが壊れる！
     * 参考URL
     * https://ja.reactjs.org/docs/forms.html#controlled-components
     * https://ja.wikipedia.org/wiki/%E4%BF%A1%E9%A0%BC%E3%81%A7%E3%81%8D%E3%82%8B%E5%94%AF%E4%B8%80%E3%81%AE%E6%83%85%E5%A0%B1%E6%BA%90
     *
     */
    const [chats, setChats] = useState<Chat[]>([])
    const [dataset, setDataset] = useState<Dataset>({})
    const [open, setOpen] = useState(false)

    // chatsから一番後ろの2つを抜き取る
    // undefinedがあるのは、必ず２つ以上の配列を生成するようにするため
    // 例えばchatsの中身が0個でもundefinedが２つの配列が生成される
    // 生成された２つ以上の配列から２つ抜き出すことで、secondLastChatとlastChatが決まる！
    const [secondLastChat, lastChat] = [
        undefined,
        undefined,
        ...chats.slice(-2),
    ].slice(-2)

    // 選択肢を表す変数を定義。useMemoは見本で使ってみる
    // メモはReactフレームワークのメモリ領域に今までのデータを記録する機能
    // ここではsecondChatとlastChatが保存される
    // この程度だとメモを使う恩恵は少なく、メモ化する方がコストが高くなるかも
    // 通常の使い道は長い処理を行うとき等に使用する。
    // そうすると、結果だけ記録してあるから、処理をすっ飛ばして回答が出せる。

    const { nextAnswers, executable } = useMemo(() => {
        if (lastChat && lastChat.type === 'answer') {
            return {
                nextAnswers: lastChat.record.answers,
                executable: true,
            }
        }
        if (secondLastChat && secondLastChat.type === 'answer') {
            return {
                nextAnswers: secondLastChat.record.answers,
                executable: false,
            }
        }
        return {
            nextAnswers: undefined,
            executable: false,
        }
    }, [secondLastChat, lastChat])

    const selectedAnswer = (question: Answer) => {
        if (!executable) {
            return
        }
        // TODO: switchの中身を変更する
        switch (true) {
            case question.nextId === 'contact': {
                setOpen(true)
                break
            }
            // nextQuestionIdがhttps:から始まる文字列だったらの判定
            // 普通はIdにURLを仕込まない。datasetの修正が必要
            case /^https:*/.test(question.nextId): {
                window.open(question.nextId, '_blank', 'noreferrer')
                break
            }
            default: {
                setChats([
                    ...chats,
                    {
                        type: 'question',
                        text: question.content,
                        record: question,
                    },
                ])
                setTimeout(() => {
                    setChats((newChats) => [
                        ...newChats,
                        {
                            type: 'answer',
                            text: dataset[question.nextId].question,
                            record: dataset[question.nextId],
                        },
                    ])
                    // タイマーを使用しているため、ここでアクセスできるchatsは過去のものになっている。
                    // 上のコードはつまり下のようにしても同じように動く。
                    // 一般的な例として、間に非同期処理を挟んだ場合は、他のアクションによりデータが更新されたかどうか、
                    // チェックしなければならないケースが多いことを覚えておいてほしい。
                    // その場合、引数のstate（新）と、useStateの戻り値（旧state）を比較する。
                    // setChats([
                    //     ...chats,
                    //     {
                    //         type: 'question',
                    //         text: question.content,
                    //         record: question,
                    //     },
                    //     {
                    //         type: 'answer',
                    //         text: dataset[question.nextId].question,
                    //         record: dataset[question.nextId]
                    //     }
                    // ])
                }, 1000)
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
            setChats([
                {
                    type: 'answer',
                    text: defaultDataset?.init?.question ?? '',
                    record: defaultDataset.init,
                },
            ])
        })()
        // datasetとsetDatasetは初期のみ
        // 条件は必ず明記する！！初回でも空配列は禁止！！
    }, [])

    // update
    useEffect(() => {
        // scroll要素をもつDomのIDをscrollAreaに入れる
        const scrollArea = document.getElementById('scroll-area')
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight
        }
        // chatリストが更新されるたびによばれると明記
        // 空はだめ！必ず何か入れること
    }, [chats])

    // 普通、useCallbackはReact.memoを一緒に使うことで初めて威力を出すもの
    // useCallbackで関数が無駄に生成されるのを防ぎ、
    // useMemoで処理結果を省くようにする
    // つまり、これくらいだとuseCallbackコスト高
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <section className="c-section">
                <div className="c-box">
                    <Chats chats={chats} />
                    {nextAnswers ? (
                        <AnswerList
                            answers={nextAnswers}
                            select={selectedAnswer}
                            executable={executable}
                        />
                    ) : undefined}
                    <FormDialog open={open} handleClose={handleClose} />
                </div>
            </section>
        </div>
    )
}

export default App
