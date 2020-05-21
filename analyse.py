import MeCab
mecab = MeCab.Tagger ('-d wakan')
def analysePOS(text):
    mecab.parse('')
    node = mecab.parseToNode(text)
    words = []
    while node:
        word = node.surface
        f = node.feature.split(',')
        words.append({'text': word, 
                      'hinshi_1': f[0],
                      'hinshi_2': f[1], 
                      'hinshi_3': f[2], 
                      'hinshi_4': f[3], 
                      'katsuyo_type': f[4], 
                      'katsuyo_kei': f[5], 
                      'pronounciation': f[6]})
        node = node.next
    return words
