require('dotenv').config()
const { seachResult } = require('./app.js')

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

let seach
let infForEachNumber
let infForEachAdress

bot.onText(/\/start/, async (msg) => {
  console.log(msg) // вывод в консоль для проверки, удалить после завершения
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, "Выберите параметры поиска", menuKeyboard);
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;

  if (query.data === 'find_number') { // если поиск по номеру объекта
      console.log(query);// вывод в консоль для проверки, удалить после завершения
     await bot.sendMessage(chatId, "Введите номер объекта в формате 8617_ХХХ")
      
      bot.on("text", async (msg) => {
        infForEachNumber = msg.text
        console.log(infForEachNumber)
       await bot.sendMessage(chatId, 'Выберите контакт', options)
      })
      
      } else if (query.data === 'find_adress') { // если поиск по адресу объекта
        console.log(query); // вывод в консоль для проверки, удалить после завершения
       await bot.sendMessage(chatId, "Введите адрес объекта")
       
        bot.on("text", async (msg) => {
          infForEachAdress = msg.text
          console.log(infForEachAdress) // вывод в консоль для проверки, удалить после завершения
        await bot.sendMessage(chatId, 'Выберите контакт', options)
     })
  
   } else {
    return
    //bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', menuKeyboard)
      }
      return infForEachNumber, infForEachAdress

      });

    bot.on('callback_query', async (query) => {
        const chatId = query.message.chat.id;
      
        if (query.data === 'Аварийная служба ТСЖ') {
          seach = "Аварийная_служба_ТСЖ"
          console.log(seach) // вывод в консоль для проверки, удалить после завершения
                    
         }
        else if (query.data === 'Тепловые сети') {
          seach = "Тепловые_сети"
          console.log(seach) // вывод в консоль для проверки, удалить после завершения
          
         }
        else if (query.data === 'РЭС') { 
          seach = "РЭС"
          console.log(seach) // вывод в консоль для проверки, удалить после завершения
          
         }
        else if (query.data === 'Водоканал') { 
          seach = "Водоканал"
          console.log(seach) // вывод в консоль для проверки, удалить после завершения
        } 
        else if (query.data === 'Руководители ВСП') { 
          seach = "Руководители_ВСП"
          console.log(seach) // вывод в консоль для проверки, удалить после завершения
          
         }
         // вариант с добавлением модуля из арр (поиск и вывод ответа БД отрабатывает хорошо)
         let data
         let sql

      if(infForEachNumber === undefined){
      data = [seach, infForEachAdress];
      sql = `select ${seach} from contact inner join filial_inf on filial_inf.idINF_filial = filial_id where filial_inf.adress like '%${infForEachAdress}%'`
      } else {
      data = [seach, infForEachNumber];
      sql = `select ${seach} from contact where number_fil = '${infForEachNumber}'`
      }

      
      // Проблема!! Ответ в консоль выводит, но не выводит в чат....
      //console.log(JSON.stringify(seachResult(sql, data)))
      try {
        const res = await seachResult(sql, data, function(elem){
          
          const itog = JSON.stringify(elem)
          console.log(itog)
          bot.sendMessage(chatId, itog)
                });
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Произошла ошибка при поиске.');
    }
     //console.log(result)
     
        // bot.sendMessage(msg.chat.id, result)
     
        })
       
        console.log(seach)
      
     










