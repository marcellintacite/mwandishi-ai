export const songs = [
  "https://utfs.io/f/9fcf4f5e-cf98-4362-8dc6-9b0de5ece7f1-xw1ny6.mp3",
  "https://utfs.io/f/a5433511-f89e-4177-a831-b1806ede9e37-hc9whq.mp3",
  "https://utfs.io/f/ab37b954-5c93-44ec-80d8-cc3b973c1109-isf672.mp3",
  "https://utfs.io/f/0a991cda-2f75-4e28-8da9-ec8110c160ff-44nnhu.mp3",
  "https://utfs.io/f/dad80136-f5bf-482e-b449-d7ae6842e70b-vxs72g.mp3",
  "https://utfs.io/f/a7085e3d-5ec7-4fbc-bc82-ff6db47a895e-ydrldd.mp3",
  "https://utfs.io/f/3907dfaf-fb46-482e-aa19-75a7fa60e1c0-3g6cph.mp3",
  "https://utfs.io/f/4fe7cfe6-250c-43cc-98f9-ca7496463ea7-p8osu4.mp3",
];

export function getRandomSong(songs: any) {
  // Math.floor generates a random integer less than the argument
  const randomIndex = Math.floor(Math.random() * songs.length);
  return songs[randomIndex];
}
