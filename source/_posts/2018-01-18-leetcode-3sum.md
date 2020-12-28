---
title: leetcode--3Sum
slug: leetcode-3sum
date: 2018-01-18T05:50:26.000Z
date_updated: 2018-01-20T07:46:42.000Z
---

    func threeSum(nums []int) [][]int {
    	sort.Ints(nums)
    	result := [][]int{}
    	for i := 0; i < len(nums); i++ {
    		if i > 0 && nums[i] == nums[i-1] {
    			continue
    		}
            if nums[i] > 0 {
    			break
    		}
    		for j := i + 1; j < len(nums); j++ {
    			if j > i+1 && nums[j] == nums[j-1] {
    				continue
    			}
                if nums[i]+nums[j] > 0 {
    				break
    			}
    			for z := j + 1; z < len(nums); z++ {
    
    				if nums[i]+nums[j] > nums[z] {
    					break
    				}
    				if nums[i]+nums[j] == -nums[z] {
    					temp := []int{nums[i], nums[j], nums[z]}
    					result = append(result, temp)
    					break
    				}
    			}
    		}
    	}
    	return result
    }
    

上面的答案超时了.还是要转成twoSum来解决问题.

    func twoSum(nums []int,target int) [][]int {
       // fmt.Println(nums,target)
        result := [][]int{}
        l:=0
        r:=len(nums)-1
    	for   {
    		if(r<=l){
    			break
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
                if l!=0&&r!=len(nums)-1&&nums[l]==nums[l-1]&&nums[r]==nums[r+1] {
                    l++;
                    r--;
                    continue
                }
                // fmt.Println(nums[l],nums[r],l,r)
                temp:=[]int{nums[l],nums[r]}
                result=append(result,temp)
                l++;
                r--;
                continue;
            }
        }
    	return result
    }
    func threeSum(nums []int) [][]int {
    	sort.Ints(nums)
    	result := [][]int{}
    	for i := 0; i < len(nums); i++ {
    		if i > 0 && nums[i] == nums[i-1] {
    			continue
    		}
            if nums[i] > 0 {
    			break
    		}
    		res:=twoSum(nums[i+1:],0-nums[i])
             // fmt.Println(res)
    		for _,v:=range res{
    			result=append(result,append(v, nums[i]))
    		}
    	}
    	return result
    }
    
