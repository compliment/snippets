#!/usr/bin/c -lX11 --
// Compile with: gcc test.c -lX11 && time ./a.out
#include <limits.h>
#include <X11/Xlib.h>

void main(void) {
    Display *d = XOpenDisplay(NULL);

    unsigned long count = 0;

    if (d) {
        puts("starting no-op loop");

        while (1) {
            XNoOp(d);
            count++;

            if (count % (1000*1000) == 0)
                printf("%lu\n%d\n\n", count, INT_MAX);
        }
    } else {
        puts("unable to open display");
        return 1;
    }
}
