---
title: Example Blog
date: '2022-10-24'
image: 'example-blog.jpg'
excerpt: "Example of how to use Closure in Golang"
isFeatured: true
---

## CLOSURES
 A closure is really about functions that live inside functions, and refer to the enclosing functions data. It's interesting because of the side effect they can have.

``` go
// using global variable

package main

import (
	"fmt"
)

var a, b int = 0, 1

func main() {

	for value := fib(&a, &b); value <= 100; value = fib(&a, &b) {
		fmt.Println(value)
	}
}

func fib(a, b *int) int {
	*a, *b = *b, *a + *b
	return *b	
}

// using the power of closure

package main

import (
	"fmt"
)

func main() {
	f := fib()
	for x:= f(); x < 100; x = f() {
		fmt.Println(x)
	}
}

func fib() func() int {
	a, b := 0, 1
	return func() int {
		a, b = b, a+b
		return b		
	}
}

// variable a and b are closed over by the anonymous function
// which holds onto them, and as long as this f exists, 
// a and b exist, they continue to have their existence.
```

![Gopher](example-blog.jpg)
