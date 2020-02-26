from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    sentence = request.form.get("sentence")
    if sentence == '':
        return render_template('index.html', tips='tips: please input the sentence')

    result = {
        "sentence": sentence,
        "len": 5,
        # phrase label start end nested_level
        "phrase": [(["beking"], "PER", 3, 4, 1),
                #    (["is", "beking"], "PER", 2, 4, 2),
                   (["name"], "ORG", 1, 2, 1),
                #    (["my", "name"], "ORG", 0, 2, 2),
                   (["my", "name", "is"], "FAC", 0, 3, 3)]
    }

    
    
    return render_template('index.html', result=result, sentence=sentence)


if __name__ == '__main__':
    app.run(debug=True)
