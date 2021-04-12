import { createServer } from 'miragejs';

const koreanWords = [
  [],
  ["가지", "바지", "겨울", "가을"],
  ["여기", "저기", "서먹하다", "쥬시", "감귤"],
  ["싸우다", "쓰레기", "저울", "유예기간", "계약조건"],
  ["데이터", "끝입니다"],
  [],
  [],
  [],
  [],
];

const englishWords = [
  [],
  ["apple", "bear", "create", "dragon"],
  ["Dash", "Dock", "export", "experts"],
  ["Spaghetti", "google", "sushi", "expiration", "inspiration"],
  ["No", "Words", "Anymore"],
  [],
  [],
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
  }
});
