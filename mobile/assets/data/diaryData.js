const day = new Date();
const today =
  day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();

const diaryData = [
  {
    catId: `${today}`,
    date: today,
    food: "Food",
    water_amount: 50,
    exercise: "Lên kế hoạch tập luyện cho bé nào!",
    about: "Hôm nay bé thế nào ",
  },
];

export default diaryData;
