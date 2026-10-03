import os

files = ['src/components/layout/Header.tsx', 'src/services/api.ts']

for f_path in files:
    with open(f_path, 'r') as f:
        lines = f.readlines()
        
    for i, line in enumerate(lines):
        if 'import.meta.env' in line and '// @ts-ignore' not in lines[i-1]:
            lines[i] = '        // @ts-ignore\n' + line
            
    with open(f_path, 'w') as f:
        f.writelines(lines)
