---
title: leetcode --- 3Sum Closest
slug: leetcode-3sum-closest
date_published: 2018-01-21T07:24:52.000Z
date_updated: 2018-01-21T07:24:54.000Z
---

给定一个n个整数的数组s，找出s中的三个整数，使得总和最接近给定的数字.返回三个整数的总和。还是类似3Sum的解法。

    func threeSumClosest(nums []int, target int) int {
        sort.Ints(nums)
        temp :=math.MaxInt32  
        result :=0
    	for i := 0; i < len(nums); i++ {
    		if i > 0 && nums[i] == nums[i-1] {
    			continue
    		}
            if i >= len(nums)-2 {
                break
            }
    		res:=twoSum(nums[i+1:],target-nums[i])
            if res+nums[i]==target {
                 return target
            }
            absRes:=abs(target-nums[i]-res)
            if temp>absRes{
                temp=absRes
                result=res+nums[i]
            }
    	}
        return result
    }
    
    func abs(x int) int {
        if x < 0 {
            return -x
        }
        return x
    }
    
    func twoSum(nums []int,target int) int {
        // fmt.Println(nums,target)
        l:=0
        r:=len(nums)-1
        temp:=math.MaxInt32 
        result:=0
    	for   {
    		if(r<=l){
    			break
    		}
            absRes:=abs(target-nums[l]-nums[r])
            if temp>absRes{
                temp=absRes
                result=nums[l]+nums[r]
            }
            if nums[l]+nums[r]<target {
                l++;
                continue;
            }
            if nums[l]+nums[r]>target {
                r--;
                continue;
            }
            if nums[l]+nums[r]==target {
                return nums[l]+nums[r]
            }
        }
        return result
    }
    
