# papiercomputer

Dies ist eine Implementation des Papiercomputers von Wolfgang Back.

Es stehen 8 Register zur Verfügung (0-7).

Außerdem stehen die folgenden Befehle zur Verfügung:

| Command  | Description | Address Type |
| --- | --- | --- |
| isz  | Is zero. If true, increases Instructionpointer by one, else two.  | Register |
| inc | Increment | Register |
| dec | Decrement | Register |
| jmp | Jump to | Line-Number |
| stp | Stop | * |
