import type { CardInputs } from "@/lib/messages";

function lower(str: string): string {
  return str.trim().toLowerCase();
}

function ageCommentId(age: number): string {
  if (age === 1) return "resmi boleh hancurkan kue dengan kedua tangan";
  if (age < 13) return "cukup umur untuk nego frosting ekstra";
  if (age === 13) return "resmi jadi remaja (turut berduka untuk orang tuamu)";
  if (age === 16) return "cukup umur untuk kabur dari tanggung jawab";
  if (age === 18) return "legal sudah dewasa, emosional masih belajar microwave";
  if (age === 21) return "akhirnya cukup umur untuk hal seru (dan mabuknya)";
  if (age === 30) return "masuk era 'butuh tidur siang setelah bersenang-senang'";
  if (age === 40) return "vintage, seperti anggur bagus atau lutut yang curiga";
  if (age === 50) return "setengah abad muda, terdengar lebih baik dari kenyataannya";
  if (age === 59) return "hampir resmi jadi legenda, masih kuat ngemil";
  if (age === 60) return "layak diskon lansia dan sama sekali tidak siap acting tua";
  if (age === 100) return "seorang centenarian, alias legenda hidup";
  if (age > 100) return "lebih tua dari sebagian besar sejarah yang kamu komplain";
  if (age % 10 === 0)
    return `menyambut angka ${age}, cuma angka (angka yang suka menghakimi)`;
  return `genap ${age}, yaitu ${age - 5} plus poin pengalaman`;
}

type MessageTemplate = (inputs: CardInputs) => string;

export const templatesId: MessageTemplate[] = [
  (inputs) =>
    `Selamat ulang tahun, ${inputs.name}! Kamu ${ageCommentId(inputs.age)}. Semoga tahunmu penuh ${lower(inputs.adjective)} ${lower(inputs.pluralNouns)}, ${lower(inputs.hobby)}—dan nol obrolan canggung yang membosankan.`,

  (inputs) =>
    `${inputs.name}, di usia ${inputs.age} kamu resmi habiskan lebih banyak waktu untuk ${lower(inputs.hobby)} daripada kebanyakan orang kejar ${lower(inputs.pluralNouns)}. Tetap ${lower(inputs.adjective)}. Selamat ulang tahun!`,

  (inputs) =>
    `${inputs.name}, selamat naik level ke ${inputs.age}! Misi utama: ${lower(inputs.hobby)}. Bonus hadiah: ${lower(inputs.adjective)} ${lower(inputs.pluralNouns)}. Misi sampingan: senyum pas semua nyanyi.`,

  (inputs) =>
    `Selamat ulang tahun ke-${inputs.age}, ${inputs.name}! Katanya umur cuma angka—angka kamu jelaskan obsesi ${lower(inputs.adjective)} ${lower(inputs.pluralNouns)} dan ${lower(inputs.hobby)} dengan sempurna.`,

  (inputs) =>
    `Untuk ${inputs.name}: Bukan makin tua, tapi naik level jadi kolektor ${lower(inputs.pluralNouns)} yang bilang itu ${lower(inputs.adjective)}. ${inputs.age} tahun kehebatan!`,

  (inputs) =>
    `Selamat ulang tahun, ${inputs.name}! Di usia ${inputs.age}, kamu ${ageCommentId(inputs.age)}. Kami lewati ${lower(inputs.pluralNouns)} dan kasih kartu tentang ${lower(inputs.hobby)}—sama-sama seru kok.`,

  (inputs) =>
    `${inputs.name}, genap ${inputs.age} artinya: cukup tahu diri, cukup ${lower(inputs.adjective)} untuk ${lower(inputs.hobby)}, cukup bijak menghargai ${lower(inputs.pluralNouns)}.`,

  (inputs) =>
    `Mawar merah, ungu biru, ${inputs.name} ${inputs.age} tahun suka ${lower(inputs.pluralNouns)} juga. Kamu ${lower(inputs.adjective)} di ${lower(inputs.hobby)}—fakta saja, tanpa debat.`,

  (inputs) =>
    `Selamat ulang tahun, ${inputs.name}! ${inputs.age} lilin di kue, ${lower(inputs.adjective)} ${lower(inputs.pluralNouns)} di depan, keahlian ${lower(inputs.hobby)} sudah membara.`,

  (inputs) =>
    `${inputs.name}, di usia ${inputs.age} kamu kuasai tiga hal: ${lower(inputs.hobby)}, cari ${lower(inputs.adjective)} ${lower(inputs.pluralNouns)}, dan pura-pura kalori kue ulang tahun tidak dihitung.`,

  (inputs) =>
    `Berita terkini: ${inputs.name} genap ${inputs.age} hari ini! Saksi melaporkan suasana ${lower(inputs.adjective)}, ${lower(inputs.hobby)} berlebihan, dan ${lower(inputs.pluralNouns)} mencurigakan.`,

  (inputs) =>
    `Selamat ulang tahun, ${inputs.name}! ${inputs.age} tahun muda, super ${lower(inputs.adjective)}, dan sudah telat untuk ${lower(inputs.pluralNouns)} plus sesi ${lower(inputs.hobby)} yang mantap.`,
];

export function generateMessageId(
  inputs: CardInputs,
  excludeIndex = -1,
): { text: string; index: number } {
  let index: number;
  do {
    index = Math.floor(Math.random() * templatesId.length);
  } while (index === excludeIndex && templatesId.length > 1);

  return {
    text: templatesId[index](inputs),
    index,
  };
}
