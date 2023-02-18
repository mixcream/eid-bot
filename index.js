
// DISINI GUA SHARE BASE MD
// KALO ADA ERROR LU FIX SENDIRI
// NAMBAH FITUR LAINNYA YA SILAHKAN
// KEMBANGIN YA KALO BISA

// JANGAN LUPA KASIH TQTQ
// CREDITS : LEXXY OFFICIAL

"use strict";
const { BufferJSON, WA_DEFAULT_EPHEMERAL, proto, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const { downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, MessageType, buttonsMessage } = require("@adiwajshing/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require('./function/console.js')
const { getRandom, getGroupAdmins, runtime, sleep, makeid, fetchJson, getBuffer } = require("./function/myfunc");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./function/addlist');
const { jadibot, listJadibot } = require('./function/jadibot')
const { listmenu } = require('./options/help')

// apinya
const fs = require("fs");
const ms = require("ms");
const chalk = require('chalk');
const axios = require("axios");
const colors = require('colors/safe');
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");

// Response
const msgFilter = require("./function/spam");
const { stalkff } = require("./function/stalker/stalk-ff");
const { stalkml } = require("./function/stalker/stalk-ml");
const { npmstalk } = require("./function/stalker/stalk-npm");
const { githubstalk } = require("./function/stalker/stalk-gh");

let orang_spam = []

// Database
const setting = JSON.parse(fs.readFileSync('./options/config.json'));
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
const mess = JSON.parse(fs.readFileSync('./options/mess.json'));
const db_error = JSON.parse(fs.readFileSync('./database/error.json'));
const db_user = JSON.parse(fs.readFileSync('./database/pengguna.json'));
const db_menfes = JSON.parse(fs.readFileSync('./database/menfess.json'));
const db_respon_list = JSON.parse(fs.readFileSync('./database/list.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(conn, msg, m, setting, store) => {
try {
let { ownerNumber, botName } = setting
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = [`${setting.ownerNumber}`,"6283834558105@s.whatsapp.net","6282279915237@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'

// Group
const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const isAntiLink = antilink.includes(from) ? true : false

// Quoted
const quoted = msg.quoted ? msg.quoted : msg
const isImage = (type == 'imageMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage');
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isListMessage = dataListG.length !== 0 ? dataListG : dataList

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = conn.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

// auto read
conn.readMessages([msg.key])

const reply = (teks) => {conn.sendMessage(from, { text: teks }, { quoted: msg })}

// AUTO DOWNLOAD TIKTOK
if (chats.match(/(tiktok.com)/gi)){
reply('Url tiktok terdekteksi\nWait mengecek data url.')
await sleep(3000)
fetchJson(`https://saipulanuar.ga/api/download/tiktok2?url=${chats}&apikey=jPHjZpQF`)
.then(tt_res =>{
reply(`𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗

𝘼𝙪𝙩𝙝𝙤𝙧: Lexxy Official
𝙅𝙪𝙙𝙪𝙡: ${tt_res.result.judul}
𝙎𝙤𝙪𝙧𝙘𝙚: ${chats}

Video sedang dikirim...`)
conn.sendMessage(sender,{video:{url:tt_res.result.video.link2}, caption:'No Watermark!'}, {quotes:msg})
if (isGroup) return conn.sendMessage(from, {text:'Media sudah dikirim lewat chat pribadi bot.'}, {quoted:msg})
}).catch((err) => {
reply('Error! terjadi kesalahan saat mendownload media')
})
}

// Response Addlist
if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
var get_data_respon = getDataResponList(from, chats, db_respon_list)
if (get_data_respon.isImage === false) {
conn.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
quoted: msg
})
} else {
conn.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
quoted: msg
})
}
}

// FUNCTION ANTILINK
if (isGroup && isAntiLink) {
if (!isBotGroupAdmins) return reply('Untung Bot Bukan Admin')
var linkgce = await conn.groupInviteCode(from)
if (chats.includes(`https://chat.whatsapp.com/${linkgce}`)) {
reply(`\`\`\`「 Detect Link 」\`\`\`\n\nAnda tidak akan dikick bot karena yang anda kirim adalah link group yg ada di group ini`)
} else if (chats.match(/(chat.whatsapp.com)/gi)){
let bvl = `\`\`\`「 Detect Link 」\`\`\`\n\nAdmin telah mengirim link, admin dibebaskan untuk mengirim link apapun`
if (isGroupAdmins) return reply(bvl)
if (fromMe) return reply(bvl)
if (isOwner) return reply(bvl)
await conn.sendMessage(from, { delete: msg.key })
mentions(`「 ANTILINK 」\n\n@${sender.split('@')[0]} Kamu mengirim link group, maaf bot akan kick kamu dari grup`, [sender])
await sleep(3000)
conn.groupParticipantsUpdate(from, [sender], "remove")
} else {
}
}

const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}

let cekUser = (satu, dua) => { 
let x1 = false
Object.keys(db_user).forEach((i) => {
if (db_user[i].id == dua){x1 = i}})
if (x1 !== false) {
if (satu == "id"){ return db_user[x1].id }
if (satu == "name"){ return db_user[x1].name }
if (satu == "seri"){ return db_user[x1].seri }
if (satu == "premium"){ return db_user[x1].premium }
}
if (x1 == false) { return null } 
}

