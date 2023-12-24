/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  //Sort array to accending order
  // then write +1 loop then write that value in other array
  let result = [];
  let len = nums.lenght;
  // const sorted = nums.sort((a,b) =>  a - b  );
  // for(let [index, item] of sorted.entries()){
  //     console.log(index, item)
  //     if(index+1 != item){
  //         result.push(item)
  //         console.log(result)
  //     }
  // }

  const map1 = new Map();

  nums.forEach((item) => {
    map1.set(item, item);
  });

  for (let i = 1; i <= len; i++) {
    console.log(map1.get(i), i);
    if (i != map1.get(i)) {
      result.push(i);
    }
  }

  return result;
};
