const analyzeComplexity = require("../backend/analyzers/complexityAnalyzer");

const pythonPermutations = `
def permutations(arr, l, r):
    if l == r:
        print(arr)
    else:
        for i in range(l, r + 1):
            arr[l], arr[i] = arr[i], arr[l]
            permutations(arr, l + 1, r)
            arr[l], arr[i] = arr[i], arr[l]
`;

const jsBacktrack = `
function backtrack(tempList, nums) {
    if (tempList.length === nums.length) {
        list.push([...tempList]);
    } else {
        for (let i = 0; i < nums.length; i++) {
            if (tempList.includes(nums[i])) continue;
            tempList.push(nums[i]);
            backtrack(tempList, nums);
            tempList.pop();
        }
    }
}
`;

console.log("Python Permutations:", analyzeComplexity(pythonPermutations, "python"));
console.log("JS Backtrack:", analyzeComplexity(jsBacktrack, "javascript"));