let setUser = (satu, dua, tiga) => { 
Object.keys(db_user).forEach((i) => {
if (db_user[i].id == dua){
if (satu == "±id"){ db_user[i].id = tiga
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±name"){ db_user[i].name = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±seri"){ db_user[i].seri = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±premium"){ db_user[i].premium = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
}})
}

const cekPesan = (satu, dua) => { 
let x2 = false
Object.keys(db_menfes).forEach((i) => {
if (db_menfes[i].id == dua){x2 = i}})
if (x2 !== false) {
if (satu == "id"){ return db_menfes[x2].id }
if (satu == "teman"){ return db_menfes[x2].teman }
}
if (x2 == false) { return null } 
}

const setRoom = (satu, dua, tiga) => { 
Object.keys(db_menfes).forEach((i) => {
if (db_menfes[i].id == dua){
if (satu == "±id"){ db_menfes[i].id = tiga
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes))} 
if (satu == "±teman"){ db_menfes[i].teman = tiga 
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes))} 
}})
}

// Function for Anti Spam
msgFilter.ResetSpam(orang_spam)

const spampm = () => {
console.log(color('~>[SPAM]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
msgFilter.addSpam(sender, orang_spam)
reply('Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik')
}

const spamgr = () => {
console.log(color('~>[SPAM]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
msgFilter.addSpam(sender, orang_spam)
reply('Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik')
}

if (isCmd && msgFilter.isFiltered(sender) && !isGroup) return spampm()
if (isCmd && msgFilter.isFiltered(sender) && isGroup) return spamgr()
if (isCmd && args.length < 1 && !isOwner) msgFilter.addFilter(sender)

//Auto Block Nomor Luar Negeri
if (sender.startsWith('212')) {
return conn.updateBlockStatus(sender, 'block')
}

// Console
if (isGroup && isCmd) {
console.log(colors.green.bold("[Group]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(groupName));
}

if (!isGroup && isCmd) {
console.log(colors.green.bold("[Private]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(pushname));
}

// Casenya
switch(command) {
case 'menu':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝑩𝒚 @${setting.ownerNumber.split("@")[0]}`
let menu_nya = `───「 𝗚𝗨𝗥𝗔𝗕𝗢𝗧-𝗠𝗗 」────

 ${ucapanWaktu} ${cekUser("name", sender)} 👋🏻

 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢
 • ID : @${sender.split('@')[0]}
 • Nama : ${cekUser("name", sender)}
 • Premium : (${cekUser("premium", sender)? '✓':'✘'})

 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢
 • BotName : ${setting.botName}
 • Library : 𝗕𝗮𝗶𝗹𝗲𝘆𝘀-𝗠𝗗
 • Time : ${jam} WIB
 • Date : ${tanggal}
 • Terdaftar : ${("id", db_user).length}
 • Room Chat : ${db_menfes.length}
${strip_ny}
${listmenu(prefix)}
`
let buttonmenu = [
{buttonId: '#iklan', buttonText: {displayText: '️⋮☰ 𝙄𝙆𝙇𝘼𝙉'}, type: 1},
{buttonId: '#owner', buttonText: {displayText: '️⋮☰ 𝙊𝙒𝙉𝙀𝙍'}, type: 1},
{buttonId: '#groupbot', buttonText: {displayText: '️⋮☰ 𝙂𝙍𝙊𝙐𝙋'}, type: 1}
]
conn.sendMessage(from, 
{text: menu_nya, 
buttons: buttonmenu,
footer: footer_nya,
mentions:[setting.ownerNumber, sender]},
{quoted:msg})
}
break
case 'verify':{
if (cekUser("id", sender) !== null) return reply('Kamu sudah terdaftar !!')
var res_us = `${makeid(10)}`
var diacuk = `${db_user.length+1}`
var user_name = `#GRXY${diacuk}`
let object_user = {"id": sender, "name": user_name, "seri": res_us, "premium": false}
db_user.push(object_user)
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))
mentions(`𝖬𝖾𝗆𝗎𝖺𝗍 𝖴𝗌𝖾𝗋 @${sender.split("@")[0]}`, [sender])
await sleep(1500)
var verify_teks =`───「 𝗧𝗘𝗥𝗩𝗘𝗥𝗜𝗙𝗜𝗞𝗔𝗦𝗜 」────

 ○ ID : @${sender.split('@')[0]}
 ○ Name : ${user_name}
 ○ Seri : ${res_us}
 ○ Premium : (${cekUser("premium", sender)? '✓':'✘'})
`
var buttonMessage = {
text: verify_teks,
footer: 'Klik button untuk melihat menu',
mentions: [sender],
buttons: [
{ buttonId: '#menu', buttonText: {displayText: '️⋮☰ 𝗠𝗘𝗡𝗨'}, type: 1}
],
headerType: 1
}
conn.sendMessage(from, buttonMessage, {quoted:msg})
await sleep(1000)
var teksss_verify =`𝙍𝙀𝙂𝙄𝙎𝙏𝙀𝙍 𝙐𝙎𝙀𝙍
○ ID : @${sender.split('@')[0]}
○ Seri : ${res_us}
○ Name : ${user_name}
○ Terdaftar : ${db_user.length}`
conn.sendMessage(`${setting.ownerNumber}`, {text:teksss_verify, mentions: [sender]})
}
break
case 'grupbot':
case 'groupbot':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
reply(`*Forum Bot Whatsapp*
https://chat.whatsapp.com/E3zewfxrc5pKE6Rzb3BuqG`)
break
case 'infoupdate':
reply('-')
break
case 'script': case 'sc':
reply(`_SCRIPT BOT INI DIJUAL_
_HARGA 80K JIKA MINAT?_

*Whatsapp Admin*
Wa.me/6283834558105`)
break
case 'owner':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
var owner_Nya = setting.ownerNumber
sendContact(from, owner_Nya, setting.ownerName, msg)
}
break
case 'auto_room':{
var id_satu = q.split('|')[0]
var id_dua = q.split('|')[1]
var id_rom = q.split('|')[2]
db_menfes.push({"id": id_satu, "teman": id_dua})
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes))
db_menfes.push({"id": id_dua, "teman": id_satu})
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes))
var tulis_pesan = `𝗖𝗵𝗮𝘁 𝗔𝗻𝗼𝗻𝘆𝗺𝗼𝘂𝘀 𝗧𝗲𝗿𝗵𝘂𝗯𝘂𝗻𝗴✓
𝗦𝗶𝗹𝗮𝗵𝗸𝗮𝗻 𝗞𝗶𝗿𝗶𝗺 𝗣𝗲𝘀𝗮𝗻✍

𝗸𝗲𝘁𝗶𝗸 #𝘀𝘁𝗼𝗽𝗰𝗵𝗮𝘁
𝘂𝗻𝘁𝘂𝗸 𝗺𝗲𝗻𝗴𝗵𝗮𝗽𝘂𝘀 𝘀𝗲𝘀𝗶 𝗰𝗵𝗮𝘁

𝗡𝗼𝘁𝗲:
𝙧𝙤𝙤𝙢 𝙘𝙝𝙖𝙩 𝙞𝙣𝙞 𝙗𝙚𝙧𝙨𝙞𝙛𝙖𝙩 𝙖𝙣𝙤𝙣𝙞𝙢
𝙟𝙖𝙙𝙞 𝙠𝙖𝙢𝙪 𝙩𝙞𝙙𝙖𝙠 𝙩𝙖𝙪 𝙥𝙖𝙩𝙣𝙚𝙧𝙢𝙪
𝙠𝙚𝙘𝙪𝙖𝙡𝙞 𝙙𝙞𝙖 𝙢𝙚𝙣𝙜𝙜𝙪𝙣𝙖𝙠𝙖𝙣 𝙣𝙖𝙢𝙖 𝙖𝙨𝙡𝙞
𝙖𝙩𝙖𝙪 𝙢𝙚𝙢𝙗𝙚𝙧𝙞𝙩𝙖𝙝𝙪𝙠𝙖𝙣 𝙞𝙣𝙛𝙤𝙧𝙢𝙖𝙨𝙞 𝙙𝙖𝙧𝙞𝙣𝙮𝙖.

𝘿𝙞𝙡𝙖𝙧𝙖𝙣𝙜 𝙨𝙥𝙖𝙢/𝙩𝙚𝙡𝙥𝙤𝙣 𝙗𝙤𝙩
𝙎𝙖𝙣𝙠𝙨𝙞 : 𝘽𝙡𝙤𝙠𝙞𝙧 𝙋𝙚𝙧𝙢𝙖𝙣𝙚𝙣

𝗥𝗼𝗼𝗺 𝗜𝗗 : ${id_rom}`
var buttonMessage = {
text: tulis_pesan,
footer: 'klik button untuk menghapus sesi chat',
buttons: [
{ buttonId: '#stopchat', buttonText: {displayText: '️⋮☰ 𝗦𝗧𝗢𝗣'}, type: 1}
],
headerType: 1
}
conn.sendMessage(id_satu, buttonMessage)
conn.sendMessage(id_dua, buttonMessage)
}
break
case 'skip':
case 'stopchat':
if (cekPesan("id", sender) == null) return reply(`Kamu sedang tidak didalam roomchat, Silahkan buat room dengan contoh dibawah ini.\n\n*Example:*\n#menfess num|nama|pes\n\n*Contoh:*\n#menfess 628xxx|bot|hai\n\n*Note:*\n6285789004732 - benar (✅)\n+62 857 8900 4732 - salah (❌)`)
if (isGroup) return reply(mess.OnlyPM)
var aku = sender
var dia = cekPesan("teman", aku)
var teks_aku = `[✓] *Berhasil memberhentikan chat*`
setRoom("±teman", dia, null)
setRoom("±teman", aku, null)
await sleep(2000)
conn.sendMessage(aku,{text:teks_aku})
setRoom("±id", aku, null)
setRoom("±id", dia, null)
var teks_dia = `[✓] *Room chat telah dihentikan*\n*oleh patner chat kamu.*`
conn.sendMessage(dia,{text:teks_dia})
break
case 'confes':
case 'confess':
case 'secretchat':{
if (cekPesan("id", sender) !== null) return reply("Kamu Sedang Didalam roomchat ketik *#stopchat* untuk menghapus sesi chat.")
if (!q) return reply(`Format invalid!!\n\n*Example:*\n${prefix+command} number|nama\n\n*Contoh:*\n${prefix+command} 628xxx|bot\n\n_isi number yg sesuai perintah bot_\n\n*Contoh*\n628xxx > benar\n+628xxx > salah\n\ntanpa spasi dan tanda +`)
let num = q.split('|')[0]
if (!num) return reply('Number tujuan wajib di isi')
let nama_pengirim = q.split('|')[1]
if (num == sender.split('@')[0]) return reply('Ngirim ke nomor sendiri:v\ncapek ya? semangat🗿')
if (!nama_pengirim) return reply('Nama kamu wajib di isi')
var cekap = await conn.onWhatsApp(num+"@s.whatsapp.net")
if (cekap.length == 0) return reply(`Nomor +${num}\ntidak terdaftar di WhatsApp`)
var penerimanyo = num+'@s.whatsapp.net'
mentions(`Berhasil mengirimkan undangan chat ke @${penerimanyo.split('@')[0]} tunggu dia menyetujui undangan tersebut untuk chatan secara anonim jadi dia tidak tau siapa anda`, [penerimanyo])
let roomC = `#${makeid(10)}`
var text_tersambung =`*Seseorang Mengajak Chating*\n\n*Dari:* ${nama_pengirim}\n\nSilahkan klik button ya kak jika ingin menghubungkan chat *ANONYMOUS*`
let btn_room = [{ buttonId: `${prefix}auto_room ${sender}|${penerimanyo}|${roomC}`, buttonText: { displayText: '⋮☰ 𝗧𝗘𝗥𝗜𝗠𝗔' }, type: 1 }]
var but_room = {
text: text_tersambung,
footer: 'Klik button untuk menerima chat.',
buttons: btn_room,
mentions: [penerimanyo],
headerType: 1
}
conn.sendMessage(penerimanyo, but_room)
}
break
case 'menfes': case 'menfess':{
if (cekPesan("id", sender) !== null) return reply("Kamu Sedang Didalam roomchat ketik *#stopchat* untuk menghapus sesi chat.")
if (!q) return reply(`Format Fitur Menfess / Kirim pesan rahasia ke seseorang Lewat bot\n\n_*Example*_\n${prefix+command} wa|pengirim|pesan\n\n_*Contoh*_\n${prefix+command} 6285789004732|bot|hai\n\n*Note :*\nBerawal dari 628xxx tanpa spasi`)
let num = q.split('|')[0]
let nama_pengirim = q.split('|')[1]
let pesan_teman = q.split('|')[2]
var cekap = await conn.onWhatsApp(num+"@s.whatsapp.net")
if (cekap.length == 0) return reply(`Nomor +${num}\ntidak terdaftar di WhatsApp`)
let roomC = `#${makeid(10)}`
if (num == botNumber.split('@')[0]) return reply('Itu kan nomor bot')
if (num == sender.split('@')[0]) return reply('Menfes ke nomor sendiri:v\ncapek ya? semangat🗿')
if (!num) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa +/spasi`)
if (!nama_pengirim) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
if (!pesan_teman) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
var penerimanyo = num+'@s.whatsapp.net'
mentions(`Berhasil mengirimkan undangan chat ke @${penerimanyo.split('@')[0]} tunggu dia menyetujui undangan tersebut untuk chatan secara anonim jadi dia tidak tau siapa anda`, [penerimanyo])
let text_menfess = `*ANONYMOUS CHAT*\n_Hallo Kak ${ucapanWaktu}_\n_Ada pesan *Menfess/Rahasia*_\n\n*• Dari :* ${nama_pengirim}\n*• Pesan :* ${pesan_teman}\n\n_Pesan ini ditulis oleh seseorang_\n_Bot hanya menyampaikan saja._`
let btn_menfes = [{ buttonId: `${prefix}auto_room ${sender}|${num}@s.whatsapp.net|${roomC}`, buttonText: { displayText: '⋮☰ 𝗧𝗘𝗥𝗜𝗠𝗔' }, type: 1 }]
var button_menfess = {
text: text_menfess,
footer: 'Klik button untuk membalas chat.',
buttons: btn_menfes,
headerType: 1
}
conn.sendMessage(`${num}@s.whatsapp.net`, button_menfess)
}
break
case 'secret':{
if (cekPesan("id", sender) !== null) return reply("Kamu Sedang Didalam roomchat ketik *#stopchat* untuk menghapus sesi chat.")
if (!q) return reply(`Format Fitur Secrett / Kirim pesan rahasia ke seseorang Lewat bot\n\n_*Example*_\n${prefix+command} wa|pengirim\n\n_*Contoh*_\n${prefix+command} 628xxxx|bot\n\n*Note :*\nBerawal dari 628xxx tanpa spasi`)
let num = q.split('|')[0]
let nama_pengirim = q.split('|')[1]
var cekap = await conn.onWhatsApp(num+"@s.whatsapp.net")
if (cekap.length == 0) return reply(`Nomor +${num}\ntidak terdaftar di WhatsApp`)
let roomC = `#${makeid(10)}`
if (num == botNumber.split('@')[0]) return reply('Itu kan nomor bot')
if (num == sender.split('@')[0]) return reply('Menfes ke nomor sendiri:v\ncapek ya? semangat🗿')
if (!num) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
if (!nama_pengirim) return reply(`Harus di isi semua !!\nex : ${prefix+command} 62857xxx|nama|hallo\n\nnomor hp tanpa spasi`)
var penerimanyo = num+'@s.whatsapp.net'
mentions(`Berhasil mengirimkan undangan chat ke @${penerimanyo.split('@')[0]} tunggu dia menyetujui undangan tersebut untuk chatan secara anonim jadi dia tidak tau siapa anda`, [penerimanyo])
setRoom("±id", sender, penerimanyo)
setRoom("±id", penerimanyo, sender)
setRoom("±teman", sender, penerimanyo)
setRoom("±teman", penerimanyo, sender)
let text_menfess = `*ANONYMOUS CHAT*\n_Hallo Kak ${ucapanWaktu}_\n_Ada pesan *Secret/Rahasia*_\n\n*• Dari :* ${nama_pengirim}\n\n_Pesan ini ditulis oleh seseorang_\n_Bot hanya menyampaikan saja._`
let btn_menfes = [
{ buttonId: `${prefix}auto_room ${sender}|${num}@s.whatsapp.net|${roomC}`, buttonText: { displayText: '⋮☰ 𝗧𝗘𝗥𝗜𝗠𝗔' }, type: 1 },
{ buttonId: `${prefix}tolak_secret ${sender}`, buttonText: { displayText: '⋮☰ 𝗧𝗢𝗟𝗔𝗞' }, type: 1 }
]
var button_menfess = {
text: text_menfess,
footer: 'Klik button untuk membalas chat.',
buttons: btn_menfes,
headerType: 1
}
conn.sendMessage(`${num}@s.whatsapp.net`, button_menfess)
}
break
case 'tolak_secret':{
reply('Secret ditolak')
var aku = q
var dia = cekPesan("teman", aku, null)
var teks_aku = `Maaf kak undangan secretchat @${aku.split('@')[0]} Ditolak`
setRoom("±id", aku, null)
setRoom("±teman", aku, null)
setRoom("±id", dia, null)
setRoom("±teman", dia, null)
await sleep(2000)
conn.sendMessage(aku, {text:teks_aku, mentions:[aku]})
}
break
// OWNER MENU
case 'resetdb':{
if (!isOwner) return reply(mess.OnlyOwner)
let para_kos = "[]"
db_user.splice(para_kos)
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user, null, 1))
await sleep(1000)
db_menfes.splice(para_kos)
fs.writeFileSync('./database/menfess.json', JSON.stringify(db_menfes, null, 1))
await sleep(1000)
db_error.splice(para_kos)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error, null, 1))
reply('Sukses restart database')
}
break
case 'chat':
case 'start':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
var arr_rows = []
for (let i of db_user) {
arr_rows.push({
title: i.name,
rowId: `${prefix}start_conn ${i.id}|${sender}|${cekUser("name", sender)}`
})
}
var listMsg = {
text: `Hai @${sender.split("@")[0]}`,
buttonText: 'Pilih User',
footer: `silahkan pilih user yang mau\ndi ajak ngobrol/chat anonymous`,
mentions: [sender],
sections: [{
title: '© Anonymous Chat', rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
}
break
case 'start_conn':{
if (q.split('|')[0] == sender) return reply('Itu username kamu sendiri kak')
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
var penerimanyo = q.split('|')[0]
var penerimanya = q.split('|')[1]
var nama_pengirim = q.split('|')[2]
mentions(`Berhasil mengirimkan undangan chat ke @${penerimanyo.split('@')[0]} tunggu dia menyetujui undangan tersebut untuk chatan secara anonim jadi dia tidak tau siapa anda`, [penerimanyo])

setRoom("±id", penerimanya, penerimanyo)
setRoom("±teman", penerimanyo, penerimanya)
setRoom("±id", penerimanyo, penerimanya)
setRoom("±teman", penerimanya, penerimanyo)

let roomC = `#${makeid(10)}`
var text_tersambung =`*Hallo ${cekUser("name", penerimanyo)} ${ucapanWaktu}*\n*Seseorang Mengajak Chating*\n\n*Dari:* ${nama_pengirim}\n\nSilahkan klik button ya kak jika ingin menghubungkan chat *ANONYMOUS*`
let btn_room = [
{ buttonId: `${prefix}auto_room ${penerimanyo}|${penerimanya}|${roomC}`, buttonText: { displayText: '⋮☰ 𝗧𝗘𝗥𝗜𝗠𝗔' }, type: 1 },
{ buttonId: `${prefix}tolak_secret ${penerimanyo}`, buttonText: { displayText: '⋮☰ 𝗧𝗢𝗟𝗔𝗞' }, type: 1 }
]
var but_room = {
text: text_tersambung,
footer: 'Klik button untuk menerima chat.',
buttons: btn_room,
mentions: [penerimanyo],
headerType: 1
}
conn.sendMessage(penerimanyo, but_room)
}
break
case 'dashboard':
case 'db':{
if (!isOwner) return reply(mess.OnlyOwner)
let teks =` 𝘿𝘼𝙎𝙃𝘽𝙊𝘼𝙍𝘿\n\n Terdaftar : ${("id", db_user).length}\n Room Chat : ${db_menfes.length}\n\n`
for (let i of db_user){
teks +=` ID : @${i.id.split('@')[0]}\n Name : ${i.name}\n Premium : (${i.premium? '✓':'✘'})\n\n`
}
reply(teks)
}
break
case 'error':{
if (!isOwner) return reply(mess.OnlyOwner)
let ertxt = `*Server Error*\n*Tercatat:* ${db_error.length}\n\n`
for (let i of db_error){
ertxt +=`*Pengguna:* @${i.user.split('@')[0]}\n*Jam:* ${i.jam} WIB\n*Tanggal:* ${i.tanggal}\n*Type:* ${i.error}\n\n`
}
conn.sendMessage(from, {text:ertxt}, {quoted:msg})
}
break
case 'mysesi': case 'sendsesi': case 'session':{
if (!isOwner) return reply(mess.OnlyOwner)
reply('please wait..')
await sleep(3000)
var user_bot = await fs.readFileSync('./database/pengguna.json')
var sesi_bot = await fs.readFileSync(`./${setting.sessionName}.json`)
conn.sendMessage(from, { document: sesi_bot, mimetype: 'document/application', fileName: 'session.json'}, {quoted:msg})
conn.sendMessage(from, { document: user_bot, mimetype: 'document/application', fileName: 'pengguna.json'}, {quoted:msg})
}
break
case 'bc':
case 'broadcast':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Masukan parameter text\n*Contoh:*\n${prefix+command} hallo`)
let db_orang = JSON.parse(fs.readFileSync('./database/pengguna.json'));
let data_teks = `${q}`
for (let i of db_orang){ 
var button_broadcast = {text: data_teks, footer: '©broadcast', buttons: [{ buttonId: '!menu', buttonText: {displayText: '⋮☰ 𝗠𝗘𝗡𝗨'}, type: 1}],headerType: 1}
conn.sendMessage(i.id, button_broadcast)
await sleep(2000)
}
reply(`*Sukses mengirim broadcast text ke ${db_orang.length} user*`)
}
break
case 'runtime':
case 'tes':
if (!isOwner) return reply(mess.OnlyOwner)
reply(`*Runtime : ${runtime(process.uptime())}*`)
break

// GROUP MENU
case 'hidetag':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
conn.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'fitnah':
if (!isGroup) return reply(mess.OnlyGrup)
if (!q) return reply(`Kirim perintah #*${command}* @tag|pesantarget|pesanbot`)
var org = q.split("|")[0]
var target = q.split("|")[1]
var bot = q.split("|")[2]
if (!org.startsWith('@')) return reply('Tag orangnya')
if (!target) return reply(`Masukkan pesan target!`)
if (!bot) return reply(`Masukkan pesan bot!`)
var mens = parseMention(target)
var msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { extemdedTextMessage: { text: `${target}`, contextInfo: { mentionedJid: mens }}}}
var msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { conversation: `${target}` }}
conn.sendMessage(from, { text: bot, mentions: mentioned }, { quoted: mens.length > 2 ? msg1 : msg2 })
break
case 'del':
case 'delete':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!quotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
conn.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
break
case 'linkgrup': case 'linkgc':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)
break
case 'kick':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
conn.groupParticipantsUpdate(from, [number], "remove")
} else if (isQuotedMsg) {
number = quotedMsg.sender
conn.groupParticipantsUpdate(from, [number], "remove")
} else {
reply('Tag atau reply orang yg mau dikick\n\n*Contoh:* #kick @tag')
}
break
case 'setppgrup': case 'setppgc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (isImage && isQuotedImage) return reply(`Kirim gambar dengan caption *#bukti* atau reply gambar yang sudah dikirim dengan caption *#bukti*`)
await conn.downloadAndSaveMediaMessage(msg, "image", `./transaksi/${sender.split('@')[0]}.jpg`)
var media = `./transaksi/${sender.split('@')[0]}.jpg`
await conn.updateProfilePicture(from, { url: media })
await sleep(2000)
reply('Sukses mengganti foto profile group')
fs.unlinkSync(media)
break
case 'setnamegrup': case 'setnamegc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} teks`)
await conn.groupUpdateSubject(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'setdesc': case 'setdescription':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah ${command} teks`)
await conn.groupUpdateDescription(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'group': case 'grup':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
if (args[0] == "close") {
conn.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
} else if (args[0] == "open") {
conn.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
} else {
reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
}
break
case 'revoke':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
await conn.groupRevokeInvite(from)
.then( res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.error.api))
break
case 'tagall':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Teks?`)
let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n\n`
for (let mem of participants) {
teks_tagall += `➲ @${mem.id.split('@')[0]}\n`
}
conn.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg })
break
case 'antilink':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply('Antilink sudah aktif')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Activate Antilink In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply('Antilink belum aktif')
let antinya = antilink.indexOf(from)
antilink.splice(antinya, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Disabling Antilink In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'promote':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan member yang ingin dijadikan admin\n\n*Contoh:*\n${prefix+command} @tag`)
}
break
case 'demote':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa\n\n*Contoh:*\n${prefix+command} @tag`)
}
break

// STORE MENU
case 'shop': case 'list':
if (!isGroup) return reply(mess.OnlyGrup)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: x.key
})
}
}
var listMsg = {
text: `Hai @${sender.split("@")[0]}`,
buttonText: 'click here',
footer: `*list from ${groupName}*`,
mentions: [sender],
sections: [{
title: groupName, rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
break
case 'addlist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
addResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
break
case 'dellist':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: `#hapuslist ${x.key}`
})
}
}
var listMsg = {
text: `Hai @${sender.split("@")[0]}`,
buttonText: 'pilih disini',
footer: 'Silahkan pilih list yg mau dihapus',
mentions: [sender],
sections: [{
title: groupName, rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
}
break
case 'hapuslist':
delResponList(from, q, db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
case 'update':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara #${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
updateResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil update List menu : *${args1}*`)
break
case 'tambah':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one + nilai_two}`)
break
case 'kurang':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one - nilai_two}`)
break
case 'kali':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one * nilai_two}`)
break
case 'bagi':
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one / nilai_two}`)
break
case 'p': case 'proses':{
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!quotedMsg) return reply('Reply pesanannya!')
mentions(`「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan : ${quotedMsg.chats}\n\nPesanan @${quotedMsg.sender.split("@")[0]} sedang di proses!`, [sender])
}
break
case 'd': case 'done':{
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!quotedMsg) return reply('Reply pesanannya!')
mentions(`「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih @${quotedMsg.sender.split("@")[0]} Next Order ya🙏`, [sender])
}
break

// PREMIUM
case 'jadibot': {
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (isGroup) return reply('Gunakan bot di privat chat')
jadibot(conn, msg, from)
}
break
case 'listjadibot':
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (isGroup) return reply('Gunakan bot di privat chat')
try {
let user = [... new Set([...global.conns.filter(conn => conn.user).map(conn => conn.user)])]
te = "*List Jadibot*\n\n"
for (let i of user){
let y = await conn.decodeJid(i.id)
te += " × User : @" + y.split("@")[0] + "\n"
te += " × Name : " + i.name + "\n\n"
}
conn.sendMessage(from,{text:te,mentions: [y], },{quoted:msg})
} catch (err) {
reply(`Belum Ada User Yang Jadibot`)
}
break
case 'spamcall':{
if (cekUser("id", sender) == null) return reply(mess.OnlyUser)
if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
if (!q) return reply(`Kirim perintah\n#${command} nomor\n\nContoh? #${command} 8xxxx\nNomor awal dari 8 bukan 62/08`)
var data = await fetchJson(`https://arugaz.herokuapp.com/api/spamcall?no=${q}`).catch(() => reply(mess.error.api))
if (data.status == false) {
reply(data.msg)
} else {
reply(data.logs)
}
}
break
case 'addprem':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply('*Contoh:*\n#addprem 628xxx')
var number_one = q+'@s.whatsapp.net'
if (cekUser("id", number_one) == null) return reply('User tersebut tidak terdaftar di database')
if (cekUser("premium", number_one) == true) return reply('User tersebut sudah premium')
setUser("±premium", number_one, true)
reply(`*PREMIUM*\n*ID:* @${number_one.split('@')[0]}\n*Status:* aktif`)
}
break
case 'delprem':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply('*Contoh:*\n#delprem 628xxx')
var number_one = q+'@s.whatsapp.net'
if (cekUser("id", number_one) == null) return reply('User tersebut tidak terdaftar di database')
if (cekUser("premium", number_one) == false) return reply('User tersebut tidak premium')
setUser("±premium", number_one, false)
reply(`*PREMIUM*\n*ID:* @${number_one.split('@')[0]}\n*Status:* tidak`)
}
break

