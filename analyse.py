from google.cloud import storage
import MeCab

def download_wakan():
    """Downloads a blob from the bucket."""
    # bucket_name = "your-bucket-name"
    # source_blob_name = "storage-object-name"
    # destination_file_name = "local/path/to/file"

    storage_client = storage.Client()
    bucket = storage_client.bucket('kobun-annotation')
    blobs = bucket.list_blobs(prefix="wakan")  # Get list of files
    for blob in blobs:
        filename = blob.name.replace('/', '_') 
        blob.download_to_filename('/tmp/wakan' + filename)  # Download

    print(
        "Blob {} downloaded to {}."
    )
download_wakan()
mecab = MeCab.Tagger ('-d /tmp/wakan')
def analysePOS(text):
    mecab.parse('')#文字列がGCされるのを防ぐ
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
        #次の単語に進める
        node = node.next
    return words
