# 去除文件中空格
def stripFile(oldFile, newFile):
    '''remove the space or Tab or enter in a file, and output a new file in the same folder'''
    f = open(oldFile, 'r+', encoding='utf8')
    newf = open(newFile, 'w', encoding='utf8')
    for eachline in f.readlines():
        newStr = eachline.replace(" ", "").replace("\t", "").strip()
        newf.write(newStr)
    f.close()
    newf.close()


if __name__ == "__main__":
    stripFile("code_nouse\\old.txt", 'code_nouse\\new.txt')