// CONVERT
case 'sticker': case 'stiker': case 's':
if (isImage || isQuotedImage){
mentions(`@${sender.split('@')[0]}\n𝐓𝐞𝐫𝐝𝐞𝐤𝐭𝐞𝐤𝐬𝐢 𝐌𝐞𝐧𝐠𝐢𝐫𝐢𝐦 𝐆𝐚𝐦𝐛𝐚𝐫\n𝐀𝐮𝐭𝐨 𝐂𝐨𝐧𝐯𝐞𝐫𝐭 𝐊𝐞 𝐒𝐭𝐢𝐜𝐤𝐞𝐫`, [sender])
console.log(`@${sender.split('@')[0]} Mengirim Gambar`)
await conn.downloadAndSaveMediaMessage(msg, "image", `./database/${sender.split("@")[0]}.jpeg`)
var sticknya = fs.readFileSync(`./database/${sender.split("@")[0]}.jpeg`)
fs.writeFileSync('getpp.jpeg', sticknya)
await ffmpeg("getpp.jpeg")
.input("getpp.jpeg")
.on('error', function (error) {reply(error)})
.on('end', function () {conn.sendMessage(from, { sticker: {url: './getpp.webp'}, mimetype: 'image/webp' })})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save('./getpp.webp')
await sleep(5000)
fs.unlinkSync('./getpp.jpeg')
fs.unlinkSync('./getpp.webp')
fs.unlinkSync(`./database/${sender.split("@")[0]}.jpeg`)
} else {
reply(`Kirim/Reply foto dengan caption ${prefix+command}`)
}
break
case 'toimg':
if (isSticker || isQuotedSticker){
await conn.downloadAndSaveMediaMessage(msg, "sticker", `./database/${sender.split("@")[0]}.webp`)
let buffer = fs.readFileSync(`./database/${sender.split("@")[0]}.webp`)
let buffer2 = `./database/${sender.split("@")[0]}.webp`
var rand1 = 'database/'+getRandom('.webp')
var rand2 = 'database/'+getRandom('.png')
fs.writeFileSync(`./${rand1}`, buffer)
exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
fs.unlinkSync(`./${rand1}`)
if (err) return reply(mess.error.api)
conn.sendMessage(from, {caption: `*Sticker Convert!*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
fs.unlinkSync(`./${rand2}`)
fs.unlinkSync(`./database/${sender.split("@")[0]}.webp`)
})
} else {
reply(`Reply sticker dengan pesan ${prefix+command}`)
}
break
case 'npmstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} Username\nContoh: ${prefix+command} hikki-me`)
var pack = q
npmstalk(pack).then(i=>{
reply(`*STALKER-NPM*
name; ${i.name}
versionLatest; ${i.versionLatest}
versionUpdate; ${i.versionUpdate}
latestDependencies; ${i.latestDependencies}
publishDependencies; ${i.publishDependencies}
publishTime; ${i.publishTime}
latestPublishTime; ${i.latestPublishTime}`)
}).catch((err) => {
reply('Terjadi Kesalahan!!\nNama package npm tidak ditemukan')
})
}
break
case 'ffstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} id\nContoh: ${prefix+command} 2023873618`)
var pack = q
stalkff(pack).then(i=>{
if (i.status !== 200) return reply('Terjadi Kesalahan!!\nid ff tidak ditemukan')
reply(`*STALKER FF*
ID: ${i.id}
Nickname: ${i.nickname}`)
})
}
break
case 'mlstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} id|zone\nContoh: ${prefix+command} 106281329|2228`)
var id = q.split('|')[0]
var zon = q.split('|')[1]
if (!id) return reply('ID wajib di isi')
if (!zon) return reply('ZoneID wajib di isi')
stalkml(id, zon).then(i=>{
if (i.status !== 200) return reply('Terjadi Kesalahan!!\nid/zone tidak ditemukan')
reply(`*STALKER ML*
ID: ${id}
Zone: ${zon}
Nickname: ${i.nickname}`)
})
}
break
case 'githubstalk':{
if (!q) return reply(`Kirim perintah ${prefix+command} username\nContoh: ${prefix+command} Lexxy24`)
var user = q
fetchJson('https://api.github.com/users/'+user).then(i=>{
if (i.message) return reply('Terjadi Kesalahan!!\nUsername github tidak ditemukan')
reply(`*STALKER GITHUB*
login: ${i.login}
type: ${i.type}
name: ${i.name}
company: ${i.company}
blog: ${i.blog}
location: ${i.location}
bio: ${i.bio}
public_repos: ${i.public_repos}
public_gists: ${i.public_gists}
followers: ${i.followers}
following: ${i.following}
created_at: ${i.created_at}
updated_at: ${i.updated_at}`)
})
}
break
default:

