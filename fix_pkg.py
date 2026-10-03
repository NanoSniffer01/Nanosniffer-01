import json

with open('package.json', 'r') as f:
    data = json.load(f)

data['scripts']['predeploy'] = 'npm run build'
data['scripts']['deploy'] = 'gh-pages -d dist'

with open('package.json', 'w') as f:
    json.dump(data, f, indent=2)
