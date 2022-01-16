console.log("Bot is started");

import { Telegraf } from 'telegraf'
import {Message} from 'telegraf/typings/core/types/typegram';

let botToken = process.env.BOT_TOKEN
let botId = Number(process.env.BOT_ID)
let adminId = Number(process.env.ADMIN_ID)

const bot = new Telegraf(botToken!)
const errorMessage = 'Your should reply only to the clients. Dont bother your bot'
bot.on('text', (ctx) => {
  if (ctx.message.chat.id === adminId) {
    //handle admin message
    if  (ctx.message.reply_to_message === undefined || ctx.message.reply_to_message?.from?.id !== botId) {
        ctx.reply(errorMessage)
    } else {
        let message = ctx.message.reply_to_message as Message.TextMessage
        if (message.text === errorMessage) {
            ctx.reply(errorMessage)
        } else {
            let beginIndex = message.text.indexOf('#')
            let endIndex = message.text.indexOf(':')

            let recepient = message.text.substring(beginIndex + 1, endIndex)

            ctx.telegram.sendMessage(Number(recepient), ctx.message.text)
        }
    }
  }
  else {
    let messageHeader = `<i>This is message from client #${ctx.message.from.id}:</i>`
    let resultMessage = messageHeader + '\n' + ctx.message.text
    ctx.telegram.sendMessage(adminId, resultMessage, {parse_mode: 'HTML'})
  }
})

bot.launch()
