import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()
// dbはよく使用するかつ取得に時間がかかるので最初に確保しておいて使いまわす
const db = admin.firestore()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// APIをたたくと必ずResdpanseを受け取ることになる
const sendResponse = (
    response: functions.Response,
    statusCode: number,
    body: any
) => {
    response.send({
        statusCode,
        body: JSON.stringify(body),
    })
}

export const addDataset = functions.https.onRequest(
    async (req: any, res: any) => {
        // APIの中身
        // requestは必ずGETやPOSTなどのメソッドがついてくる
        // 今回はデータセットを追加するので、メソッドか必ずPOSTになるはず！
        if (req.method !== 'POST') {
            sendResponse(res, 405, { error: 'Invalid Request' })
        } else {
            const dataset = req.body
            for (const key of Object.keys(dataset)) {
                const data = dataset[key]
                await db.collection('questions').doc(key).set(data) // Firebaseはcollection/document/data という構造になっている
            }
        }
    }
)

//firebaseのデプロイは有料プランにはいる必要があるので今回はデプロイしない
