# papiercomputer

This is an implementation of the so-called Papiercomputer von Wolfgang Back.

See here for further information: https://en.wikipedia.org/wiki/WDR_paper_computer

There are 8 available registers (0-7).

In addition the following commands can be used:

| Command  | Description | Address Type |
| --- | --- | --- |
| isz  | Is zero. If not true, increases Instructionpointer by one, else two.  | Register |
| inc | Increment | Register |
| dec | Decrement | Register |
| jmp | Jump to | Line-Number |
| stp | Stop | * |
