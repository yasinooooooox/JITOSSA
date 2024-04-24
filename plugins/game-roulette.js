let betData = {};
let handler = async (m, { usedPrefix, args, command, text }) => {
  const userId = m.sender;
  const user = global.db.data.users[m.sender];

  if (betData[userId]) {
    const remainingTime = getRemainingTime(betData[userId].timestamp);
    return m.reply(`⏰ ${mssg.rouletCd} *${remainingTime}* ${mssg.second}`);
  }

  if (args.length < 2 )  throw `✳️ ${mssg.useCmd}: *${usedPrefix + command}* <Jumlah> <Rom>\n\n*${usedPrefix + command}-info* ${mssg.moreInfo}`;

  const amount = parseInt(args[0]);
  const space = args[1].toLowerCase();
  if (isNaN(amount) || amount < 100) throw `✳️ ${mssg.betMin} 100 🪙`;
  if (amount > 10000) throw `✳️ ${mssg.betMax} 10,000 🪙`;
  if (user.coin < amount) throw `✳️ ${mssg.betNan}`;

  const validSpaces = ["1st", "2nd", "3rd", "odd", "even", "red", "black", "1-12", "13-24", "25-36", "1-18", "19-36"];
  if (!validSpaces.includes(space) && (!/^\d+$/.test(space) || parseInt(space) < 1 || parseInt(space) > 36)) {
    m.reply(`✳️ ${mssg.useCmd}: *${usedPrefix + command}* <Jumlah> <espace>\n\n*${usedPrefix + command}-info* ${mssg.moreInfo}`);
    return;
  }

  const result = Math.floor(Math.random() * 36) + 1;
  let payout = 0;

  if (space === "1st" && [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].includes(result)) {
    payout = amount * 3;
  } else if (space === "2nd" && [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].includes(result)) {
    payout = amount * 3;
  } else if (space === "3rd" && [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].includes(result)) {
    payout = amount * 3;
  } else if (space === "odd" && result % 2 !== 0) {
    payout = amount * 2;
  } else if (space === "even" && result % 2 === 0) {
    payout = amount * 2;
  } else if (space === "red" && isRedNumber(result)) {
    payout = amount * 2;
  } else if (space === "black" && !isRedNumber(result)) {
    payout = amount * 2;
  } else if (isValidRange(space)) {
    const [start, end] = getRange(space);
    if (result >= start && result <= end) {
      payout = amount * 2;
    }
  } else if (space === "1-12" && result >= 1 && result <= 12) {
    payout = amount * 3;
  } else if (space === "13-24" && result >= 13 && result <= 24) {
    payout = amount * 3;
  } else if (space === "25-36" && result >= 25 && result <= 36) {
    payout = amount * 3;
  } else if (space === "1-18" && result >= 1 && result <= 18) {
    payout = amount * 2;
  } else if (space === "19-36" && result >= 19 && result <= 36) {
    payout = amount * 2;
  } else if (parseInt(space) === result) {
    payout = amount * 36;
  }

  m.reply(`✅ ${mssg.bet} *${amount}* 🪙 ${mssg.in} *${space}*\n\n_*${mssg.result} ${mssg.in} 10 ${mssg.second}*_`);

  const timestamp = new Date().getTime();
  betData[userId] = { amount, space, timestamp };

  await new Promise(resolve => setTimeout(resolve, 10000));

  const color = isRedNumber(result) ? "merah" : "hitam";
  let resultMessage = `🎲 ${mssg.fell}: *${color} ${result}*\n\n`;

  if (payout > 0) {
    const profit = payout - amount;
    user.coin += profit;
    resultMessage += `🎉 ${mssg.win}: *+${profit}* 🪙`;
  } else {
    const lostAmount = amount;
    user.coin -= lostAmount;
    resultMessage += `😞 ${mssg.lost}. *-${lostAmount}* 🪙`;
  }

  m.reply(resultMessage);

  delete betData[userId];
};

handler.help = ['roulette'];
handler.tags = ['game'];
handler.command = ['roulette', 'ruleta'];

export default handler;

function isRedNumber(number) {
  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  return redNumbers.includes(number);
}

function isValidRange(space) {
  const ranges = {
    "1-12": [1, 12],
    "13-24": [13, 24],
    "25-36": [25, 36],
    "1-18": [1, 18],
    "19-36": [19, 36]
  };
  return ranges.hasOwnProperty(space);
}

function getRange(space) {
  const ranges = {
    "1-12": [1, 12],
    "13-24": [13, 24],
    "25-36": [25, 36],
    "1-18": [1, 18],
    "19-36": [19, 36]
  };
  return ranges[space];
}

function getRemainingTime(timestamp) {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - timestamp;
  const remainingTime = Math.max(20 - Math.floor(elapsedTime / 1000), 0);
  return remainingTime;
}
