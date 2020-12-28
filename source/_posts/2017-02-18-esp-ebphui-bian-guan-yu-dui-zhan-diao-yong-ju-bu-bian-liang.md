---
title: esp,ebp汇编关于堆栈调用,局部变量
slug: esp-ebphui-bian-guan-yu-dui-zhan-diao-yong-ju-bu-bian-liang
date: 2017-02-18T09:06:43.000Z
date_updated: 2017-02-18T09:06:43.000Z
---

c语言如下

    int fn(int x,int y,int z) {
    	int a = 3;
    	int b = 4;
    	return x + y+z+a+b;
    }
    
    int main()
    {
    	printf("%d", fn(1, 2, 5)); //csasdfas
    	getchar();
        return 0;
    }
    
    

> 对应的反汇编代码

main函数

    00AF182E    6A 05           push 0x5
    00AF1830    6A 02           push 0x2
    00AF1832    6A 01           push 0x1
    00AF1834    E8 16F9FFFF     call ConsoleA.00AF114F
    

fn函数

    00AF16F0 >  55              push ebp
    00AF16F1    8BEC            mov ebp,esp
    00AF16F3    81EC D8000000   sub esp,0xD8
    00AF16F9    53              push ebx
    00AF16FA    56              push esi                                 ; ConsoleA.<ModuleEntryPoint>
    00AF16FB    57              push edi
    00AF16FC    8DBD 28FFFFFF   lea edi,dword ptr ss:[ebp-0xD8]
    00AF1702    B9 36000000     mov ecx,0x36
    00AF1707    B8 CCCCCCCC     mov eax,0xCCCCCCCC
    00AF170C    F3:AB           rep stos dword ptr es:[edi]
    00AF170E    C745 F8 0300000>mov dword ptr ss:[ebp-0x8],0x3
    00AF1715    C745 EC 0400000>mov dword ptr ss:[ebp-0x14],0x4
    00AF171C    8B45 08         mov eax,dword ptr ss:[ebp+0x8]
    00AF171F    0345 0C         add eax,dword ptr ss:[ebp+0xC]
    00AF1722    0345 10         add eax,dword ptr ss:[ebp+0x10]
    00AF1725    0345 F8         add eax,dword ptr ss:[ebp-0x8]
    00AF1728    0345 EC         add eax,dword ptr ss:[ebp-0x14]
    00AF172B    5F              pop edi
    00AF172C    5E              pop esi                                  ; ConsoleA.<ModuleEntryPoint>
    00AF172D    5B              pop ebx
    00AF172E    8BE5            mov esp,ebp
    00AF1730 >  5D              pop ebp
    00AF1731    C3              retn
    

main函数中call fn(1,2,5),先把参数入栈,call把当前地址入栈，跳转到fn函数。然后保存EBP，再把当前ESP值赋给EBP，相当于这个函数所用的堆栈空间的起点，sub esp,0xD8定义局部空间的大小。保存ebx，esi，edi的值（入栈）。初始化局部空间。
![](/source/images/2017/02/2012081414392956.gif)

如图，

    mov dword ptr ss:[ebp-0x8],0x3    [ebp-0x8]就是局部变量a赋值3
    mov dword ptr ss:[ebp-0x14],0x4   [ebp-0x14]就是局部变量b赋值4
    mov eax,dword ptr ss:[ebp+0x8]    [ebp+0x8] 参数x=1
    add eax,dword ptr ss:[ebp+0xC]    [ebp+0xC] 参数y=2
    add eax,dword ptr ss:[ebp+0x10]   [ebp+0x10] 参数z=5
    

注意：win32汇编写的函数返回值一般在eax中,返回64位的数的话，EDX存放的是高32位，EAX存低32位.
