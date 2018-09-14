# Buffer

# string_decoder

## buf.toString(encoding)

全部字节按照编码方式转码成字符串

## decoder.write(buf)

会将多余的字节保存在内部的buffer，确保输出的字符是正确编码的，不会出现乱码的问题？