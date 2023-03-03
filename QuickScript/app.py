from flask import Flask, request
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/summary',methods=["GET"])
def perform_summarization():
    url = request.args.get('youtube_url', '')
    video_id = url.split('=')[1]
    summary = get_summarized_transcript(get_transcript(video_id))
    return summary

def get_transcript(video_id):
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    transcript = ' '.join(details["text"] for details in transcript_list)
    return transcript

def get_summarized_transcript(transcript):
    summarizer= pipeline("summarization")
    summarized_transcript = ''
    for part in range(0, len(transcript) // 1000 + 1):
        part_summary = summarizer(transcript[part * 1000: (part + 1) * 1000])[0]['summary_text']
        summarized_transcript = summarized_transcript + '\n' + part_summary
    return summarized_transcript


print(get_summarized_transcript(get_transcript('gedoSfZvBgE')))
if __name__ == '__main__':
    app.run()
