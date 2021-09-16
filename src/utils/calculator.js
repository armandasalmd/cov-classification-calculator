const calculatorUtils = {
  calculate: function (data) {
    return {
      success: true,
      score: 76.5,
      classification: "1st class",
      stategyResults: [
        {
          name: "Strategy 1 result (100/100/100)",
          score: 76.5
        },
        {
          name: "Strategy 2 result (0/100/120)",
          score: 65.2
        },
        {
          name: "Strategy 3 result (0/120/100)",
          score: 46.8
        }
      ]
    };
  },
};

export default calculatorUtils;

// return {
//   success: true,
//   score: 76.5,
//   classification: "1st class",
//   stategyResults: [
//     {
//       name: "Strategy 1 result (100/100/100)",
//       score: 76.5
//     },
//     {
//       name: "Strategy 2 result (0/100/120)",
//       score: 65.2
//     },
//     {
//       name: "Strategy 3 result (0/120/100)",
//       score: 46.8
//     }
//   ]
// };

{
  
}