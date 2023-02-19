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
mongoose.set('strictQuery', true);
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => console.log('Connect to db'))
	.catch((error) => console.log(error));

// question
const questionWord = [
	'как дела?',
	'как дела',
	'кд',
	'кд?',
	'как ты?',
	'ты как?',
];

// tg bot function for check registration users
bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, `Напишите в чате, 'Привет' любым регистром.`);
});

bot.on('message', (msg) => {
	const text = msg.text.toLowerCase();
	const idUser = msg.from.id;
	const username = msg.from.username;
	if (text === 'привет') {
		bot.sendMessage(
			msg.chat.id,
			'Ищу пользователя в базе данных | Записываю пользователя в базу данных'
		);
		// check user in db
		const user = new Users({ id: idUser, username: username });
		Users.find(
			{ id: msg.from.id, username: msg.from.username },
			(err, docs) => {
				if (err) {
					console.log(err);
				} else if (_.isEmpty(docs)) {
					user
						.save()
						.then((result) =>
							console.log(`Новый пользователь добавлен ${result}`)
						)
						.catch((error) => console.log(error));
					bot.sendMessage(
						msg.chat.id,
						'Приветик ты у нас новенький, познакомимся?. Меня зовут Burmalda Woman 0.1'
					);
					bot.sendPhoto(msg.chat.id, './images/love2.jpg');
					bot.sendAudio(msg.chat.id, './audio/1Hi.mp3');
				} else if (!_.isEmpty(docs)) {
					bot.sendMessage(
						msg.chat.id,
						`Приветик ${username}, так ты у нас уже был)`
					);
					bot.sendAudio(msg.chat.id, './audio/2Bunny.mp3');
					bot.sendPhoto(msg.chat.id, './images/love.jpg');
				}
			}
		);
	}
});

// bot logic || answers, question

bot.on('message', (msg) => {});

bot.on('message', (msg) => {
	if (questionWord.includes(msg.text)) {
		bot.sendMessage(
			msg.chat.id,
			`${msg.from.first_name}, ${_.sample(answerWord.answerWord)}`
		);
	}
});
