import { adjectiveList } from './adjectiveList.js';
import { emotes } from './emotesObject.js';


//HELPER FUNCTIONS FOR CHAT GENERATOR

export const generateRandomNumber = (minValue, maxValue) => {
  return Math.floor(Math.random() * (maxValue - minValue) + minValue);
};

const globalEmoteArray = Object.keys(emotes.globalEmotes);
const subEmoteArray = Object.keys(emotes.streamerEmotes);

export const randomBoolean = () => {
  const output = Math.random();
  return output >= 0.5;
};

const randomGlobalEmote = () => {
  const randomEmoteIndex = generateRandomNumber(0, globalEmoteArray.length - 1);
  return globalEmoteArray[randomEmoteIndex];
};

const randomSubEmote = () => {
  const randomEmoteIndex = generateRandomNumber(0, subEmoteArray.length - 1);
  return subEmoteArray[randomEmoteIndex];
};

const globalEmoteSpamGenerator = (repeatNum = 1) => {
  return `${randomGlobalEmote()} `.repeat(repeatNum);
};

const subEmoteSpamGenerator = (repeatNum = 1) => {
  return `${randomSubEmote()} `.repeat(repeatNum);
};

const randomCasing = (string) => {
  return randomBoolean() ? string.toUpperCase() : string;
};

const randomInterjection = () => {
  const interjections = ['kek', 'huehuehue', 'woooooooooow', 'lol', 'lmao', 'hahahahahahaha', 'wth', 'huzzah', 'whyyyy', 'aha', 'ahem', 'ahh', 'ahoy', 'alas', 'arg', 'aw', 'bam', 'bingo', 'blah', 'boo', 'bravo', 'brr', 'cheers', 'congrats', 'congratulations', 'dang', 'drat', 'darn', 'duh', 'eek', 'eh', 'encore', 'eureka', 'fiddlesticks', 'gadzooks', 'gee', 'gee whiz', 'golly', 'goodbye', 'goodness', 'good grief', 'gosh', 'haha', 'hah', 'hallelujah', 'hello', 'hey', 'hmm', 'holy buckets', 'holy cow', 'holy smokes', 'hon hon hon', 'hot dog', 'huh', 'humph', 'hurray', 'oh', 'oh dear', 'oh my', 'oh well', 'oops', 'ouch', 'ow', 'phew', 'phooey', 'pooh', 'pow', 'rats', 'shh', 'shoo', 'thanks', 'there', 'tut-tut', 'uh-uh', 'uh-oh', 'ugh', 'uhhh', 'wahoo', 'well', 'whoa', 'whoops', 'wow', 'yeah', 'yes', 'yikes', 'yippee', 'yo', 'yuck'];
  const randomInterjection = interjections[generateRandomNumber(0, interjections.length - 1)];
  return randomCasing(randomInterjection);
};

const randomAdjectiveGenerator = () => {
  const randomAdjectiveIndex = generateRandomNumber(0, adjectiveList.length - 1);
  return randomCasing(adjectiveList[randomAdjectiveIndex]);
};

const randomPronounGenerator = () => {
  const pronouns = ['you are', 'ur', 'he is', 'she is', 'they are', 'this is', 'I am', 'we are', 'it is', 'that is'];
  const randomPronoun = pronouns[generateRandomNumber(0, pronouns.length - 1)];
  return randomPronoun;
};

const randomPhraseGenerator = () => {
  return `${randomPronounGenerator()} ${randomAdjectiveGenerator()}`;
};

const randomEmoteCombos = ['Kappa', 'Squid1 Squid2 Squid3 Squid4', 'MercyWing1 PinkMercy MercyWing2', 'MercyWing1 Kappa MercyWing2', 'PowerUpL Kappa PowerUpR'];

export const twitchChatGenerator = (bool) => {
  const allUserPrivileges = [
    ...randomEmoteCombos,
    randomInterjection(),
    randomAdjectiveGenerator(),
    randomPhraseGenerator(),
    randomGlobalEmote(),
    globalEmoteSpamGenerator(generateRandomNumber(0, 30)),
    `${randomInterjection()} ${randomGlobalEmote()}`,
    `${randomInterjection()} ${globalEmoteSpamGenerator(generateRandomNumber(0, 30))}`,
    `${randomAdjectiveGenerator()} ${randomGlobalEmote()}`,
    `${randomInterjection()} ${randomAdjectiveGenerator()}`,
    `${randomInterjection()} ${randomAdjectiveGenerator()} ${randomGlobalEmote()}`,
    `${randomInterjection()} ${randomPhraseGenerator()}`,
    `${randomInterjection()} ${randomPhraseGenerator()} ${randomGlobalEmote()}`,
    `${randomPhraseGenerator()}`,
    `${randomPhraseGenerator()} ${randomGlobalEmote()}`,
  ];

  const allSubPrivileges = [
    ...randomEmoteCombos,
    randomInterjection(),
    randomAdjectiveGenerator(),
    randomPhraseGenerator(),
    randomGlobalEmote(),
    globalEmoteSpamGenerator(generateRandomNumber(0, 30)),
    `${randomInterjection()} ${randomGlobalEmote()}`,
    `${randomInterjection()} ${randomGlobalEmote()} ${randomGlobalEmote()}`,
    `${randomInterjection()} ${globalEmoteSpamGenerator(generateRandomNumber(0, 30))}`,
    `${randomAdjectiveGenerator()} ${randomGlobalEmote()}`,
    `${randomInterjection()} ${randomAdjectiveGenerator()}`,
    `${randomInterjection()} ${randomAdjectiveGenerator()} ${randomGlobalEmote()}`,
    `${randomInterjection()} ${randomPhraseGenerator()}`,
    `${randomInterjection()} ${randomPhraseGenerator()} ${randomGlobalEmote()}`,
    `${randomPhraseGenerator()}`,
    `${randomPhraseGenerator()} ${randomGlobalEmote()}`,
    randomSubEmote(),
    subEmoteSpamGenerator(generateRandomNumber(0, 30)),
    `${randomInterjection()} ${randomSubEmote()}`,
    `${randomInterjection()} ${subEmoteSpamGenerator(generateRandomNumber(0, 30))}`,
    `${randomAdjectiveGenerator()} ${randomSubEmote()}`,
    `${randomAdjectiveGenerator()} ${randomSubEmote()} ${randomSubEmote()}`,
    `${randomInterjection()} ${randomAdjectiveGenerator()}`,
    `${randomInterjection()} ${randomAdjectiveGenerator()} ${randomSubEmote()}`,
    `${randomInterjection()} ${randomAdjectiveGenerator()} ${randomSubEmote()} ${randomSubEmote()}`,
    `${randomInterjection()} ${randomPhraseGenerator()}`,
    `${randomInterjection()} ${randomPhraseGenerator()} ${randomSubEmote()}`,
    `${randomInterjection()} ${randomPhraseGenerator()} ${randomSubEmote()} ${randomSubEmote()}`,
    `${randomPhraseGenerator()}`,
    `${randomPhraseGenerator()} ${randomSubEmote()}`,
    `${randomPhraseGenerator()} ${randomSubEmote()} ${randomSubEmote()}`,
    `${randomPhraseGenerator()} ${subEmoteSpamGenerator(generateRandomNumber(0, 30))}`,
  ];
  const randomIndex = generateRandomNumber(1, allUserPrivileges.length - 1);
  const randomSubIndex = generateRandomNumber(1, allSubPrivileges.length - 1);
  return bool ? allSubPrivileges[randomSubIndex] : allUserPrivileges[randomIndex];
};
