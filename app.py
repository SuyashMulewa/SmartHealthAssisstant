from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

# Load medical database
def load_medical_db():
    db_path = os.path.join(os.path.dirname(__file__), 'data', 'medical_db.json')
    with open(db_path, 'r', encoding='utf-8') as f:
        return json.load(f)

# Load first aid database
def load_first_aid_db():
    db_path = os.path.join(os.path.dirname(__file__), 'data', 'first_aid_db.json')
    with open(db_path, 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/symptom-check', methods=['POST'])
def symptom_check():
    """Handle symptom input and return specialist recommendations"""
    try:
        data = request.json
        symptoms = data.get('symptoms', [])
        
        medical_db = load_medical_db()
        recommendations = []
        
        # Find matching specialists for symptoms
        for symptom in symptoms:
            symptom_lower = symptom.lower()
            found = False
            for category, info in medical_db['symptoms'].items():
                if symptom_lower in info['keywords']:
                    recommendations.append({
                        'symptom': symptom,
                        'specialist': info['specialist'],
                        'description': info['description'],
                        'urgency': info.get('urgency', 'normal')
                    })
                    found = True
                    break
            
            if not found:
                recommendations.append({
                    'symptom': symptom,
                    'specialist': 'General Practitioner',
                    'description': 'Please consult with a general practitioner for proper evaluation.',
                    'urgency': 'normal'
                })
        
        return jsonify({
            'success': True,
            'recommendations': recommendations
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/first-aid', methods=['GET'])
def first_aid_search():
    """Search first aid instructions"""
    try:
        query = request.args.get('q', '').lower()
        first_aid_db = load_first_aid_db()
        
        if not query:
            return jsonify({
                'success': True,
                'results': []
            })
        
        results = []
        for topic, info in first_aid_db.items():
            if query in topic.lower() or any(query in step.lower() for step in info.get('steps', [])):
                results.append({
                    'topic': topic,
                    'steps': info['steps'],
                    'warning': info.get('warning', '')
                })
        
        return jsonify({
            'success': True,
            'results': results
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
