import axios from 'axios';

export const aiApi = async (text: string) => {
    const messages = `「${text}」この文章の日記を英語で書く時にどのような文章が自然か教えてください。英語の初心者が書くことを想定してとても簡単な単語で書いてください。”はつけないでください。「＃ポイント：」を書いた後に初心者が間違えやすいポイントや注意点を日本語でおしえてください。英文と解説のみを書いてください。`
    const res = await axios.post('/api/diary', {
        messages: [{ role: 'user', content: messages }],
    });
    // console.log('-------')
    // console.log(res)
    return res.data
}