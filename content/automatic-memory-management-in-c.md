---
title: "Automatic memory management in C"
slug: "automatic-memory-management-in-c"
excerpt: "Garbage Collector in C?? Are you high ??"
date: "2025-11-08"
author: "Abinash"
category: "Linux"
tags: ["intro", "Kernel", "C"]
---


All of us know that C has manual memory management.  
You allocate using `malloc()` and free using `free()`.  
But wait — can we do better? Of course we can.  

C has had support for automatic cleanup since around 2018, but it’s rarely used or talked about.  
Let’s deep dive into how it works and how you can start using it in your own C projects.

---

## The `cleanup` attribute

`gcc` has a **cleanup attribute** that lets you automatically call a function when a variable goes out of scope.  
This allows a kind of deterministic cleanup similar to destructors in C++.

From the GCC manual:

```
cleanup (cleanup_function)
The cleanup attribute runs a function when the variable goes out of scope. 
This attribute can only be applied to auto function-scope variables; 
it may not be applied to parameters or variables with static storage duration. 
The function must take one parameter, a pointer to a type compatible with the variable. 
The return value of the function (if any) is ignored.

When multiple variables in the same scope have cleanup attributes, 
at exit from the scope their associated cleanup functions are run in reverse order of definition (last defined, first cleanup).

If -fexceptions is enabled, cleanup_function is run during stack unwinding. 
It’s undefined what happens if cleanup_function doesn’t return normally.
```

---

## Example

main.c
```c
#include <stdio.h>
#include <stdlib.h>

void auto_free(void *p){
    printf("Cleaning up the memory\n");
    void *ptr = *(void **)p;
    if (ptr) free(ptr);
}

int sum(int arr[], int size){
    int s = 0;
    for (int i = 0; i < size; i++) {
        s += arr[i];
    }
    return s;
}

int main(){
    int *arr __attribute__((cleanup(auto_free))) = NULL;
    int size;

    printf("Enter the size of array: ");
    scanf("%d", &size);

    arr = malloc(sizeof(*arr) * size);

    printf("Enter Array elements: ");
    for (int i = 0; i < size; i++) {
        scanf("%d", &arr[i]);
    }

    printf("\nThe sum of given array is : %d\n", sum(arr, size));
    return 0;
}
```

Compile and run:

```bash
gcc main.c -o clnupatrbteg
./clnupatrbteg
```

Output:
```
Enter the size of array: 5
Enter Array elements: 1 2 3 4 5
The sum of given array is : 15
Cleaning up the memory
```

We allocated `arr` using `malloc` but never explicitly freed it.  
When `main()` ended, the compiler automatically inserted a call to our `auto_free()` function, which freed the memory.  

So we just made memory management automatic in C.

---

## Let’s Be Practical

Defining the cleanup function every time and using this long syntax:

```c
type *var __attribute__((cleanup(fun_name)));
```

is not convenient.  
Let’s create a reusable macro to simplify it.

autofree.h
```c
#ifndef AUTOFREE_H
#define AUTOFREE_H
#include <stdlib.h>

#define __auto_free(T)     static inline void __auto_free_##T(void *p) {         void *ptr = *(void **)p;         if (ptr) {             T(ptr);         }     }

#define __free(func) __attribute__((cleanup(__auto_free_##func)))

__auto_free(free)

#endif
```

Now you can include `autofree.h` anywhere.

Example:

```c
#include "autofree.h"

int main(void) {
    char *buf __free(free) = malloc(128);
    return 0;
}
```

When `main()` exits, `buf` is automatically freed.  
This makes the code cleaner, safer, and reduces the chances of memory leaks.

---

## How It Actually Works

When you use the `cleanup` attribute, GCC internally inserts a hidden call to your cleanup function at **every scope exit** point.

Conceptually, GCC transforms this:

```c
int *arr __attribute__((cleanup(auto_free))) = malloc(100);
```

into something like this:

```c
int *arr = malloc(100);
__on_scope_exit:
    auto_free(&arr);
```

At runtime, when the variable `arr` goes out of scope (end of block, return, or exception),  
the compiler automatically calls your cleanup function with the **address** of the variable.

The cleanup function doesn’t know how memory was allocated — it only receives a pointer to the variable,  
so it just needs to decide what to do with that pointer value (e.g., call `free()`).

This works great for memory, files, sockets, etc.

---

## Works for Heap Allocations, But Not Beyond Scope

The cleanup function executes when the variable **itself** goes out of scope, not when the memory it points to does.  
So if you return the pointer or store it globally, it gets freed too early.

Example that fails:

```c
char *alloc_buf(size_t n) {
    char *buf __free(free) = malloc(n);
    return buf; //  buf freed before returning
}
```

At runtime, `buf` is freed before returning, leaving a dangling pointer.

To safely “transfer ownership” of the pointer to the caller, disable cleanup manually:

```c
char *alloc_buf(size_t n) {
    char *buf __free(free) = malloc(n);
    char *out = buf;
    buf = NULL; // prevents auto_free() from freeing
    return out; //  safe now
} 
```
This mechansim can be improved easily. Lets keep it for another post



## References

- GCC documentation: [Common Variable Attributes — cleanup](https://gcc.gnu.org/onlinedocs/gcc/Common-Variable-Attributes.html#index-cleanup-variable-attribute)   
- Linux Kernel uses `cleanup.h` which supports full features. 

---

## Conclusion

The `cleanup` attribute gives C developers a practical way to automate memory and resource cleanup —  
no garbage collector, no runtime cost, just plain compiler support.

It’s not a replacement for understanding memory management,  
but it’s a small, elegant feature that can eliminate many manual frees and leaks.

So next time someone says *“C has no automatic memory management”*,  
you know exactly what to show them.

Thanks for reading!  
— Abinash Singh 📌 [GitHub: avinashlalotra/Cautofree](https://github.com/avinashlalotra/Cautofree)
