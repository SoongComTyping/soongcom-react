import { createServer } from 'miragejs';

const koreanWords = [
  [],
  ["가지", "바지", "겨울", "가을"],
  ["여기", "저기", "서먹하다", "쥬시", "감귤"],
  ["싸우다", "쓰레기", "저울", "유예기간", "계약조건"],
  ["오늘도", "개미는", "열심히", "일을", "하네", "가네쉬", "진격의", "거인", "숭실대", "컴퓨터학부", "포테이토"],
  ["끝입니다"],
  [],
  [],
  [],
];

const englishWords = [
  [],
  ["apple", "bear", "create", "dragon"],
  ["Dash", "Dock", "export", "experts"],
  ["Spaghetti", "google", "sushi", "expiration", "inspiration"],
  ["and", "then", "also", "we", "were", "them", "they", "was", "used", "to", "target"],
  ["Finished"],
  [],
  [],
];

const koreanKeys = [
  [],
  ['ㅅ', 'ㄴ', 'ㄱ', 'ㅇ', 'ㅂ', 'ㄷ', 'ㄱ'],
  ['ㅁ', 'ㄴ', 'ㅇ', 'ㅂ', 'ㄷ', 'ㅇ', 'ㄹ', 'ㄱ', 'ㅈ', 'ㅁ', 'ㅈ'],
  ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅜ', 'ㅣ', 'ㅐ'],
  ['ㅑ', 'ㅒ', 'ㅖ', 'ㅒ', 'ㅠ', 'ㅛ', 'ㅠ', '.', '.', 'ㅎ'],
  ['ㄱ', 'ㄷ', 'ㅑ', 'ㅏ', 'ㅕ', 'ㅛ', 'ㅠ', 'ㅏ', 'ㅣ', 'ㅋ'],
  ['?', 'ㄷ', 'ㄹ', 'ㄱ', ',', 'ㅠ', '.', 'ㅍ', 'ㅎ', 'ㅌ'],
  [],
  [],
];

const englishKeys = [
  [],
  ['a', 'b', 'c', 's', 'd', 'f', 'a', 'b', 's'],
  ['q', 'w', 'e', 't', 'r', 'f', 'g', 'a', 'd'],
  ['u', 'i', 'l', 'o', 'o', 'u', 'i', 'j', 'i'],
  ['n', 'm', 'm', 'b', 'c', 'x', 'z', 'v', 'c'],
  [..."apple.astonish"],
  [..."thisisthebest"],
  [..."amazonprime"],
  [],
];

createServer({
  routes() {
    this.get("/api/words", (schema, request) => {
      const { level, language } = request.queryParams;

      if (language === 'korean') {
        return {
          data: koreanWords[level],
        };
      }

      if (language === 'english') {
        return {
          data: englishWords[level],
        };
      }

      return {
        error: `language: ${language} is not supported`,
        data: [],
      };
    });

    this.get("/api/keys", (schema, request) => {
      const { level, language } = request.queryParams;

      if (language === 'korean') {
        return {
          data: koreanKeys[level],
        };
      }

      if (language === 'english') {
        return {
          data: englishKeys[level],
        };
      }

      return {
        error: `language: ${language} is not supported`,
        data: [],
      };
    });
  }
});