/*━━━━━━━[ Function Menfess ]━━━━━━━*/

if (!isCmd) {
if (cekPesan("id", sender) == null) return
if (cekPesan("teman", sender) == false) return
if (m.messages[0].type == "conversation" || m.messages[0].type == "extendedTextMessage") {
try{ var chat_anonymous = m.messages[0].message.extendedTextMessage.text } catch (err) { var chat_anonymous = m.messages[0].message.conversation }
let text_nya_menfes = `*ANONYMOUS CHAT*
💬 : ${chat_anonymous}`
conn.sendMessage(cekPesan("teman", sender), {text:text_nya_menfes})
conn.sendMessage(from, {text:'pesan diteruskan.'}, {quoted:msg})
}}

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

// AUTHOR : LEXXY OFFICIAL
// INI CONSOLE LOG JNGN EDIT

}} catch (err) {
console.log(color('[ERROR]', 'red'), err)
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const moment = require("moment-timezone");
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let kon_erorr = {"tanggal": tanggal, "jam": jam, "error": err, "user": sender}
db_error.push(kon_erorr)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error))
var errny =`*SERVER ERROR*
*Dari:* @${sender.split("@")[0]}
*Jam:* ${jam}
*Tanggal:* ${tanggal}
*Tercatat:* ${db_error.length}
*Type:* ${err}`
conn.sendMessage(setting.ownerNumber, {text:errny, mentions:[sender]})
}}