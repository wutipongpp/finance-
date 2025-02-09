from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/loan_calculator')
def loan_calculator():
    return render_template('loan_calculator.html')

@app.route('/about-US')
def about():
    return render_template('about.html')

@app.route('/SavingMoney')
def SavingMoney():
    return render_template('SavingMoney.html')

@app.route('/monthly-saving')
def monthlysaving():
    return render_template('monthlysaving.html')

@app.route('/Calculatefloatinginteres')
def Calculatefloatinginteres():
    return render_template('Calculatefloatinginteres.html')


@app.route('/calculateTax')
def calculateTax():
    return render_template('calculateTax.html')

if __name__ == '__main__':
    app.run(debug=True,port=10100,host="0.0.0.0",use_reloader=True)
