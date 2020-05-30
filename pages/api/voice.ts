import voice from './_voice.json';

export default (_, res) => {
  const randomNumber = Math.floor(Math.random() * voice.length);
  res.status(200).json({ voice: voice[randomNumber] });
};
