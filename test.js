require('dotenv').config();
const TelegraBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const Users = require('./models/saveuserDate');
var _ = require('lodash');
const answerWord = require('./module/randomAnswer');

// db link
const db =
	'mongodb+srv://jaur:4035@cluster0.b76ng8p.mongodb.net/userData?retryWrites=true&w=majority';

// connect bot
var opt = { polling: true };
const bot = new TelegraBot(process.env.TOKEN, opt);

// connect to db
// mongoose.set('strictQuery', true);
// mongoose
// 	.connect(db, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then((res) => console.log('Connect to db'))
// 	.catch((error) => console.log(error));

// how are you?

const questionWord = [
	'как дела?',
	'как дела',
	'кд',
	'кд?',
	'как ты?',
	'ты как?',
];

// tg bot func
bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, `Напишите в чате, 'Привет' любым регистром.`);
});

bot.on('message', (msg) => {
	const text = msg.text.toLowerCase();
	const idUser = msg.from.id;
	const username = msg.from.username;
	const name = msg.from.first_name;
	if (questionWord.includes(text)) {
		bot.sendMessage(msg.chat.id, `${name}, ${_.sample(answerWord.answerWord)}`);
	}
});
