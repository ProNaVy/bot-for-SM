require('dotenv').config()
import {contact_UK, contact_T, contact_RES, contact_water, contact_boss} from app.js
const TelegramBot = require('node-telegram-bot-api');

console.log("Bot has been started...")
const bot = new TelegramBot(process.env.API_KEY_BOT, {

  polling: {
    interval: 100,
    autoStart: true,
    params: {
      timeout: 10
    }
  }

});


const menuKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{text: 'Поиск по номеру объекта', callback_data: 'find_number'}],
      [{text: 'Поиск по адресу объекта', callback_data: 'find_adress'}]
    ],
    resize_keyboard: true,
  },
};

const options = {
    reply_markup: {
        inline_keyboard: [
            [{text: 'Аварийная служба ТСЖ', callback_data: 'Аварийная служба ТСЖ'}],
            [{text: 'Тепловые сети', callback_data: 'Тепловые сети'}],
            [{text: 'РЭС', callback_data: 'РЭС'}],
            [{text: 'Водоканал', callback_data: 'Водоканал'}],
            [{text: 'Руководители ВСП', callback_data: 'Руководители ВСП'}]
        ], 
        resize_keyboard: true,
    one_time_keyboard: true
    }
};


let infForEachNumber
let infForEachAdress

bot.onText(/\/start/, (msg) => {
  console.log(msg)
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Выберите параметры поиска", menuKeyboard);
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;

  if (query.data === 'find_number') { // если поиск по номеру объекта
      console.log(query);
      bot.sendMessage(chatId, "Введите номер объекта в формате 8617/ХХХ")
      
      bot.on("text", (msg) => {
        infForEachNumber = msg.text
        console.log(infForEachNumber)
        bot.sendMessage(chatId, 'Выберите контакт', options)
      })
      
      } else if (query.data === 'find_adress') { // если поиск по номеру объекта
        console.log(query);
        bot.sendMessage(chatId, "Введите адрес объекта")
       
        bot.on("text", (msg) => {
          infForEachAdress = msg.text
          console.log(infForEachAdress)
          bot.sendMessage(chatId, 'Выберите контакт', options)
     })
  
   } else {
    bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', menuKeyboard)
      }
      return infForEachNumber, infForEachAdress

      });

    bot.on('callback_query', (query) => {
        const chatId = query.message.chat.id;
      
        if (query.data === 'Аварийная служба ТСЖ') { // если поиск по номеру объекта
        bot.sendMessage(chatId, contact_UK)
         }
        else if (query.data === 'Тепловые сети') { // если поиск по номеру объекта
        bot.sendMessage(chatId, contact_T)
         }
        else if (query.data === 'РЭС') { // если поиск по номеру объекта
        bot.sendMessage(chatId, contact_RES)
         }
        else if (query.data === 'Водоканал') { // если поиск по номеру объекта
        bot.sendMessage(chatId, contact_water)
         }
        else if (query.data === 'Руководители ВСП') { // если поиск по номеру объекта
        bot.sendMessage(chatId, contact_boss)
         }
        })

export {infForEachNumber, infForEachAdress}












    //bot.sendMessage(msg.chat.id, "Начнем. Введите адрес или номер объекта")
 
/*bot.on(/'Поиск '+(.*)/, (msg) => {

      console.log(msg);
      const chatId = msg.chat.id;
      bot.deleteMessage(chatID, mesId)
      bot.sendMessage(chatId, "Введите номер объекта");
    })

    bot.onText('Поиск по адресу объекта', (msg) => {
      console.log(msg);
      const chatId = msg.chat.id;
      bot.deleteMessage(chatID, mesId)
      bot.sendMessage(chatId, "Введите адрес объекта");
    })

       
    

//bot.on(callback_data)

bot.on('text', (msg) => {
if (msg.is_bot = false) {
  infForEach = msg.text
}
console.log(infForEach)
} ) 
    bot.on('message', (msg) => {
      bot.sendMessage(msg.chat.id, "Выберите контакт:", options, {
  reply_to_message_id: message_id
  })
    })

 
 bot.on('callback_query', query => {
  console.log(query); //потом убрать чтобы в консоль не выводился объект msg
  /*if(query.is_bot === false) {
  infForEach = query.text
  return infForEach
}})*/
 //console.log(infForEach) 
   