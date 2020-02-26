from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def hello():
    result = {
        "sentence": [],
        "phrase": []
    }
    return render_template('index.html', result=result)

@app.route('/search', methods=['POST'])
def search():
    sentence = request.form.get("sentence")
    if sentence == '':
        result = {
            "sentence": [],
            "phrase": []
        }
        return render_template('index.html', tips='tips: please input the sentence', result=result)

    result = {
        "sentence": ["my", "name", "is", "beking","my", "name", "is", "beking","my", "name", "is", "beking","my", "name", "is", "beking","my", "name", "is", "beking"],
        # phrase label start end nested_level
        "phrase": [(["beking"], "PER", 3, 4, 1),
                   (["is", "beking"], "PER", 2, 4, 2),
                   (["name"], "ORG", 1, 2, 1),
                   (["my", "name", "is", "beking"], "FAC", 0, 3, 3),
                   (["my", "name", "is", "beking"], "LOC", 8, 10, 1),
                   (["my", "name", "is", "beking"], "VEH", 14, 16, 1)]
    }

    return render_template('index.html', result=result, sentence=sentence)


if __name__ == '__main__':
    app.run(debug=True)
